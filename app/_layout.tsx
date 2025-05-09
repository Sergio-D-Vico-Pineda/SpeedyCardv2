import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/AuthContext";
import { CardProvider } from '@/contexts/CardContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { StrictMode } from "react";
import ToastNotification from '@/components/ToastNotification';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <StrictMode>
      <AuthProvider>
        <CardProvider>
          <ToastProvider>
            <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#25292e' } }}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
            </Stack>
            <ToastNotification />
          </ToastProvider>
        </CardProvider>
      </AuthProvider>
    </StrictMode>
  );
}
