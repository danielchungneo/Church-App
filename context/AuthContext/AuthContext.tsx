import { FunctionComponent, createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CSRF_TOKEN_STORAGE_KEY, TOKEN_STORAGE_KEY } from "@/constants/config";
import { IAction, METHOD, createRequest, getSessionTokens, setSessionToken } from "@/utils/api";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { AppState } from "react-native";

export interface IAuthContext {
    sessionInfo: any
    setSessionInfo: (user: any) => void;
    currentToken?: string | null;
    handleLoginSuccess?: (loginData: any) => void;
    logout: () => void;
    tryAuthenticateFromStoredToken: () => void;
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
}

export const AuthContext = createContext<IAuthContext>({} as any);

export enum AUTHENTICATION_STATUSES {
    'PENDING' = 'pending',
    'EXPIRED' = 'expired',
    'UNAUTHORISED' = 'unauthorised',
    'AUTHORISED' = 'authorised',
}

export const AuthProvider: FunctionComponent = ({ children }) => {
    const [sessionInfo, setSessionInfo] = useState(null);
    const [currentToken, setCurrentToken] = useState<string | null>(null);
    const [authStatus, setAuthStatus] = useState(AUTHENTICATION_STATUSES.UNAUTHORISED);
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    AsyncStorage.getItem

    const logout = useCallback(async () => {
        setSessionInfo(null);
        setCurrentToken(null);

        try {
            await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
        } catch (err) {
            console.info('Nothing to delete');
        }
        setAuthStatus(AUTHENTICATION_STATUSES.UNAUTHORISED);

    }, []);

    const tryAuthenticateFromStoredToken = async () => {
        const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
        if (token) {
            try {
                const action: IAction = {
                    url: '/auth/session/me',
                    method: METHOD.POST,
                    options: {}
                };
                const { data, errors } = await createRequest(action, {});

                if (errors?.find((e) => e.code === 404)) {
                    await logout();
                    throw errors;
                }
                // Logout if the token is expired
                else if (!data || Object.keys(data).length < 1) {
                    await logout();
                }
                // Login
                else {
                    // Take a look at this, the data being returned will not be a user object
                    setCurrentToken(token);
                    setSessionInfo(data);
                    setAuthStatus(AUTHENTICATION_STATUSES.AUTHORISED);

                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Token expired',
                    text2: 'You will now be logged out',
                    onHide: logout,
                });
            }
        } else {
            await logout();
            setAuthStatus(AUTHENTICATION_STATUSES.UNAUTHORISED);
        }
    };

    const handleLoginSuccess = async (sessionData: any) => {
        const { accessToken, csrfToken } = sessionData;
        await setSessionToken(accessToken);
        setCurrentToken(accessToken);

        // Set Local Session Tokens
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
        await AsyncStorage.setItem(CSRF_TOKEN_STORAGE_KEY, csrfToken)
        await AsyncStorage.setItem("userId", sessionData.id.toString())
        await AsyncStorage.removeItem('lastClosedTime');

        setSessionInfo(sessionData);
        setAuthStatus(AUTHENTICATION_STATUSES.AUTHORISED);
        

        return;
    };

    // useEffect(() => {
    //     async function init() {
    //         await tryAuthenticateFromStoredToken();
    //     }
    //     init();
    // }, []);

    useEffect(() => {
        async function setToken() {
            // const token = await pdaService.getCurrentAuthToken();
            const {bearerToken} = await getSessionTokens();
            setCurrentToken(bearerToken);
        }

        setToken();

        if (authStatus === AUTHENTICATION_STATUSES.EXPIRED || authStatus === AUTHENTICATION_STATUSES.UNAUTHORISED) {
            router.navigate("/");
        }
    }, [authStatus]);

    const value = {
        sessionInfo,
        setSessionInfo,
        handleLoginSuccess,
        currentToken,
        logout,
        tryAuthenticateFromStoredToken,
        theme,
        setTheme
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};