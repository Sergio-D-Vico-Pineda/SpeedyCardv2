import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useCardContext } from './CardContext';
import { BusinessCardData } from './types';

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    layout: {
      primaryColor: '#1a365d',
      font: 'Inter-Regular',
      textAlignment: 'center' as const,
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    layout: {
      primaryColor: '#2d3748',
      font: 'Roboto-Regular',
      textAlignment: 'left' as const,
    },
  },
  {
    id: 'elegant',
    name: 'Elegant',
    layout: {
      primaryColor: '#744210',
      font: 'PlayfairDisplay-Regular',
      textAlignment: 'right' as const,
    },
  },
];

export function BusinessCardTemplate() {
  const { updateCardData } = useCardContext();

  const applyTemplate = (template: typeof templates[0]) => {
    updateCardData((prev: BusinessCardData) => {
      return {
        ...prev,
        ...template.layout,
      };
    });
  };

  return (
    <ScrollView horizontal style={styles.container}>
      {templates.map((template) => (
        <TouchableOpacity
          key={template.id}
          style={styles.templateButton}
          onPress={() => applyTemplate(template)}
        >
          <View
            style={[
              styles.templatePreview,
              { backgroundColor: template.layout.primaryColor },
            ]}
          >
            <Text style={[styles.templateName, { fontFamily: template.layout.font }]}>
              {template.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    height: 120,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  templateButton: {
    marginRight: 16,
  },
  templatePreview: {
    width: 160,
    height: 100,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});