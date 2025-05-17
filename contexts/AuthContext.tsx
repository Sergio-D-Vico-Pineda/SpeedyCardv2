import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebaselogic';
import { router, useSegments } from 'expo-router';
import { UserData, defaultCardData } from '@/types';

interface AuthState {
    user: User | null;
    userData: UserData | null;
    initialized: boolean;
    signUp: (email: string, password: string, username: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateUsername: (newUsername: string) => Promise<void>;
    updateBalance: (newBalance: string) => Promise<void>;
    refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({} as AuthState);

const PUBLIC_ROUTES = ['(auth)', '(public)', '', 'app'];

async function fetchUserData(userId: string) {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        throw new Error('User document not found');
    }

    return { ...userDoc.data(), uid: userId } as UserData;
}

function useProtectedRoute(user: User | null) {
    const segments = useSegments();

    useEffect(() => {
        if (!segments.length) return;

        const currentRoute = segments[0];
        const isPublicRoute = PUBLIC_ROUTES.includes(currentRoute);
        const isAuthRoute = currentRoute === '(auth)';

        if (!user && !isPublicRoute) {
            router.replace('/login');
        } else if (user && isAuthRoute) {
            router.replace('/');
        }
    }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<{
        user: User | null;
        userData: UserData | null;
        initialized: boolean;
    }>({ user: null, userData: null, initialized: false });

    // Handle auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (!userDoc.exists()) {
                        throw new Error('User document not found');
                    }

                    setState(current => ({
                        ...current,
                        user,
                        userData: { ...userDoc.data(), uid: user.uid } as UserData,
                        initialized: true
                    }));
                } else {
                    setState(current => ({
                        ...current,
                        user: null,
                        userData: null,
                        initialized: true
                    }));
                }
            } catch (error) {
                console.error('Error in auth state change:', error);
                setState(current => ({
                    ...current,
                    user: null,
                    userData: null,
                    initialized: true
                }));
            }
        });

        return () => unsubscribe();
    }, []);

    const signUp = useCallback(async (email: string, password: string, username: string) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            const userData: UserData = {
                uid: user.uid,
                email,
                username,
                balance: 0,
                plan: 'Free'
            };

            // Create user document without uid because it's set automatically
            await setDoc(doc(db, 'users', user.uid), {
                email,
                username,
                balance: 0,
                plan: 'Free'
            });

            // Initialize cards collection for the user
            await setDoc(doc(db, 'cards', user.uid), {
                cards: [defaultCardData]
            });

            setState(current => ({
                ...current,
                user,
                userData
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error during signup';
            throw new Error(`Signup failed: ${errorMessage}`);
        }
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                throw new Error('User data not found');
            }

            setState(current => ({
                ...current,
                user,
                userData: { ...userDoc.data(), uid: user.uid } as UserData
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error during signin';
            throw new Error(`Authentication failed: ${errorMessage}`);
        }
    }, []);

    const updateUsername = useCallback(async (newUsername: string) => {
        if (!state.user || !state.userData) {
            throw new Error('No authenticated user found');
        }

        try {
            const userDocRef = doc(db, 'users', state.user.uid);
            const updatedUserData = { ...state.userData, username: newUsername };

            await setDoc(userDocRef, updatedUserData, { merge: true });

            setState(current => ({
                ...current,
                userData: updatedUserData
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error during update';
            throw new Error(`Username update failed: ${errorMessage}`);
        }
    }, [state.user, state.userData]);

    const signOut = useCallback(async () => {
        try {
            await firebaseSignOut(auth);
            setState(current => ({
                ...current,
                user: null,
                userData: null
            }));
            router.replace('/');
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }, []);

    const updateBalance = useCallback(async (newBalance: string) => {
        if (!state.user || !state.userData) {
            throw new Error('No authenticated user found');
        }

        const currentBalance = state.userData.balance;
    const sanitizedDelta = newBalance.replace(',', '.');
    
    const delta = Number(sanitizedDelta);
    if (isNaN(delta) || delta < 0) {
        throw new Error('Invalid amount to add. Please provide a valid positive number.');
    }
    
    const newTotal = currentBalance + delta;
    const roundedBalance = parseFloat(newTotal.toFixed(2));

        try {
            const userDocRef = doc(db, 'users', state.user.uid);
            const updatedUserData = { ...state.userData, balance: roundedBalance };

            await setDoc(userDocRef, updatedUserData, { merge: true });

            setState(current => ({
                ...current,
                userData: updatedUserData
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error during update';
            throw new Error(`Failed to add to balance: ${errorMessage}`);
        }
    }, [state.user, state.userData]);

    const refreshUserData = useCallback(async () => {
        if (!state.user) {
            throw new Error('No authenticated user found');
        }
        try {
            const userData = await fetchUserData(state.user.uid);
            setState(current => ({
                ...current,
                userData
            }));
        } catch (error) {
            console.error('Error refreshing user data:', error);
            throw error;
        }
    }, [state.user])

    useProtectedRoute(state.user);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                userData: state.userData,
                initialized: state.initialized,
                signUp,
                signIn,
                signOut,
                updateUsername,
                updateBalance,
                refreshUserData,
            }}>

            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}