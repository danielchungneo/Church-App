import { Colors } from "@/enum/Colors";
import { onChange } from "@gluestack-style/react";
import { Box, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

type UncontrolledMultiselectProps = {
    data: any[];
    labelField: string;
    valueField: string;
    placeholder: string;
    setValue: (value: any) => void;
    value: any;
    leftIcon?: React.ReactNode;
};

function UncontrolledMultiselect({ data, labelField, valueField, placeholder, value, setValue, leftIcon }: UncontrolledMultiselectProps) {
    const renderItem = (item: any) => {
        return (
            <Box style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item[labelField]}</Text>
            </Box>
        );
    };
    return (
        <MultiSelect
            search
            data={data}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            searchPlaceholder={`Search ${placeholder}`}
            value={value}
            onChange={item => {
                setValue(item);
            }}
            renderItem={renderItem}
            renderLeftIcon={() => leftIcon}
            placeholderStyle={styles.placeholderStyle}
            style={styles.main}
            inputSearchStyle={styles.inputSearchStyle}
            containerStyle={styles.container}
            selectedStyle={styles.selected}
            selectedTextStyle={styles.selectedText}
            //Weird mint green, possibly change
            activeColor="#169d7d"
        />
    );
}

const styles = StyleSheet.create({
    main: {
        padding: 12,
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 1,
        color: "gray",

    },
    container: {
        borderRadius: 8,
        backgroundColor: Colors.PRIMARY,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selected: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 8,
        padding: 10,
    },
    selectedText: {
        fontSize: 16,
        color: 'gray',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
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
        color: "gray"
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
        color: "gray"
    },
});

export default UncontrolledMultiselect;