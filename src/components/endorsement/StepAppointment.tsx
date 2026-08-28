"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { ArrowRightIcon, ClockIcon, CheckIcon, ShieldIcon, InfoIcon } from "@/components/ui/Icons";
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

  const currentDateObj = availableAppointmentSlots[selectedDateIndex] || availableAppointmentSlots[0];
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
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Step Header */}
      <div className="border-b border-[var(--color-border)] pb-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge tone="primary" icon={<ClockIcon size="sm" />}>
            Step 8 of 8 · Schedule Driving Test
          </Badge>
          <span className="text-xs font-bold text-[var(--color-ink)]">
            Automated Driving Test Track (ADTT)
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Select MCWG Driving Test Appointment Slot
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Choose a date and time slot for your practical driving skill evaluation at the RTO automated sensor track.
        </Text>
      </div>

      {/* 2-Column Calendly/Cal.com Layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] items-start">
        {/* Left Column: Venue Details & Test Day Checklist */}
        <div className="space-y-4">
          <Card padding="md" className="bg-[var(--color-surface)] shadow-card space-y-3">
            <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] pb-2.5">
              <ShieldIcon size="sm" className="text-[var(--color-primary)]" />
              <span className="font-bold text-xs text-[var(--color-ink)]">
                Testing Track & Authority
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                Assigned Authority:
              </span>
              <span className="font-bold text-[var(--color-ink)] block">
                {applicant.rtoOffice.name} ({applicant.rtoOffice.code})
              </span>
              <span className="text-[var(--color-muted)] text-[0.6875rem] block leading-relaxed">
                {applicant.rtoOffice.trackAddress}
              </span>
            </div>

            <div className="rounded bg-[var(--color-surface-subtle)] p-2.5 text-[0.6875rem] text-[var(--color-muted)] border border-[var(--color-border)]">
              <span className="font-bold text-[var(--color-ink)] block mb-1">
                Automated Track Evaluation:
              </span>
              Figure-8 balance track, serpentine slalom, and 15° gradient hill stop/start sensor checkpoints.
            </div>
          </Card>

          {/* Test Day Readiness Checklist */}
          <Card padding="md" className="bg-[var(--color-surface-subtle)] border border-[var(--color-border)] space-y-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-muted)] text-[0.6875rem] block">
              What to Bring on Test Day:
            </span>
            <ul className="space-y-1.5 text-[var(--color-text)] text-[0.6875rem] list-none p-0 m-0">
              <li className="flex items-center gap-2">
                <CheckIcon size="sm" className="text-[var(--color-success)] shrink-0" />
                <span>Your own MCWG vehicle with manual foot gears and clutch</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size="sm" className="text-[var(--color-success)] shrink-0" />
                <span>ISI-standard protective helmet with secured chin strap</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size="sm" className="text-[var(--color-success)] shrink-0" />
                <span>Original Vehicle Registration Certificate (RC) &amp; valid insurance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon size="sm" className="text-[var(--color-success)] shrink-0" />
                <span>Printed Appointment Confirmation Slip &amp; Learner&apos;s Licence copy</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Right Column: Interactive Date Grid & Time Slot Selector */}
        <Card padding="lg" className="bg-[var(--color-surface)] shadow-card space-y-6">
          {/* 1. Date Selector Tabs */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
                1. Select Available Date:
              </span>
              <Badge tone="success" size="sm">
                Slots Open
              </Badge>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-3">
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
                    className={`rounded-[var(--radius-sm)] border p-3 text-left transition-all ${
                      isSelected
                        ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] ring-2 ring-[var(--color-primary-soft)] shadow-sm"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]"
                    }`}
                  >
                    <p className="text-[0.6875rem] font-bold uppercase text-[var(--color-muted)]">
                      {slotDate.day}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-[var(--color-ink)]">
                      {slotDate.formattedDate}
                    </p>
                    <span className="mt-1 inline-block text-[0.625rem] font-semibold text-[var(--color-success-text)]">
                      {slotDate.slots.length} time windows open
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Time Slot Selector */}
          <div className="space-y-2.5 border-t border-[var(--color-border)] pt-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
                2. Choose Time Slot ({currentDateObj.formattedDate}):
              </span>
              <span className="text-[0.6875rem] text-[var(--color-muted)]">
                Arrive 15 min early
              </span>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {currentDateObj.slots.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <label
                    key={slot.id}
                    className={`rounded-[var(--radius-sm)] border p-3.5 cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary-soft)] shadow-sm font-bold"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="appointment-time-slot"
                        value={slot.id}
                        checked={isSelected}
                        onChange={() => setSelectedSlotId(slot.id)}
                        className="size-3.5 text-[var(--color-primary)]"
                      />
                      <div>
                        <span className="text-xs font-mono font-bold block">
                          {slot.time}
                        </span>
                        <span className="text-[0.625rem] text-[var(--color-muted)] font-normal">
                          {slot.availableSeats} slots available
                        </span>
                      </div>
                    </div>

                    <ClockIcon size="sm" className={isSelected ? "text-[var(--color-primary)]" : "opacity-40"} />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="border-t border-[var(--color-border)] pt-4">
            <Button
              variant="primary"
              size="md"
              className="w-full font-bold shadow-md text-xs sm:text-sm"
              rightIcon={<ArrowRightIcon size="sm" />}
              onClick={handleConfirm}
            >
              Confirm Appointment ({currentDateObj.formattedDate} · {selectedSlot.time})
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
