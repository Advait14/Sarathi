
---

# 5. `docs/03-user-journeys.md`

```markdown
# 03 — User Journeys

# Primary Journey

Existing LMV licence → Add MCWG

---

# Journey A — Prerequisite Missing

## Entry

User selects:

"Add MCWG to my driving licence."

## User intent

Understand whether they can start.

## Current state

Existing LMV licence.

MCWG Learner's Licence unavailable.

## System response

Identify missing prerequisite.

## User-facing message

"You need an MCWG Learner's Licence before continuing with this journey."

## Primary CTA

Apply for MCWG Learner's Licence

## Secondary action

Learn why

## Success

User understands the prerequisite and enters the LL journey.

---

# Journey B — LL Issued but Eligibility Period Not Complete

## Entry

User has MCWG LL.

## User intent

Continue toward endorsement.

## Current state

LL exists but required eligibility period is not complete.

## User-facing message

"Your Learner's Licence is active, but you're not ready for the next stage yet."

## Show

- LL issue date
- eligibility date
- current status
- what can be done meanwhile

## Primary CTA

View journey

## Secondary

Prepare for test

## Success

User understands that waiting is expected and knows when to return.

---

# Journey C — Ready to Endorse

## Entry

MCWG LL exists.

Eligibility condition satisfied.

## User intent

Complete endorsement.

## Show

✓ Existing DL verified

✓ MCWG LL

✓ Eligibility complete

## Primary CTA

Continue

---

# Journey D — Endorsement Application

## Existing flow

1. Verify existing DL
2. Confirm licence details
3. Confirm address
4. Select Additional Endorsement to DL
5. Select MCWG
6. Complete declaration
7. Submit
8. Payment
9. Slot booking
10. Driving test

The formal application structure includes an existing licence section and class-of-vehicle information. :contentReference[oaicite:8]{index=8}

---

# Journey E — Waiting After Submission

## Entry

Application submitted.

## Current state

Application under processing.

## User intent

Understand whether they need to act.

## User-facing message

"Your application is being reviewed."

## Responsibility

RTO / system

## Applicant action

None.

## Primary CTA

View journey

## Secondary

View application details

---

# Journey F — Action Available

## Trigger

Application state changes.

## Notification

"Your next step is ready."

## Explanation

Explain:

- what changed
- why it matters
- what can now be done

## Primary CTA

Continue

---

# Journey G — Stalled

## Trigger

No meaningful state change for a synthetic demonstration period.

## User-facing message

"Your application hasn't progressed."

## Show

- current stage
- last update
- who currently owns the step

## Recovery

- review application
- contact appropriate office
- raise grievance if applicable

Do not invent official SLA claims.

---

# Journey H — Blocked

## Trigger

Required condition missing.

## User-facing message

"Your journey is blocked."

## Explain

What is missing.

Why it matters.

What to do.

## Primary CTA

Resolve issue

---

# Journey I — Completion

## Entry

Driving test / final processing complete.

## Show

✓ MCWG added

✓ Licence updated

## Primary CTA

View updated licence

## Secondary

View journey

---

# Journey State Diagram

```mermaid
flowchart TD

A[Goal: Add MCWG] --> B{Prerequisite available?}

B -- No --> C[Apply for MCWG LL]
C --> D[LL application submitted]

B -- Yes --> E{Eligibility complete?}

D --> F[LL under review]
F --> G[LL issued]
G --> E

E -- No --> H[Waiting / eligibility period]
H --> E

E -- Yes --> I[Ready for endorsement]
I --> J[Endorsement application]
J --> K[Payment]
K --> L[Appointment]
L --> M[Driving test]
M --> N[Processing]
N --> O[MCWG added]

N --> P{Stalled?}
P -- Yes --> Q[Recovery]
P -- No --> O

J --> R{Blocked?}
R -- Yes --> S[Explain blocker]
S --> Q