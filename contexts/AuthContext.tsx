import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
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
}

const AuthContext = createContext<AuthState>({} as AuthState);

const PUBLIC_ROUTES = ['(auth)', '(public)', '', 'app'];

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
                balance: 0
            };

            // Create user document without uid because it's set automatically
            await setDoc(doc(db, 'users', user.uid), {
                email,
                username,
                balance: 0
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