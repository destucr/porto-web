"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface DeviceProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

function IPhoneMockup({ src, alt, className, priority }: DeviceProps) {
  return (
    <div
      className={cn(
        "relative flex-shrink-0 bg-[#1a1a1a] rounded-[36px] p-[6px] shadow-2xl border border-white/10",
        "dark:bg-[#0a0a0a] dark:border-white/[0.06]",
        className
      )}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-[#1a1a1a] dark:bg-[#0a0a0a] rounded-b-2xl z-10" />
      {/* Screen */}
      <div className="relative rounded-[30px] overflow-hidden aspect-[393/852] bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="240px"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </div>
  )
}

const DEVICES = [
  {
    src: "/images/solari-running.webp",
    alt: "Solari — Running companion app",
    style: {
      transform: "rotate(-8deg) translateY(24px)",
    },
    animDelay: "1.5s",
    fadeDelay: "200ms",
  },
  {
    src: "/images/telly-home-course.webp",
    alt: "Telly — BISINDO sign language learning",
    style: {
      transform: "translateY(0)",
      zIndex: 20,
    },
    animDelay: "0s",
    fadeDelay: "0ms",
    center: true,
  },
  {
    src: "/images/tiny-livelisten-start.webp",
    alt: "Tiny App — Baby heartbeat listener",
    style: {
      transform: "rotate(8deg) translateY(24px)",
    },
    animDelay: "3s",
    fadeDelay: "400ms",
  },
]

export function HeroDevices() {
  return (
    <div className="relative flex items-center justify-center gap-[-20px]">
      {/* Ambient glow behind the center device */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] rounded-full bg-foreground/[0.03] blur-3xl animate-pulse-soft"
        aria-hidden="true"
      />

      <div className="flex items-center justify-center -space-x-8 md:-space-x-12">
        {DEVICES.map((device, i) => (
          <div
            key={i}
            className="opacity-0 animate-fade-in"
            style={{
              ...device.style,
              animationDelay: device.fadeDelay,
              animationDuration: "1s",
              animationFillMode: "forwards",
            }}
          >
            <div
              className="animate-float"
              style={{
                animationDelay: device.animDelay,
                animationDuration: device.center ? "6s" : "7s",
              }}
            >
              <IPhoneMockup
                src={device.src}
                alt={device.alt}
                className={cn(
                  device.center ? "w-[180px] md:w-[220px]" : "w-[150px] md:w-[185px]"
                )}
                priority={device.center}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
