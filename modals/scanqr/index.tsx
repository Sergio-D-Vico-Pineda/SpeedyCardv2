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
    const [flash, setFlash] = useState(false);

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
        console.log('QR scanned:', data);
        if (data.startsWith('speedycard://')) {
            // i need to get that url href="/view?userid=sb1OHT4sN1aacyLzvCk7nXZhBLb2&card=1"
            const url = new URL(data);
            const userid = url.searchParams.get('userid');
            const card = url.searchParams.get('card') || 0;
            console.log('userid:', userid);
            console.log('card:', card);
            if (!userid) {
                console.error('Invalid QR code. Missing userid parameter.');
                alert('Invalid QR code. Missing userid parameter.');
                return;
            }

            router.push(`/view?userid=${userid}&card=${card}`);
            onClose();
        } else {
            console.log('Invalid QR code. Only SpeedyCard QR codes are accepted.');
            alert('Invalid QR code. Only SpeedyCard QR codes are accepted.');
        }
    };

    const toggleFlash = () => {
        setFlash(!flash);
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
                        <>
                            <CameraView
                                autofocus='on'
                                facing='back'
                                flash={flash ? 'on' : 'off'}
                                onBarcodeScanned={handleBarCodeScanned}
                                barcodeScannerSettings={{
                                    barcodeTypes: ['qr'],
                                }}
                                style={styles.camera}
                            />
                            <Pressable
                                style={styles.button}
                                onPress={toggleFlash}
                            >
                                <Text style={styles.buttonText}>Flash</Text>
                            </Pressable>
                        </>
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
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        setReadyToScan(false);
                        onClose();
                        router.push('/view?userid=sb1OHT4sN1aacyLzvCk7nXZhBLb2&card=1')
                    }}
                >
                    <Text style={styles.buttonText}>View a card</Text>
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