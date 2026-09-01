const PRODUCTION_ROOT = '/production-assets/08_PRODUCTION_EXPORTS';
const APPROVED_HOME_ROOT = '/prototype-approved/home-v3';

export const productionAssets = {
  approvedHome: {
    background: `${APPROVED_HOME_ROOT}/BG_Home_Pulkovo_Default_1024x1536_v2.2.webp`,
    backgroundMobile: `${APPROVED_HOME_ROOT}/BG_Home_Pulkovo_Default_390x844_v2.2.webp`,
    mascot: {
      happy: `${APPROVED_HOME_ROOT}/MSC_Lyuboznayka_Happy_1254_v2.2.webp`,
      normal: `${APPROVED_HOME_ROOT}/MSC_Lyuboznayka_Normal_1254_v2.2.webp`,
      bored: `${APPROVED_HOME_ROOT}/MSC_Lyuboznayka_Bored_1254_v2.2.webp`,
      tired: `${APPROVED_HOME_ROOT}/MSC_Lyuboznayka_Tired_1254_v2.2.webp`,
      very_weak: `${APPROVED_HOME_ROOT}/MSC_Lyuboznayka_VeryWeak_1254_v2.2.webp`,
      coma: `${APPROVED_HOME_ROOT}/MSC_Lyuboznayka_Coma_1254_v2.2.webp`,
    },
  },
  fallback: {
    loadingPreview: `${PRODUCTION_ROOT}/FALLBACK/IMG_Loading_Preview_390x844_v1.0.webp`,
    unavailable3d: `${PRODUCTION_ROOT}/FALLBACK/IMG_3D_Unavailable_390x844_v1.0.webp`,
    homeDay: `${PRODUCTION_ROOT}/FALLBACK/IMG_Home_Fallback_Day_390x844_v2.0.webp`,
    mascotHappy: `${PRODUCTION_ROOT}/FALLBACK/MSC_Lyuboznayka_Happy_Fallback_512_v2.0.webp`,
    mascotComa: `${PRODUCTION_ROOT}/FALLBACK/MSC_Lyuboznayka_Coma_Fallback_512_v2.0.webp`,
  },
  icon: {
    aiCase: `${PRODUCTION_ROOT}/SVG/ICO_AI_Case_Default_Outline_v1.0.svg`,
    streak: `${PRODUCTION_ROOT}/SVG/ICO_Streak_Default_Outline_v1.0.svg`,
    notificationDefault: `${PRODUCTION_ROOT}/SVG/ICO_Notification_Bell_Default_Outline_v1.0.svg`,
    notificationUnread: `${PRODUCTION_ROOT}/SVG/ICO_Notification_Bell_Unread_Outline_v1.0.svg`,
    navHomeActive: `${PRODUCTION_ROOT}/SVG/ICO_Nav_Home_Active_Outline_v1.0.svg`,
    navHomeInactive: `${PRODUCTION_ROOT}/SVG/ICO_Nav_Home_Inactive_Outline_v1.0.svg`,
    navHistoryActive: `${PRODUCTION_ROOT}/SVG/ICO_Nav_History_Active_Outline_v1.1.svg`,
    navHistoryInactive: `${PRODUCTION_ROOT}/SVG/ICO_Nav_History_Inactive_Outline_v1.1.svg`,
    navRatingActive: `${PRODUCTION_ROOT}/SVG/ICO_Nav_Rating_Active_Outline_v1.1.svg`,
    navRatingInactive: `${PRODUCTION_ROOT}/SVG/ICO_Nav_Rating_Inactive_Outline_v1.1.svg`,
    navProfileActive: `${PRODUCTION_ROOT}/SVG/ICO_Nav_Profile_Active_Outline_v1.1.svg`,
    navProfileInactive: `${PRODUCTION_ROOT}/SVG/ICO_Nav_Profile_Inactive_Outline_v1.1.svg`,
  },
} as const;
