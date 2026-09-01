# I18N / LOCALIZATION CONTRACT

## 1. MVP locale

Current MVP UI language: **Russian (`ru`)**.

All user-facing strings are externalized from React components even though only Russian is required for MVP.

## 2. Resource structure

Recommended replaceable structure:

```text
src/shared/i18n/
  ru/
    common.json
    auth.json
    home.json
    aiCase.json
    goals.json
    history.json
    rating.json
    profile.json
    management.json
    admin.json
    errors.json
```

A repo-pinned i18n implementation such as `i18next/react-i18next` is a `SAFE_ENGINEERING_DEFAULT`, not a Product requirement.

## 3. Exact owner-approved strings

The Russian resource must preserve:

```json
{
  "nav.home": "Главная",
  "nav.history": "История",
  "nav.rating": "Рейтинг",
  "nav.profile": "Профиль",
  "home.addAiCase": "Добавить AI-задачу"
}
```

Do not restore historical:
- `Задачи` bottom tab;
- standalone `Добавить` bottom tab;
- old Home CTA copy.

## 4. Backend-controlled labels

Do not translate/rename backend semantic values in a way that changes meaning.

UI can map:
- enums → localized display labels;
- API error codes → localized safe messages.

Store/transport canonical wire values.

## 5. Dates/numbers

Centralize display formatting with browser `Intl`/localization library.

Business time remains server-authoritative:
- Saint Petersburg business date/calendar;
- working day;
- goal cycle;
- annual period.

Browser locale/time zone does not decide game logic.

## 6. Dynamic AI/user text

Do not pass raw user text through translation catalogs.

Normalized AI-case description and provider-generated content are rendered as content, not localization keys.

## 7. Fallback

Missing translation key:
- development/test: visible diagnostic + test failure policy;
- production: stable Russian fallback/key-safe behavior;
- never silently show an unrelated invented string.
