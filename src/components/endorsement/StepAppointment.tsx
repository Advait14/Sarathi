"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon, ClockIcon } from "@/components/ui/Icons";
import {
  availableAppointmentSlots,
  type ApplicantRecord,
} from "@/data/endorsement";

export interface StepAppointmentProps {
  applicant: ApplicantRecord;
  onNext: (appointment: { date: string; formattedDate: string; time: string; venue: string }) => void;
}

export function StepAppointment({ applicant, onNext }: StepAppointmentProps) {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlotId, setSelectedSlotId] = useState("slot_2");

  const currentDateObj = availableAppointmentSlots[selectedDateIndex];
  const selectedSlot = currentDateObj.slots.find((s) => s.id === selectedSlotId) || currentDateObj.slots[0];

  const handleConfirm = () => {
    onNext({
      date: currentDateObj.date,
      formattedDate: `${currentDateObj.formattedDate} (${currentDateObj.day})`,
      time: selectedSlot.time,
      venue: applicant.rtoOffice.trackAddress,
    });
  };

  return (
    <div className="mt-8 space-y-6">
      <Card padding="lg" className="bg-[var(--color-surface)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2">
            <Badge tone="primary">
              Step 8: Slot Booking
            </Badge>
            <span className="text-xs font-semibold text-[var(--color-ink)]">
              MCWG Driving Skill Test
            </span>
          </div>
          <span className="text-xs text-[var(--color-muted)] font-medium">
            Automated Test Track
          </span>
        </div>

        <div className="mt-4">
          <Heading as="h2" variant="section">
            Select Appointment Date & Time Slot
          </Heading>
          <Text className="mt-1 text-sm text-[var(--color-text)]" variant="body">
            Choose a convenient date and time to attend your practical driving test at the RTO track.
          </Text>
        </div>

        {/* Venue Info Banner */}
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block">
            Testing Track Venue
          </span>
          <p className="mt-1 text-sm font-bold text-[var(--color-ink)]">
            {applicant.rtoOffice.trackAddress}
          </p>
        </div>

        {/* 1. Date Selector Tabs */}
        <div className="mt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block mb-2.5">
            1. Available Test Dates
          </span>
          <div className="grid gap-3 sm:grid-cols-3">
            {availableAppointmentSlots.map((slotDate, index) => {
              const isSelected = selectedDateIndex === index;
              return (
                <button
                  key={slotDate.date}
                  type="button"
                  onClick={() => {
                    setSelectedDateIndex(index);
                    setSelectedSlotId(slotDate.slots[0].id);
                  }}
                  className={`rounded-[var(--radius-sm)] border p-3.5 text-left transition-all ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] ring-2 ring-[var(--color-accent-soft)] shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]"
                  }`}
                >
                  <p className="text-xs font-bold text-[var(--color-muted)] uppercase">
                    {slotDate.day}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[var(--color-ink)]">
                    {slotDate.formattedDate}
                  </p>
                  <span className="mt-1 inline-block text-[0.6875rem] font-semibold text-[var(--color-success-text)]">
                    {slotDate.slots.length} time slots available
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Time Slot Selector */}
        <div className="mt-6 border-t border-[var(--color-border)] pt-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block mb-2.5">
            2. Available Time Slots for {currentDateObj.formattedDate}
          </span>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {currentDateObj.slots.map((slot) => {
              const isSelected = selectedSlotId === slot.id;
              return (
                <label
                  key={slot.id}
                  className={`rounded-[var(--radius-sm)] border p-3 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-text)] ring-2 ring-[var(--color-accent-soft)] shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <input
                      type="radio"
                      name="appointment-time-slot"
                      value={slot.id}
                      checked={isSelected}
                      onChange={() => setSelectedSlotId(slot.id)}
                      className="size-3.5 text-[var(--color-accent)]"
                    />
                    <ClockIcon size="sm" className="opacity-60" />
                  </div>
                  <span className="mt-2 text-xs font-bold font-mono">
                    {slot.time}
                  </span>
                  <span className="mt-1 text-[0.625rem] text-[var(--color-muted)]">
                    {slot.availableSeats} slots left
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 border-t border-[var(--color-border)] pt-4">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={handleConfirm}
          >
            Confirm Slot ({currentDateObj.formattedDate} · {selectedSlot.time})
          </Button>
        </div>
      </Card>
    </div>
  );
}
