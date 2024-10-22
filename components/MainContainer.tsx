import { Colors } from "@/enum/Colors";
import { Box, RefreshControl, ScrollView } from "@gluestack-ui/themed";
import LoadingIndicator from "./LoadingIndicator";

type MainContainerProps = {
    children?: React.ReactNode;
    scroll?: boolean;
    onRefresh?: () => void;
    isRefreshing?: boolean;
    isPadding?: boolean;
    fullheight?: boolean;
    loading?: boolean;
    style?: any;
};

function MainContainer({ children, scroll = false, onRefresh = undefined, isRefreshing, isPadding = true, loading, style }: MainContainerProps) {
    if (loading) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center" bg={Colors.PRIMARY}>
                <LoadingIndicator />
            </Box>
        )
    }
    return (
        <ScrollView
            scrollEnabled={scroll}
            bounces={onRefresh ? true : false}
            contentContainerStyle={{ flex: 1, flexGrow: 1 }}
            backgroundColor={Colors.PRIMARY}
            showsVerticalScrollIndicator={false}
            p={isPadding ? "$4" : 0}
            refreshControl={onRefresh &&
                <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            style={style}
        >
            {children}
        </ScrollView>
    );
}

export default MainContainer;