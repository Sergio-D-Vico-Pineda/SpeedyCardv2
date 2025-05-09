import { Stack } from "expo-router";

export default function ShareLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: 'Share' }} />
        </Stack>
    );
}