import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Type, Image as ImageIcon, QrCode, ChevronLeft } from 'lucide-react-native';
import BusinessCard from '@/components/CardEditor/BusinessCard';
import CardElement from '@/components/CardEditor/CardElement';
import EditPanel from '@/components/CardEditor/EditPanel';

type Element = {
  id: string;
  type: 'text' | 'image' | 'qr';
  content: string;
  position: { x: number; y: number };
  style?: {
    fontFamily: string;
    fontSize: number;
    textAlign: 'left' | 'center' | 'right';
  };
};

const TEMPLATES = {
  'tech-minimal': {
    name: 'Minimal Tech',
    orientation: 'landscape' as const,
    elements: [
      {
        id: '1',
        type: 'text' as const,
        content: 'John Doe',
        position: { x: 20, y: 20 },
        style: {
          fontFamily: 'Inter-Bold',
          fontSize: 24,
          textAlign: 'left',
        },
      },
      {
        id: '2',
        type: 'text' as const,
        content: 'Software Engineer',
        position: { x: 20, y: 50 },
        style: {
          fontFamily: 'Inter-Regular',
          fontSize: 16,
          textAlign: 'left',
        },
      },
      {
        id: '3',
        type: 'text' as const,
        content: 'contact@johndoe.com',
        position: { x: 20, y: 80 },
        style: {
          fontFamily: 'Roboto-Regular',
          fontSize: 14,
          textAlign: 'left',
        },
      },
    ],
  },
  'tech-bold': {
    name: 'Bold Innovation',
    orientation: 'landscape' as const,
    elements: [
      {
        id: '1',
        type: 'text' as const,
        content: 'Sarah Smith',
        position: { x: 20, y: 20 },
        style: {
          fontFamily: 'Inter-Bold',
          fontSize: 28,
          textAlign: 'left',
        },
      },
      {
        id: '2',
        type: 'text' as const,
        content: 'Product Designer',
        position: { x: 20, y: 55 },
        style: {
          fontFamily: 'Inter-Regular',
          fontSize: 18,
          textAlign: 'left',
        },
      },
      {
        id: '3',
        type: 'text' as const,
        content: 'hello@sarahsmith.design',
        position: { x: 20, y: 85 },
        style: {
          fontFamily: 'Roboto-Regular',
          fontSize: 14,
          textAlign: 'left',
        },
      },
    ],
  },
};

export default function TemplateScreen() {
  const { templateId } = useLocalSearchParams<{ templateId: keyof typeof TEMPLATES }>();
  const template = TEMPLATES[templateId];

  const [elements, setElements] = useState<Element[]>(template.elements as Element[]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const handleElementUpdate = (id: string, position: { x: number; y: number }) => {
    setElements(current =>
      current.map(element =>
        element.id === id ? { ...element, position } : element
      )
    );
  };

  const handleStyleUpdate = (updates: Partial<Element['style']>) => {
    if (!selectedElement) return;

    setElements((current) =>
      current.map(element =>
        element.id === selectedElement.id
          ? {
            ...element,
            style: { ...element.style, ...updates },
            content: element.content,
          }
          : element
      ) as Element[]
    );
  };

  const handleSave = async () => {
    // TODO: Save to Supabase
    router.back();
  };

  if (!template) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Template not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#007AFF" />
          <Text style={styles.backText}>Templates</Text>
        </Pressable>
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <Check size={24} color="#FFFFFF" />
          <Text style={styles.saveText}>Save Card</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.cardWrapper}>
          <BusinessCard orientation={template.orientation}>
            {elements.map(element => (
              <CardElement
                key={element.id}
                id={element.id}
                type={element.type}
                content={element.content}
                initialPosition={element.position}
                style={element.style}
                isSelected={selectedElement?.id === element.id}
                onSelect={() => setSelectedElement(element)}
                onUpdate={(position) => handleElementUpdate(element.id, position)}
              />
            ))}
          </BusinessCard>
        </View>
      </ScrollView>

      {selectedElement ? (
        <EditPanel
          element={{
            content: selectedElement.content,
            fontFamily: selectedElement.style?.fontFamily || 'Inter-Regular',
            fontSize: selectedElement.style?.fontSize || 16,
            textAlign: selectedElement.style?.textAlign || 'left',
          }}
          onUpdate={handleStyleUpdate}
        />
      ) : (
        <View style={styles.toolbar}>
          <Pressable style={styles.toolbarButton}>
            <Type size={24} color="#007AFF" />
            <Text style={styles.toolbarText}>Text</Text>
          </Pressable>
          <Pressable style={styles.toolbarButton}>
            <ImageIcon size={24} color="#007AFF" />
            <Text style={styles.toolbarText}>Image</Text>
          </Pressable>
          <Pressable style={styles.toolbarButton}>
            <QrCode size={24} color="#007AFF" />
            <Text style={styles.toolbarText}>QR Code</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    color: '#007AFF',
    marginLeft: 4,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  saveText: {
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  cardWrapper: {
    padding: 16,
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 24,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  toolbarButton: {
    alignItems: 'center',
  },
  toolbarText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#007AFF',
    marginTop: 4,
  },
});