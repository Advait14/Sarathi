"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/components/ui/Icons";
import {
  PORTAL_SERVICES,
  type PortalServiceItem,
  type StateRecord,
} from "@/data/portalEntry";

export interface Step2ServicesHubProps {
  selectedState: StateRecord;
  selectedService: PortalServiceItem;
  onSelectService: (service: PortalServiceItem) => void;
  onBack: () => void;
  onNext: () => void;
}

export function Step2ServicesHub({
  onBack,
  onNext,
  onSelectService,
  selectedState,
}: Step2ServicesHubProps) {
  const handleServiceClick = (service: PortalServiceItem) => {
    // Only Additional Endorsement to DL is active and functional
    if (service.id === "add_endorsement_mcwg") {
      onSelectService(service);
      onNext();
    }
  };

  const featuredService = PORTAL_SERVICES.find((s) => s.id === "add_endorsement_mcwg") || PORTAL_SERVICES[0];
  const otherServices = PORTAL_SERVICES.filter((s) => s.id !== "add_endorsement_mcwg");

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
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
              ← Change State
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Services Directory
            </Badge>
          </div>
          <span className="badge badge-outline badge-md font-bold text-[var(--color-ink)]">
            {selectedState.name} ({selectedState.code})
          </span>
        </div>

        <Heading as="h1" className="mt-3 text-2xl sm:text-3xl font-black text-[var(--color-ink)] tracking-tight">
          Driving Licence Services Directory
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl">
          Select the service you wish to apply for in {selectedState.name}. Your primary vehicle class endorsement flow is highlighted below.
        </Text>
      </div>

      {/* 1. Primary Highlighted Service (Task-Based Selection Hero) */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block">
          Recommended Service for Licence Holders:
        </span>

        <Card
          padding="lg"
          onClick={() => handleServiceClick(featuredService)}
          className="border-2 border-[var(--color-primary)] bg-gradient-to-r from-blue-50/70 via-white to-indigo-50/40 hover:shadow-xl hover:border-blue-700 transition-all cursor-pointer ring-4 ring-blue-100/60 p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="primary" className="font-bold">
                  ★ Active Endorsement Flow
                </Badge>
                <span className="badge badge-success badge-sm font-semibold gap-1">
                  <CheckIcon size="sm" />
                  Instant Online Processing
                </span>
              </div>

              <Heading as="h2" className="text-xl sm:text-2xl font-black text-[var(--color-ink)]">
                {featuredService.title}
              </Heading>

              <Text className="text-sm text-slate-700 leading-relaxed">
                Add Motorcycle With Gear (MCWG / Two-Wheeler) to your existing LMV driving licence with smart DL lookup, pre-flight eligibility check, fee payment, and automated test slot scheduling.
              </Text>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRightIcon size="md" />}
                onClick={() => handleServiceClick(featuredService)}
                className="w-full sm:w-auto font-black shadow-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm sm:text-base py-3 px-6"
              >
                Apply Online →
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* 2. Secondary Services Directory Grid */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block">
          All Other Citizen Transport Services:
        </span>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((service) => (
            <Card
              key={service.id}
              padding="md"
              className="bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="neutral" size="sm">
                    {service.category}
                  </Badge>
                  <span className="badge badge-ghost badge-xs text-[0.625rem] uppercase">
                    Direct Service
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--color-ink)]">
                  {service.title}
                </h3>
                <p className="text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                <span className="text-[0.6875rem] text-[var(--color-muted)]">
                  Standard RTO Schedule
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled
                  className="text-xs opacity-60 cursor-not-allowed"
                >
                  Coming Soon
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
