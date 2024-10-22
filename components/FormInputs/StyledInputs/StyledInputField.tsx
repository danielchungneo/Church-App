import { AntDesign } from "@expo/vector-icons";
import { Box, Center, HStack, Input, InputField } from "@gluestack-ui/themed";
import { useState } from "react";

type StyledInputFieldProps = {
  iconName: string;
  placeholderText: string;
  value:string;
  isInvalid?: boolean;
  onChange?: any;
  fieldType?: string;
};

function StyledInputField({ iconName, placeholderText, isInvalid=false, onChange, fieldType="text", value }: StyledInputFieldProps) {
  const [showText, setShowText] = useState(fieldType === "password" ? false : true);
  return (
    <Box backgroundColor={'rgba(255, 255, 255, 0.2)'} h={"$12"} width={"$full"} borderRadius={"$full"} >
      <HStack>
        <Input flex={1} h={"$12"} borderWidth={0}>
          <Center flex={0} h={"$12"} w={"$12"} borderRadius={"$full"} opacity={"$100"} backgroundColor={isInvalid ? 'rgba(241, 122, 122, 0.63)' : 'rgba(255, 255, 255, 0.7)'}>
            <AntDesign name={iconName} size={24} color={isInvalid ? "red" : "black"} />
          </Center>
          <InputField onChangeText={onChange} value={value} type={showText ? "text" : "password"} color={isInvalid ? "$red" : "$white"} placeholderTextColor={isInvalid ? "$red" : "$white"} placeholder={placeholderText} />
        </Input>
      </HStack>
    </Box>
  );
}

export default StyledInputField;


