# 08 — State Model

The product should be state-driven.

The UI should render the appropriate citizen experience based on the journey state.

## Screen Architecture

The documented 13 UX screens remain the primary experience architecture.

Journey states do not require one page per state. Multiple states may render through the same reusable screen or component when their interaction pattern is the same.

For example:

- An Application Status screen/component may render submitted, under-review, waiting, action-available, processing, stalled, and blocked variants.
- The Journey screen may render prerequisite, eligibility, endorsement, test, and completion variants.

State drives the displayed status, explanation, owner, required action, primary CTA, and next step. It does not create a new screen unless a distinct interaction requires one.

---

# State 01 — prerequisite_missing

## User-facing title

You're not ready to continue yet

## Owner

Applicant

## Applicant action

Apply for MCWG Learner's Licence

## Next

ll_application_required

---

# State 02 — ll_application_required

## Title

You need an MCWG Learner's Licence first

## Owner

Applicant

## Action

Apply for LL

## Next

ll_application_submitted

---

# State 03 — ll_application_submitted

## Title

Your Learner's Licence application has been submitted

## Owner

System / licensing authority

## Applicant action

Wait for next update

## Next

ll_under_review

---

# State 04 — ll_under_review

## Title

Your Learner's Licence is being reviewed

## Owner

Licensing authority

## Applicant action

None

## Next

ll_issued_waiting_period

---

# State 05 — ll_issued_waiting_period

## Title

Your Learner's Licence is active

## Explanation

The next eligibility condition is still in progress.

## Applicant action

Wait / prepare

## Next

eligible_for_endorsement

---

# State 06 — eligible_for_endorsement

## Title

You're ready to add MCWG

## Applicant action

Continue

## Next

endorsement_in_progress

---

# State 07 — endorsement_in_progress

## Title

Your endorsement application is in progress

## Applicant action

Complete required application steps

## Next

payment_required

---

# State 08 — payment_required

## Title

Payment is required

## Applicant action

Complete payment

## Next

appointment_required

---

# State 09 — appointment_required

## Title

Book your driving test

## Applicant action

Select appointment

## Next

test_required

---

# State 10 — test_required

## Title

Your driving test is next

## Applicant action

Attend test

## Next

processing

---

# State 11 — processing

## Title

Your licence is being updated

## Owner

System / licensing authority

## Applicant action

None

## Next

completed

---

# State 12 — action_available

## Title

Your next step is ready

## Applicant action

Continue

## Next

Depends on previous stage.

---

# State 13 — stalled

## Title

Your application hasn't progressed

## Applicant action

Review / recover

## Next

recovery

---

# State 14 — blocked

## Title

Your journey is blocked

## Applicant action

Resolve missing requirement

## Next

recovery

---

# State 15 — completed

## Title

MCWG has been added to your licence

## Applicant action

None

## Journey complete

---

# TypeScript-Oriented Model

```ts
export type JourneyState =
  | "prerequisite_missing"
  | "ll_application_required"
  | "ll_application_submitted"
  | "ll_under_review"
  | "ll_issued_waiting_period"
  | "eligible_for_endorsement"
  | "endorsement_in_progress"
  | "payment_required"
  | "appointment_required"
  | "test_required"
  | "processing"
  | "action_available"
  | "stalled"
  | "blocked"
  | "completed";

export interface JourneyStateConfig {
  title: string;
  description: string;
  owner: "applicant" | "rto" | "system" | "mixed";
  applicantAction: boolean;
  primaryAction?: string;
  nextState?: JourneyState;
}
