import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { ChevronRight, Palette, Briefcase, Code, Pencil } from 'lucide-react-native';

const CATEGORIES = [
  {
    id: 'tech',
    name: 'Technology',
    icon: Code,
    templates: [
      {
        id: 'tech-minimal',
        name: 'Minimal Tech',
        preview: 'https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=800&auto=format&fit=crop&q=60',
        orientation: 'landscape'
      },
      {
        id: 'tech-bold',
        name: 'Bold Innovation',
        preview: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=800&auto=format&fit=crop&q=60',
        orientation: 'landscape'
      }
    ]
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: Palette,
    templates: [
      {
        id: 'creative-modern',
        name: 'Modern Artist',
        preview: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60',
        orientation: 'portrait'
      },
      {
        id: 'creative-bold',
        name: 'Bold Design',
        preview: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&auto=format&fit=crop&q=60',
        orientation: 'landscape'
      }
    ]
  },
  {
    id: 'business',
    name: 'Business',
    icon: Briefcase,
    templates: [
      {
        id: 'business-classic',
        name: 'Classic Professional',
        preview: 'https://images.unsplash.com/photo-1625727733400-b0666b3f0555?w=800&auto=format&fit=crop&q=60',
        orientation: 'landscape'
      },
      {
        id: 'business-modern',
        name: 'Modern Executive',
        preview: 'https://images.unsplash.com/photo-1625727733401-ba5a75293231?w=800&auto=format&fit=crop&q=60',
        orientation: 'portrait'
      }
    ]
  }
];

export default function CreateScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Create Card</Text>
          <Text style={styles.subtitle}>Choose a template to get started</Text>
        </View>

        <View style={styles.quickActions}>
          <Link href="/create/blank" asChild>
            <Pressable style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Pencil size={24} color="#007AFF" />
              </View>
              <View style={styles.quickActionContent}>
                <Text style={styles.quickActionTitle}>Start from Scratch</Text>
                <Text style={styles.quickActionSubtitle}>Create a custom design</Text>
              </View>
              <ChevronRight size={20} color="#8E8E93" />
            </Pressable>
          </Link>
        </View>

        {CATEGORIES.map(category => (
          <View key={category.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <category.icon size={20} color="#000000" />
              <Text style={styles.sectionTitle}>{category.name}</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.templateGrid}
            >
              {category.templates.map(template => (
                <Link
                  key={template.id}
                  href={{
                    pathname: "/create/[templateId]",
                    params: { templateId: template.id }
                  }}
                  asChild
                >
                  <Pressable style={styles.templateCard}>
                    <Image
                      source={{ uri: template.preview }}
                      style={[
                        styles.templatePreview,
                        template.orientation === 'portrait' ? styles.portraitPreview : styles.landscapePreview
                      ]}
                    />
                    <Text style={styles.templateName}>{template.name}</Text>
                    <Text style={styles.templateOrientation}>
                      {template.orientation.charAt(0).toUpperCase() + template.orientation.slice(1)}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 34,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  quickActions: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#E5F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 17,
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
  quickActionSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginLeft: 8,
  },
  templateGrid: {
    paddingHorizontal: 12,
  },
  templateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    width: 200,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  templatePreview: {
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    marginBottom: 12,
  },
  landscapePreview: {
    width: 176,
    height: 100,
  },
  portraitPreview: {
    width: 176,
    height: 176,
  },
  templateName: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: '#000000',
  },
  templateOrientation: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
});