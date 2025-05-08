import { Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type CardElementProps = {
  id: string;
  type: 'text' | 'image' | 'qr';
  content: string;
  initialPosition: { x: number; y: number };
  style?: {
    fontFamily?: string;
    fontSize?: number;
    textAlign?: 'left' | 'center' | 'right';
  };
  isSelected?: boolean;
  onSelect?: () => void;
  onUpdate: (position: { x: number; y: number }) => void;
};

export default function CardElement({
  content,
  initialPosition,
  style = {},
  isSelected,
  onSelect,
  onUpdate,
}: CardElementProps) {
  const translateX = useSharedValue(initialPosition.x);
  const translateY = useSharedValue(initialPosition.y);
  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = context.value.x + event.translationX;
      translateY.value = context.value.y + event.translationY;
    })
    .onEnd(() => {
      onUpdate({ x: translateX.value, y: translateY.value });
    });

  const tap = Gesture.Tap().onEnd(() => {
    if (onSelect) onSelect();
  });

  const composed = Gesture.Simultaneous(gesture, tap);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(translateX.value) },
        { translateY: withSpring(translateY.value) },
      ],
    };
  });

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.element, isSelected && styles.selected, animatedStyle]}>
        <Text
          style={[
            styles.elementText,
            {
              fontFamily: style.fontFamily || 'Inter-Regular',
              fontSize: style.fontSize || 14,
              textAlign: style.textAlign || 'left',
            },
          ]}>
          {content}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  element: {
    position: 'absolute',
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  selected: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  elementText: {
    color: '#000000',
  },
});