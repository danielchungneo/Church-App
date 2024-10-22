import { getSessionTokens } from "@/utils/api";
import { useSWRConfig } from "swr";

export default async function useRevalidateCache(url = ``) {
    const { bearerToken } = await getSessionTokens();
    const key = bearerToken ? [url, bearerToken] : url;
    const { mutate } = useSWRConfig();
    const revalidateCache = () => mutate(key);
    return revalidateCache;
}