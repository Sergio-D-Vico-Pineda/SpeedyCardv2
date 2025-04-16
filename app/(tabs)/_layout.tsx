import { Tabs } from "expo-router";
import { CreditCard, Settings, Plus, Info, ShoppingCart, DollarSignIcon } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#ffd33d", animation: 'shift' }}>
      <Tabs.Screen name="index" options={{ headerShown: false, title: 'My cards', tabBarIcon: ({ color, size }) => <CreditCard size={size} color={color} /> }} />
      <Tabs.Screen name="(cards)" options={{ headerShown: false, title: 'Create card', tabBarIcon: ({ color, size }) => <Plus size={size} color={color} /> }} />
      <Tabs.Screen name="marketplace" options={{ headerShown: false, title: 'Marketplace', tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} /> }} />
      <Tabs.Screen name="template/[id]" options={{ headerShown: false, title: 'Buy', tabBarIcon: ({ color, size }) => <DollarSignIcon size={size} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ headerShown: false, title: 'Settings', tabBarIcon: ({ color, size }) => <Settings size={size} color={color} /> }} />
      <Tabs.Screen name="about" options={{ headerShown: false, title: 'About', tabBarIcon: ({ color, size }) => <Info size={size} color={color} /> }} />
    </Tabs>
  );
}
