"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { Github, ExternalLink, Grid3X3, Layers, LayoutList } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
    id: string
    title: string
    description: string
    icon?: ReactNode
    color?: string
    githubUrl?: string
    liveUrl?: string
}

export interface MorphingCardStackProps {
    cards?: CardData[]
    className?: string
    defaultLayout?: LayoutMode
    onCardClick?: (card: CardData) => void
}

const layoutIcons = {
    stack: Layers,
    grid: Grid3X3,
    list: LayoutList,
}

const SWIPE_THRESHOLD = 50

export function MorphingCardStack({
    cards = [],
    className,
    defaultLayout = "stack",
    onCardClick,
}: MorphingCardStackProps) {
    const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
    const [expandedCard, setExpandedCard] = useState<string | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    if (!cards || cards.length === 0) {
        return null
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { offset, velocity } = info
        const swipe = Math.abs(offset.x) * velocity.x

        if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
            // Swiped left - go to next card
            setActiveIndex((prev) => (prev + 1) % cards.length)
        } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
            // Swiped right - go to previous card
            setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
        }
        setIsDragging(false)
    }

    const getStackOrder = () => {
        const reordered = []
        for (let i = 0; i < cards.length; i++) {
            const index = (activeIndex + i) % cards.length
            reordered.push({ ...cards[index], stackPosition: i })
        }
        return reordered.reverse() // Reverse so top card renders last (on top)
    }

    const getLayoutStyles = (stackPosition: number) => {
        switch (layout) {
            case "stack":
                return {
                    top: stackPosition * 8,
                    left: stackPosition * 8,
                    zIndex: cards.length - stackPosition,
                    rotate: (stackPosition - 1) * 2,
                }
            case "grid":
                return {
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    rotate: 0,
                }
            case "list":
                return {
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    rotate: 0,
                }
        }
    }

    const containerStyles = {
        stack: "relative h-80 w-80 md:h-96 md:w-96", // Increased size for better visibility
        grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", // Responsive grid
        list: "flex flex-col gap-4 max-w-2xl mx-auto",
    }

    const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

    return (
        <div className={cn("space-y-8 px-4", className)}>
            {/* Layout Toggle - centered */}
            <div className="flex items-center justify-center gap-2 rounded-full glass p-1.5 w-fit mx-auto">
                {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
                    const Icon = layoutIcons[mode]
                    return (
                        <button
                            key={mode}
                            onClick={() => {
                                setLayout(mode)
                                setExpandedCard(null) // Reset expansion on switch
                            }}
                            className={cn(
                                "flex items-center justify-center rounded-full p-2.5 transition-all duration-300",
                                layout === mode
                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                                    : "text-gray-400 hover:text-white hover:bg-white/10",
                            )}
                            aria-label={`Switch to ${mode} layout`}
                        >
                            <Icon className="h-4 w-4" />
                        </button>
                    )
                })}
            </div>

            {/* Cards Container */}
            <LayoutGroup>
                <motion.div layout className={cn(containerStyles[layout], "mx-auto transition-all duration-500 will-change-[width,height]")}>
                    <AnimatePresence mode="popLayout">
                        {displayCards.map((card) => {
                            const styles = getLayoutStyles(card.stackPosition)
                            const isExpanded = expandedCard === card.id
                            const isTopCard = layout === "stack" && card.stackPosition === 0

                            return (
                                <motion.div
                                    key={card.id}
                                    layoutId={card.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: isExpanded ? 1.05 : 1,
                                        x: 0,
                                        ...styles,
                                    }}
                                    exit={{ opacity: 0, scale: 0.8, x: -200 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                    }}
                                    drag={isTopCard ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.7}
                                    onDragStart={() => setIsDragging(true)}
                                    onDragEnd={handleDragEnd}
                                    whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                                    onClick={() => {
                                        if (isDragging) return
                                        setExpandedCard(isExpanded ? null : card.id)
                                        onCardClick?.(card)
                                    }}
                                    className={cn(
                                        "cursor-pointer rounded-2xl border border-white/10 glass p-6",
                                        "hover:border-purple-500/50 transition-colors duration-300",
                                        layout === "stack" && "absolute w-full h-full shadow-2xl shadow-black/50",
                                        layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                                        layout === "grid" && "w-full aspect-[4/3] flex flex-col justify-between",
                                        layout === "list" && "w-full min-h-[120px] flex flex-row items-center gap-6",
                                        isExpanded && "ring-2 ring-purple-500 bg-black/40 backdrop-blur-xl z-50",
                                    )}
                                    style={{
                                        backgroundColor: card.color ? card.color : undefined, // Allow override but default to glass
                                    }}
                                >
                                    <div className={cn(
                                        "flex gap-4",
                                        layout === "list" ? "flex-row items-center flex-1" : "flex-col h-full"
                                    )}>
                                        <div className={cn("flex justify-between items-start", layout === "list" ? "w-auto" : "w-full")}>
                                            {card.icon && (
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-300 border border-white/5">
                                                    {card.icon}
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-bold text-lg text-white truncate">{card.title}</h3>
                                            <p
                                                className={cn(
                                                    "text-sm text-gray-400 mt-2 leading-relaxed",
                                                    layout === "stack" && "line-clamp-4",
                                                    layout === "grid" && "line-clamp-3",
                                                    layout === "list" && "line-clamp-2",
                                                    isExpanded && "line-clamp-none",
                                                )}
                                            >
                                                {card.description}
                                            </p>

                                            {(card.githubUrl || card.liveUrl) && (
                                                <div className="flex gap-3 mt-4">
                                                    {card.githubUrl && (
                                                        <a
                                                            href={card.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                            title="View Code"
                                                        >
                                                            <Github size={18} />
                                                        </a>
                                                    )}
                                                    {card.liveUrl && (
                                                        <a
                                                            href={card.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                            title="View Live Site"
                                                        >
                                                            <ExternalLink size={18} />
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {isTopCard && !isExpanded && (
                                        <div className="absolute bottom-4 left-0 right-0 text-center animate-pulse">
                                            <span className="text-xs text-gray-500 font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                                Swipe or click to expand
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            </LayoutGroup>

            {layout === "stack" && cards.length > 1 && (
                <div className="flex justify-center gap-2 pt-4">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                index === activeIndex
                                    ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500"
                                    : "w-2 bg-white/20 hover:bg-white/40",
                            )}
                            aria-label={`Go to card ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
