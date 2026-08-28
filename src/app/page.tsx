"use client";

import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AppShell } from "@/components/layout/AppShell";
import { MasterJourneyView } from "@/components/journey";
import { PrerequisiteView } from "@/components/prerequisites";
import { EndorsementFlow } from "@/components/endorsement";
import { ActionableStatusView } from "@/components/status";
import { WaitingView } from "@/components/waiting";
import { ActionAvailableView } from "@/components/action-available";
import { RecoveryView } from "@/components/recovery";
import { CompletedView } from "@/components/completed";
import { ContextualAssistant } from "@/components/assistant";
import { PortalEntryFlow } from "@/components/portal-entry";
import { UNIFIED_SCENARIOS, type UnifiedJourneyState } from "@/data/unifiedJourney";

type ScenarioKey =
  | "portal_entry"
  | "scenario_1_prereq_missing"
  | "scenario_2_waiting_period"
  | "scenario_3_eligible"
  | "scenario_4_endorsement_filing"
  | "scenario_5_under_review"
  | "scenario_6_blocked"
  | "scenario_7_stalled"
  | "scenario_8_test_booked"
  | "scenario_9_completed"
  | "status_system"
  | "master_timeline";

function JourneyApp() {
  const { user, isAuthenticated, refresh } = useAuth();
  // Clean default entry: Official Parivahan State Selection & Citizen Onboarding
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("portal_entry");

  // Sync user context when logged in with different profiles
  useEffect(() => {
    if (user?.dlNumber === "DL-0420200099887") {
      setActiveScenario("scenario_1_prereq_missing");
    }
  }, [user?.dlNumber]);

  // Current unified journey state
  const currentScenarioState: UnifiedJourneyState =
    UNIFIED_SCENARIOS[activeScenario] || UNIFIED_SCENARIOS.scenario_3_eligible;

  const handleActionClick = (actionKey?: string) => {
    if (actionKey === "apply_ll") {
      setActiveScenario("scenario_1_prereq_missing");
    } else if (actionKey === "start_endorsement" || actionKey === "open_endorsement_flow") {
      setActiveScenario("scenario_4_endorsement_filing");
    } else if (actionKey === "prep_tips") {
      setActiveScenario("scenario_8_test_booked");
    } else if (actionKey === "view_licence") {
      setActiveScenario("scenario_9_completed");
    } else {
      setActiveScenario("master_timeline");
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl relative space-y-6">
        {/* Active Journey View Rendering */}
        {activeScenario === "portal_entry" ? (
          <PortalEntryFlow
            onCompleteToJourney={(dl) => {
              if (dl.includes("99887")) {
                setActiveScenario("scenario_1_prereq_missing");
              } else {
                setActiveScenario("scenario_3_eligible");
              }
            }}
          />
        ) : activeScenario === "scenario_1_prereq_missing" ? (
          <PrerequisiteView
            stateKey="prerequisite_missing"
            onApplyForLL={() => setActiveScenario("scenario_1_prereq_missing")}
            onContinueToEndorsement={() => setActiveScenario("scenario_4_endorsement_filing")}
          />
        ) : activeScenario === "scenario_2_waiting_period" ? (
          <WaitingView onActionClick={() => setActiveScenario("scenario_8_test_booked")} />
        ) : activeScenario === "scenario_3_eligible" ? (
          <MasterJourneyView
            journeyState={UNIFIED_SCENARIOS.scenario_3_eligible}
            onPrimaryAction={() => setActiveScenario("scenario_4_endorsement_filing")}
          />
        ) : activeScenario === "scenario_4_endorsement_filing" ? (
          <EndorsementFlow
            onExitFlow={() => setActiveScenario("master_timeline")}
            onFlowCompleted={async () => {
              try {
                await fetch("/api/applications", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ action: "complete_journey" }),
                });
                await refresh();
              } catch (err) {
                console.warn("Backend completion sync error:", err);
              }
              setActiveScenario("scenario_9_completed");
            }}
          />
        ) : activeScenario === "scenario_5_under_review" ? (
          <MasterJourneyView
            journeyState={UNIFIED_SCENARIOS.scenario_5_under_review}
            onPrimaryAction={() => setActiveScenario("status_system")}
          />
        ) : activeScenario === "scenario_6_blocked" ? (
          <RecoveryView
            initialMode="blocked"
            onApplyForLL={() => setActiveScenario("scenario_1_prereq_missing")}
            onSearchRecords={() => setActiveScenario("master_timeline")}
            onViewRtoDetails={() => setActiveScenario("master_timeline")}
          />
        ) : activeScenario === "scenario_7_stalled" ? (
          <RecoveryView
            initialMode="stalled"
            onApplyForLL={() => setActiveScenario("scenario_1_prereq_missing")}
            onSearchRecords={() => setActiveScenario("master_timeline")}
            onViewRtoDetails={() => setActiveScenario("master_timeline")}
          />
        ) : activeScenario === "scenario_8_test_booked" ? (
          <ActionAvailableView
            onContinue={() => setActiveScenario("scenario_4_endorsement_filing")}
            onViewJourney={() => setActiveScenario("master_timeline")}
          />
        ) : activeScenario === "scenario_9_completed" ? (
          <CompletedView
            onViewJourney={() => setActiveScenario("master_timeline")}
          />
        ) : activeScenario === "status_system" ? (
          <ActionableStatusView
            initialStateKey="waiting"
            onNavigateJourney={() => setActiveScenario("master_timeline")}
          />
        ) : (
          /* Master Timeline Dashboard View */
          <MasterJourneyView
            journeyState={currentScenarioState}
            onPrimaryAction={handleActionClick}
          />
        )}

        {/* Floating Contextual AI Assistant */}
        <ContextualAssistant activeStateKey={activeScenario} />
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
