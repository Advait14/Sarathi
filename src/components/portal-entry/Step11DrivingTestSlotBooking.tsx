"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  InfoIcon,
} from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";
import type { PortalServiceItem, StateRecord } from "@/data/portalEntry";

export interface Step11DrivingTestSlotBookingProps {
  selectedState: StateRecord;
  selectedService: PortalServiceItem;
  dlNumber: string;
  dob: string;
  onBack: () => void;
  onBookingConfirmed: () => void;
}

export function Step11DrivingTestSlotBooking({
  dlNumber,
  dob,
  onBack,
  onBookingConfirmed,
  selectedService,
  selectedState,
}: Step11DrivingTestSlotBookingProps) {
  const { refresh } = useAuth();
  const [selectedDate, setSelectedDate] = useState("2024-09-16");
  const [selectedSlot, setSelectedSlot] = useState("09:30 AM - 11:30 AM");
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPriya = dlNumber.includes("99887");
  const holderName = isPriya ? "Priya Verma" : "Advait Sharma";
  const rtoName = isPriya ? "ARTO Reasi Test Track (JK-20)" : "RTO Janakpuri Automated Track (DL-04)";

  const availableDates = [
    { date: "2024-09-16", label: "Mon, 16 Sep", slotsLeft: 18, isRecommended: true },
    { date: "2024-09-17", label: "Tue, 17 Sep", slotsLeft: 12 },
    { date: "2024-09-18", label: "Wed, 18 Sep", slotsLeft: 8 },
    { date: "2024-09-19", label: "Thu, 19 Sep", slotsLeft: 22 },
    { date: "2024-09-20", label: "Fri, 20 Sep", slotsLeft: 15 },
  ];

  const timeSlots = [
    { time: "09:30 AM - 11:30 AM", label: "Morning Session", recommended: true },
    { time: "11:30 AM - 01:30 PM", label: "Midday Session" },
    { time: "02:30 PM - 04:30 PM", label: "Afternoon Session" },
  ];

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Record appointment in backend DB
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "book_slot",
          date: selectedDate,
          timeSlot: selectedSlot,
          rtoLocation: rtoName,
        }),
      });
      await refresh();
    } catch (err) {
      console.warn("Backend appointment sync error:", err);
    }

    setTimeout(() => {
      setLoading(false);
      setIsBooked(true);
    }, 500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pb-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              ← Fee Payment
            </Button>
            <Badge tone="primary" icon={<ClockIcon size="sm" />}>
              Step 11 of 11 · Driving Test Appointment
            </Badge>
          </div>
          <span className="text-xs font-bold text-[var(--color-ink)]">
            Automated Sensor Test Track (ADTT)
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Book Driving Test Appointment Slot
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Select your preferred appointment date and time slot for the Motorcycle With Gear (MCWG) practical driving skill evaluation.
        </Text>
      </div>

      {!isBooked ? (
        /* Slot Selection Form Card */
        <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
          {/* Test Track Location Info Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--color-primary-border)] bg-[var(--color-primary-soft)] p-4 text-xs">
            <div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                Testing Track Location
              </span>
              <span className="text-sm font-bold text-[var(--color-ink)]">{rtoName}</span>
              <span className="text-[0.6875rem] text-[var(--color-muted)] block mt-0.5">
                Automated Sensor Track · Figure-8 & Gradient Hill Evaluation
              </span>
            </div>

            <Badge tone="success" size="sm" icon={<CheckIcon size="sm" />}>
              Fee Paid (₹850)
            </Badge>
          </div>

          <form onSubmit={handleBook} className="space-y-6">
            {/* 1. Date Picker */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
                Select Test Appointment Date:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.date;
                  return (
                    <button
                      key={item.date}
                      type="button"
                      onClick={() => setSelectedDate(item.date)}
                      className={`rounded-[var(--radius-sm)] border p-3 text-center transition-all ${
                        isSelected
                          ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] ring-2 ring-[var(--color-primary-soft)] shadow-sm"
                          : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]"
                      }`}
                    >
                      <span className="text-xs font-bold text-[var(--color-ink)] block">
                        {item.label}
                      </span>
                      <span className="text-[0.625rem] text-[var(--color-success-text)] font-semibold mt-1 block">
                        {item.slotsLeft} Slots Left
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Time Slot Selector */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
                Select Time Window:
              </span>

              <div className="grid sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`rounded-[var(--radius-sm)] border p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] ring-2 ring-[var(--color-primary-soft)] shadow-sm"
                          : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[var(--color-ink)]">
                          {slot.time}
                        </span>
                        {slot.recommended ? (
                          <Badge tone="primary" size="sm">
                            Optimal
                          </Badge>
                        ) : null}
                      </div>
                      <span className="text-[0.6875rem] text-[var(--color-muted)] block mt-1">
                        {slot.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Test Day Checklist Card */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-xs space-y-2">
              <span className="font-bold text-[var(--color-ink)] block">
                What to Bring on Driving Test Day:
              </span>
              <ul className="space-y-1 text-[var(--color-muted)] text-[0.6875rem] list-disc pl-4">
                <li>Your own MCWG vehicle (Motorcycle with manual clutch and foot gears).</li>
                <li>ISI-certified standard protective motorcycle helmet with chin strap.</li>
                <li>Original Registration Certificate (RC) &amp; valid vehicle insurance.</li>
                <li>Original Learner&apos;s Licence copy &amp; printed Appointment Slip.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--color-border)]">
              <Button type="button" variant="secondary" size="md" onClick={onBack}>
                ← Back to Fee Details
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                rightIcon={<ArrowRightIcon size="sm" />}
                className="font-bold shadow-md text-xs sm:text-sm"
              >
                Confirm Appointment Slot ({selectedSlot})
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        /* Appointment Confirmed Slip */
        <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6 border-2 border-[var(--color-success-border)]">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--color-success-border)]">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-success-text)] text-white font-bold">
                ✓
              </div>
              <div>
                <span className="text-xs font-bold text-[var(--color-success-text)] block">
                  Driving Test Appointment Confirmed
                </span>
                <span className="text-base font-bold text-[var(--color-ink)]">
                  Slot Booked: Mon, 16 Sep 2024 at {selectedSlot}
                </span>
              </div>
            </div>

            <Badge tone="success" size="sm">
              Slot Reserved
            </Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-xs rounded bg-[var(--color-success-soft)] p-4 border border-[var(--color-success-border)]">
            <div>
              <span className="text-[0.6875rem] text-[var(--color-muted)] block">Appointment Slip No:</span>
              <span className="font-mono font-bold text-sm text-[var(--color-ink)]">APT-DL04-2024-9912</span>
            </div>
            <div>
              <span className="text-[0.6875rem] text-[var(--color-muted)] block">Candidate Name:</span>
              <span className="font-bold text-sm text-[var(--color-ink)]">{holderName} ({dlNumber})</span>
            </div>
            <div>
              <span className="text-[0.6875rem] text-[var(--color-muted)] block">Test Location:</span>
              <span className="font-semibold text-[var(--color-ink)]">{rtoName}</span>
            </div>
            <div>
              <span className="text-[0.6875rem] text-[var(--color-muted)] block">Vehicle Class Test:</span>
              <span className="font-mono font-bold text-[var(--color-primary)]">MCWG (Motorcycle With Gear)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--color-border)]">
            <button
              type="button"
              className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
            >
              ↓ Download Official Appointment Slip (PDF)
            </button>

            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRightIcon size="sm" />}
              onClick={onBookingConfirmed}
              className="font-bold shadow-md text-xs sm:text-sm"
            >
              View Live Journey Tracking Dashboard
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
