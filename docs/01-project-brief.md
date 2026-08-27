
---

# 3. `docs/01-project-brief.md`

```markdown
# 01 — Project Brief

## Project

Sarathi Journey

## Challenge

Build What Moves India

## Platform

Sarathi / Parivahan

## Product Area

Driving Licence

## Specific Use Case

Adding a new vehicle class to an existing Driving Licence.

## Primary Scenario

An existing LMV licence holder wants to add MCWG (Motorcycle With Gear).

---

# 1. Background

Sarathi supports multiple driving-licence related services.

The citizen may encounter:

- Learner's Licence
- Driving Licence
- Additional Endorsement
- Renewal
- Duplicate licence
- Corrections
- Testing
- Slot booking
- Application tracking

The formal government application structure includes "Addition of Class of Vehicle to Driving Licence" and lists vehicle classes including MCWG and LMV NTV. :contentReference[oaicite:2]{index=2}

The user's supplied application reference also shows a separate MCWG Learner's Licence application. :contentReference[oaicite:3]{index=3}

---

# 2. User Goal

The user's mental model is simple:

> "I already have a driving licence. I want to add a motorcycle category."

The government workflow is more complex.

The product challenge is to bridge the gap between:

### Citizen goal

"I want MCWG on my licence."

and:

### Government process

Multiple services, prerequisites, applications, approvals, waiting periods, tests and updates.

---

# 3. Core Problem

The citizen is required to reconstruct the relationship between multiple process stages.

The system exposes transactions and statuses.

The citizen needs a journey.

---

# 4. Core Insight

> The application has a status. The applicant needs a next step.

---

# 5. Product Thesis

Build a citizen-facing journey layer around the existing Sarathi workflow.

The layer should make:

- prerequisites
- eligibility
- current stage
- responsibility
- next action
- waiting
- state changes
- recovery
- completion

visible.

---

# 6. Primary Hypotheses

## H1 — Journey continuity

A persistent journey will improve understanding of the complete process.

## H3 — Actionable status

Status becomes useful when it tells the citizen what it means and what happens next.

## H4 — Proactive updates

Meaningful state changes should be surfaced rather than requiring repeated manual checking.

## H5 — Recovery

Blocked and stalled states should explain the reason and provide a recovery path.

---

# 7. Non-goals

The project does not attempt to:

- replace agents
- redesign all Parivahan services
- create a new government portal
- build a generic chatbot
- connect to live government APIs
- automate official decisions

---

# 8. MVP

The MVP demonstrates:

1. Goal
2. Prerequisite
3. Eligibility
4. Application
5. Waiting
6. Next action
7. Notification
8. Recovery
9. Completion

---

# 9. Success Definition

The experience succeeds when the applicant can answer:

> Where am I?

> Do I need to do anything?

> Who needs to act?

> What happens next?

---

# 10. Prototype Constraints

- Synthetic data
- No live government systems
- No real credentials
- No real payments
- No real personal data
- Frontend-only prototype