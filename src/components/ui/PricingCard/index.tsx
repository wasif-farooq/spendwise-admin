import { Check, X } from 'lucide-react';
import { Button } from '@ui';
import { cn } from '@utils/cn';

interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingCardProps {
    name: string;
    price: string;
    period: string;
    description: string;
    features: PricingFeature[];
    isPopular?: boolean;
    buttonText?: string;
    onSelect?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
    name,
    price,
    period,
    description,
    features,
    isPopular = false,
    buttonText = 'Get Started',
    onSelect,
}) => {
    return (
        <div
            className={cn(
                'relative rounded-2xl p-8 shadow-sm border transition-all duration-300 hover:shadow-md',
                isPopular
                    ? 'bg-white border-primary ring-2 ring-primary ring-opacity-50'
                    : 'bg-white border-gray-200'
            )}
        >
            {isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                        Most Popular
                    </span>
                </div>
            )}

            <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
                <p className="text-sm text-gray-500 mb-6">{description}</p>
                <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{price}</span>
                    <span className="text-gray-500 ml-1">/{period}</span>
                </div>
            </div>

            <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        {feature.included ? (
                            <Check className="h-5 w-5 text-secondary flex-shrink-0 mr-3" />
                        ) : (
                            <X className="h-5 w-5 text-gray-300 flex-shrink-0 mr-3" />
                        )}
                        <span className={cn('text-sm', feature.included ? 'text-gray-600' : 'text-gray-400')}>
                            {feature.text}
                        </span>
                    </li>
                ))}
            </ul>

            <Button
                variant={isPopular ? 'primary' : 'outline'}
                className="w-full"
                onClick={onSelect}
            >
                {buttonText}
            </Button>
        </div>
    );
};
