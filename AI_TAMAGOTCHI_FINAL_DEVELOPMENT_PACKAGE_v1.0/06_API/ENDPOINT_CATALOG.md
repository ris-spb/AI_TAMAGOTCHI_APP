# ENDPOINT CATALOG

**Operations:** 64  
**Authority:** `openapi_final_v1.yaml`

| Method | Path | operationId | Roles | Scope | Idempotency | Screens |
|---|---|---|---|---|---|---|
| GET | `/v1/admin/audit` | `listAuditLog` | admin | whole company admin | none | SCR_ADMIN_AUDIT |
| GET | `/v1/admin/calendar` | `getCorporateCalendar` | admin | whole company admin | none | SCR_ADMIN_CALENDAR |
| PUT | `/v1/admin/calendar/{date}` | `setCorporateCalendarDay` | admin | whole company admin | required | SCR_ADMIN_CALENDAR |
| GET | `/v1/admin/directorates` | `listAdminDirectorates` | admin | whole company admin | none | SCR_ADMIN_ORG |
| POST | `/v1/admin/directorates` | `createDirectorate` | admin | whole company admin | required | SCR_ADMIN_ORG |
| PATCH | `/v1/admin/directorates/{directorateId}` | `updateDirectorate` | admin | whole company admin | required | SCR_ADMIN_ORG |
| GET | `/v1/admin/employees` | `listAdminEmployees` | admin | whole company admin | none | SCR_ADMIN_USERS |
| PATCH | `/v1/admin/employees/{employeeId}` | `updateAdminEmployee` | admin | whole company admin | required | SCR_ADMIN_USERS |
| GET | `/v1/admin/tasks/{taskId}/scoring-trace` | `getTaskScoringTrace` | admin | whole company technical trace | none | SCR_ADMIN_AUDIT |
| GET | `/v1/admin/taxonomy/versions` | `listTaxonomyVersions` | admin | whole company admin | none | SCR_ADMIN_TAXONOMY |
| POST | `/v1/admin/taxonomy/versions` | `createTaxonomyVersion` | admin | whole company admin | required | SCR_ADMIN_TAXONOMY |
| GET | `/v1/admin/taxonomy/versions/{taxonomyVersionId}` | `getTaxonomyVersion` | admin | whole company admin | none | SCR_ADMIN_TAXONOMY |
| POST | `/v1/admin/taxonomy/versions/{taxonomyVersionId}/activate` | `activateTaxonomyVersion` | admin | whole company admin | required | SCR_ADMIN_TAXONOMY |
| POST | `/v1/admin/taxonomy/versions/{taxonomyVersionId}/categories` | `createTaxonomyCategory` | admin | whole company admin | required | SCR_ADMIN_TAXONOMY |
| PATCH | `/v1/admin/taxonomy/versions/{taxonomyVersionId}/categories/{categoryId}` | `updateTaxonomyCategory` | admin | whole company admin | required | SCR_ADMIN_TAXONOMY |
| POST | `/v1/admin/taxonomy/versions/{taxonomyVersionId}/subcategories` | `createTaxonomySubcategory` | admin | whole company admin | required | SCR_ADMIN_TAXONOMY |
| PATCH | `/v1/admin/taxonomy/versions/{taxonomyVersionId}/subcategories/{subcategoryId}` | `updateTaxonomySubcategory` | admin | whole company admin | required | SCR_ADMIN_TAXONOMY |
| GET | `/v1/admin/tools` | `listAdminTools` | admin | whole company admin | none | SCR_ADMIN_TOOLS |
| POST | `/v1/admin/tools` | `createAdminTool` | admin | whole company admin | required | SCR_ADMIN_TOOLS |
| PATCH | `/v1/admin/tools/{toolId}` | `updateAdminTool` | admin | whole company admin | required | SCR_ADMIN_TOOLS |
| GET | `/v1/admin/unrecognized-tools` | `listUnrecognizedTools` | admin | whole company admin | none | SCR_ADMIN_TOOLS |
| GET | `/v1/analytics/company` | `getCompanyAnalytics` | employee, director, executive, admin | aggregate/anonymous company scope | none | SCR_COMPANY_ANALYTICS |
| POST | `/v1/auth/logout` | `logoutCurrentSession` | employee, director, executive, admin | current session | none | — |
| POST | `/v1/auth/verify` | `verifyPersonnelIdentity` | public | public verification | none | SCR_AUTH_LOGIN |
| GET | `/v1/director/dashboard` | `getDirectorDashboard` | director | own directorate only | none | SCR_DIRECTOR_DASH |
| GET | `/v1/director/employees` | `listDirectorateEmployees` | director | own directorate only | none | SCR_DIRECTOR_DASH |
| GET | `/v1/director/employees/{employeeId}` | `getDirectorEmployeeDetail` | director | employee in own directorate | none | SCR_DIRECTOR_DASH, SCR_PUBLIC_PROFILE |
| GET | `/v1/directorates/{directorateId}` | `getDirectorateCard` | employee, director, executive, admin | authenticated rating scope | none | SCR_DIRECTORATE_CARD |
| GET | `/v1/executive/dashboard` | `getExecutiveDashboard` | executive | whole company | none | SCR_EXEC_DASH |
| GET | `/v1/executive/directorates/{directorateId}` | `getExecutiveDirectorateDetail` | executive | whole company directorate drilldown | none | SCR_EXEC_DASH, SCR_DIRECTORATE_CARD |
| GET | `/v1/executive/employees/{employeeId}` | `getExecutiveEmployeeDetail` | executive | whole company employee drilldown | none | SCR_EXEC_DASH, SCR_PUBLIC_PROFILE |
| POST | `/v1/exports` | `createExport` | director, executive, admin | role-derived directorate/company export scope | required | SCR_ADMIN_EXPORT |
| GET | `/v1/exports/{exportId}` | `getExportStatus` | director, executive, admin | request owner/authorized scope | none | SCR_ADMIN_EXPORT |
| GET | `/v1/exports/{exportId}/download` | `downloadExport` | director, executive, admin | re-authorized request owner/scope | none | SCR_ADMIN_EXPORT |
| GET | `/v1/goals/current` | `getCurrentGoals` | employee | self | none | SCR_GOALS, SCR_HOME |
| GET | `/v1/goals/history` | `listGoalHistory` | employee | self | none | SCR_GOALS |
| GET | `/v1/goals/setup` | `getGoalSetup` | employee | self | none | SCR_GOAL_SETUP |
| POST | `/v1/goals/setup` | `submitGoalSetup` | employee | self | required | SCR_GOAL_SETUP, SCR_GOALS |
| GET | `/v1/history/events` | `listMyProgressEvents` | employee | self | none | SCR_HISTORY_EVENTS |
| GET | `/v1/history/tasks` | `listMyTaskHistory` | employee | self | none | SCR_HISTORY_TASKS |
| GET | `/v1/home` | `getHome` | employee | self employee Home | none | SCR_HOME |
| GET | `/v1/me` | `getCurrentUser` | employee, director, executive, admin | self | none | SCR_PROFILE_SELF, SCR_HOME |
| GET | `/v1/me/achievements` | `listMyAchievements` | employee, director, executive, admin | self | none | SCR_ACHIEVEMENTS |
| GET | `/v1/me/dashboard` | `getPersonalDashboard` | employee, director, executive, admin | self | none | SCR_PROFILE_SELF |
| GET | `/v1/me/onboarding` | `getOnboardingStatus` | employee, director, executive, admin | self | none | SCR_ONBOARDING |
| POST | `/v1/me/onboarding/complete` | `completeOnboarding` | employee, director, executive, admin | self | required | SCR_ONBOARDING |
| PATCH | `/v1/me/privacy` | `updatePrivacyLevel` | employee, director, executive, admin | self | none | SCR_PRIVACY |
| PUT | `/v1/me/vacation` | `setVacationState` | employee, director, executive, admin | self | required | SCR_VACATION, SCR_HOME |
| GET | `/v1/notifications` | `listNotifications` | employee, director, executive, admin | self | none | SCR_NOTIFICATIONS, SCR_HOME |
| POST | `/v1/notifications/{notificationId}/read` | `markNotificationRead` | employee, director, executive, admin | self notification | none | SCR_NOTIFICATIONS |
| GET | `/v1/profiles/{employeeId}` | `getPublicEmployeeProfile` | employee, director, executive, admin | peer privacy or privileged management scope | none | SCR_PUBLIC_PROFILE |
| GET | `/v1/ratings/directorates` | `listDirectorateRating` | employee, director, executive, admin | authenticated rating scope | none | SCR_RATING_DIRECTORATES |
| GET | `/v1/ratings/employees` | `listEmployeeRating` | employee, director, executive, admin | authenticated rating scope | none | SCR_RATING_EMPLOYEES |
| GET | `/v1/scoring-info` | `getScoringInfo` | employee, director, executive, admin | authenticated | none | SCR_SCORING_INFO |
| POST | `/v1/tasks` | `createTask` | employee | owner/self | required | SCR_CASE_ADD, SCR_CASE_PROCESSING |
| POST | `/v1/tasks/voice/transcriptions` | `transcribeTaskAudio` | employee | self task draft | required | SCR_CASE_VOICE, SCR_CASE_TRANSCRIPT |
| DELETE | `/v1/tasks/{taskId}` | `softDeleteTask` | employee | owner only | required | SCR_HISTORY_TASKS, SCR_CASE_DETAIL |
| GET | `/v1/tasks/{taskId}` | `getTask` | employee, director, executive, admin | owner or authorized management scope | none | SCR_CASE_DETAIL |
| PATCH | `/v1/tasks/{taskId}` | `editTask` | employee | owner only | required | SCR_CASE_EDIT, SCR_CASE_PROCESSING |
| POST | `/v1/tasks/{taskId}/clarifications/{clarificationId}/answer` | `answerTaskClarification` | employee | owner only | required | SCR_CASE_CLARIFY, SCR_CASE_PROCESSING |
| GET | `/v1/tasks/{taskId}/processing` | `getTaskProcessingState` | employee | owner only | none | SCR_CASE_PROCESSING, SCR_CASE_CLARIFY |
| GET | `/v1/tasks/{taskId}/result` | `getTaskResult` | employee, director, executive, admin | owner or authorized management scope | none | SCR_CASE_RESULT, SCR_CASE_DETAIL |
| GET | `/v1/tasks/{taskId}/versions` | `listTaskVersions` | employee, director, executive, admin | owner or authorized management audit scope | none | SCR_CASE_DETAIL, SCR_HISTORY_TASKS |
| GET | `/v1/tasks/{taskId}/versions/{versionNo}` | `getTaskVersion` | employee, director, executive, admin | owner or authorized management audit scope | none | SCR_CASE_DETAIL, SCR_HISTORY_TASKS |
