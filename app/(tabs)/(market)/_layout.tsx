import { Stack } from "expo-router";
import { MarketProvider } from "@/contexts/MarketContext";

export default function MarketLayout() {
  return (
    <MarketProvider>
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#fff' } }}>
        <Stack.Screen name="index" options={{ headerShown: false, title: 'Marketplace' }} />
        <Stack.Screen name="template/[id]" options={{ headerShown: false, title: 'Buy' }} />
      </Stack>
    </MarketProvider>
  );
}
