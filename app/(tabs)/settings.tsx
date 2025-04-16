import { View, Text, Pressable, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, ChevronRight, Save } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function SettingsScreen() {
    const { userData, signOut, updateUsername } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(userData?.username || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>

            <View style={styles.section}>
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
                                        <>
                                            <Save size={20} color="#FFFFFF" />
                                            <Text style={styles.saveButtonText}>Save</Text>
                                        </>
                                    )}
                                </Pressable>
                            </View>
                        ) : (
                            <Pressable onPress={() => setIsEditing(true)} style={styles.usernameContainer}>
                                <Text style={styles.userEmail}>{userData?.username}</Text>
                                <Text style={styles.editText}>Edit</Text>
                            </Pressable>
                        )}
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontFamily: 'Inter-Regular',
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
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    },
    usernameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    editText: {
        color: '#3B82F6',
        fontSize: 14,
        fontFamily: 'Inter-Regular',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        fontFamily: 'Inter-Regular',
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
        fontSize: 34,
        fontFamily: 'Inter-Bold',
        color: '#000000',
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: '#4B5563',
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
        fontFamily: 'Inter-Regular',
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
        fontFamily: 'Inter-Regular',
        color: '#111827',
    },
    optionDescription: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#6B7280',
        marginTop: 2,
    },
})