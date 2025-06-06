import { router, Tabs } from 'expo-router';
import { Edit, Save } from 'lucide-react-native';
import { useCardContext } from '@/contexts/CardContext';
import { TouchableOpacity } from 'react-native';

export default function CardsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, animation: 'fade', tabBarHideOnKeyboard: true }}>
      <Tabs.Screen name="index" options={{ title: 'Edit', tabBarIcon: ({ color, size }) => <Edit color={color} size={size} /> }} />
      <Tabs.Screen
        name="save"
        options={{
          title: 'Save',
          tabBarIcon: ({ color, size }) => <Save color={color} size={size} />,
          tabBarButton: (props) => {
            const { cardData } = useCardContext();
            const canSave = Boolean(cardData.tname && cardData.tname.trim().length > 0);

            function gotosave() {
              router.push("/(tabs)/(cards)/save")
            }

            return (
              <TouchableOpacity disabled={!canSave} style={[props.style, { opacity: canSave ? 1 : 0.5 }]} onPress={gotosave}>
                {props.children}
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tabs>
  );
}