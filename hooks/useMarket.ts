import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaselogic';
import { Template } from '@/types';

function useMarketHook() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const productsRef = collection(db, 'categories');
            const productsSnapshot = await getDocs(productsRef);
            const productList = productsSnapshot.docs.flatMap(doc =>
                doc.data().items.map((item: any) => ({
                    id: item.name.toLowerCase().replace(/\s+/g, '-'),
                    ...item,
                    category: doc.id
                }))
            );
            setTemplates(productList);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        templates,
        loading,
        refreshProducts: fetchProducts
    };
}

export { useMarketHook };