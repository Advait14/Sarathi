"use client";

import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AppShell } from "@/components/layout/AppShell";
import {
  JourneyHeader,
  JourneyProgress,
  CurrentStage,
  StatusSummary,
  NextAction,
} from "@/components/journey";
import { PrerequisiteView } from "@/components/prerequisites";
import { EndorsementFlow } from "@/components/endorsement";
import { ActionableStatusView } from "@/components/status";
import { WaitingView } from "@/components/waiting";
import { ActionAvailableView } from "@/components/action-available";
import { RecoveryView } from "@/components/recovery";
import { CompletedView } from "@/components/completed";
import { ContextualAssistant } from "@/components/assistant";
import { syntheticJourneyData } from "@/data/journey";
import type { PrerequisiteStateKey } from "@/data/prerequisites";

type ViewState =
  | PrerequisiteStateKey
  | "active_journey"
  | "endorsement_flow"
  | "status_system"
  | "waiting_state"
  | "action_available_state"
  | "recovery_blocked"
  | "recovery_stalled"
  | "completed_state";

const viewStateOptions: { key: ViewState; label: string; badge: string }[] = [
  {
    key: "prerequisite_missing",
    label: "1. Prerequisite Missing",
    badge: "Missing LL",
  },
  {
    key: "ll_application_required",
    label: "2. LL Application Required",
    badge: "Action Needed",
  },
  {
    key: "eligible_for_endorsement",
    label: "3. Eligible for Endorsement",
    badge: "Ready",
  },
  {
    key: "waiting_state",
    label: "4. Waiting State (Screen 07)",
    badge: "You're All Set",
  },
  {
    key: "action_available_state",
    label: "5. Action Available (Screen 08)",
    badge: "Next Step Ready",
  },
  {
    key: "recovery_blocked",
    label: "6. Recovery: Blocked",
    badge: "Missing Condition",
  },
  {
    key: "recovery_stalled",
    label: "7. Recovery: Stalled",
    badge: "No Progress",
  },
  {
    key: "completed_state",
    label: "8. Completed (Screen 13)",
    badge: "MCWG Added",
  },
  {
    key: "endorsement_flow",
    label: "9. Endorsement Flow",
    badge: "9 Steps",
  },
  {
    key: "status_system",
    label: "10. Status System",
    badge: "6 States",
  },
  {
    key: "active_journey",
    label: "11. Journey Dashboard",
    badge: "Stage 4",
  },
];

function JourneyApp() {
  const { user, licence, activeApplication, isAuthenticated, refresh } = useAuth();
  const [activeViewState, setActiveViewState] = useState<ViewState>("waiting_state");

  // Automatically sync initial state when user switches
  useEffect(() => {
    if (user?.dlNumber === "DL-0420200099887") {
      // Priya Verma has missing LL -> switch to prerequisite missing
      setActiveViewState("prerequisite_missing");
    }
  }, [user?.dlNumber]);

  const {
    serviceType,
    steps,
    status,
    vehicleClass,
  } = syntheticJourneyData;

  const currentDl = user?.dlNumber ?? "DL-0420110023456";
  const currentName = user?.name ?? "Advait Sharma";
  const currentAppRef = activeApplication?.applicationNumber ?? "SJ-MCWG-2048";
  const completedCount = steps.filter((s) => s.state === "completed").length;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl relative">
        {/* Prototype Demo State Switcher */}
        <section
          aria-label="Prototype state switcher"
          className="mb-8 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:p-4 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-[var(--color-border-subtle)]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                Prototype Scenario State Switcher
              </span>
              <span className="rounded bg-[var(--color-success-soft)] px-1.5 py-0.5 text-[0.625rem] font-bold text-[var(--color-success-text)] border border-[var(--color-success-border)]">
                JSON Backend Active
              </span>
            </div>
            <span className="text-[0.6875rem] text-[var(--color-subtle)]">
              {isAuthenticated && user ? (
                <>
                  Logged in: <strong className="text-[var(--color-ink)]">{user.name}</strong> ({user.dlNumber})
                </>
              ) : (
                <span className="text-[var(--color-muted)] font-medium">
                  Signed Out (Viewing Prototype Demo) · <span className="text-[var(--color-accent-text)] font-semibold">Click &quot;Citizen Sign In&quot; to log in</span>
                </span>
              )}
            </span>
          </div>


          <div className="flex flex-wrap gap-2">
            {viewStateOptions.map((option) => {
              const isSelected = activeViewState === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setActiveViewState(option.key)}
                  aria-pressed={isSelected}
                  className={`inline-flex min-h-9 items-center gap-2 rounded-[var(--radius-xs)] px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-1 ${
                    isSelected
                      ? "bg-[var(--color-primary)] text-white shadow-sm ring-2 ring-[var(--color-primary-soft)]"
                      : "bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
                  }`}
                >
                  <span>{option.label}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[0.625rem] font-bold uppercase ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[var(--color-surface-muted)] text-[var(--color-muted)]"
                    }`}
                  >
                    {option.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* View Rendering */}
        {activeViewState === "completed_state" ? (
          <CompletedView
            onViewJourney={() => setActiveViewState("active_journey")}
          />
        ) : activeViewState === "recovery_blocked" ? (
          <RecoveryView
            initialMode="blocked"
            onApplyForLL={() => setActiveViewState("ll_application_required")}
            onSearchRecords={() => setActiveViewState("active_journey")}
            onViewRtoDetails={() => setActiveViewState("active_journey")}
          />
        ) : activeViewState === "recovery_stalled" ? (
          <RecoveryView
            initialMode="stalled"
            onApplyForLL={() => setActiveViewState("ll_application_required")}
            onSearchRecords={() => setActiveViewState("active_journey")}
            onViewRtoDetails={() => setActiveViewState("active_journey")}
          />
        ) : activeViewState === "action_available_state" ? (
          <ActionAvailableView
            onContinue={() => setActiveViewState("endorsement_flow")}
            onViewJourney={() => setActiveViewState("active_journey")}
          />
        ) : activeViewState === "waiting_state" ? (
          <WaitingView />
        ) : activeViewState === "status_system" ? (
          <ActionableStatusView
            initialStateKey="waiting"
            onNavigateJourney={() => setActiveViewState("active_journey")}
          />
        ) : activeViewState === "endorsement_flow" ? (
          <EndorsementFlow
            onExitFlow={() => setActiveViewState("active_journey")}
            onFlowCompleted={async () => {
              await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "complete_journey" }),
              });
              await refresh();
              setActiveViewState("completed_state");
            }}
          />
        ) : activeViewState === "active_journey" ? (
          <div>
            {/* Journey Header */}
            <JourneyHeader
              applicationReference={currentAppRef}
              completedCount={completedCount}
              existingLicence={`${currentDl} (${currentName})`}
              serviceType={serviceType}
              totalSteps={steps.length}
              vehicleClass={vehicleClass}
            />

            {/* 2-Column Responsive Layout */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
              {/* Left Column: Journey Progress Timeline */}
              <div className="space-y-6">
                <JourneyProgress steps={steps} />
              </div>

              {/* Right Column: Status Clarity & Actions (Sticky on Desktop) */}
              <div className="space-y-6 lg:sticky lg:top-6">
                {/* 1. Where I am */}
                <CurrentStage
                  stageNumber={status.whereAmI.stageNumber}
                  totalStages={status.whereAmI.totalStages}
                  title={status.whereAmI.title}
                  description={status.whereAmI.description}
                />

                {/* 2. What I need to do & What happens next */}
                <NextAction
                  actionTitle={status.whatINeedToDo.actionTitle}
                  instructions={status.whatINeedToDo.instructions}
                  primaryCtaText={status.whatINeedToDo.primaryCtaText}
                  whatHappensNext={status.whatHappensNext}
                  onActionClick={() => setActiveViewState("endorsement_flow")}
                />

                {/* 3. What happened, What is happening, Who needs to act */}
                <StatusSummary
                  whatHappened={status.whatHappened}
                  whatIsHappening={status.whatIsHappening}
                  whoNeedsToAct={status.whoNeedsToAct}
                />
              </div>
            </div>
          </div>
        ) : (
          <PrerequisiteView
            stateKey={activeViewState}
            onApplyForLL={() => setActiveViewState("ll_application_required")}
            onContinueToEndorsement={() => setActiveViewState("endorsement_flow")}
          />
        )}

        {/* Secondary Contextual AI Assistant Floating Layer */}
        <ContextualAssistant activeStateKey={activeViewState} />
      </div>
    </AppShell>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <JourneyApp />
    </AuthProvider>
  );
}
