import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#fff' } }}>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Marketplace' }} />
      <Stack.Screen name="template/[id]" options={{ headerShown: false, title: 'Buy' }} />
    </Stack>);
}
