import { useState, useEffect } from "react";

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
}

export const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: AnimatedCounterProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return (
        <span>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
};
