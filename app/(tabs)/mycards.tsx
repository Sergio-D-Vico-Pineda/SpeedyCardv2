import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Plus } from 'lucide-react-native';

export default function CardsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Business Cards</Text>
            </View>

            <FlatList
                data={[{
                    key: "1",
                    title: "Business Card1",
                    details: "Card Details1"
                }, {
                    key: "2",
                    title: "Business Card2",
                    details: "Card Details2"
                }]}
                ListEmptyComponent={() => (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>No Cards Yet</Text>
                        <Text style={styles.emptyText}>Create your first business card to get started</Text>
                        <Link href="/(tabs)/create/index" asChild>
                            <Pressable style={styles.createButton}>
                                <Plus size={24} color="#FFFFFF" />
                                <Text style={styles.buttonText}>Create New Card</Text>
                            </Pressable>
                        </Link>
                    </View>
                )}
                renderItem={({ item }) => {
                    return (
                        <Link href="/(tabs)/create/index" asChild>
                            <View style={styles.cardItem}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardDetails}>{item.details}</Text>
                            </View>
                        </Link>
                    )
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        gap: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    cardItem: {
        backgroundColor: '#f8f9fa',
        padding: 20,
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    cardDetails: {
        fontSize: 14,
        color: '#666',
    },
});
