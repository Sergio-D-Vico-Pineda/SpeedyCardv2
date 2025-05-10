import { View, StyleSheet } from 'react-native';
import { Stars } from './Stars';
import { Rainbow } from './Rainbow';
import { Glow } from './Glow';
import { Fire } from './Fire';
import { Sparkle } from './Sparkle';
import { Rain } from './Rain';

interface CardEffectsProps {
    effect?: string;
    children: React.ReactNode;
}

export function CardEffects({ effect, children }: CardEffectsProps) {
    const renderEffect = () => {
        switch (effect) {
            case 'stars':
                return <Stars />;
            case 'rainbow':
                return <Rainbow />;
            case 'glow':
                return <Glow />;
            case 'fire':
                return <Fire />;
            case 'sparkle':
                return <Sparkle />;
            case 'rain':
                return <Rain />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {children}
            {renderEffect()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
});