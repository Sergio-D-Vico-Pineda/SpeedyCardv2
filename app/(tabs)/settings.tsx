import { View, Text, Pressable, StyleSheet, TextInput, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, ChevronRight, Save } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function SettingsScreen() {
    const { userData, signOut, updateUsername } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newUsername, setNewUsername] = useState(userData?.username || '');

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
            <ScrollView>
                <View style={[styles.section, styles.mb, styles.firstSection]}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.sectionContent}>
                        <View style={styles.userInfo}>
                            {isEditing ? (
                                <View style={styles.editContainer}>
                                    <TextInput
                                        style={styles.input}
                                        value={newUsername}
                                        onChangeText={setNewUsername}
                                        placeholder="Enter new username"
                                        editable={!loading}
                                    />
                                    <Pressable
                                        style={[styles.saveButton, loading && styles.buttonDisabled]}
                                        onPress={async () => {
                                            if (loading) return;
                                            setLoading(true);
                                            setError('');
                                            try {
                                                await updateUsername(newUsername);
                                                setIsEditing(false);
                                            } catch (err) {
                                                setError(String(err));
                                            } finally {
                                                setLoading(false);
                                            }
                                        }}
                                    >
                                        {loading ? (
                                            <ActivityIndicator color="#fff" size="small" />
                                        ) : (
                                            <Save size={20} color="#FFFFFF" />
                                        )}
                                    </Pressable>
                                    <Pressable onPress={() => setIsEditing(false)} style={styles.cancelButton}>
                                        <LogOut size={20} color="#FFFFFF" />
                                    </Pressable>
                                </View>
                            ) : (
                                <Pressable onPress={() => setIsEditing(true)} style={styles.usernameContainer}>
                                    <Text style={styles.userEmail}>{userData.username}</Text>
                                    <Text style={styles.editText}>Edit</Text>
                                </Pressable>
                            )}
                            {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userEmail}>Balance: {userData.balance}</Text>
                        </View>
                        <Pressable style={styles.option} onPress={signOut}>
                            <View style={[styles.optionIcon, styles.logoutIcon]}>
                                <LogOut size={20} color="#EF4444" />
                            </View>
                            <View style={styles.optionContent}>
                                <Text style={[styles.optionTitle, styles.logoutText]}>Sign Out</Text>
                                <Text style={styles.optionDescription}>Log out of your account</Text>
                            </View>
                            <ChevronRight size={20} color="#9CA3AF" />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <View style={styles.sectionContent}>
                        <View style={styles.aboutHeader}>
                            <Image
                                source={require('@/assets/images/react-logo.png')}
                                style={styles.aboutLogo}
                            />
                            <Text style={styles.aboutTitle}>About SpeedyCard</Text>
                        </View>
                        <View style={styles.aboutContent}>
                            <Text style={styles.aboutSectionTitle}>Our Mission</Text>
                            <Text style={styles.aboutText}>
                                SpeedyCard is dedicated to providing fast and efficient card management solutions.{"\n"}
                                We strive to make digital card organization simple and accessible for everyone.{"\n"}
                                By going digital, we help reduce paper waste and protect our environment.
                            </Text>
                            <Text style={styles.aboutSectionTitle}>Contact Us</Text>
                            <Text style={styles.aboutText}>
                                Email: servicpin2@alu.edu.gva.es{"\n"}
                                Phone: +34 123 456 789{"\n"}
                                Address: Av. Ciudad León de Nicaragua, 8, 03015 Alicante, Spain
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    // About section styles
    aboutHeader: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    aboutLogo: {
        width: 80,
        height: 80,
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
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
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
        backgroundColor: '#EF4444', // Red for cancel
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 8,
    },
    usernameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    editText: {
        color: '#3B82F6',
        fontSize: 14,
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
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
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
    }
})