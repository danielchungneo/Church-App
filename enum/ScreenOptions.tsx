import BackButton from "@/components/HeaderComponents/BackButton";
import { Colors } from "./Colors";

export const defaultHeaderOptions = {
    headerStyle: {
      backgroundColor: Colors.SECONDARY,
    },
    headerLeft: () => <BackButton />,  
  }