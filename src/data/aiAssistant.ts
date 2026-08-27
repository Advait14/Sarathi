export interface AssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface StateContextInfo {
  stateLabel: string;
  suggestedQuestions: string[];
  contextSummary: string;
}

export const stateContextMap: Record<string, StateContextInfo> = {
  prerequisite_missing: {
    stateLabel: "Prerequisite Check (Missing MCWG LL)",
    suggestedQuestions: [
      "Why can't I continue?",
      "What does an MCWG Learner's Licence mean?",
      "Do I need to visit the RTO for an LL?",
      "What happens next?",
    ],
    contextSummary:
      "You are at the pre-endorsement eligibility check. You hold an existing LMV licence, but the required Motorcycle With Gear (MCWG) Learner's Licence is missing.",
  },
  ll_application_required: {
    stateLabel: "LL Application Required",
    suggestedQuestions: [
      "Why is a Learner's Licence mandatory first?",
      "Do I need to do anything right now?",
      "How do I apply for the MCWG LL online?",
      "What happens next?",
    ],
    contextSummary:
      "You need to file an online application for an MCWG Learner's Licence (Form 2) before the full DL endorsement can be processed.",
  },
  eligible_for_endorsement: {
    stateLabel: "Eligible for Endorsement",
    suggestedQuestions: [
      "What documents will I need for Form 2?",
      "How much is the endorsement fee?",
      "Do I need to do anything right now?",
      "What happens next?",
    ],
    contextSummary:
      "Your MCWG Learner's Licence is active and the 30-day statutory holding period is complete. You are ready to submit Form 2.",
  },
  waiting_state: {
    stateLabel: "Stage 4: In Review by RTO",
    suggestedQuestions: [
      "What does Approval of LL by Licensing Authority mean?",
      "Do I need to do anything right now?",
      "What is happening with my application?",
      "What happens next?",
    ],
    contextSummary:
      "Your application documents and linked MCWG LL are under active scrutiny by the Licensing Authority at RTO Janakpuri. No action is required from you.",
  },
  action_available_state: {
    stateLabel: "Stage 4: Action Available",
    suggestedQuestions: [
      "What changed in my application?",
      "Do I need to do anything right now?",
      "How much is the fee payment?",
      "What happens next?",
    ],
    contextSummary:
      "The licensing authority completed scrutiny. Your next step (statutory fee payment of ₹850 and slot booking) is unlocked.",
  },
  recovery_blocked: {
    stateLabel: "Recovery: Blocked Condition",
    suggestedQuestions: [
      "Why can't I continue?",
      "What is missing from my application?",
      "What does CMVR Rule 15 require?",
      "What happens next?",
    ],
    contextSummary:
      "Your endorsement is blocked because an active MCWG Learner's Licence was not found on the national register.",
  },
  recovery_stalled: {
    stateLabel: "Recovery: Inactivity / Stalled",
    suggestedQuestions: [
      "Why has my application not progressed?",
      "Who currently owns this step?",
      "How do I contact RTO Janakpuri?",
      "Do I need to do anything right now?",
    ],
    contextSummary:
      "Your application has remained in queue at RTO Janakpuri for 15 days without status change.",
  },
  completed_state: {
    stateLabel: "Journey Complete (MCWG Added)",
    suggestedQuestions: [
      "What does my updated licence cover?",
      "How do I access my digital driving licence?",
      "When will my physical smart card arrive?",
      "Do I need to do anything right now?",
    ],
    contextSummary:
      "Your MCWG endorsement is complete. You are legally authorized to drive both LMV and MCWG vehicles.",
  },
  endorsement_flow: {
    stateLabel: "9-Step Endorsement Flow",
    suggestedQuestions: [
      "What happens after I submit Form 2?",
      "What fee is charged for MCWG endorsement?",
      "Do I need to do anything right now?",
      "What happens next?",
    ],
    contextSummary:
      "You are completing the 9-step Form 2 endorsement application, fee payment, and test appointment booking.",
  },
  active_journey: {
    stateLabel: "Your Journey Dashboard",
    suggestedQuestions: [
      "What does Approval of LL by Licensing Authority mean?",
      "Do I need to do anything right now?",
      "Who currently needs to act?",
      "What happens next?",
    ],
    contextSummary:
      "Viewing the 6-stage citizen journey dashboard tracking your progress from existing LMV licence to final MCWG update.",
  },
  status_system: {
    stateLabel: "Actionable Status System",
    suggestedQuestions: [
      "What does Approval of LL by Licensing Authority mean?",
      "Do I need to do anything right now?",
      "What does Holding Period under CMVR 15 mean?",
      "What happens next?",
    ],
    contextSummary:
      "Reviewing the 6 documented application status states and plain-language interpretations.",
  },
};

export function generateAssistantResponse(query: string, activeStateKey: string): string {
  const normalized = query.toLowerCase().trim();
  const context = stateContextMap[activeStateKey] ?? stateContextMap.waiting_state;

  // 1. "What does Approval of LL by Licensing Authority mean?"
  if (
    normalized.includes("approval of ll") ||
    normalized.includes("licensing authority mean") ||
    normalized.includes("official status mean") ||
    normalized.includes("approval mean")
  ) {
    return `**"Approval of LL by Licensing Authority"** is the official statutory status used in the Parivahan portal when a designated Motor Licensing Officer is reviewing and verifying your Learner's Licence records.\n\n` +
      `• **Plain English Meaning**: The RTO is verifying that your MCWG Learner's Licence is authentic, valid, and meets the mandatory holding requirements.\n` +
      `• **Who is acting**: The Licensing Authority (RTO Janakpuri).\n` +
      `• **Your action**: Nothing required right now. The status updates automatically once the officer signs off.`;
  }

  // 2. "Do I need to do anything right now?"
  if (
    normalized.includes("do i need to do anything") ||
    normalized.includes("need to do anything") ||
    normalized.includes("action needed") ||
    normalized.includes("my action")
  ) {
    if (activeStateKey === "action_available_state") {
      return `**Yes, your action is required right now:**\n\n` +
        `Your application review is complete. You now need to:\n` +
        `1. Review your Form 2 endorsement details.\n` +
        `2. Pay the statutory government fee of **₹850**.\n` +
        `3. Select your preferred date and time slot for the practical test at RTO Janakpuri.`;
    }

    if (activeStateKey === "prerequisite_missing" || activeStateKey === "recovery_blocked" || activeStateKey === "ll_application_required") {
      return `**Yes, action is needed to unblock your journey:**\n\n` +
        `You need to apply for an **MCWG Learner's Licence** first. You can complete this entirely online via Aadhaar authentication without visiting the RTO.`;
    }

    if (activeStateKey === "completed_state") {
      return `**No action required — you're all set!**\n\n` +
        `Your MCWG endorsement is complete. Your digital licence is active in DigiLocker/mParivahan, and your physical smart card is on its way via Speed Post.`;
    }

    return `**No action is required from you right now.**\n\n` +
      `Your application is currently with the **Licensing Authority (RTO Janakpuri)** for scrutiny. Your details and documents are on record, and we will notify you the moment your next step (fee payment & slot booking) unlocks.`;
  }

  // 3. "Why can't I continue?"
  if (
    normalized.includes("why can't i continue") ||
    normalized.includes("why cant i continue") ||
    normalized.includes("cannot continue") ||
    normalized.includes("blocked") ||
    normalized.includes("what is missing")
  ) {
    if (activeStateKey === "prerequisite_missing" || activeStateKey === "recovery_blocked" || activeStateKey === "ll_application_required") {
      return `**Why you cannot continue right now:**\n\n` +
        `Under **Rule 15 of the Central Motor Vehicles Rules (CMVR, 1989)**, you cannot directly add a new category to a driving licence without first holding a valid **Learner's Licence** for that category.\n\n` +
        `• **What is missing**: Active MCWG (Motorcycle With Gear) Learner's Licence.\n` +
        `• **What you can do**: Apply for an MCWG LL online. Once issued and the holding period is satisfied, the full endorsement flow will unlock immediately.`;
    }

    if (activeStateKey === "waiting_state" || activeStateKey === "recovery_stalled") {
      return `**Your application is currently paused in review:**\n\n` +
        `Your application is awaiting officer sign-off at RTO Janakpuri. You cannot proceed to slot booking until the licensing officer verifies your submitted documents and declarations.`;
    }

    return `**Current status check:**\n\n` +
      `Based on your current stage (${context.stateLabel}), ${context.contextSummary.toLowerCase()}`;
  }

  // 4. "What happens next?"
  if (
    normalized.includes("what happens next") ||
    normalized.includes("happens next") ||
    normalized.includes("next step") ||
    normalized.includes("after this")
  ) {
    if (activeStateKey === "waiting_state") {
      return `**Here is what happens next:**\n\n` +
        `1. The RTO licensing officer completes scrutiny of your Form 2 and LL records.\n` +
        `2. Your journey state updates to **"Action Available"**.\n` +
        `3. You will pay the statutory fee of **₹850** and choose an appointment slot at the Janakpuri Automated Driving Test Track.`;
    }

    if (activeStateKey === "action_available_state") {
      return `**Here is what happens next:**\n\n` +
        `1. You click **"Continue"** to confirm your endorsement filing.\n` +
        `2. Pay the statutory fee of ₹850 online.\n` +
        `3. Select an appointment slot for your practical riding test.\n` +
        `4. An appointment confirmation slip with required test-day documents will be generated.`;
    }

    if (activeStateKey === "completed_state") {
      return `**Here is what happens next:**\n\n` +
        `• **Immediate**: Download or view your updated digital DL on mParivahan or DigiLocker.\n` +
        `• **Physical delivery**: Speed Post will deliver your updated smart card to your registered address (Tracking #ED881290345IN).`;
    }

    return `**Next Stage in Your Journey:**\n\n` +
      `After the current step (${context.stateLabel}) is fulfilled, your application will advance to the next scheduled milestone in the 6-stage endorsement roadmap.`;
  }

  // 5. Questions about Fees
  if (normalized.includes("fee") || normalized.includes("cost") || normalized.includes("how much") || normalized.includes("price")) {
    return `**Statutory Endorsement Fee Breakdown:**\n\n` +
      `• **Endorsement of Vehicle Class (Form 2)**: ₹500\n` +
      `• **Driving Skill Test Fee (MCWG Category)**: ₹300\n` +
      `• **Automated Track User Maintenance**: ₹50\n` +
      `• **Total Statutory Fee**: **₹850**\n\n` +
      `*Note: No additional charges or hidden fees are required under MoRTH rules.*`;
  }

  // 6. Generic Fallback
  return `**Contextual Journey Assistance** (${context.stateLabel}):\n\n` +
    `${context.contextSummary}\n\n` +
    `• **Need immediate clarity?** Try asking: *"Do I need to do anything right now?"*, *"What happens next?"*, or *"Why can't I continue?"*\n\n` +
    `*Disclaimer: This is a prototype assistance layer grounded in CMVR guidelines. It does not perform live transactions or make official legal determinations.*`;
}
