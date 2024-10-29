import UncontrolledSelectBox from "@/components/FormInputs/Uncontrolled/UncontrolledSelectBox";
import LinearGradientBackground from "@/components/LinearGradientBackground";
import MainContainer from "@/components/MainContainer";
import { Colors } from "@/enum/Colors";
import { Text, Center, Heading, Divider, ButtonText, Button, Card, VStack, HStack, Box, RefreshControl, ScrollView, Image } from "@gluestack-ui/themed";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ScrollableList from "@/components/Lists/ScrollableList";
import { orderData } from "@/enum/Mockdata";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddOrderModal from "@/components/Modals/AddOrderModal";
import { formatDate } from "@/utils/data";
import { usePathname, useRouter } from "expo-router";
import HomeEventCard from "@/components/HomeEventCard";
import { Linking, useWindowDimensions } from "react-native";
import LogoBlock from "@/components/LoginScreenComponents/LogoBlock";

export default function Home(props: any) {

  const { height, width } = useWindowDimensions();

  const pictureDimensions = height * .2;

  const handleWatchOnline = () => {
    Linking.openURL("https://www.youtube.com/@goodnazlive2356/streams")
  }

  return (
    <MainContainer isPadding={false}>
      <ScrollView bounces={false}>
        <VStack flex={1} height="$full" space="xs" backgroundColor="rgba(83, 130, 176, .8)">
          <HStack flex={0} justifyContent="space-between" alignItems="center" space="md" >
            <Box flex={2} alignItems="flex-end">
              <Center h={"$32"} w={"$32"} borderRadius={"$3xl"} >
                <Box flex={1} justifyContent="center" height alignItems="center" width="$full">
                  <Image alt="logo" width="85%" height="85%" source={require('@/assets/images/good-naz-logo.png')} />
                </Box>
              </Center>
            </Box>
            <Center flex={3}>
              <Text color="white" size="3xl" textAlign="center">GoodNaz</Text>
              <Text color="white" italic size="sm" textAlign="center">Goodlettsville, TN</Text>
            </Center>
          </HStack>
          <Box paddingBottom="$4">
            <Text textAlign="center" italic fontSize="$xl" color={Colors.WHITE}>
              Learning to Love God and One Another
            </Text>
          </Box>
        </VStack>
        <VStack mt="$4" paddingHorizontal="$2">
          <VStack space="sm" p="$4" backgroundColor="rgba(83, 130, 176, 1)" borderRadius="$3xl" shadowOpacity={.4} shadowRadius={2} shadowOffset={{ height: 5, width: 0 }}>
            <Box>
              <Text color={Colors.WHITE} bold fontSize="$2xl">
                Sunday Services:
              </Text>
            </Box>
            <VStack space="xs">
              <HStack justifyContent="space-between">
                <Text color={Colors.WHITE} fontSize="$lg">
                  Connect Groups
                </Text>
                <Text color={Colors.WHITE} fontSize="$lg" bold>
                  9:00am
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color={Colors.WHITE} fontSize="$lg">
                  Worship Service
                </Text>
                <Text color={Colors.WHITE} fontSize="$lg" bold>
                  10:00am
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text color={Colors.WHITE} fontSize="$lg">
                  Spanish Speaking Service
                </Text>
                <Text color={Colors.WHITE} fontSize="$lg" bold>
                  2:00pm
                </Text>
              </HStack>
              <Button mt="$2" variant="outline" borderColor="white" borderWidth={3} onPress={handleWatchOnline}>
                <Text color="white" >
                  Watch Online
                </Text>
              </Button>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </MainContainer >
  );
}
