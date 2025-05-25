import { View, TextInput, Pressable, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Price } from '@/components/Price';
import CrossPlatformAlert from '@/components/CrossPlatformAlert';
import PaymentService from '@/services/PaymentService';
import { styles } from '../../styles/Settings.styles';
import { PaymentMethod, Plans } from '@/types';
import { BanknoteArrowDown, CreditCard, Edit, LogOut, Save, ChevronRight, BookPlus } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

export default function AccountSection({
    userData,
    planHighlight = false,
}: {
    userData: any;
    planHighlight?: boolean;
}) {
    const { updateUsername, updateBalance, updatePlan, signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [balanceLoading, setBalanceLoading] = useState(false);
    const [showAddMoneyAlert, setShowAddMoneyAlert] = useState(false);
    const [balanceError, setBalanceError] = useState('');
    const [showPlanAlert, setShowPlanAlert] = useState(false);
    const [planLoading, setPlanLoading] = useState(false);
    const [planError, setPlanError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [newUsername, setNewUsername] = useState(userData?.username || '');
    const [newBalance, setNewBalance] = useState(userData?.balance.toString() || '0');

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('bank_card');
    const [selectedPlan, setSelectedPlan] = useState<Plans>(userData.plan);

    const paymentMethods = PaymentService.getPaymentMethods();
    const plans = PaymentService.getPlans();

    useFocusEffect(
        useCallback(() => {
            setNewBalance(userData?.balance.toString() || '');
        }, [])
    )

    return (
        <View style={[styles.section, styles.mb, styles.firstSection]}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.sectionContent}>
                <View style={styles.userInfo}>
                    {isEditing ? (
                        <View style={styles.editContainer}>
                            <TextInput
                                style={[styles.input, { flex: 1, textAlign: 'left', marginBottom: 0 }]}
                                value={newUsername}
                                onChangeText={setNewUsername}
                                placeholder="Enter new username"
                                editable={!balanceLoading}
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
                            <Text style={styles.userEmail}>Username: {userData.username}</Text>
                            <Edit size={20} color="#3B82F6" />
                        </Pressable>
                    )}
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
                <View style={styles.userInfo}>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.userEmail}>Balance: <Price value={userData.balance} /></Text>
                        {!balanceLoading ? (
                            <Pressable
                                onPress={() => setShowAddMoneyAlert(true)}
                                disabled={balanceLoading}
                            >
                                <BanknoteArrowDown size={20} color="#3B82F6" />
                            </Pressable>
                        ) : (
                            <ActivityIndicator color="#3B82F6" size="small" />
                        )}
                    </View>
                    {balanceError ? <Text style={styles.errorText}>{balanceError}</Text> : null}
                </View>
                <View style={styles.userInfo}>
                    <View style={styles.balanceContainer}>
                        <Text style={[styles.userEmail, planHighlight && { fontWeight: 'bold' }]}>Plan tier: {userData.plan}</Text>
                        {!planLoading ? (
                            <Pressable
                                onPress={() => setShowPlanAlert(true)}
                                disabled={planLoading}
                            >
                                <Text style={styles.userEmail}>Upgrade</Text>
                            </Pressable>
                        ) : (
                            <ActivityIndicator color="#3B82F6" size="small" />
                        )}
                    </View>
                    {planError ? <Text style={styles.errorText}>{planError}</Text> : null}
                </View>
                <TouchableOpacity style={styles.option} onPress={signOut}>
                    <View style={[styles.optionIcon, styles.logoutIcon]}>
                        <LogOut size={20} color="#EF4444" />
                    </View>
                    <View style={styles.optionContent}>
                        <Text style={[styles.optionTitle, styles.logoutText]}>Sign Out</Text>
                        <Text style={styles.optionDescription}>Log out of your account</Text>
                    </View>
                    <ChevronRight size={20} color="#9CA3AF" />
                </TouchableOpacity>
                <CrossPlatformAlert
                    visible={showPlanAlert}
                    title="Plans"
                    actions={[
                        {
                            text: 'Upgrade', onPress: async () => {
                                if (balanceLoading) return;
                                setPlanLoading(true);
                                setPlanError('');
                                try {
                                    const success = await PaymentService.processChangePlan(selectedPlan);
                                    if (success) {
                                        await updatePlan(selectedPlan);
                                        setShowPlanAlert(false);
                                    }
                                } catch (err) {
                                    setPlanError(String(err));
                                }
                                finally {
                                    setPlanLoading(false);
                                }
                            }
                        },
                        {
                            text: 'Cancel', onPress: () => setShowPlanAlert(false),
                            color: '#EF4444',
                        }
                    ]}
                    onRequestClose={() => setShowPlanAlert(false)}
                >
                    <View style={styles.paymentContainer}>
                        <Text style={styles.paymentTitle}>Select a plan:</Text>
                        <View style={styles.planMethods}>
                            {plans.map((method) => (
                                <Pressable
                                    key={method}
                                    style={[styles.planMethod, selectedPlan === method && styles.selectedPaymentMethod]}
                                    onPress={() => setSelectedPlan(method)}
                                    disabled={planLoading}
                                >
                                    <BookPlus size={20} color={selectedPlan === method ? '#FFFFFF' : '#3B82F6'} />
                                    <Text style={[styles.paymentMethodText, selectedPlan === method && styles.selectedPaymentMethodText]}>
                                        {method.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </CrossPlatformAlert>
                <CrossPlatformAlert
                    visible={showAddMoneyAlert}
                    title="Add Balance"
                    actions={[
                        {
                            text: 'Process Payment', onPress: async () => {
                                if (balanceLoading) return;
                                setBalanceLoading(true);
                                setBalanceError('');
                                try {
                                    const result = await PaymentService.processPayment(newBalance);
                                    if (result.success) {
                                        await updateBalance(newBalance);
                                        setShowAddMoneyAlert(false);
                                    } else {
                                        setBalanceError(result.error || 'Payment failed');
                                    }
                                } catch (err) {
                                    setBalanceError(String(err));
                                    setNewBalance(userData.balance.toString());
                                } finally {
                                    setBalanceLoading(false);
                                }
                            },
                            color: '#10B981',
                        }
                        , { text: 'Close' }
                    ]}
                    onRequestClose={() => setShowAddMoneyAlert(false)}>
                    <View style={styles.paymentContainer}>
                        <TextInput
                            style={[styles.input]}
                            value={newBalance}
                            onChangeText={(value) => {
                                setNewBalance(value);
                                setBalanceError('');
                            }}
                            placeholder="Enter amount"
                            keyboardType="numeric"
                            editable={!balanceLoading}
                        />
                        <View style={styles.paymentMethods}>
                            {paymentMethods.map((method) => (
                                <Pressable
                                    key={method}
                                    style={[styles.paymentMethod, selectedPaymentMethod === method && styles.selectedPaymentMethod]}
                                    onPress={() => setSelectedPaymentMethod(method)}
                                    disabled={balanceLoading}
                                >
                                    <CreditCard size={20} color={selectedPaymentMethod === method ? '#FFFFFF' : '#3B82F6'} />
                                    <Text style={[styles.paymentMethodText, selectedPaymentMethod === method && styles.selectedPaymentMethodText]}>
                                        {method.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </CrossPlatformAlert>
            </View>
        </View>
    );
}