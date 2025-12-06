"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltWrapperProps {
    children: React.ReactNode;
    className?: string;
    rotationIntensity?: number;
    perspective?: number;
}

export const TiltWrapper = ({
    children,
    className = "",
    rotationIntensity = 8,
    perspective = 1000,
}: TiltWrapperProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [rotationIntensity, -rotationIntensity]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-rotationIntensity, rotationIntensity]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective,
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" }}
                className="relative w-full h-full rounded-full transition-shadow duration-300"
            >
                {children}
            </motion.div>
        </motion.div>
    );
};
