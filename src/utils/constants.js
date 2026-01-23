export const ROLE_TEACHER = "Teacher";
export const ROLE_STUDENT = "Student";
export const ROLE_ADMIN = "Admin";
export const ROLE_PAYMENT = "Payment";
export const ROLE_TUTOR = "Tutor";

// Price configuration (in INR)
export const PRICE_CONFIG = {
  MIN: 10,
  MAX: 10000,
  CURRENCY_SYMBOL: '₹',
  CURRENCY_CODE: 'INR',
};

// Default filter values
export const DEFAULT_FILTERS = {
  lang: 'Language',
  courseT: 'Course',
  availability: 'Availability',
  minPrice: PRICE_CONFIG.MIN,
  maxPrice: PRICE_CONFIG.MAX,
  motherT: 'Mother Tongue',
  from: 'Country',
};

export const LANGUAGES = [
  { value: "English", label: "English" },
  { value: "Chinese", label: "Chinese" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "Hindi", label: "Hindi" },
  { value: "German", label: "German" },
  { value: "Dutch", label: "Dutch" },
  { value: "Arabaic", label: "Arabaic" },
  { value: "Japanese", label: "Japanese" },
  { value: "Russian", label: "Russian" },
  { value: "Korean", label: "Korean" },
  { value: "Kannada", label: "Kannada" },
  { value: "Portugese", label: "Portugese" },
  { value: "Italian", label: "Italian" },
  { value: "Romanian", label: "Romanian" },
  { value: "Swahili", label: "Swahili" },
  { value: "Thai", label: "Thai" },
  { value: "Indonesian", label: "Indonesian" },
  { value: "Turkish", label: "Turkish" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Polish", label: "Polish" },
  { value: "Bengali", label: "Bengali" },
  { value: "Tamil", label: "Tamil" },
  { value: "Telugu", label: "Telugu" },
  { value: "Esperanto", label: "Esperanto" },
  { value: "Malyalam", label: "Malyalam" },
  { value: "Kokani", label: "Kokani" },
];

export const languages = {
  English: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["IELTS", "TOEFL", "PTE", "CELTA", "TOEIC"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced", "Business English"],
  },
  Chinese: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["HSK I", "HSK II", "HSK III", "HSK IV", "HSK V", "HSK VI"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  Spanish: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["DELE A1", "DELE A2", "DELE B1", "DELE B1"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  French: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["DELF", "DALF", "DELF JUNIOR", "DELF PRIM", "DELF PRO"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  Hindi: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["DELE A1", "DELE A2", "DELE B1", "DELE B1"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  German: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["GOETHE-A1", "GOETHE-A2", "GOETHE-B1", "GOETHE-B2", "TESTDAF", "GOETHE-TEST PRO"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  Dutch: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["INFO", "FORM", "PROF", "STRT", "EDUP"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  Arabic: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["ALPT 1", "ALPT 2", "ALPT 3", "ALPT 4", "ALPT 5", "ALPT 6"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  Japanese: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["JLPT-N5", "JLPT-N4", "JLPT-N3", "JLPT-N2", "JLPT-N1", "J-TEST"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  Russian: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["TEL", "TBL", "TORFL-I", "TORFL-II", "TORFL-III", "TORFL-IV"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  Korean: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["TOPIK I-L1", "TOPIK I-L2", "TOPIK II-L3", "TOPIK Ii-L4", "TOPIK II-L5"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  Portuguese: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["CILPE", "DEPLE", "DIPLE", "DAPLE", "DUPLE"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
  Italian: {
    Academics: ["IB", "IGCSE", "CBSE"],
    "Test Preparation": ["CELI 1", "CELI 2", "CELI 3", "CELI 4", "CILS 1", "CILS 2", "CILS 3"],
    "Spoken Languages": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper Intermediate", "C1 Advanced"],
  },
};

export const adminSidebar = [
  {
    name: "Dashboard",
    iconClass: "fas fa-th-large",
    link: "/admin/dashboard",
  },
  {
    name: "Teachers",
    iconClass: "fas fa-chalkboard-teacher",
    link: "/admin/teachers",
  },
  {
    name: "Courses",
    iconClass: "fas fa-graduation-cap",
    link: "/admin/courses",
  },
  {
    name: "Cancelled",
    iconClass: "fas fa-graduation-cap",
    link: "/admin/cancelledSessions",
  },
  {
    name: "Languages",
    iconClass: "fas fa-language",
    link: "/admin/languages",
  },
  {
    name: "Students",
    iconClass: "fas fa-user-graduate",
    link: "/admin/students",
  },
  {
    name: "Booked Course",
    iconClass: "fas fa-book",
    link: "/admin/booked-courses",
  },
  {
    name: "Payment",
    iconClass: "far fa-credit-card",
    link: "/admin/payment",
  },
  {
    name: "Blog",
    iconClass: "fas fa-pen-square",
    link: "/admin/blog",
  },
  {
    name: "Messages",
    iconClass: "fas fa-message",
    link: "/admin/messages",
  },
  {
    name: "Notification",
    iconClass: "fas fa-volume-down",
    link: "/admin/notification",
  },
];

export const teacherSidebar = [
  {
    name: "Dashboard",
    iconClass: "fas fa-th-large",
    link: "/teacher/dashboard",
  },
  {
    name: "Courses",
    iconClass: "fas fa-graduation-cap",
    link: "/teacher/courses",
  },
  {
    name: "Sessions",
    iconClass: "far fa-clock",
    link: "/teacher/sessions",
  },
  {
    name: "Availabilty",
    iconClass: "fas fa-calendar-alt",
    link: "/teacher/availability",
  },
  {
    name: "Students",
    iconClass: "fas fa-user-graduate",
    link: "/teacher/students",
  },
  {
    name: "Blogs",
    iconClass: "fas fa-newspaper",
    link: "/teacher/blogs",
  },
  {
    name: "Coupons",
    iconClass: "fas fa-tag",
    link: "/teacher/coupons",
  },
  {
    name: "Earnings",
    iconClass: "fas fa-hand-holding-usd",
    link: "/teacher/earnings",
  },
  {
    name: "Messages",
    iconClass: "fas fa-message",
    link: "/teacher/messages",
  },
  {
    name: "Settings",
    iconClass: "fas fa-cogs",
    link: "/teacher/settings",
  },
];

export const studentSidebar = [
  {
    name: "Dashboard",
    iconClass: "fas fa-th-large",
    link: "/student/dashboard",
  },
  {
    name: "Sessions",
    iconClass: "far fa-newspaper",
    link: "/student/sessions",
  },
  {
    name: "Teacher",
    iconClass: "fas fa-chalkboard-teacher",
    link: "/student/teachers",
  },
  {
    name: "Homework",
    iconClass: "fas fa-book-open",
    link: "/student/homework",
  },
  {
    name: "Wallet",
    iconClass: "fas fa-wallet",
    link: "/student/wallet",
  },
  {
    name: "Refer a Friend",
    iconClass: "fas fa-user-friends",
    link: "/student/refer",
  },
  {
    name: "Progress",
    iconClass: "fas fa-user-graduate",
    link: "/student/progress",
  },
  {
    name: "Certificate",
    iconClass: "fas fa-award",
    link: "/student/certificates",
  },
  {
    name: "Messages",
    iconClass: "fas fa-message",
    link: "/student/messages",
  },
  {
    name: "Settings",
    iconClass: "fas fa-cogs",
    link: "/student/settings",
  },
];

export const timeIntervals = [
  "12:00 am",
  "12:30 am",
  "01:00 am",
  "01:30 am",
  "02:00 am",
  "02:30 am",
  "03:00 am",
  "03:30 am",
  "04:00 am",
  "04:30 am",
  "05:00 am",
  "05:30 am",
  "06:00 am",
  "06:30 am",
  "07:00 am",
  "07:30 am",
  "08:00 am",
  "08:30 am",
  "09:00 am",
  "09:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 pm",
  "12:30 pm",
  "01:00 pm",
  "01:30 pm",
  "02:00 pm",
  "02:30 pm",
  "03:00 pm",
  "03:30 pm",
  "04:00 pm",
  "04:30 pm",
  "05:00 pm",
  "05:30 pm",
  "06:00 pm",
  "06:30 pm",
  "07:00 pm",
  "07:30 pm",
  "08:00 pm",
  "08:30 pm",
  "09:00 pm",
  "09:30 pm",
  "10:00 pm",
  "10:30 pm",
  "11:00 pm",
  "11:30 pm",
];
