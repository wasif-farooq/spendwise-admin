import React from 'react';
import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Block, Flex } from '@shared';

const alertVariants = cva(
    'relative w-full rounded-lg border p-4',
    {
        variants: {
            variant: {
                info: 'bg-blue-50 text-blue-900 border-blue-200',
                success: 'bg-green-50 text-green-900 border-green-200',
                warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
                error: 'bg-red-50 text-red-900 border-red-200',
            },
        },
        defaultVariants: {
            variant: 'info',
        },
    }
);

const iconMap = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
};

const iconColorMap = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
};

export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
    dismissible?: boolean;
    onDismiss?: () => void;
    icon?: React.ReactNode;
    showIcon?: boolean;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant = 'info', dismissible, onDismiss, icon, showIcon = true, children, ...props }, ref) => {
        const Icon = iconMap[variant];
        const iconColor = iconColorMap[variant];

        return (
            <Block
                ref={ref}
                className={cn(alertVariants({ variant }), className)}
                {...props}
            >
                <Flex align="start" gap={3}>
                    {showIcon && (
                        <Block className={cn('flex-shrink-0 mt-0.5', iconColor)}>
                            {icon || <Icon className="h-5 w-5" />}
                        </Block>
                    )}
                    <Block className="flex-1">{children}</Block>
                    {dismissible && onDismiss && (
                        <button
                            onClick={onDismiss}
                            className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors"
                            aria-label="Dismiss"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </Flex>
            </Block>
        );
    }
);

Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn('mb-1 font-semibold leading-none tracking-tight', className)}
        {...props}
    />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <Block
        as="p"
        ref={ref}
        className={cn('text-sm [&_p]:leading-relaxed', className)}
        {...props}
    />
));
AlertDescription.displayName = 'AlertDescription';

export default Alert;
