import { Colors } from "@/enum/Colors";
import { AddIcon, Box, Center, HStack, Icon, Pressable, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import PressableOpacity from "../FormInputs/StyledInputs/PressableOpacity";
import { TouchableOpacity } from "react-native";
import { ChevronRight, EditIcon, TrashIcon } from "lucide-react-native";
import { AntDesign, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import UncontrolledText from "../FormInputs/Uncontrolled/UncontrolledText";

type ScrollableListProps = {
    options: any;
    idName: string;
    nameField?: string;
    listName?: string;
    handlePress?: (item: any) => void;
    handleAddItem?: () => void;
    handleEditItem?: (item: any) => void;
    handleDeleteItem?: (item: any) => void;
    renderLeftIcon?: (item?: any) => React.ReactNode;
    textSize?: string;
    renderTextComponent?: (item: any) => React.ReactNode;
    isSearchable?: boolean;
    placeHolderText?: string;
};

function ScrollableList({ options, idName, nameField = "name", placeHolderText="Name", listName, textSize = "xl", handlePress, handleAddItem, handleEditItem, handleDeleteItem, renderLeftIcon, renderTextComponent, isSearchable = false }: ScrollableListProps) {
    const [searchText, setSearchText] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showSearch, setShowSearch] = useState(false);
    const renderSearchIcon = () => {
        return (
            <Box ml="$4" alignItems="center" justifyContent="center">
                <AntDesign color={Colors.INPUT} name="search1" size={24} />
            </Box>
        )
    }
    const handleChangeSearchText = (text: string) => {
        setSearchText(text);
    }
    const handleSearchText = () => {
        console.log("Search Text: ", searchText);
        console.log("Options: ", options);
        console.log("Name Field: ", nameField);
        const filterResults = options.filter((option: any) => option[nameField]?.toString()?.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredOptions(filterResults);
    }

    const handleShowSearch = () => {
        if (showSearch) {
            setShowSearch(false);
            setSearchText("");
        } else {
            setShowSearch(true);
        }
    }

    useEffect(() => {
        setFilteredOptions(options);
    }, [options])

    return (
        <Box borderRadius={"$xl"} bgColor={Colors.SECONDARY} flex={1}>
            <VStack p={"$5"} space="md" borderBottomColor={Colors.PRIMARY} borderBottomWidth={1} >
                {(listName || handleAddItem) && (
                    <HStack justifyContent="space-between" >
                        <HStack flex={1} alignItems="center" space="md">
                            <Text size="2xl" color={Colors.TEXT}>{listName}</Text>
                            {isSearchable && (
                                <TouchableOpacity onPress={handleShowSearch}>
                                    <Ionicons name="search" color={Colors.TEXT} size={25} />
                                </TouchableOpacity>
                            )}

                        </HStack>
                        <Center flex={0}>
                            {handleAddItem && (
                                <PressableOpacity onPress={handleAddItem}>
                                    <Ionicons name="add" color={Colors.TEXT} size={25} />
                                </PressableOpacity>
                            )}
                        </Center>
                    </HStack>
                )}
                {(showSearch || searchText) && (
                    <Box height={"$12"}>
                        <UncontrolledText
                            rounded="$full"
                            value={searchText}
                            onTextChange={handleChangeSearchText}
                            placeHolderText={placeHolderText}
                            renderIcon={renderSearchIcon}
                            handleOnBlur={handleSearchText}
                            returnKeyType="search"
                            isClearable
                            handleOnClear={() => setFilteredOptions(options)}
                        />
                    </Box>
                )}
            </VStack>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {filteredOptions.length === 0 && (
                    <Center p={"$5"}>
                        <HStack justifyContent="center" alignItems="center">
                            <MaterialIcons name="search-off" size={35} color={Colors.TEXT} />
                            <Text ml="$2" color={Colors.TEXT} size="2xl">No Results Found</Text>
                        </HStack>
                    </Center>
                )}
                {filteredOptions.map((option: any) => {
                    return (
                        handlePress ? (
                            <TouchableOpacity onPress={() => handlePress(option)} key={option[idName]}>
                                <ListItem textSize={textSize} item={option} nameField={nameField} renderLeftIcon={renderLeftIcon} renderTextComponent={renderTextComponent} />
                            </TouchableOpacity>
                        ) : (
                            <ListItem item={option} textSize={textSize} nameField={nameField} key={option[idName]} isArrow={false} handleEditItem={handleEditItem} handleDeleteItem={handleDeleteItem} renderLeftIcon={renderLeftIcon} renderTextComponent={renderTextComponent} />
                        )
                    )
                })}
            </ScrollView>
        </Box >
    );
}

type ListItemProps = {
    item: any;
    nameField: string;
    isArrow?: boolean;
    handleEditItem?: (item: any) => void;
    handleDeleteItem?: (item: any) => void;
    renderLeftIcon?: (item?: any) => React.ReactNode;
    renderTextComponent?: (item: any) => React.ReactNode;
    textSize?: string;

};
function ListItem({ item, nameField, isArrow = true, textSize, handleEditItem, handleDeleteItem, renderLeftIcon, renderTextComponent }: ListItemProps) {
    return (
        <HStack borderBottomColor={Colors.PRIMARY} borderBottomWidth={1} p={"$5"} alignItems="center" justifyContent="space-between">

            <HStack alignItems="center">
                {renderLeftIcon && (
                    <>
                        {renderLeftIcon(item)}
                    </>
                )}
                {renderTextComponent ? (
                    renderTextComponent(item)
                ) : (
                    <Text size={textSize} color={Colors.TEXT}>{item[nameField]}</Text>
                )}
            </HStack>
            <HStack space="2xl">
                {isArrow && (
                    <Box>
                        <Ionicons name="chevron-forward" size={16} color={Colors.TEXT} />
                    </Box>
                )}
                {handleDeleteItem && (
                    <TouchableOpacity onPress={() => handleDeleteItem(item)}>
                        <Box>
                            <Ionicons name="trash-bin" size={25} color={Colors.ERROR} />
                        </Box>
                    </TouchableOpacity>
                )}
                {handleEditItem && (
                    <TouchableOpacity onPress={() => handleEditItem(item)}>
                        <Box>
                            <Feather name="edit" size={25} color={Colors.BLUE} />
                        </Box>
                    </TouchableOpacity>
                )}
            </HStack>
        </HStack>
    )
}

export default ScrollableList;