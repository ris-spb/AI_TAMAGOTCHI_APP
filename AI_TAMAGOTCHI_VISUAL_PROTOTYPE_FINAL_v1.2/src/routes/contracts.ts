export type AppRole = 'employee' | 'director' | 'executive' | 'admin';
export type RouteAudience = 'public' | 'authenticated' | AppRole;
export type RouteClass =
  | 'PUBLIC'
  | 'AUTH_GATE'
  | 'DATA_GATE'
  | 'PRIMARY_TAB'
  | 'PRIMARY_OR_SELF'
  | 'SUBROUTE'
  | 'FLOW'
  | 'FLOW_EPHEMERAL'
  | 'OBJECT_SCOPED'
  | 'OWNER_ONLY'
  | 'SELF'
  | 'AUTHENTICATED'
  | 'ROLE_DIRECTOR'
  | 'ROLE_EXECUTIVE'
  | 'ROLE_ADMIN_SHELL'
  | 'ROLE_ADMIN'
  | 'ROLE_SCOPED';

export type ScreenRouteContract = {
  screenId: string;
  screenName: string;
  path: string;
  roles: readonly RouteAudience[];
  routeClass: RouteClass;
  platform: string;
  shell: 'public' | 'employee' | 'authenticated' | 'management';
};
