# Sarathi Journey — AGENTS.md

## 1. Project Overview

Project name: Sarathi Journey

Sarathi Journey is a citizen-first UX prototype rethinking the driving-licence endorsement journey on India's Sarathi / Parivahan platform.

The prototype focuses on one specific scenario:

> An existing LMV Driving Licence holder wants to add MCWG (Motorcycle With Gear) to their existing licence.

The project is being developed as a hackathon prototype for the "Build What Moves India" challenge.

The goal is not to replace Sarathi's government workflow.

The goal is to make the existing workflow understandable as one continuous citizen journey.

---

## 2. Core Problem

Sarathi presents a complex government process through separate services, forms, transactions and technical application statuses.

The citizen experiences the task as one goal:

> "I want to add MCWG to my licence."

The main UX problem is that prerequisites, dependencies, waiting periods, responsibility, current state and next action are not sufficiently connected into one understandable journey.

A citizen can successfully complete an individual transaction while still not understanding how to complete the overall goal.

The central product insight is:

> The application has a status. The applicant needs a next step.

---

## 3. Product Thesis

Create a citizen-facing journey layer around the existing Sarathi workflow.

The experience should make the following visible:

1. What the applicant wants to accomplish
2. What they need before starting
3. Where they currently are
4. What has already happened
5. Who needs to act
6. Whether the applicant needs to do anything
7. What happens next
8. What to do if the journey is blocked or stalled
9. When the journey is complete

Do not replace the underlying government process.

---

## 4. Primary Scenario

Primary demo:

Existing LMV licence
→ wants MCWG
→ prerequisite check
→ Learner Licence / eligibility
→ endorsement
→ application
→ waiting
→ next action
→ driving test
→ licence updated

The prototype must support this journey end-to-end using synthetic data.

---

## 5. Product Hypotheses

### H1 — Journey continuity

If the complete endorsement process is represented as one persistent journey, applicants will better understand where they are and what remains.

### H3 — Actionable status

Every status should answer:

- What happened?
- What is happening now?
- Who needs to act?
- Do I need to do anything?
- What happens next?

### H4 — Proactive updates

Meaningful application state changes should surface contextual updates explaining what changed and why it matters.

### H5 — Recovery

When an applicant is blocked, delayed or not yet eligible, the system should explain why and provide an appropriate recovery path.

---

## 6. Explicit Non-Goals

Do not build:

- a complete Sarathi clone
- a replacement for the Parivahan website
- a new government service-discovery portal
- an agent-replacement product
- a generic AI chatbot
- a real government backend
- live government API integrations
- real Aadhaar authentication
- real OTP functionality
- real payment processing
- real RTO integrations
- real applicant personal data

The prototype is a design and frontend proof of concept.

---

## 7. Evidence Discipline

Always distinguish between:

### Observed evidence

Information directly observed in the user's supplied screenshots, application documents and Sarathi journey.

### Personal experience

The user's individual experience navigating the process.

### Government/process evidence

Information explicitly contained in supplied official/form documents or independently verified sources.

### Design hypothesis

A proposed explanation or intervention that still requires user validation.

### Synthetic prototype data

Data invented only to demonstrate prototype states.

Never present synthetic data as real government information.

Never make population-level claims based only on one user's experience.

Never invent official SLAs, eligibility rules, government policies or system behaviour.

---

## 8. Supplied Evidence

Important supplied documents include:

- Form 2 / pre-filled application
- Application Reference Slip
- LL application documents
- Payment receipt
- Self Declaration / Form 1
- existing licence information
- screenshots of Sarathi journey
- screenshots of VANI/chatbot interaction

The supplied Form 2 identifies:

"Addition of Class of Vehicle to Driving Licence"

and includes vehicle classes such as:

- MCWOG
- MCWG
- LMV NTV

The supplied application reference identifies:

"Issue of New LL Application (MCWG)"

and states that after successful approval the Learner Licence can be downloaded and printed.

Use the supplied documents as evidence.

---

## 9. Core UX Principle

Every important state should answer:

> Where am I?

> What happened?

> Who needs to act?

> Do I need to do anything?

> What happens next?

---

## 10. Journey Principles

### Journey over transaction

Design around the user's goal rather than individual government forms.

### Explain status

Never expose a technical status without interpreting it.

### Make responsibility explicit

Clearly distinguish:

- You need to do
- Government is doing
- Waiting for
- Blocked

### Surface dependencies early

Do not make applicants discover prerequisites by failing later.

### One primary action

Each state should have one clear primary CTA.

### Progressive disclosure

Do not overwhelm the user with all process details at once.

### Recovery

Every important blocked state should explain the reason and provide a path forward.

---

## 11. Visual Style

The visual language should feel:

- civic
- calm
- trustworthy
- modern
- accessible
- clear

The product should communicate:

> Government reliability + consumer-product clarity

Do not copy the existing Sarathi visual design.

Do not create a generic startup landing page.

Do not use excessive visual decoration.

---

## 12. Color System

Use semantic color tokens.

Primary:
- deep navy / indigo

Accent:
- civic blue

Success:
- green

Warning:
- amber

Error:
- red

Information:
- blue

Background:
- warm/light neutral

Surfaces:
- white / very light neutral

Color must never be the only way of communicating state.

---

## 13. Typography

Use a modern highly legible sans-serif.

Prioritize:

- strong hierarchy
- large readable headings
- comfortable body copy
- high contrast
- clear labels
- readable status messages

Avoid:

- tiny government-form typography
- excessive uppercase
- dense paragraphs
- overly decorative typography

---

## 14. Layout

Use:

- generous whitespace
- consistent spacing scale
- clear content width
- strong vertical rhythm
- one primary content column where appropriate
- persistent journey context
- responsive layouts

Avoid:

- dense dashboards
- excessive nested cards
- card-within-card layouts
- unnecessary sidebars
- excessive decorative containers

---

## 15. Responsive Design

The prototype must work on:

- desktop
- tablet
- mobile

Prioritize mobile usability.

Touch targets must be large enough.

No horizontal overflow.

No clipped CTAs.

No essential information should disappear on mobile.

---

## 16. Component Principles

Prefer reusable components.

Potential components include:

- AppShell
- Header
- JourneyProgress
- JourneyStep
- StatusCard
- ActionCard
- PrerequisiteCheck
- EligibilityCard
- NotificationBanner
- RecoveryPanel
- HelpPanel
- Button
- Badge
- Modal
- Timeline
- FormField

Do not create unnecessary abstractions.

---

## 17. AI Principles

AI is contextual assistance.

AI may:

- explain government terminology
- explain application status
- explain why a journey is blocked
- provide contextual guidance

AI must not:

- replace the primary journey
- invent government policies
- claim access to live government systems
- make decisions that require official verification
- become a generic chatbot-first interface

---

## 18. Synthetic Data

Use synthetic data only.

Never include:

- real Aadhaar numbers
- real OTPs
- real payment details
- real credentials
- real API keys
- real personal information

All application IDs, dates, statuses and appointments in the prototype must be synthetic.

---

## 19. MCP Usage

Use available MCP tools only when they materially improve the project.

### Mobbin

Use Mobbin for UX pattern research and inspiration.

Research:

- prerequisite flows
- eligibility
- multi-step applications
- progress tracking
- application status
- waiting states
- notifications
- blocked states
- recovery
- completion

Never copy Mobbin designs directly.

Extract interaction patterns and principles.

### Figma

Use Figma when available for:

- design references
- visual inspection
- design-to-code context
- visual QA

### Browser / visual testing

Use browser/testing tools to:

- run the application
- test the main journey
- inspect responsive behaviour
- verify interactions
- visually inspect states

### GitHub

Use GitHub tools only if available.

GitHub MCP is optional.

Local Git remains the source-control mechanism if GitHub MCP is unavailable.

---

## 20. Design Skills

Use available design/frontend skills relevant to:

- UX design
- visual design
- design systems
- responsive design
- accessibility
- interaction design
- frontend architecture
- visual QA

Do not invent skill names.

Inspect available skills before using them.

---

## 21. Documentation Rules

Before implementing a new screen or changing the user journey:

Read the relevant documentation.

At minimum:

- docs/01-project-brief.md
- docs/03-user-journeys.md
- docs/05-ux-specification.md
- docs/06-content-and-microcopy.md
- docs/08-state-model.md
- docs/11-reference-sources.md

Do not invent new journey states without documenting them.

Do not invent government requirements.

Do not add features merely because they are technically easy.

---

## 22. Implementation Rules

Preferred stack:

- Next.js
- React
- TypeScript
- CSS / CSS variables
- local synthetic data

Avoid unnecessary dependencies.

Prefer simple architecture.

Do not introduce a backend unless explicitly required.

---

## 23. Validation

After meaningful implementation:

Run:

- typecheck
- lint
- build
- relevant tests

Then visually inspect the running application.

Check:

- desktop
- mobile
- keyboard navigation
- focus states
- contrast
- button behaviour
- state transitions
- error states
- loading states
- empty states

---

## 24. Definition of Done

The prototype is complete when a user can:

1. State their goal
2. Understand prerequisites
3. Determine eligibility
4. Follow the journey
5. Understand current status
6. Know whether they need to act
7. Receive a meaningful next-step update
8. Recover from a blocked/stalled state
9. Reach completion

Do not continue adding features once this journey works reliably.
