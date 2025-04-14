import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(cards)" options={{ headerShown: true }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
    </Stack>
  );
}
