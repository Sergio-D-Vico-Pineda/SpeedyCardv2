import { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
    hideToast: () => void;
    visible: boolean;
    message: string;
    type: ToastType;
    position: 'top' | 'bottom';
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<ToastType>('info');

    const showToast = (message: string, type: ToastType = 'info') => {
        console.log('Showing toast:', message, type);
        setVisible(true);
        setMessage(message);
        setType(type);
    };

    const hideToast = () => {
        setVisible(false);
    };

    return (
        <ToastContext.Provider
            value={{
                showToast,
                hideToast,
                visible,
                message,
                type,
                position: 'bottom',
            }}
        >
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}