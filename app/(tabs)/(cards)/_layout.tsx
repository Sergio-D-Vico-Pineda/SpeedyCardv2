import { Tabs } from 'expo-router';
import { CardProvider } from '@/components/business-card/CardContext';
import { Edit2, CreditCard, Layout, Save } from 'lucide-react-native';

export default function CardsLayout() {
  return (
    <CardProvider>
      <Tabs screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Edit',
            tabBarIcon: ({ color, size }) => <Edit2 color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="preview"
          options={{
            title: 'Preview',
            tabBarIcon: ({ color, size }) => <CreditCard color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="templates"
          options={{
            title: 'Templates',
            tabBarIcon: ({ color, size }) => <Layout color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="save"
          options={{
            title: 'Save',
            tabBarIcon: ({ color, size }) => <Save color={color} size={size} />,
          }}
        />
      </Tabs>
    </CardProvider>
  );
}