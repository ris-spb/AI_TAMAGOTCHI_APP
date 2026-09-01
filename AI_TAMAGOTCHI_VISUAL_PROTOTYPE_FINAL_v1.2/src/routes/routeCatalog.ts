import type { ScreenRouteContract } from './contracts';

export const screenRouteCatalog = [
  { screenId: 'SCR_AUTH_LOGIN', screenName: 'First Login / Personnel Verification', path: '/login', roles: ['public'], routeClass: 'PUBLIC', platform: 'Mobile/Web', shell: 'public' },
  { screenId: 'SCR_ONBOARDING', screenName: 'Onboarding', path: '/onboarding', roles: ['authenticated'], routeClass: 'AUTH_GATE', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_GOAL_SETUP', screenName: 'Monthly Goal Setup', path: '/goals/setup', roles: ['employee'], routeClass: 'DATA_GATE', platform: 'Mobile/Web', shell: 'employee' },
  { screenId: 'SCR_HOME', screenName: 'Home', path: '/', roles: ['employee'], routeClass: 'PRIMARY_TAB', platform: 'Mobile primary / responsive web', shell: 'employee' },
  { screenId: 'SCR_CASE_ADD', screenName: 'Add AI Case — Text', path: '/ai-cases/new', roles: ['employee'], routeClass: 'FLOW', platform: 'Mobile/Web', shell: 'employee' },
  { screenId: 'SCR_CASE_VOICE', screenName: 'Voice Recording / STT', path: '/ai-cases/new/voice', roles: ['employee'], routeClass: 'FLOW', platform: 'Mobile primary', shell: 'employee' },
  { screenId: 'SCR_CASE_TRANSCRIPT', screenName: 'Transcript Preview / Edit', path: '/ai-cases/new/transcript', roles: ['employee'], routeClass: 'FLOW_EPHEMERAL', platform: 'Mobile/Web', shell: 'employee' },
  { screenId: 'SCR_CASE_PROCESSING', screenName: 'AI Processing', path: '/ai-cases/:taskId/processing', roles: ['employee'], routeClass: 'FLOW', platform: 'Mobile/Web', shell: 'employee' },
  { screenId: 'SCR_CASE_CLARIFY', screenName: 'Clarification 1–3', path: '/ai-cases/:taskId/clarify', roles: ['employee'], routeClass: 'FLOW', platform: 'Mobile/Web', shell: 'employee' },
  { screenId: 'SCR_CASE_RESULT', screenName: 'Task Result', path: '/ai-cases/:taskId/result', roles: ['employee'], routeClass: 'FLOW', platform: 'Mobile/Web', shell: 'employee' },
  { screenId: 'SCR_CASE_DETAIL', screenName: 'AI Case Detail', path: '/ai-cases/:taskId', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'OBJECT_SCOPED', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_CASE_EDIT', screenName: 'Edit AI Case', path: '/ai-cases/:taskId/edit', roles: ['employee'], routeClass: 'OWNER_ONLY', platform: 'Mobile/Web', shell: 'employee' },
  { screenId: 'SCR_HISTORY_TASKS', screenName: 'History — Tasks', path: '/history', roles: ['employee'], routeClass: 'PRIMARY_TAB', platform: 'Mobile/Web', shell: 'employee' },
  { screenId: 'SCR_HISTORY_EVENTS', screenName: 'History — Events', path: '/history/events', roles: ['employee'], routeClass: 'SUBROUTE', platform: 'Mobile/Web', shell: 'employee' },
  { screenId: 'SCR_GOALS', screenName: 'Monthly Goals — Active', path: '/goals', roles: ['employee'], routeClass: 'SUBROUTE', platform: 'Mobile/Web', shell: 'employee' },
  { screenId: 'SCR_RATING_EMPLOYEES', screenName: 'Rating — Employees', path: '/rating', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'PRIMARY_TAB', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_RATING_DIRECTORATES', screenName: 'Rating — Directorates', path: '/rating/directorates', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'SUBROUTE', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_COMPANY_ANALYTICS', screenName: 'Rating — Analytics', path: '/rating/analytics', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'SUBROUTE', platform: 'Web/Mobile', shell: 'authenticated' },
  { screenId: 'SCR_DIRECTORATE_CARD', screenName: 'Directorate Card', path: '/rating/directorates/:directorateId', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'OBJECT_SCOPED', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_PUBLIC_PROFILE', screenName: 'Public Employee Profile', path: '/profiles/:employeeId', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'OBJECT_SCOPED', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_PROFILE_SELF', screenName: 'Profile / Personal Dashboard', path: '/profile', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'PRIMARY_OR_SELF', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_PRIVACY', screenName: 'Privacy Settings', path: '/profile/privacy', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'SELF', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_VACATION', screenName: 'Vacation Settings', path: '/profile/vacation', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'SELF', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_ACHIEVEMENTS', screenName: 'Achievements / Collection', path: '/profile/achievements', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'SELF', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_SCORING_INFO', screenName: 'How Scoring Works', path: '/profile/scoring', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'AUTHENTICATED', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_NOTIFICATIONS', screenName: 'Notifications', path: '/notifications', roles: ['employee', 'director', 'executive', 'admin'], routeClass: 'SELF', platform: 'Mobile/Web', shell: 'authenticated' },
  { screenId: 'SCR_DIRECTOR_DASH', screenName: 'Director Dashboard', path: '/director', roles: ['director'], routeClass: 'ROLE_DIRECTOR', platform: 'Desktop/Web primary', shell: 'management' },
  { screenId: 'SCR_EXEC_DASH', screenName: 'Executive Dashboard', path: '/executive', roles: ['executive'], routeClass: 'ROLE_EXECUTIVE', platform: 'Desktop/Web primary', shell: 'management' },
  { screenId: 'SCR_ADMIN_PANEL', screenName: 'Admin Panel', path: '/admin', roles: ['admin'], routeClass: 'ROLE_ADMIN_SHELL', platform: 'Desktop/Web primary', shell: 'management' },
  { screenId: 'SCR_ADMIN_USERS', screenName: 'Admin — Users & Roles', path: '/admin/users', roles: ['admin'], routeClass: 'ROLE_ADMIN', platform: 'Desktop/Web', shell: 'management' },
  { screenId: 'SCR_ADMIN_ORG', screenName: 'Admin — Org Structure', path: '/admin/org', roles: ['admin'], routeClass: 'ROLE_ADMIN', platform: 'Desktop/Web', shell: 'management' },
  { screenId: 'SCR_ADMIN_CALENDAR', screenName: 'Admin — Corporate Calendar', path: '/admin/calendar', roles: ['admin'], routeClass: 'ROLE_ADMIN', platform: 'Desktop/Web', shell: 'management' },
  { screenId: 'SCR_ADMIN_TAXONOMY', screenName: 'Admin — Taxonomy', path: '/admin/taxonomy', roles: ['admin'], routeClass: 'ROLE_ADMIN', platform: 'Desktop/Web', shell: 'management' },
  { screenId: 'SCR_ADMIN_TOOLS', screenName: 'Admin — AI Tools Directory', path: '/admin/tools', roles: ['admin'], routeClass: 'ROLE_ADMIN', platform: 'Desktop/Web', shell: 'management' },
  { screenId: 'SCR_ADMIN_AUDIT', screenName: 'Admin — Audit / Technical Trace', path: '/admin/audit', roles: ['admin'], routeClass: 'ROLE_ADMIN', platform: 'Desktop/Web', shell: 'management' },
  { screenId: 'SCR_ADMIN_EXPORT', screenName: 'Management Export', path: '/exports', roles: ['director', 'executive', 'admin'], routeClass: 'ROLE_SCOPED', platform: 'Desktop/Web', shell: 'management' },
] as const satisfies readonly ScreenRouteContract[];

export const MOBILE_PRIMARY_NAV = [
  { label: 'Главная', to: '/', screenId: 'SCR_HOME' },
  { label: 'История', to: '/history', screenId: 'SCR_HISTORY_TASKS' },
  { label: 'Рейтинг', to: '/rating', screenId: 'SCR_RATING_EMPLOYEES' },
  { label: 'Профиль', to: '/profile', screenId: 'SCR_PROFILE_SELF' },
] as const;

export const HOME_PRIMARY_CTA = { label: 'Добавить AI-задачу', to: '/ai-cases/new' } as const;
