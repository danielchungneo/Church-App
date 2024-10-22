

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";
import { Stack, Tabs, router, useLocalSearchParams, usePathname } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Colors } from "@/enum/Colors";
import { defaultHeaderOptions } from "@/enum/ScreenOptions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import OrderHomeScreen from ".";

export default function AppLayout() {
    const pathname = usePathname();
    const params = useLocalSearchParams()
    const { orderId } = params;

    const [orderDetails, setOrderDetails] = useState({})

    console.log("orderId", orderId)

    const Drawer = createDrawerNavigator();


    const drawerHeaderStyles = {
        headerStyle: {
            backgroundColor: Colors.SECONDARY,
        }
    }

    // Call to get Orders
    const getOrderData = async () => {
        const results = await AsyncStorage.getItem("orders");
        if (results) {
            const orders = JSON.parse(results);
            console.log("orders", orders)
            const foundOrder = orders.find((order: any) => {
                return order.id.toString() === orderId
            })
            setOrderDetails(foundOrder)
        }
    }

    const formDataOptions = [
        {
            orderTypeId: 1,
            formSections: [
                { id: 1, name: "Exterior" },
                { id: 2, name: "Interior" }
            ]
        },
        {
            orderTypeId: 2,
            formSections: [
                { id: 1, name: "Exterior" }
            ]
        }
    ]

    const selectedFormData = formDataOptions.find((formDataOptions: any) => {
        return formDataOptions.orderTypeId === orderDetails?.orderTypeId
    })

    console.log("selectedFormData", selectedFormData)
    console.log("order", orderDetails)
    useEffect(() => {
        getOrderData()
    }, [])



    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer.Navigator initialRouteName="Home" screenOptions={{
                ...drawerHeaderStyles,
            }}>
                <Drawer.Screen options={{
                    headerTitleStyle: {
                        color: Colors.TEXT,
                    },
                }} name="Home" component={OrderHomeScreen} />
                {selectedFormData?.formSections?.map((section: any) => {
                    return (
                        <Drawer.Screen name={section.name} component={OrderHomeScreen} />

                    )
                })}
                <Drawer.Screen name="Summary" component={OrderHomeScreen} />
            </Drawer.Navigator>
        </GestureHandlerRootView >
    );
}
