import StyledInputField from "@/components/FormInputs/StyledInputs/StyledInputField";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Box, Button, ButtonText, Center, HStack, Heading, Icon, KeyboardAvoidingView, LinearGradient, SafeAreaView, ScrollView, Text, VStack, set, useToast } from "@gluestack-ui/themed";
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useAuth } from "@/context/AuthContext";
import useCrudRequest from "@/hooks/useCrudRequest";
import api from "@/constants/api";
import { Colors } from "@/enum/Colors";
import LinearGradientBackground from "@/components/LinearGradientBackground";


const LogoBlock = () => {
    return (
        <HStack flex={0} justifyContent="space-between" alignItems="center" mt={"$16"} space="md">
            <Center h={"$32"} w={"$32"} bg="$white" borderRadius={"$3xl"} backgroundColor={'rgba(255, 255, 255, 0.4)'} >
                <AntDesign name="API" size={75} color="black" />
            </Center>
            <Center flex={1}>
                <Text color="white" size="4xl" textAlign="center">QN-AI</Text>
                <Text color="white" italic size="sm" textAlign="center">I mean, who even needs QA's</Text>
            </Center>
        </HStack>
    )
}

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isInvalidPasswords, setIsInvalidPasswords] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        data: registerData,
        loadingRegister,
        submitRequest: registerUser,
    } = useCrudRequest(api.users.create(), {
        onSuccess,
        onError,
    });

    const {
        data,
        loading,
        errors,
        submitRequest: submitForm,
    } = useCrudRequest(api.session.login(), {
        onSuccess: onLoginSuccess,
    });

    const auth = useAuth()
    const { handleLoginSuccess } = auth

    async function onLoginSuccess(data: any) {
        await handleLoginSuccess(data);
        await AsyncStorage.setItem("lastUser", JSON.stringify({ email, password }));
        if (!data?.firstName) {
            router.push("/root/Onboarding")
          } else {
            router.push({ pathname: "/root/home" });
          }
    };

    function onSuccess(data: any) {
        submitForm({ email, password, loginTenantId: 1 });
    }

    function onError(errors: any) {

        Toast.show({
            type: 'error',
            text1: 'Error Saving Entry',
            text2: errors[0].Message,
        });
    }

    const handleRegisterUser = async (email: string, password: string) => {
        const results = {
            username: email,
            email,
            password,
            loginTenantId: 1, // For now all who register are going to register under the same tenant
        }
        registerUser(results);
        // setActiveUser(signInObject);
    }

    function validateEmail(email: string) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validatePassword(password: string) {
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return re.test(password);
    }

    const validateSignUp = () => {
        if (email.length === 0 || !validateEmail(email)) {
            setIsInvalidEmail(true)
            setErrorMessage("Please enter a valid email address");
            return false;
        }
        else {
            setIsInvalidEmail(false)
        }
        if (!validatePassword(password)) {
            setIsInvalidPasswords(true);
            setErrorMessage("Password must be between 6-16 characters and contain at least one number and one special character")
            return false;
        } else if (password !== confirmPassword) {
            setIsInvalidPasswords(true);
            setErrorMessage("Passwords do not match");
            return false;
        }
        else {
            setIsInvalidPasswords(false)
        }
        setErrorMessage("")
        return true;
    }

    const handleSignUp = async () => {
        if (validateSignUp()) {
            handleRegisterUser(email, password);
        }
    }

    const handleEmailChange = (text: string) => {
        setEmail(text);
    }

    const handleChangePassword = (text: string) => {
        setPassword(text);
    }

    const handleChangeConfirmPassword = (text: string) => {
        setConfirmPassword(text);
    }

    const isLoading = loading || loadingRegister;


    return (
        <Box flex={1}>
            <LinearGradientBackground>
                <SafeAreaView flex={1} padding={20}>
                    <KeyboardAvoidingView flex={1} behavior="padding">
                        <ScrollView bounces={false}>
                            <Box flex={1} paddingHorizontal={"$5"} justifyContent="center" alignItems="center">
                                <VStack space="md" flex={1} w={"$full"}>
                                    <LogoBlock />
                                    <Center mt={"$16"}>
                                        <Text color="$white" size="3xl" bold>Sign Up</Text>
                                    </Center>
                                    <VStack space="md" mt={"$16"}>
                                        <StyledInputField iconName={"user"} placeholderText={"Email"} value={email} onChange={handleEmailChange} isInvalid={isInvalidEmail} />
                                        <StyledInputField iconName={"key"} placeholderText={"Password"} value={password} fieldType="password" isInvalid={isInvalidPasswords} onChange={handleChangePassword} />
                                        <StyledInputField iconName={"key"} placeholderText={"Confirm Password"} value={confirmPassword} fieldType="password" isInvalid={isInvalidPasswords} onChange={handleChangeConfirmPassword} />
                                    </VStack>
                                    {errorMessage.length > 0 && (
                                        <HStack space="sm" bg="rgba(255, 255, 255, 0.7)" p="$4" rounded="$md" justifyContent="center" alignItems="center">
                                            <Ionicons name="alert-circle" color={"red"} size={20} />
                                            <Text color={"$red500"}>{errorMessage}</Text>
                                        </HStack>
                                    )}
                                    <Button  h={"$12"} width={"$full"} borderRadius={"$full"} onPress={handleSignUp} mt={"$2"}>
                                        <ButtonText color={Colors.TEXT}>{loading ? "Loading..." : "Sign Up"}</ButtonText>
                                    </Button>
                                    <Box alignItems="center">
                                        <Text color="$white" mt={"$2"} >
                                            Already have an account? <Text color={"$white"} underline>
                                                <Link href="/">
                                                    Login
                                                </Link>
                                            </Text>
                                        </Text>
                                    </Box>
                                </VStack>
                            </Box>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradientBackground>
        </Box >
    )
}

export default SignUp;