import { CheckIcon, Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, VStack } from "@gluestack-ui/themed";
import StyledInputField from "./FormInputs/StyledInputs/StyledInputField";
import { useState } from "react";
import { Colors } from "@/enum/Colors";

type LoginBlockProps = {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    isInvalidCredentials: boolean;
    isRememberMe: boolean;
    setIsRememberMe: (isRememberMe: boolean) => void;
};

function LoginBlock({ email, setPassword, password, setEmail, isInvalidCredentials, isRememberMe, setIsRememberMe }: LoginBlockProps) {
    const handleChangeEmail = (text: string) => {
        setEmail(text);
    }
    const handleChangePassword = (text: string) => {
        setPassword(text);
    }
    const handleRemeberMe = () => {
        setIsRememberMe(!isRememberMe);
    }

    return (
        <VStack flex={1} justifyContent="center" alignItems="center" space="md" mt={"$8"}>
            <StyledInputField iconName="user" placeholderText="Email" value={email} isInvalid={isInvalidCredentials} onChange={handleChangeEmail} />
            <StyledInputField iconName="key" placeholderText="Password" fieldType="password" value={password} isInvalid={isInvalidCredentials} onChange={handleChangePassword} />
            <Checkbox aria-label="Remember Me" size="md" isInvalid={false} isDisabled={false} isChecked={isRememberMe} onChange={handleRemeberMe} value="rememberMeCheckbox">
                <CheckboxIndicator mr="$2">
                    <CheckboxIcon color={Colors.TEXT} as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel color="$white">Remember Me?</CheckboxLabel>
            </Checkbox>
        </VStack>
    );
}

export default LoginBlock;