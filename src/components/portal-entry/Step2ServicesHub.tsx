"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  ShieldIcon,
  ArrowRightIcon,
  CheckIcon,
  FileTextIcon,
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
  selectedService,
  selectedState,
}: Step2ServicesHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "All Services (18)" },
    { key: "endorsement", label: "Licence Endorsements & Classes" },
    { key: "extract", label: "DL Extract & Records" },
    { key: "renewal", label: "Renewals & Changes" },
    { key: "applications", label: "Applications & Tracking" },
  ];

  const filteredServices = useMemo(() => {
    return PORTAL_SERVICES.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

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
              ← Change State
            </Button>
            <Badge tone="primary" icon={<ShieldIcon size="sm" />}>
              Step 2 of 4 · Services Hub
            </Badge>
          </div>
          <span className="text-xs font-bold text-[var(--color-ink)]">
            Transport Dept · {selectedState.name}
          </span>
        </div>

        <Heading as="h1" className="mt-3" variant="title">
          Driving Licence Services Directory
        </Heading>

        <Text className="mt-1.5 text-sm text-[var(--color-text)] max-w-2xl" variant="body">
          Select the service you wish to apply for. Services are structured by category to eliminate guesswork.
        </Text>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div>
          <label htmlFor="service-search-input" className="sr-only">
            Search services
          </label>
          <input
            id="service-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword (e.g. MCWG, Endorsement, Extract, Renewal, Address)..."
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-ink)] focus-visible:border-[var(--color-focus)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[var(--color-primary)] text-white shadow-sm"
                    : "bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => {
          const isSelected = selectedService.id === service.id;
          return (
            <Card
              key={service.id}
              padding="md"
              onClick={() => onSelectService(service)}
              className={`flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] ring-2 ring-[var(--color-primary-soft)] shadow-md"
                  : service.highlight
                  ? "border-2 border-[var(--color-accent-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:shadow-sm"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    tone={
                      service.highlight
                        ? "primary"
                        : service.popular
                        ? "success"
                        : "neutral"
                    }
                    size="sm"
                  >
                    {service.tag}
                  </Badge>
                  {service.formCode ? (
                    <span className="text-[0.625rem] font-mono font-bold text-[var(--color-muted)] uppercase">
                      {service.formCode}
                    </span>
                  ) : null}
                </div>

                <Heading
                  as="h3"
                  variant="subsection"
                  className={`mt-2.5 text-sm font-bold leading-snug ${
                    isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-ink)]"
                  }`}
                >
                  {service.title}
                </Heading>

                <Text className="mt-1.5 text-xs text-[var(--color-muted)] leading-normal">
                  {service.shortDescription}
                </Text>
              </div>

              <div className="mt-4 border-t border-[var(--color-border-subtle)] pt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--color-primary)] group-hover:underline">
                  {isSelected ? "Selected" : "Select Service →"}
                </span>
                {isSelected ? (
                  <CheckIcon size="sm" className="text-[var(--color-primary)] stroke-[2.5]" />
                ) : null}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Selected Action Floating Bottom Bar */}
      <Card padding="md" className="bg-[var(--color-surface)] shadow-card border-l-4 border-l-[var(--color-primary)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
              Proceeding With Service:
            </span>
            <p className="text-sm font-bold text-[var(--color-ink)]">
              {selectedService.title}
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRightIcon size="sm" />}
            onClick={onNext}
            className="font-bold shadow-sm"
          >
            Continue to Service Instructions
          </Button>
        </div>
      </Card>
    </div>
  );
}
