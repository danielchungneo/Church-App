export interface IUseGetRequest {
    data: any;
    loading: boolean;
    errors: any[];
    mutate: () => void;
}

export interface IUseCrudRequest {
    onComplete?: (data: any, errors: any) => void;
    onError?: (errors: any) => void;
    onSuccess?: (data: any) => void;
    onSuccessRedirectUrl?: string;
    revalidateCache?: () => void;
}
