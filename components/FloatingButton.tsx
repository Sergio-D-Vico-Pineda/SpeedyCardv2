import { Pressable, StyleSheet } from "react-native";
import { Plus } from "lucide-react-native";

interface Floating {
    onPressAction: () => void;
}

export default function FloatingButton({ onPressAction }: Floating) {
    return (
        <Pressable style={styles.fab} onPress={onPressAction}>
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
    }
});