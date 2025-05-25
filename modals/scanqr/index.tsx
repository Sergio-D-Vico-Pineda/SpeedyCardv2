import { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { router } from 'expo-router';

interface ScanQRModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function ScanQRModal({ visible, onClose }: ScanQRModalProps) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [readyToScan, setReadyToScan] = useState(false);

    useEffect(() => {
        if (visible) {
            (async () => {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === 'granted');
            })();
        }
    }, [visible]);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setReadyToScan(false);
        if (data.startsWith('speedycard://')) {
            const url = new URL(data);
            const userid = url.searchParams.get('userid');
            const card = url.searchParams.get('card') || 0;
            if (!userid) {
                console.error('Invalid QR code. Missing userid parameter.');
                alert('Invalid QR code. Missing userid parameter.');
                return;
            }

            router.push(`/view?userid=${userid}&card=${card}&from=savedqr`);
            onClose();
        } else {
            console.log('Invalid QR code. Only SpeedyCard QR codes are accepted.');
            alert('Invalid QR code. Only SpeedyCard QR codes are accepted.');
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            transparent={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Scan a SpeedyCard QR Code</Text>
                {hasPermission === null ? (
                    <Text style={styles.info}>Requesting camera permission...</Text>
                ) : hasPermission === false ? (
                    <Text style={styles.info}>No access to camera</Text>
                ) : (
                    readyToScan ?
                        <CameraView
                            autofocus='on'
                            facing='back'
                            onBarcodeScanned={handleBarCodeScanned}
                            barcodeScannerSettings={{
                                barcodeTypes: ['qr'],
                            }}
                            style={styles.camera}
                        />
                        :
                        <Pressable
                            style={styles.button}
                            onPress={() => setReadyToScan(true)}
                        >
                            <Text style={styles.buttonText}>Tap to Scan</Text>
                        </Pressable>
                )}
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        setReadyToScan(false);
                        onClose();
                    }}
                >
                    <Text style={styles.buttonText}>Close</Text>
                </Pressable>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25292e',
    },
    title: {
        color: '#fff',
        marginBottom: 10,
    },
    info: {
        color: '#fff',
    },
    camera: {
        width: 300,
        height: 300,
    },
    button: {
        padding: 10,
        backgroundColor: '#1f6feb',
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
    },
});