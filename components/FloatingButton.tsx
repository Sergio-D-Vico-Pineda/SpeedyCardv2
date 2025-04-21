import { Plus } from "lucide-react-native";
import { Pressable, StyleSheet, Text } from "react-native";

interface Floating {
    onPressAction: () => void;
}

export default function FloatingButton({ onPressAction }: Floating) {
    return (
        <Pressable style={styles.fab} onPress={onPressAction}>
            <Text>
                <Plus size={24} color="#FFFFFF" />
            </Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});