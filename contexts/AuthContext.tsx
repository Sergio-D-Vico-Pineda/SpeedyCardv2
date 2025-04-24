import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { router, useSegments, useRootNavigationState } from 'expo-router';
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

function useProtectedRoute(user: User | null) {
    const segments = useSegments();
    // const navigationState = useRootNavigationState();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)' || segments.length < 1;

        if (!user && !inAuthGroup) {
            router.replace('/login');
        } else if (user && inAuthGroup) {
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                setState(current => ({
                    ...current,
                    user,
                    userData: userDoc.data() as UserData,
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
        });

        return () => unsubscribe();
    }, []);

    const signUp = useCallback(async (email: string, password: string, username: string) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            const userData: UserData = { uid: user.uid, email, username, balance: 0 };
            await setDoc(doc(db, 'users', user.uid), { email, username, balance: 0 });
            await setDoc(doc(db, 'cards', user.uid), { cards: [defaultCardData] });
            setState(current => ({
                ...current,
                user,
                userData
            }));
        } catch (error) {
            throw new Error("#!#" + error);
        }
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            setState(current => ({
                ...current,
                user,
                userData: {...userDoc.data(), uid: user.uid } as UserData
            }));
        } catch (error) {
            throw new Error('Invalid email or password: ' + error);
        }
    }, []);

    const updateUsername = useCallback(async (newUsername: string) => {
        if (!state.user) throw new Error('No user logged in');
        try {
            const userDocRef = doc(db, 'users', state.user.uid);
            await setDoc(userDocRef, { ...state.userData, username: newUsername }, { merge: true });
            setState(current => ({
                ...current,
                userData: { ...current.userData, username: newUsername } as UserData
            }));
        } catch (error) {
            throw new Error('Failed to update username: ' + error);
        }
    }, [state.user, state.userData]);

    const signOut = useCallback(async () => {
        await firebaseSignOut(auth);
        setState(current => ({
            ...current,
            user: null,
            userData: null
        }));
        router.replace('/app', { withAnchor: false });
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