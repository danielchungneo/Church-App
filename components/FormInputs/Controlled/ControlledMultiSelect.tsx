import api from "@/constants/api";
import { Colors } from "@/enum/Colors";
import useGetRequest from "@/hooks/useGetRequest";
import { IAction } from "@/utils/api";
import { onChange } from "@gluestack-style/react";
import { Box, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

type ControlledMultiSelectProps = {
    data: any[];
    name: string;
    labelField: string;
    valueField: string;
    placeholder: string;
    leftIcon?: React.ReactNode;
    loading?: boolean;
    search?: boolean;
    label?: string;
};

function ControlledMultiSelect({ data, labelField, valueField, placeholder, leftIcon, name, loading = false, search = true, label }: ControlledMultiSelectProps) {


    const { control } = useFormContext();
    const renderItem = (item: any) => {
        return (
            <Box style={styles.item}>
                <Text style={styles.itemTextStyle}>{item[labelField]}</Text>
            </Box>
        );
    };


    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const onChange = (e: any) => {
                    field.onChange(e)
                };
                const isInvalid = fieldState.invalid;
                return (
                    <>
                        {label && (
                            <Text size="lg" color={isInvalid ? Colors.ERROR : Colors.INPUT} lineHeight={0}>
                                {label}
                            </Text>
                        )}
                        

                            <MultiSelect
                                search={search}
                                data={data}
                                labelField={labelField}
                                valueField={valueField}
                                placeholder={placeholder}
                                searchPlaceholder={`Search ${placeholder}`}
                                value={field.value}
                                onChange={(item: any) => {
                                    onChange(item)
                                }}
                                renderItem={renderItem}
                                renderLeftIcon={() => leftIcon}
                                placeholderStyle={styles.placeholderStyle}
                                style={isInvalid ? styles.mainInvalid : styles.main}
                                inputSearchStyle={styles.inputSearchStyle}
                                containerStyle={styles.container}
                                selectedStyle={styles.selected}
                                selectedTextStyle={isInvalid ? styles.selectedTextInvalid : styles.selectedText}
                                itemTextStyle={styles.itemTextStyle}
                                disable={loading}
                                activeColor={Colors.SECONDARY}

                            />
                    </>
                )
            }}
        />
    );
}

const styles = StyleSheet.create({
    main: {
        padding: 6,
        borderRadius: 4,
        borderColor: "white",
        borderWidth: 1,
        marginBottom: 8,

    },
    mainInvalid: {
        padding: 6,
        borderRadius: 4,
        borderColor: Colors.ERROR,
        borderWidth: 1,
        marginBottom: 8,
    },
    container: {
        borderRadius: 8,
        backgroundColor: Colors.PRIMARY,
        marginBottom: 8,
        overflow: "hidden",
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: Colors.INPUT
    },
    selected: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    selectedText: {
        fontSize: 20,
        color: Colors.INPUT,
    },
    selectedTextInvalid: {
        fontSize: 20,
        color: Colors.ERROR,
    },
    dropdown: {
        height: 50,
        borderColor: 'red',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 22,
        color: Colors.INPUT,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: "white"
    },
    itemTextStyle: {
        color: Colors.INPUT,
        fontSize: 16,
    },
});

export default ControlledMultiSelect;