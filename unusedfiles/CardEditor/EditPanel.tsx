import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Type, AlignLeft, AlignCenter, AlignRight, Minus, Plus } from 'lucide-react-native';

const FONT_FAMILIES = [
  { id: 'inter', name: 'Inter', value: 'Inter-Regular' },
  { id: 'inter-bold', name: 'Inter Bold', value: 'Inter-Bold' },
  { id: 'roboto', name: 'Roboto', value: 'Roboto-Regular' },
  { id: 'roboto-medium', name: 'Roboto Medium', value: 'Roboto-Medium' },
];

const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 36, 42];

type TextAlignment = 'left' | 'center' | 'right';

type EditPanelProps = {
  element: {
    content: string;
    fontFamily: string;
    fontSize: number;
    textAlign: TextAlignment;
  };
  onUpdate: (updates: Partial<EditPanelProps['element']>) => void;
};

export default function EditPanel({ element, onUpdate }: EditPanelProps) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.section}>
        <View style={styles.inputContainer}>
          <Type size={16} color="#8E8E93" />
          <TextInput
            value={element.content}
            onChangeText={(text) => onUpdate({ content: text })}
            style={styles.input}
            placeholder="Enter text"
          />
        </View>
      </ScrollView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.fontList}>
            {FONT_FAMILIES.map((font) => (
              <Pressable
                key={font.id}
                style={[
                  styles.fontButton,
                  element.fontFamily === font.value && styles.fontButtonActive,
                ]}
                onPress={() => onUpdate({ fontFamily: font.value })}>
                <Text
                  style={[
                    styles.fontButtonText,
                    { fontFamily: font.value },
                    element.fontFamily === font.value && styles.fontButtonTextActive,
                  ]}>
                  {font.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size</Text>
        <View style={styles.sizeControls}>
          <Pressable
            style={styles.sizeButton}
            onPress={() => {
              const currentIndex = FONT_SIZES.indexOf(element.fontSize);
              if (currentIndex > 0) {
                onUpdate({ fontSize: FONT_SIZES[currentIndex - 1] });
              }
            }}>
            <Minus size={20} color="#007AFF" />
          </Pressable>
          <Text style={styles.sizeText}>{element.fontSize}px</Text>
          <Pressable
            style={styles.sizeButton}
            onPress={() => {
              const currentIndex = FONT_SIZES.indexOf(element.fontSize);
              if (currentIndex < FONT_SIZES.length - 1) {
                onUpdate({ fontSize: FONT_SIZES[currentIndex + 1] });
              }
            }}>
            <Plus size={20} color="#007AFF" />
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alignment</Text>
        <View style={styles.alignmentControls}>
          <Pressable
            style={[
              styles.alignButton,
              element.textAlign === 'left' && styles.alignButtonActive,
            ]}
            onPress={() => onUpdate({ textAlign: 'left' })}>
            <AlignLeft size={20} color={element.textAlign === 'left' ? '#FFFFFF' : '#007AFF'} />
          </Pressable>
          <Pressable
            style={[
              styles.alignButton,
              element.textAlign === 'center' && styles.alignButtonActive,
            ]}
            onPress={() => onUpdate({ textAlign: 'center' })}>
            <AlignCenter size={20} color={element.textAlign === 'center' ? '#FFFFFF' : '#007AFF'} />
          </Pressable>
          <Pressable
            style={[
              styles.alignButton,
              element.textAlign === 'right' && styles.alignButtonActive,
            ]}
            onPress={() => onUpdate({ textAlign: 'right' })}>
            <AlignRight size={20} color={element.textAlign === 'right' ? '#FFFFFF' : '#007AFF'} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
    minWidth: 200,
  },
  fontList: {
    flexDirection: 'row',
    gap: 8,
  },
  fontButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#F2F2F7',
  },
  fontButtonActive: {
    backgroundColor: '#007AFF',
  },
  fontButtonText: {
    fontSize: 14,
    color: '#000000',
  },
  fontButtonTextActive: {
    color: '#FFFFFF',
  },
  sizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sizeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
    minWidth: 48,
    textAlign: 'center',
  },
  alignmentControls: {
    flexDirection: 'row',
    gap: 8,
  },
  alignButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignButtonActive: {
    backgroundColor: '#007AFF',
  },
});