import MainContainer from "@/components/MainContainer";
import api from "@/constants/api";
import { useAuth } from "@/context/AuthContext";
import useGetRequest from "@/hooks/useGetRequest";
import { useLocalSearchParams } from "expo-router";

type UsersFormScreenProps = {
    //
};

function UsersFormScreen({ }: UsersFormScreenProps) {
    const params = useLocalSearchParams()

    const { userId } = params;
    // const { data: user, loading: userLoading, mutate: revalidateCache } = useGetRequest(api.users.getUserManagementById({ query: { id: userId } }));


    return (
        <MainContainer>
            {/* <UserManagementForm activeObject={user} id={userId} loading={userLoading} revalidateCache={revalidateCache}/> */}
        </MainContainer>
    );
}

export default UsersFormScreen;