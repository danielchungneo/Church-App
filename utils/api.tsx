import { CSRF_TOKEN_STORAGE_KEY, DEFAULT_API_CONFIG, TOKEN_STORAGE_KEY } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export interface IBuildUrlOptions {
    body?: object;
    path?: object;
    query?: object;
}

export interface IAction {
    method: string;
    options?: IBuildUrlOptions;
    url: string;
}


export const getSessionTokens = async () => {
    const bearerToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    const csrfToken = await AsyncStorage.getItem(CSRF_TOKEN_STORAGE_KEY);
    return { bearerToken, csrfToken };
};

export const fillUrlParams = (url: string, variables: any = {}): string => {
    return url
        .split('/')
        .map((section: string) =>
            section[0] === ':' ? variables[section.slice(1)] : section
        )
        .join('/');
};

export const flattenOptions = (options: any) => {
    if (!options) return [];

    let args: any[] = [];

    Object.keys(options).forEach((key: string) => {
        const option = options[key];
        if (
            option instanceof Array &&
            (key === 'filter' || key === 'attribute' || key === 'a')
        ) {
            option.forEach((k: any) => {
                args = args.concat(
                    flattenOptions(k).map((opt) => ({
                        [`${key}.${Object.keys(opt)[0]}`]: Object.values(opt)[0],
                    }))
                );
            });
        } else if (option instanceof Array) {
            option.forEach((o: any) => {
                args.push({ [key]: o });
            });
        } else {
            args.push({ [key]: option });
        }
    });
    return args;
};

export const objectToEqualsString = (obj: object) =>
    `${Object.keys(obj)[0]}=${Object.values(obj)[0]}`;


export function formatQueryParams(options: any) {
    try {
        let flattenedOptions = flattenOptions(options);

        if (flattenedOptions && flattenedOptions.length) {
            return `?${flattenedOptions
                .map((option) => objectToEqualsString(option))
                .join('&')}`;
        }
        return '';
    } catch (e) {
        return '';
    }
}

export const buildUrl = (url: string, options?: IBuildUrlOptions, showHidden = true) => {
    // TODO - Talk to steve about the notequals opperand in mc-api
    const filterHiddenQueryParam = { field: "isHidden", value: "true", opperand: "notequals" }
    // If showHidden is false, add a filter to the query to exclude hidden items
    // if (!showHidden) {
    //     if (options?.query) {
    //         if (options.query?.filter) {
    //             options.query?.filter?.push(filterHiddenQueryParam)
    //         } else {
    //             options.query.filter = [filterHiddenQueryParam]
    //         }
    //     }
    // }
    return `${DEFAULT_API_CONFIG.url}${fillUrlParams(url, options?.path)}${options?.query ? formatQueryParams(options?.query) : ''
        }`;
};
export async function createRequest(action: IAction, body?: object) {
    const headers = await getHeaders();

    let requestOptions = {
        method: action.method,
        headers,
        mode: 'cors',
    } as any;

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    const request = await fetch(
        buildUrl(action.url, action.options),
        requestOptions
    );

    let response;
    try {
        response = await request.json();

        if (!('data' in response)) {
            if ([400, 401, 403, 404, 500].includes(response.status)) {
                response = {
                    data: {},
                    errors: [{ code: response.status, message: response.title }],
                };
            } else {
                response = { data: response, errors: [] };
            }
        }
    } catch (e) {
        response = {
            data: {},
            errors: [{ code: request.status, message: request.statusText }],
        };
    }

    return response;
}


export const getHeaders = async (optionalHeaders: any = {}) => {
    const { bearerToken, csrfToken } = await getSessionTokens();

    let defaultHeaders: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    if (bearerToken) {
        defaultHeaders.Authorization = `Bearer ${bearerToken}`;
    }
    if (csrfToken) {
        defaultHeaders["X-CSRF-Token"] = csrfToken;
    }

    let headers: Headers = new Headers();
    const tempHeaders = Object.assign({}, defaultHeaders, optionalHeaders);

    Object.keys(tempHeaders).forEach((headerKey) => {
        headers.append(headerKey, tempHeaders[headerKey]);
    });

    return headers;
};
export const setSessionToken = async (token: string) => {
    return await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export function generateCrudRoutes(entity: string) {
    return {
        getAll: (options?: IBuildUrlOptions, showHidden=false) => {

            const url = buildUrl(`/${entity}`, options, showHidden)
            return url;
        },
        get: (options?: IBuildUrlOptions) => buildUrl(`/${entity}/:id`, options),
        save: (id: string | string[]) => {
            if (id === 'create') {
                return {
                    url: `/${entity}`,
                    method: METHOD.POST,
                };
            }
            return {
                url: `/${entity}/:id`,
                method: METHOD.PUT,
                options: { path: { id } },
            };
        },
        create: () => {
            return {
                url: `/${entity}`,
                method: METHOD.POST,
            };
        },
        update: (id: string) => {
            return {
                url: `/${entity}/:id`,
                method: METHOD.PUT,
                options: { path: { id } },
            };
        },
        delete: (id: string) => {
            return {
                url: `/${entity}/:id`,
                method: METHOD.DELETE,
                options: { path: { id } },
            };
        },
    };
}

export const fetcherWithToken = async (key: { url: string, session: any }) => {
    const { url, session } = key;
    return fetch(url, {
        method: METHOD.GET,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
            "X-CSRF-Token": session.csrfToken,

        },
        mode: 'cors',
    }).then((res: any) => res.json());
}
