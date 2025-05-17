import { PaymentMethod, Plans } from '@/types';

type PaymentResult = {
    success: boolean;
    transactionId?: string;
    error?: string;
};

class PaymentService {
    private static validateAmount(amount: string): { isValid: boolean; error?: string } {
        const numAmount = parseFloat(amount);

        if (isNaN(numAmount)) {
            return { isValid: false, error: 'Please enter a valid number' };
        }
        if (numAmount <= 0) {
            return { isValid: false, error: 'Amount must be greater than 0' };
        }
        if (numAmount > 10000) {
            return { isValid: false, error: 'Amount cannot exceed 10,000' };
        }

        return { isValid: true };
    }

    private static generateTransactionId(): string {
        return `TXN_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
    }

    private static simulateApiCall(success: boolean, delay: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (success) {
                    setTimeout(() => {
                        resolve();
                    }, delay);
                } else {
                    reject(new Error('Payment processing failed'));
                }
            }, delay);
        });
    }

    static async processPayment(amount: string): Promise<PaymentResult> {
        try {
            // Validate amount
            const validation = this.validateAmount(amount);
            if (!validation.isValid) {
                return {
                    success: false,
                    error: validation.error
                };
            }

            // Simulate payment processing delay (1-2 seconds)
            const processingTime = Math.random() * 1000 + 1000;

            // Simulate success rate (90% success)
            // const isSuccess = Math.random() < 0.9;
            const isSuccess = true;

            // Simulate API call
            await this.simulateApiCall(isSuccess, processingTime);

            if (isSuccess) {
                return {
                    success: true,
                    transactionId: this.generateTransactionId()
                };
            } else {
                throw new Error('Payment declined by the payment provider');
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred'
            };
        }
    }

    static async processChangePlan(plan: Plans): Promise<boolean> {

        // Validate plan
        if (!this.getPlans().includes(plan)) {
            return false;
        }

        // Simulate payment processing delay (1-2 seconds)
        const processingTime = Math.random() * 1000 + 1000;

        // Simulate success rate (90% success)
        // const isSuccess = Math.random() < 0.9;
        const isSuccess = true;

        // Simulate API call
        await this.simulateApiCall(isSuccess, processingTime);

        return true;
    }

    static getPaymentMethods(): PaymentMethod[] {
        return ['bank_card', 'paypal'];
    }

    static getPlans(): Plans[] {
        return ['Free', 'Pro', 'Premium', 'Ultimate'];
    }
}

export default PaymentService;