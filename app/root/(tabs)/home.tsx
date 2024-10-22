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
    <MainContainer>
      <AddOrderModal showModal={showAddOrderModal} setShowModal={setShowAddOrderModal} handleCreateOrder={handleCreateOrder} />
      <VStack flex={1} space="lg">
        <Box flex={1}>
          <ScrollableList
            idName="id"
            options={orders}
            isSearchable
            handleAddItem={() => setShowAddOrderModal(true)}
            listName="Orders"
            placeHolderText="Search Order"
            renderTextComponent={renderOrderItem}
            nameField="id"
            handlePress={handlePressItem}
          />
        </Box>
        <Box>
          <Button action="negative" onPress={() => handleClearOrderData()}>
            <ButtonText>
              Clear Order Data
            </ButtonText>
          </Button>
        </Box>
      </VStack>
    </MainContainer >
  );
}
