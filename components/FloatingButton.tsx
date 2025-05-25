import { Pressable, StyleSheet } from "react-native";
import { Plus } from "lucide-react-native";

interface Floating {
    onPressAction: () => void;
    disabled?: boolean;
}

export default function FloatingButton({ onPressAction, disabled = false }: Floating) {
    return (
        <Pressable style={[styles.fab, disabled && styles.fabDisabled]} onPress={onPressAction} disabled={disabled}>
            <Plus style={styles.icon} size={24} color="#FFFFFF" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    icon: {
        margin: 0,
        padding: 0,
    },
    fabDisabled: {
        backgroundColor: '#A9A9A9',
        opacity: 0.6,
    },
});