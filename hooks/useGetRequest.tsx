import { fetcherWithToken } from '@/utils/api';
import useSWR from 'swr';
import { IUseGetRequest } from '@/constants/types';
import { useAuth } from '@/context/AuthContext';

export const USE_GET_REQUEST_DEFAULT_VALUES: IUseGetRequest = {
  data: {},
  loading: false,
  errors: [],
  mutate: () => null,
};

export default function useGetRequest(url: string = ``, swrOptions: any = {}) {
  const auth = useAuth();

  const token = auth.currentToken;
  const session = auth.sessionInfo
  const key = token ? {url, session} : url;
  const {
    data: swrData,
    error,
    mutate,
  } = useSWR(key, fetcherWithToken, swrOptions);

  let data = swrData;
  let errors = error ? [error] : [];

  if (swrData && 'data' in swrData) {
    data = swrData.data;
  }

  if (swrData && 'errors' in swrData) {
    errors = errors.concat(swrData.errors);
  }

  return {
    data,
    loading: !errors.length && !data,
    errors,
    mutate,
  } as IUseGetRequest;
}
