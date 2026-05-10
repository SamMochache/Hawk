// API Endpoints configuration
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login/',
    REFRESH: '/auth/refresh/',
    LOGOUT: '/auth/logout/',
  },

  // Users
  USERS: {
    ME: '/users/me/',
    LIST: '/users/',
    DETAIL: (id: number) => `/users/${id}/`,
  },

  // Courses
  COURSES: {
    LIST: '/courses/',
    DETAIL: (id: number) => `/courses/${id}/`,
    ENROLL: (id: number) => `/courses/${id}/enroll/`,
  },

  // Lessons
  LESSONS: {
    LIST: '/lessons/',
    DETAIL: (id: number) => `/lessons/${id}/`,
    BY_COURSE: (courseId: number) => `/courses/${courseId}/lessons/`,
  },

  // Enrollments
  ENROLLMENTS: {
    LIST: '/enrollments/',
    DETAIL: (id: number) => `/enrollments/${id}/`,
  },

  // Attendance
  ATTENDANCE: {
    LIST: '/attendance/',
    MARK: '/attendance/mark/',
  },

  // Projects
  PROJECTS: {
    LIST: '/projects/',
    DETAIL: (id: number) => `/projects/${id}/`,
    SUBMIT: (id: number) => `/projects/${id}/submit/`,
  },

  // Grading
  GRADING: {
    LIST: '/grading/',
    SUBMIT: (id: number) => `/grading/${id}/submit/`,
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard/',
    STUDENT: (id: number) => `/analytics/student/${id}/`,
    COURSE: (id: number) => `/analytics/course/${id}/`,
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications/',
    MARK_READ: (id: number) => `/notifications/${id}/read/`,
  },

  // Billing
  BILLING: {
    LIST: '/billing/',
    INVOICES: '/billing/invoices/',
  },

  // Reports
  REPORTS: {
    LIST: '/reports/',
    GENERATE: '/reports/generate/',
  },

  // Live Classes
  LIVE_CLASSES: {
    LIST: '/live/',
    DETAIL: (id: number) => `/live/${id}/`,
    JOIN: (id: number) => `/live/${id}/join/`,
  },
} as const;