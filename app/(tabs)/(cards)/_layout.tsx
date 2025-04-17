import { Tabs } from 'expo-router';
import { CardProvider } from '@/contexts/CardContext';
import { Edit, Layout, Save } from 'lucide-react-native';

export default function CardsLayout() {
  return (
    <CardProvider>
      <Tabs screenOptions={{ headerShown: false, animation: 'fade', tabBarHideOnKeyboard: true }}>
        <Tabs.Screen name="index" options={{ title: 'Edit', tabBarIcon: ({ color, size }) => <Edit color={color} size={size} /> }} />
        <Tabs.Screen name="templates" options={{ title: 'Templates', tabBarIcon: ({ color, size }) => <Layout color={color} size={size} /> }} />
        <Tabs.Screen name="save" options={{ title: 'Save', tabBarIcon: ({ color, size }) => <Save color={color} size={size} /> }} />
      </Tabs>
    </CardProvider>
  );
}