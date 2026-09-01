import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { InfrastructureProbe } from '../app/InfrastructureProbe';
import { RouteGate } from '../app/RouteGate';
import { AppShell } from '../app/shell/AppShell';
import { NotFoundState } from '../app/shell/RouteStates';
import { DesignSystemGallery } from '../design-system/gallery/DesignSystemGallery';
import { AddAiCaseScreen } from '../features/ai-case/AddAiCaseScreen';
import { ClarifyAiCaseScreen } from '../features/ai-case/ClarifyAiCaseScreen';
import { ProcessingAiCaseScreen } from '../features/ai-case/ProcessingAiCaseScreen';
import { ResultAiCaseScreen } from '../features/ai-case/ResultAiCaseScreen';
import { TranscriptAiCaseScreen } from '../features/ai-case/TranscriptAiCaseScreen';
import { VoiceAiCaseScreen } from '../features/ai-case/VoiceAiCaseScreen';
import { HomeScreen } from '../features/home/HomeScreen';
import { GoalSetupScreen, LoginScreen, OnboardingScreen } from '../features/entry/EntryScreens';
import {
  AdminAuditScreen,
  AdminCalendarScreen,
  AdminOrgScreen,
  AdminPanelScreen,
  AdminTaxonomyScreen,
  AdminToolsScreen,
  AdminUsersScreen,
  DirectorDashboardScreen,
  ExecutiveDashboardScreen,
  ExportScreen,
} from '../features/management/ManagementScreens';
import {
  AchievementsScreen,
  CompanyAnalyticsScreen,
  DirectorateCardScreen,
  GoalsScreen,
  HistoryEventsScreen,
  HistoryTasksScreen,
  EditAiCaseScreen,
  NotificationsScreen,
  PrivacyScreen,
  ProfileScreen,
  PublicProfileScreen,
  RatingDirectoratesScreen,
  RatingEmployeesScreen,
  ScoringInfoScreen,
  TaskDetailScreen,
  VacationScreen,
} from '../features/employee-sections/EmployeeSections';
import { PublicSkeletonScreen } from '../screens/PublicSkeletonScreen';
import { SkeletonScreen } from '../screens/SkeletonScreen';
import { screenRouteCatalog } from './routeCatalog';

function productContent(contract: (typeof screenRouteCatalog)[number]) {
  switch (contract.screenId) {
    case 'SCR_AUTH_LOGIN': return <LoginScreen />;
    case 'SCR_ONBOARDING': return <OnboardingScreen />;
    case 'SCR_GOAL_SETUP': return <GoalSetupScreen />;
    case 'SCR_HOME': return <HomeScreen />;
    case 'SCR_CASE_ADD': return <AddAiCaseScreen />;
    case 'SCR_CASE_VOICE': return <VoiceAiCaseScreen />;
    case 'SCR_CASE_TRANSCRIPT': return <TranscriptAiCaseScreen />;
    case 'SCR_CASE_PROCESSING': return <ProcessingAiCaseScreen />;
    case 'SCR_CASE_CLARIFY': return <ClarifyAiCaseScreen />;
    case 'SCR_CASE_RESULT': return <ResultAiCaseScreen />;
    case 'SCR_CASE_DETAIL': return <TaskDetailScreen />;
    case 'SCR_CASE_EDIT': return <EditAiCaseScreen />;
    case 'SCR_HISTORY_TASKS': return <HistoryTasksScreen />;
    case 'SCR_HISTORY_EVENTS': return <HistoryEventsScreen />;
    case 'SCR_GOALS': return <GoalsScreen />;
    case 'SCR_RATING_EMPLOYEES': return <RatingEmployeesScreen />;
    case 'SCR_RATING_DIRECTORATES': return <RatingDirectoratesScreen />;
    case 'SCR_COMPANY_ANALYTICS': return <CompanyAnalyticsScreen />;
    case 'SCR_DIRECTORATE_CARD': return <DirectorateCardScreen />;
    case 'SCR_PUBLIC_PROFILE': return <PublicProfileScreen />;
    case 'SCR_PROFILE_SELF': return <ProfileScreen />;
    case 'SCR_PRIVACY': return <PrivacyScreen />;
    case 'SCR_VACATION': return <VacationScreen />;
    case 'SCR_ACHIEVEMENTS': return <AchievementsScreen />;
    case 'SCR_SCORING_INFO': return <ScoringInfoScreen />;
    case 'SCR_NOTIFICATIONS': return <NotificationsScreen />;
    case 'SCR_DIRECTOR_DASH': return <DirectorDashboardScreen />;
    case 'SCR_EXEC_DASH': return <ExecutiveDashboardScreen />;
    case 'SCR_ADMIN_PANEL': return <AdminPanelScreen />;
    case 'SCR_ADMIN_USERS': return <AdminUsersScreen />;
    case 'SCR_ADMIN_ORG': return <AdminOrgScreen />;
    case 'SCR_ADMIN_CALENDAR': return <AdminCalendarScreen />;
    case 'SCR_ADMIN_TAXONOMY': return <AdminTaxonomyScreen />;
    case 'SCR_ADMIN_TOOLS': return <AdminToolsScreen />;
    case 'SCR_ADMIN_AUDIT': return <AdminAuditScreen />;
    case 'SCR_ADMIN_EXPORT': return <ExportScreen />;
    default:
      if (contract.shell === 'public') return <PublicSkeletonScreen contract={contract} />;
      return <SkeletonScreen contract={contract} />;
  }
}

function routeElement(contract: (typeof screenRouteCatalog)[number]) {
  const content = productContent(contract);
  const screen = contract.shell === 'public'
    ? content
    : <AppShell contract={contract}>{content}</AppShell>;

  return <RouteGate roles={contract.roles}>{screen}</RouteGate>;
}

const productRoutes: RouteObject[] = screenRouteCatalog.map((contract) => ({
  path: contract.path,
  element: routeElement(contract),
}));

export const router = createBrowserRouter([
  ...productRoutes,
  // Development-only diagnostics. Not part of the 36-screen product route contract.
  ...(import.meta.env.DEV ? [
    { path: '/__prototype/infrastructure', element: <InfrastructureProbe /> },
    { path: '/__prototype/design-system', element: <DesignSystemGallery /> },
  ] : []),
  { path: '*', element: <AppShell contract={screenRouteCatalog[20]}><NotFoundState /></AppShell> },
]);
