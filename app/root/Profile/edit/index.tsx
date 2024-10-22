import MainContainer from "@/components/MainContainer";
import api from "@/constants/api";
import useGetRequest from "@/hooks/useGetRequest";
import { Center, Text } from "@gluestack-ui/themed";

type EditProfileScreenProps = {
        //
    };

    function EditProfileScreen({}: EditProfileScreenProps) {
        // const {data: userProfile, loading: userProfileLoading, mutate: revalidateCache} = useGetRequest(api.users.getUserProfile());
        return (
            <MainContainer >
                <Center>
                    <Text>Hi User</Text>
                </Center>
            </MainContainer>
        );
}

export default EditProfileScreen;