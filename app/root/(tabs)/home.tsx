import UncontrolledSelectBox from "@/components/FormInputs/Uncontrolled/UncontrolledSelectBox";
import LinearGradientBackground from "@/components/LinearGradientBackground";
import MainContainer from "@/components/MainContainer";
import { Colors } from "@/enum/Colors";
import { Text, Center, Heading, Divider, ButtonText, Button, Card, VStack, HStack, Box, RefreshControl, ScrollView } from "@gluestack-ui/themed";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ScrollableList from "@/components/Lists/ScrollableList";
import { orderData } from "@/enum/Mockdata";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddOrderModal from "@/components/Modals/AddOrderModal";
import { formatDate } from "@/utils/data";
import { usePathname, useRouter } from "expo-router";
import HomeEventCard from "@/components/HomeEventCard";

export default function Home(props: any) {
  const { sessionInfo } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [orderData, setOrderData] = useState([]);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);

  const getOrderData = async () => {
    const orders = await AsyncStorage.getItem("orders");
    if (orders) {
      setOrderData(JSON.parse(orders));
    } else {
      setOrderData([])
    }
  }

  const handleCreateOrder = async (selectedOrderType: any) => {
    console.log({ selectedOrderType })
    const orderId = 24000000 + orderData.length + 1;
    const newOrder = {
      id: orderId,
      orderTypeId: selectedOrderType.id,
      orderType: selectedOrderType.name,
      date: new Date().toISOString(),
    }
    const newOrders = [...orderData, newOrder];
    setOrderData(newOrders);
    await AsyncStorage.setItem("orders", JSON.stringify(newOrders));
    setShowAddOrderModal(false);
  }

  const handleClearOrderData = async () => {
    await AsyncStorage.removeItem("orders");
    getOrderData();
  }

  useEffect(() => {
    getOrderData();
  }, []);

  const orders = orderData;

  const renderOrderItem = (order: any) => {
    return (
      <VStack>
        <Text size="2xl" color={Colors.TEXT}>{order.orderType}</Text>
        <HStack>
          <Text size="xl" italic color={Colors.TEXT}>Order # {order.id}</Text>
        </HStack>
      </VStack>
    )
  }

  const handlePressItem = (item: any) => {
    const route = `root/Order/${item.id}`
    router.push({ pathname: route })
  }

  return (
    <MainContainer isPadding={false}>
      <ScrollView paddingHorizontal="$3" paddingVertical="$4" >
        <VStack flex={1} space="xl">
          <HomeEventCard />
          <HomeEventCard title="Bonfire & Jam" uri="https://registrations-production.s3.amazonaws.com/uploads/event/logo/2537421/medium_image-1727707265726.png"/>
          <HomeEventCard title="Trunk or Treat" uri="https://static.wixstatic.com/media/8cbf38_d014597947e64521af268c71626dd49b~mv2.jpg/v1/fill/w_454,h_256,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Trunk%20or%20Treat.jpg" />
        </VStack>
        <Box marginBottom="$24"/>
      </ScrollView>
    </MainContainer >
  );
}
