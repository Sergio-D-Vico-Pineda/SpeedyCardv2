import { FC } from 'react';

interface PriceProps {
    value: number;
}

export const Price: FC<PriceProps> = ({ value }) => {
    const formatPrice = (value: number): string => {
        return value.toString().replace('.', ',') + ' €';
    };

    return formatPrice(value);
};