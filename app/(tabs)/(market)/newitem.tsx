import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '@/firebaselogic';
import { collection, addDoc, getDocs, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function NewItem() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesRef = collection(db, 'categories');
                const snapshot = await getDocs(categoriesRef);
                const categoryList = snapshot.docs.map(doc => doc.id);
                setCategories(categoryList);
                if (categoryList.length > 0) {
                    setSelectedCategory(categoryList[0]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const [features, setFeatures] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);

    const handleAddFeature = () => {
        if (newFeature.trim()) {
            setFeatures([...features, newFeature.trim()]);
            setNewFeature('');
        }
    };

    const handleSubmit = async () => {
        try {
            const categoryRef = doc(db, 'categories', selectedCategory);
            const categoryDoc = await getDoc(categoryRef);

            if (categoryDoc.exists()) {
                const currentItems = categoryDoc.data().items || [];
                const newItems = [...currentItems, {
                    name,
                    price: Number(price),
                    description,
                    isavailable: isAvailable,
                    features,
                }];

                await updateDoc(categoryRef, {
                    items: newItems
                });

                console.log('Item added to category array');
            } else {
                await setDoc(categoryRef, {
                    items: [{
                        name,
                        price: Number(price),
                        description,
                        isavailable: isAvailable,
                        features,
                    }]
                });
                console.log('Created new category with item');
            }

            // Clear all fields
            setName('');
            setPrice('');
            setDescription('');
            setFeatures([]);
            setNewFeature('');
            setIsAvailable(true);

            // Reset category to first one if available
            if (categories.length > 0) {
                setSelectedCategory(categories[0]);
            }
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const handleDeleteFeature = (indexToDelete: number) => {
        setFeatures(features.filter((_, index) => index !== indexToDelete));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    style={styles.picker}
                >
                    {categories.map((category) => (
                        <Picker.Item key={category} label={category} value={category} />
                    ))}
                </Picker>
            </View>
            <View style={styles.featureContainer}>
                <Text style={styles.label}>Features</Text>
                <View style={styles.featureInputContainer}>
                    <TextInput
                        style={styles.featureInput}
                        placeholder="Add a feature"
                        value={newFeature}
                        onChangeText={setNewFeature}
                    />
                    <Button title="Add" onPress={handleAddFeature} />
                </View>
                {features.map((feature, index) => (
                    <View key={index} style={styles.featureItemContainer}>
                        <Text style={styles.featureItem}>• {feature}</Text>
                        <TouchableOpacity
                            onPress={() => handleDeleteFeature(index)}
                            style={styles.deleteButton}
                        >
                            <Text style={styles.deleteButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <View style={styles.availabilityContainer}>
                <Text style={styles.label}>Available</Text>
                <Picker
                    selectedValue={isAvailable}
                    onValueChange={(value) => setIsAvailable(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Yes" value={true} />
                    <Picker.Item label="No" value={false} />
                </Picker>
            </View>
            <Button title="Create Item" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 20,
        overflow: 'hidden',
    },
    picker: {
        height: 40,
        width: '100%',
    },
    featureContainer: {
        marginBottom: 20,
    },
    featureInputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    featureInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        padding: 10,
        borderRadius: 5,
    },
    featureItem: {
        fontSize: 14,
        marginBottom: 5,
        paddingLeft: 10,
    },
    availabilityContainer: {
        marginBottom: 20,
    },
    featureItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        marginBottom: 5,
    },
    deleteButton: {
        padding: 5,
    },
    deleteButtonText: {
        color: '#ff4444',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
