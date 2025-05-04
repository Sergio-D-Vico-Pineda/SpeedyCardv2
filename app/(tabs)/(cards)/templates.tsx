import { View, StyleSheet, ScrollView, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { bgcolors, fonts, MyCardData } from '@/types';
import { useCardContext } from '@/contexts/CardContext';

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    layout: {
      bgcolor: bgcolors[5],
      font: fonts[0],
      align: 'center' as const,
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    layout: {
      bgcolor: bgcolors[2],
      font: fonts[3],
      align: 'left' as const,
    },
  },
  {
    id: 'elegant',
    name: 'Elegant',
    layout: {
      bgcolor: bgcolors[14],
      font: fonts[6],
      align: 'right' as const,
    },
  },
];

const cardStyles = [
  {
    id: 'default',
    layout: {
      bgcolor: bgcolors[5],
      font: fonts[0],
      align: 'center' as const,
    },
  },
  {
    id: 'modern',
    layout: {
      bgcolor: bgcolors[2],
      font: fonts[3],
      align: 'left' as const,
    },
  },
  {
    id: 'minimalist',
    layout: {
      bgcolor: bgcolors[14],
      font: fonts[6],
      align: 'right' as const,
    }
  }
]

export default function TemplatesScreen() {
  const { updateCardData } = useCardContext();

  /* const applyTemplate = (template: typeof templates[0]) => {
    updateCardData(template.layout as MyCardData);
  }; */

  const applyStyle = (style: string) => {
    updateCardData({ style } as MyCardData);
  };

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.container}>
        {cardStyles.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={styles.templateButton}
            onPress={() => applyStyle(template.id)}
          >
            <View
              style={[
                styles.templatePreview,
                { backgroundColor: template.layout.bgcolor },
              ]}
            >
              <Text style={[styles.templateName, { fontFamily: template.layout.font }]}>
                {template.id}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 'auto',
    flexGrow: 0,
    height: 330,
    // paddingHorizontal: 16,
    // backgroundColor: '#000',
    // marginBottom: 14,
  },
  templateButton: {
    // marginRight: 16,
    marginBottom: 16,
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