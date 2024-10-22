import ScrollableList from "@/components/Lists/ScrollableList";
import MainContainer from "@/components/MainContainer";
import DeleteModal from "@/components/Modals/DeleteModal";
import api from "@/constants/api";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/enum/Colors";
import useCrudRequest from "@/hooks/useCrudRequest";
import useGetRequest from "@/hooks/useGetRequest";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, AvatarFallbackText, AvatarImage, Box, HStack, Text } from "@gluestack-ui/themed";
import { router, useFocusEffect } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

type UsersConfigScreenProps = {
    //
};

function UsersConfigScreen({ }: UsersConfigScreenProps) {
    const auth = useAuth();
    const { activeTenantId } = auth;


    const { data: users, loading: usersLoading, mutate: revalidateCache } = useGetRequest(api.users.getAllUsersByTenant({
        query: {
            tenantId: activeTenantId
        },
    }));

    const handleEditRoute = (user: any) => {
        router.push({ pathname: `/root/Configurations/usersManagement/${user.id}` })
    }

    const leftIcon = (item: any) => {
        return (
            <HStack justifyContent="center" alignItems="center" space="md" marginRight="$2">
                <Avatar size="md" bgColor="$indigo600" borderColor={Colors.TEXT} borderWidth={1}>
                    <AvatarFallbackText>{item.fullName}</AvatarFallbackText>
                    <AvatarImage source={{ uri: item?.imageUri || null }} alt="profile-image" />
                </Avatar>
            </HStack>
        )
    }

    const renderScrollListTextComponent = (item: any) => {
        const isInactive = item.isInactive ? true : false;
        return (
            <HStack flex={0} alignItems="center" space="md" >
                <Box flex={0} >
                    <Text color={Colors.TEXT} size="md" numberOfLines={1}>{item.fullName}</Text>
                </Box>
                <Box alignItems="center">
                    <FontAwesome color={isInactive ? Colors.ERROR : Colors.BLUE} name={isInactive ? "user-times" : "user"} size={30} />
                </Box>
            </HStack>
        )
    }

    // Cache revalidation on page load
    useFocusEffect(() => {
        revalidateCache();
    })

    return (
        <MainContainer loading={usersLoading}>
            <Box flex={1}>
                <ScrollableList
                    options={users}
                    idName="id"
                    listName="Users"
                    handleEditItem={handleEditRoute}
                    nameField="fullName"
                    renderLeftIcon={leftIcon}
                    renderTextComponent={renderScrollListTextComponent}
                    isSearchable
                />
            </Box>
        </MainContainer>
    );
}

export default UsersConfigScreen;