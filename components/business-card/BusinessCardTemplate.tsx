import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useCardContext } from '@/contexts/CardContext';
import { MyCardData, bgcolors } from '@/types';

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    layout: {
      bgcolor: bgcolors[5],
      font: 'Inter-Regular',
      align: 'center' as const,
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    layout: {
      bgcolor: bgcolors[2],
      font: 'Roboto-Regular',
      align: 'left' as const,
    },
  },
  {
    id: 'elegant',
    name: 'Elegant',
    layout: {
      bgcolor: bgcolors[14],
      font: 'PlayfairDisplay-Regular',
      align: 'right' as const,
    },
  },
];

export function BusinessCardTemplate() {
  const { updateCardData } = useCardContext();

  const applyTemplate = (template: typeof templates[0]) => {
    updateCardData(template.layout as MyCardData);
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
              { backgroundColor: template.layout.bgcolor },
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