import { Tabs } from "expo-router";

export default function ShareLayout() {
    return (
        <Tabs screenOptions={{ headerStyle: { backgroundColor: '#fff' } }}>
            <Tabs.Screen name="index" options={{ headerShown: false, title: 'Share' }} />
        </Tabs>
    );
}