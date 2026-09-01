# FRONTEND FORM CONTRACTS

**Validation rule:** client validation improves UX; server/API validation remains authoritative.

## 1. Personnel verification

Operation: `verifyPersonnelIdentity`

Fields:
- `personnel_number`: required non-empty string;
- `phone`: required non-empty string.

Do not invent client normalization that changes identity semantics.
Do not reveal whether only one field exists/matches.
No:
- self-registration;
- password;
- SMS OTP;
- email login.

## 2. Add AI-case — text

Operation: `createTask`

Fields:
- `input_channel = text`;
- `raw_input`: required, non-empty;
- `links`: optional URI strings.

Forbidden UI fields:
- file attachment;
- retrospective task date;
- manual Complexity;
- manual Score;
- manual XP/HP;
- task-to-do completion checkbox.

URLs are stored strings; no crawler/preview/content-analysis feature.

## 3. Voice/STT

Flow:
`record → STT → editable transcript → createTask`.

Rules:
- microphone permission state explicit;
- source audio ephemeral/not retained by Product;
- transcript preview/edit required;
- no uploaded audio-file attachment flow is invented;
- STT failure offers retry/text fallback.

## 4. Transcript

Before `createTask`, transcript is an editable local draft.

Do not fabricate durable server draft persistence if the API has not persisted a task yet.

## 5. Clarification answer

Operation: `answerTaskClarification`

Fields:
- `answer_text`: required non-empty;
- `answer_channel`: typed API enum.

Frontend renders only clarification returned by backend.
There is no fourth-question route/state.
After third, backend continues according to frozen AI/business rules.

## 6. Edit AI-case

Operation: `updateTask`

Fields:
- `expected_version_no`;
- `raw_input`;
- `input_channel`;
- optional `links`.

Not editable:
- normalized description as an authoritative stored result;
- Complexity;
- Score;
- XP;
- goal-match result.

Save creates a new version/reprocessing path through backend.

## 7. Delete AI-case

Soft-delete command:
- requires explicit destructive action;
- uses current expected version/idempotency contract;
- frontend never performs ledger reversal itself.

A confirmation interaction is allowed/expected for destructive delete.
No extra confirmation is invented for privacy/vacation.

## 8. Monthly Goal setup

Operation: `submitGoalSetup`

Fields:
- `cycle_id`;
- `selected_option_ids`: exactly 2 unique choices.

UI:
- server supplies five options;
- user selects exactly two;
- third goal is server-assigned;
- do not let frontend create or edit target formulas.

## 9. Privacy

Operation: `updatePrivacyLevel`

Use only API enum:
- `closed`;
- `standard`;
- `open`
(or exact wire values generated from current OpenAPI).

Apply server-confirmed value only.

## 10. Vacation

Operation: `setVacationState`

Field:
- `enabled: boolean`.

No date picker/backdating is added.
No retroactive vacation mutation is invented.

## 11. Admin forms

Admin UI may mutate only typed Admin API fields.

No Admin form may contain a manual Score/Complexity override.

For conflicts:
- show conflict;
- refetch;
- preserve user-entered draft where safe;
- require intentional resubmit.

## 12. Accessibility for all forms

- label every input;
- associate error message programmatically;
- focus first meaningful error after failed submit where appropriate;
- loading/disabled is not conveyed by color alone;
- no duplicate submit;
- touch target ≥44×44 px for interactive controls.
