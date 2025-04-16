import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/AuthContext";
import { CardProvider } from '@/contexts/CardContext';
import { DeepLinkHandler } from '@/components/DeepLinkHandler';

export default function RootLayout() {
  return (
    <AuthProvider>
      <CardProvider>
        <DeepLinkHandler />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
        </Stack>
      </CardProvider>
    </AuthProvider>
  );
}
