import { useAuth } from "@/contexts/AuthContext";
import { useCards } from "@/hooks/useCards";
import { router, Tabs } from "expo-router";
import { CreditCard, Settings, Plus, ShoppingCart, IdCard } from 'lucide-react-native';
import { TouchableOpacity } from "react-native";

function getPlanLimit(plan: string | undefined): string {
  switch (plan) {
    case 'Free':
      return '3';
    case 'Pro':
      return '10';
    case 'Premium':
      return '20';
    case 'Ultimate':
      return '∞';
    default:
      return 'Error';
  }
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, animation: 'shift', tabBarHideOnKeyboard: true }}>
      <Tabs.Screen name="index" options={{ headerShown: false, title: 'My cards', tabBarIcon: ({ color, size }) => <CreditCard size={size} color={color} /> }} />
      <Tabs.Screen name="savedcards" options={{ headerShown: false, title: 'Saved Cards', tabBarIcon: ({ color, size }) => <IdCard size={size} color={color} /> }} />
      <Tabs.Screen name="(cards)"
        options={{
          tabBarActiveTintColor: "#eab506",
          headerShown: false,
          title: 'Create card',
          tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
          tabBarButton: (props) => {
            const { userData } = useAuth();
            const { cards } = useCards();

            function handlGo() {
              router.push("/(tabs)/(cards)");
            }

            return (
              <TouchableOpacity
                disabled={cards.length >= Number(getPlanLimit(userData?.plan))}
                style={[props.style, cards.length >= Number(getPlanLimit(userData?.plan)) && { opacity: 0.5 }]}
                onPress={handlGo}
              >
                {props.children}
              </TouchableOpacity>
            );

          }
        }}
      />
      <Tabs.Screen name="(market)" options={{ headerShown: false, title: 'Marketplace', tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ headerShown: false, title: 'Settings', tabBarIcon: ({ color, size }) => <Settings size={size} color={color} /> }} />
      <Tabs.Screen name="(share)" options={{ href: null }} />
    </Tabs>
  );
}
