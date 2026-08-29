"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { Alert } from "@/components/ui/Alert";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  InfoIcon,
  FileTextIcon,
  CalendarIcon,
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
  onSlotBookedStateChange?: (isBooked: boolean) => void;
}

export function Step11DrivingTestSlotBooking({
  dlNumber,
  dob,
  onBack,
  onBookingConfirmed,
  onSlotBookedStateChange,
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
  const venueAddress = isPriya
    ? "ARTO Driving Test Facility, Complex Road, Reasi, Jammu & Kashmir - 182311"
    : "Automated Driving Test Track (ADTT), RTO Janakpuri, West Delhi, New Delhi - 110058";

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
      if (onSlotBookedStateChange) {
        onSlotBookedStateChange(true);
      }
    }, 400);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {!isBooked ? (
        <>
          {/* Header for Slot Selection */}
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
                  Driving Test Appointment
                </Badge>
              </div>
              <span className="badge badge-outline badge-md font-bold text-[var(--color-ink)]">
                Automated Test Track (ADTT)
              </span>
            </div>

            <Heading as="h1" className="mt-3 text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
              Book Driving Test Appointment Slot
            </Heading>

            <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl">
              Select your preferred appointment date and time slot for the Motorcycle With Gear (MCWG) practical driving skill evaluation.
            </Text>
          </div>

          {/* Slot Selection Form Card */}
          <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
            {/* Venue & Track Details */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-[var(--color-muted)] text-[0.6875rem] block">
                Testing Track Venue:
              </span>
              <p className="font-bold text-sm text-[var(--color-ink)]">{rtoName}</p>
              <p className="text-[var(--color-muted)]">{venueAddress}</p>
            </div>

            {/* Date Selection */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block flex items-center gap-1.5">
                <CalendarIcon size="sm" className="text-[var(--color-primary)]" />
                1. Select Test Date:
              </span>

              <div className="grid gap-2 sm:grid-cols-5">
                {availableDates.map((item) => (
                  <button
                    key={item.date}
                    type="button"
                    onClick={() => setSelectedDate(item.date)}
                    className={`rounded border p-3 text-center transition-all ${
                      selectedDate === item.date
                        ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] ring-2 ring-[var(--color-primary-soft)]"
                        : "border-[var(--color-border)] bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xs font-bold text-[var(--color-ink)] block">
                      {item.label}
                    </span>
                    <span className="text-[0.625rem] text-emerald-700 font-semibold block mt-0.5">
                      {item.slotsLeft} slots open
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block flex items-center gap-1.5">
                <ClockIcon size="sm" className="text-[var(--color-primary)]" />
                2. Select Time Window:
              </span>

              <div className="grid gap-3 sm:grid-cols-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`rounded border p-3.5 text-left transition-all ${
                      selectedSlot === slot.time
                        ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] ring-2 ring-[var(--color-primary-soft)]"
                        : "border-[var(--color-border)] bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[var(--color-ink)]">
                        {slot.label}
                      </span>
                      {slot.recommended && (
                        <span className="badge badge-success badge-xs">Recommended</span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-xs text-[var(--color-primary)] block mt-1">
                      {slot.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                variant="secondary"
                size="md"
                onClick={onBack}
                className="w-full sm:w-auto text-xs"
              >
                ← Back to Fee Payment
              </Button>

              <Button
                variant="primary"
                size="lg"
                loading={loading}
                rightIcon={<ArrowRightIcon size="md" />}
                onClick={handleBook}
                className="w-full sm:w-auto font-black shadow-md bg-[var(--color-primary)] text-sm sm:text-base py-3 px-8"
              >
                {loading ? "Confirming Slot..." : "Confirm Driving Test Slot →"}
              </Button>
            </div>
          </Card>
        </>
      ) : (
        /* Application Completed & Slot Confirmed Overview Card */
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-[var(--radius-md)] border-2 border-emerald-500 bg-emerald-50/90 p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200 pb-5">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                  ✓
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
                    Application Completed &amp; Appointment Confirmed!
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-800">
                    Your MCWG endorsement application is filed and your driving test slot is officially reserved.
                  </p>
                </div>
              </div>
              <Badge tone="success" size="md">
                Confirmed &amp; Active
              </Badge>
            </div>

            {/* Confirmed Appointment Details Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs bg-white rounded-[var(--radius-sm)] border border-emerald-200 p-4">
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] uppercase tracking-wider block">
                  Test Date
                </span>
                <span className="font-bold text-sm text-[var(--color-ink)]">
                  Mon, 16 Sep 2024
                </span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] uppercase tracking-wider block">
                  Time Slot
                </span>
                <span className="font-bold text-sm text-[var(--color-primary)]">
                  {selectedSlot}
                </span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] uppercase tracking-wider block">
                  Candidate
                </span>
                <span className="font-bold text-sm text-[var(--color-ink)]">
                  {holderName}
                </span>
              </div>
              <div>
                <span className="text-[0.6875rem] text-[var(--color-muted)] uppercase tracking-wider block">
                  Endorsement Added
                </span>
                <span className="font-bold text-sm text-emerald-800">
                  MCWG (Two-Wheeler)
                </span>
              </div>
            </div>

            {/* Venue Address */}
            <div className="rounded-[var(--radius-sm)] bg-white border border-emerald-200 p-4 text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-[var(--color-muted)] text-[0.6875rem] block">
                Please Visit Test Venue on Your Scheduled Date:
              </span>
              <p className="font-bold text-sm text-[var(--color-ink)]">{rtoName}</p>
              <p className="text-[var(--color-muted)]">{venueAddress}</p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                variant="secondary"
                size="md"
                leftIcon={<FileTextIcon size="sm" />}
                onClick={() => alert("Downloading Appointment Pass (PDF)...")}
                className="w-full sm:w-auto text-xs font-bold"
              >
                Download Appointment Pass
              </Button>

              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRightIcon size="md" />}
                onClick={onBookingConfirmed}
                className="w-full sm:w-auto font-black shadow-md bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base py-3 px-8"
              >
                Continue to Journey Dashboard →
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
