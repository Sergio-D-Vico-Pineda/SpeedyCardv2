import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Marketplace' }} />
      <Stack.Screen name="template/[id]" options={{ headerShown: false, title: 'Buy' }} />
    </Stack>);
}
