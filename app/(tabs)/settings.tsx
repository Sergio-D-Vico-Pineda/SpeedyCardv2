import { View, Text, Pressable, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshCw } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import AccountSection from '../../components/settings/AccountSection';
import AboutSection from '../../components/settings/AboutSection';

export default function SettingsScreen() {
    const { userData, refreshUserData } = useAuth();
    const [refreshing, setRefreshing] = useState(false);

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Error loading user data</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={async () => {
                            setRefreshing(true);
                            try {
                                await refreshUserData();
                            } finally {
                                setRefreshing(false);
                            }
                        }}
                    />
                }
            >
                <AccountSection
                    userData={userData}
                />
                <AboutSection />
            </ScrollView >
        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    refreshButton: {
        padding: 4,
        borderRadius: 20,
    },
    refreshing: {
        opacity: 0.5,
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    aboutHeader: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    aboutLogo: {
        borderRadius: 35,
        width: 95,
        height: 95,
        marginBottom: 10,
    },
    aboutTitle: {
        fontSize: 20,
        color: '#333',
        marginBottom: 4,
    },
    aboutContent: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    aboutSectionTitle: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
        marginBottom: 6,
    },
    aboutText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    input: {
        width: 150,
        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        fontSize: 16,
        color: '#111827',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#10B981',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 8,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    cancelButton: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 8,
    },
    usernameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        marginTop: 4,
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    firstSection: {
        marginTop: 16,
    },
    section: {
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    sectionContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    optionIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfo: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    userEmail: {
        fontSize: 16,
        color: '#111827',
    },
    logoutIcon: {
        backgroundColor: '#FEE2E2',
    },
    logoutText: {
        color: '#EF4444',
    },
    optionContent: {
        flex: 1,
        marginLeft: 12,
    },
    optionTitle: {
        fontSize: 16,
        color: '#111827',
    },
    optionDescription: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    mb: {
        marginBottom: 16,
    },
    paymentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    paymentMethods: {
        width: 'auto',
        flexWrap: 'wrap',
        gap: 8,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
        padding: 10,
        borderRadius: 8,
        gap: 8,
        minWidth: '32%',
    },
    selectedPaymentMethod: {
        backgroundColor: '#3B82F6',
    },
    paymentMethodText: {
        color: '#3B82F6',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedPaymentMethodText: {
        color: '#FFFFFF',
    }
})