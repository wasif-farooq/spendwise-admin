import { useEffect, useRef, type DependencyList } from 'react';

export const useChatScroll = (dependencies: DependencyList) => {

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, dependencies);

    return scrollRef;
};
