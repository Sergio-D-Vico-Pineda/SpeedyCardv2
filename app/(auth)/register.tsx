import { useState } from "react";
import { Text, SafeAreaView, View, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signUp } = useAuth();

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword || !username) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await signUp(email, password, username);
        } catch (err) {
            setError('Failed to register: ' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Image
                    source={require('@/assets/images/react-logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Register</Text>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={(text) => {
                        setUsername(text);
                        setError('');
                    }}
                    placeholder="Username"
                    placeholderTextColor="#666"
                    editable={!loading}
                />

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setError('');
                    }}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />

                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setError('');
                    }}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    secureTextEntry
                    editable={!loading}
                />

                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        setError('');
                    }}
                    placeholder="Confirm Password"
                    placeholderTextColor="#666"
                    secureTextEntry
                    editable={!loading}
                />

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity disabled={loading}>
                        <Link style={styles.loginLink} href="/login">
                            Login
                        </Link>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        color: '#666',
        marginRight: 5,
    },
    loginLink: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
    },
    errorText: {
        color: '#ff3b30',
        textAlign: 'center',
        marginBottom: 10,
    },
});
