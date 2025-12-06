"use client"

import { useEffect, useRef, useState } from "react"


interface Vector2D {
    x: number
    y: number
}

class Particle {
    pos: Vector2D = { x: 0, y: 0 }
    vel: Vector2D = { x: 0, y: 0 }
    acc: Vector2D = { x: 0, y: 0 }
    target: Vector2D = { x: 0, y: 0 }

    closeEnoughTarget = 100
    maxSpeed = 4.0 // Increased speed for snappier movement
    maxForce = 0.1
    particleSize = 10 // Will be set dynamically
    isKilled = false

    startColor = { r: 0, g: 0, b: 0 }
    targetColor = { r: 0, g: 0, b: 0 }
    colorWeight = 0
    colorBlendRate = 0.025

    move() {
        // Check if particle is close enough to its target to slow down
        let proximityMult = 1
        const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2))

        if (distance < this.closeEnoughTarget) {
            proximityMult = distance / this.closeEnoughTarget
        }

        // Add force towards target
        const towardsTarget = {
            x: this.target.x - this.pos.x,
            y: this.target.y - this.pos.y,
        }

        const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
        if (magnitude > 0) {
            towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
            towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
        }

        const steer = {
            x: towardsTarget.x - this.vel.x,
            y: towardsTarget.y - this.vel.y,
        }

        const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
        if (steerMagnitude > 0) {
            steer.x = (steer.x / steerMagnitude) * this.maxForce
            steer.y = (steer.y / steerMagnitude) * this.maxForce
        }

        this.acc.x += steer.x
        this.acc.y += steer.y

        // Move particle
        this.vel.x += this.acc.x
        this.vel.y += this.acc.y
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.acc.x = 0
        this.acc.y = 0
    }

    draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
        // Blend towards target color
        if (this.colorWeight < 1.0) {
            this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
        }

        // Calculate current color
        const currentColor = {
            r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
            g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
            b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
        }

        if (drawAsPoints) {
            ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
            ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
        } else {
            ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
            ctx.beginPath()
            ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    kill(width: number, height: number) {
        if (!this.isKilled) {
            // Set target outside the scene
            const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2)
            this.target.x = randomPos.x
            this.target.y = randomPos.y

            // Begin blending color to black (or transparent)
            this.startColor = {
                r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
                g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
                b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
            }
            this.targetColor = { r: 0, g: 0, b: 0 }
            this.colorWeight = 0

            this.isKilled = true
        }
    }

    generateRandomPos(x: number, y: number, mag: number): Vector2D {
        const randomX = Math.random() * 2000 // wider scatter
        const randomY = Math.random() * 1000

        const direction = {
            x: randomX - x,
            y: randomY - y,
        }

        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
        if (magnitude > 0) {
            direction.x = (direction.x / magnitude) * mag * 1.5
            direction.y = (direction.y / magnitude) * mag * 1.5
        }

        return {
            x: x + direction.x,
            y: y + direction.y,
        }
    }
}

interface ParticleTextEffectProps {
    text?: string
    words?: string[]
    className?: string
    color?: string
    backgroundColor?: string
    canvasHeight?: number
    canvasWidth?: number
    density?: number
    size?: number
}

const DEFAULT_WORDS = ["Particle", "Text", "Effect"]

export function ParticleTextEffect({
    text,
    words,
    className = "",
    color = "#ffffff", // Default to white
    backgroundColor = "transparent",
    canvasHeight = 300,
    canvasWidth = 800,
    density = 5,
    size = 2
}: ParticleTextEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()
    const particlesRef = useRef<Particle[]>([])
    const frameCountRef = useRef(0)
    const wordIndexRef = useRef(0)
    const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false })

    const pixelSteps = density // Density
    const drawAsPoints = true

    // Determine the content to display
    const content = text ? [text] : (words || DEFAULT_WORDS);
    const isStatic = !!text;

    const hexToRgb = (hex: string) => {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
    }

    const targetRgb = hexToRgb(color);

    const generateRandomPos = (x: number, y: number, mag: number, width: number, height: number): Vector2D => {
        const randomX = Math.random() * width
        const randomY = Math.random() * height

        const direction = {
            x: randomX - x,
            y: randomY - y,
        }

        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
        if (magnitude > 0) {
            direction.x = (direction.x / magnitude) * mag
            direction.y = (direction.y / magnitude) * mag
        }

        return {
            x: x + direction.x,
            y: y + direction.y,
        }
    }

    const nextWord = (word: string, canvas: HTMLCanvasElement) => {
        // Create off-screen canvas for text rendering
        const offscreenCanvas = document.createElement("canvas")
        offscreenCanvas.width = canvas.width
        offscreenCanvas.height = canvas.height
        const offscreenCtx = offscreenCanvas.getContext("2d")!

        // Draw text
        offscreenCtx.fillStyle = "white" // Always draw white on offscreen to detect pixels
        // Responsive font size based on canvas width
        const fontSize = Math.min(canvas.width / (word.length * 0.7), canvas.height / 1.5);
        offscreenCtx.font = `bold ${fontSize}px sans-serif`
        offscreenCtx.textAlign = "center"
        offscreenCtx.textBaseline = "middle"
        offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2)

        const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data

        const particles = particlesRef.current
        let particleIndex = 0

        // Collect coordinates
        const coordsIndexes: number[] = []
        for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
            coordsIndexes.push(i)
        }

        // Shuffle coordinates for fluid motion
        for (let i = coordsIndexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
        }

        for (const coordIndex of coordsIndexes) {
            const pixelIndex = coordIndex
            const alpha = pixels[pixelIndex + 3]

            if (alpha > 0) {
                const x = (pixelIndex / 4) % canvas.width
                const y = Math.floor(pixelIndex / 4 / canvas.width)

                let particle: Particle

                if (particleIndex < particles.length) {
                    particle = particles[particleIndex]
                    particle.isKilled = false
                    particleIndex++
                } else {
                    particle = new Particle()

                    const randomPos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2, canvas.width, canvas.height)
                    particle.pos.x = randomPos.x
                    particle.pos.y = randomPos.y

                    particle.maxSpeed = Math.random() * 6 + 4
                    particle.maxForce = particle.maxSpeed * 0.05
                    particle.particleSize = Math.random() * size + (size / 2) // Smaller, finer particles based on size prop
                    particle.colorBlendRate = Math.random() * 0.0275 + 0.0025

                    particles.push(particle)
                }

                // Set color transition
                particle.startColor = {
                    r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
                    g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
                    b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
                }

                // Use prop color
                particle.targetColor = targetRgb

                particle.colorWeight = 0

                particle.target.x = x
                particle.target.y = y
            }
        }

        // Kill remaining particles
        for (let i = particleIndex; i < particles.length; i++) {
            particles[i].kill(canvas.width, canvas.height)
        }
    }

    const animate = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")!
        const particles = particlesRef.current

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i]
            particle.move()
            particle.draw(ctx, drawAsPoints)

            // Remove dead particles that are out of bounds
            if (particle.isKilled) {
                if (
                    particle.pos.x < 0 ||
                    particle.pos.x > canvas.width ||
                    particle.pos.y < 0 ||
                    particle.pos.y > canvas.height
                ) {
                    particles.splice(i, 1)
                }
            }
        }

        // Handle interaction
        if (mouseRef.current.isPressed) {
            // optional: add interaction logic here
            particles.forEach((particle) => {
                const distance = Math.sqrt(
                    Math.pow(particle.pos.x - mouseRef.current.x, 2) + Math.pow(particle.pos.y - mouseRef.current.y, 2),
                )
                if (distance < 50) {
                    // Push away
                    const angle = Math.atan2(particle.pos.y - mouseRef.current.y, particle.pos.x - mouseRef.current.x);
                    particle.pos.x += Math.cos(angle) * 10;
                    particle.pos.y += Math.sin(angle) * 10;
                }
            })
        }

        // Auto-advance words only if not static
        if (!isStatic) {
            frameCountRef.current++
            if (frameCountRef.current % 300 === 0) {
                wordIndexRef.current = (wordIndexRef.current + 1) % content.length
                nextWord(content[wordIndexRef.current], canvas)
            }
        }

        animationRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // DPI scaling
        const dpr = window.devicePixelRatio || 1;

        // precise dimensions
        canvas.width = canvasWidth * dpr
        canvas.height = canvasHeight * dpr

        // CSS dimensions
        canvas.style.width = `${canvasWidth}px`
        canvas.style.height = `${canvasHeight}px`

        const ctx = canvas.getContext("2d")!
        // Do NOT scale context. Logic uses physical pixels.
        // ctx.scale(dpr, dpr) 

        // Initialize with first word - pass scaled context? 
        // Note: nextWord uses canvas.width directly for pixel logic.
        // If we scaled canvas.width by DPR, the pixel logic will work on higher res.
        // But drawing text needs to be scaled up? No, text is drawn on off-screen which uses canvas.width.
        // So logic holds.
        nextWord(content[0], canvas)

        // Start animation
        animate()

        // Mouse event handlers - Adjust coordinates for scaling
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            // Map mouse to canvas coordinates (scaled by dpr)
            mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * canvas.width
            mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * canvas.height
            mouseRef.current.isPressed = true
        }

        const handleMouseLeave = () => {
            mouseRef.current.isPressed = false
        }

        canvas.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            canvas.removeEventListener("mousemove", handleMouseMove)
            canvas.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [content, canvasWidth, canvasHeight, color, density, size])

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <canvas
                ref={canvasRef}
                aria-label={content.join(" ")}
            // Removed explicit width/height classes to let JS control exact dimensions for DPI
            />
            <span className="sr-only">{content.join(" ")}</span>
        </div>
    )
}
