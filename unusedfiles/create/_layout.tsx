import { Stack } from 'expo-router';

export default function CreateLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="[templateId]"
        options={{
          presentation: 'modal',
          headerTitle: 'Customize Template',
        }}
      />
      <Stack.Screen
        name="blank"
        options={{
          presentation: 'modal',
          headerTitle: 'Create New Card',
        }}
      />
    </Stack>
  );
}