/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
} from "@/components/ui/Icons";

interface CampaignItem {
  id: string;
  tag: string;
  badgeTone: "success" | "primary" | "warning";
  title: string;
  subtitle: string;
  imageUrl: string;
  stats: string;
  ctaText: string;
}

const CAMPAIGNS: CampaignItem[] = [
  {
    id: "camp_notto_organ",
    tag: "Organ Donation Awareness",
    badgeTone: "success",
    title: "Pledge for Organ Donation on Your Driving Licence",
    subtitle: "One organ donor can save up to 8 lives. Your pledge is recorded on your Smart Card Driving Licence.",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop",
    stats: "1,82,48,799 Citizens Pledged",
    ctaText: "Take Pledge",
  },
  {
    id: "camp_automated_track",
    tag: "Road Safety & Testing",
    badgeTone: "primary",
    title: "Sensor-Based Automated Driving Test Tracks",
    subtitle: "High-precision ADTT tracks with real-time biometric and sensor-based skill evaluation.",
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop",
    stats: "100% Automated Testing",
    ctaText: "View Track Info",
  },
  {
    id: "camp_digilocker_sync",
    tag: "Digital Credentials & Sync",
    badgeTone: "warning",
    title: "Instant Digital Licence on DigiLocker & mParivahan",
    subtitle: "Your newly endorsed classes are automatically synchronized across national traffic registries.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
    stats: "Paperless & Instant",
    ctaText: "Learn More",
  },
];

export function NottoOrganDonationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasPledged, setHasPledged] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAMPAIGNS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const active = CAMPAIGNS[currentIndex];

  return (
    <div className="w-full space-y-1.5">
      {/* Sleek Minimal Campaign Banner with Clean Photo Integration */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="group relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-sm bg-[var(--color-ink)] text-white min-h-[180px] sm:min-h-[220px] flex items-center"
      >
        {/* Background Photo with Smooth Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={active.imageUrl}
            alt={active.title}
            className="w-full h-full object-cover object-center opacity-30 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge tone={active.badgeTone} size="sm" className="font-black">
                {active.tag}
              </Badge>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                • {active.stats}
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
              {active.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {active.subtitle}
            </p>
          </div>

          {/* Action & Controls */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md"
            >
              {hasPledged ? "✓ Pledge Recorded" : active.ctaText}
            </Button>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? CAMPAIGNS.length - 1 : prev - 1
                  )
                }
                aria-label="Previous slide"
                className="flex size-7.5 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-xs transition-colors"
              >
                <ChevronLeftIcon size="sm" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % CAMPAIGNS.length)
                }
                aria-label="Next slide"
                className="flex size-7.5 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-xs transition-colors"
              >
                <ChevronRightIcon size="sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {CAMPAIGNS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx
                  ? "w-6 bg-white shadow-xs"
                  : "w-1.5 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slogan Banner Strip */}
      <div className="rounded-[var(--radius-sm)] bg-[#003366] px-4 py-2 text-center text-white shadow-xs text-xs font-medium">
        <span>
          &ldquo;Others can live when we agree to give. Take a simple step, donate your organs. There is no bar of age, sex or color.&rdquo;
        </span>
      </div>

      {/* Pledge Modal */}
      {isModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="w-full max-w-md rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
              <div className="flex items-center gap-2">
                <HeartIcon size="sm" className="text-rose-600" />
                <h3 className="font-bold text-sm text-[var(--color-ink)]">
                  National Organ Donation Pledge
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-lg font-bold text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-[var(--color-text)] leading-relaxed">
              Your pledge will be recorded on your Smart Card Driving Licence and synchronized with the National Organ &amp; Tissue Transplant Registry (NOTTO).
            </p>

            <div className="rounded bg-[var(--color-surface-subtle)] p-3 border border-[var(--color-border)] text-xs space-y-2">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[var(--color-ink)]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="size-3.5 text-emerald-600 rounded"
                />
                <span>I pledge to donate all usable organs &amp; tissues</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setHasPledged(true);
                  setIsModalOpen(false);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                Confirm Pledge
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
