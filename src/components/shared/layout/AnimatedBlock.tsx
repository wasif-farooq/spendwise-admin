import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import Block from './Block';
import type { ElementType } from 'react';

interface AnimatedBlockProps extends HTMLMotionProps<"div"> {
    children?: React.ReactNode;
    className?: string;
    as?: ElementType;
}

const AnimatedBlock = ({ children, className, ...props }: AnimatedBlockProps) => (
    <Block
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={className}
        {...props}
    >
        {children}
    </Block>
);

export default AnimatedBlock;
