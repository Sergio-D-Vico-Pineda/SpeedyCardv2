import { Tabs } from "expo-router";
import { CreditCard, Settings, Plus, ShoppingCart, IdCard } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, animation: 'shift', tabBarHideOnKeyboard: true, headerStyle: { backgroundColor: '#fff' } }}>
      <Tabs.Screen name="index" options={{ headerShown: false, title: 'My cards', tabBarIcon: ({ color, size }) => <CreditCard size={size} color={color} /> }} />
      <Tabs.Screen name="savedcards" options={{ headerShown: false, title: 'Saved Cards', tabBarIcon: ({ color, size }) => <IdCard size={size} color={color} /> }} />
      <Tabs.Screen name="(cards)" options={{ tabBarActiveTintColor: "#eab506", headerShown: false, title: 'Create card', tabBarIcon: ({ color, size }) => <Plus size={size} color={color} /> }} />
      <Tabs.Screen name="(market)" options={{ headerShown: false, title: 'Marketplace', tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ headerShown: false, title: 'Settings', tabBarIcon: ({ color, size }) => <Settings size={size} color={color} /> }} />
      <Tabs.Screen name="(share)" options={{ href: null }} />
    </Tabs>
  );
}
