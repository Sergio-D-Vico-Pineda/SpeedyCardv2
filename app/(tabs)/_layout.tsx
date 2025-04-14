import { Tabs } from "expo-router";
import { Plus } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#ffd33d" }}>
      <Tabs.Screen name="index" options={{ headerShown: true, title: 'Home' }} />
      <Tabs.Screen name="mycards" options={{ title: 'My cards' }} />
      <Tabs.Screen name="(create)" options={{ title: 'Create card' }} />
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}
