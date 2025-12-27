# HARRY POTTER STUDENTS APP

![App Logo](src/assets/images/LOGO.png)

# Description

`Harry Potter Students` is a client-first React + Vite single-page application (SPA) for browsing and managing a catalog of Hogwarts students. The app emphasizes discoverability (search, filter, pagination), quick interactions (favorite a student, view details), and lightweight CRUD flows (add/edit student entries) that are currently handled client-side.

The project follows a centralized global-state pattern in `src/App.jsx` with props drilling to children components. Routing is handled with React Router v6, and data persistence is implemented with `localStorage` for session/profile state and favorites. The UI is responsive and uses CSS with house-themed accents.

# Main Functionalities

- **Master Layout**: Fixed `Navbar` (top), responsive main content area, `Footer`
- **HomePage**: Paginated student card grid (default 6/page) with `Search` and `StudentsList`
- **StudentCard**: Shows photo, full name, house, year + `FavoriteButton` + links to edit/details
- **Authentication Flow**: Optional local profile + login modal (profile stored in `localStorage`)
- **Student Management**: `AddStudentPage` and `EditStudentPage` share a single form component for create/edit flows
- **Favorites System**: `FavoritesPage` reads global `favorites` array and applies pagination
- **Global State Flow**: `App.jsx` → Pages → Components via props (students, favorites, profile, callbacks)
- **Routing**: Multiple routes including protected pages and 404 (`NotFoundPage`)
- **Persistence**: `localStorage` sync via `useEffect` for profile and favorites

# Student Categories / Filters

| Category / Filter | Description | Examples |
| ----------------- | ----------- | -------- |
| House             | Hogwarts house affiliation | Gryffindor, Slytherin, Hufflepuff, Ravenclaw |
| Year              | School year (1–7) | Year 1, Year 5 |
| Status            | Role or traits | Prefect, Quidditch Player, Head Boy/Girl |
| Blood Status      | Heritage label | Pure-blood, Half-blood, Muggle-born |

# Minimum Viable Product (MVP)

Core features required for a production-like MVP:

- **App Layout**: `Navbar`, content area, `Footer`, responsive grid
- **Student Browsing**: `HomePage` → `StudentsList` (pagination 6/page) → `StudentCard`
- **Search & Filtering**: Live search by name + house filter dropdown
- **Favorites**: Toggle favorite from `StudentCard` and dedicated `FavoritesPage`
- **CRUD-like Flows**: Add & edit student with a single reusable form
- **Routing**: React Router routes with `NotFoundPage`
- **State Management**: Global state in `src/App.jsx`, passed via props
- **Persistence**: `localStorage` for profile and favorites

# Backlog (Post-MVP Enhancements)

- **Backend API**: Node.js/Express + MongoDB (or Firebase) to persist students and profiles
- **Image Upload**: Integrate Cloudinary or AWS S3 for student photos
- **Advanced Filters**: Filter by wand core, patronus, or status; combined filters
- **Authentication**: Real authentication (JWT/OAuth) with protected APIs
- **Infinite Scroll / Virtualization**: Replace pagination for large datasets
- **PWA**: Offline-first support and installable app
- **Social Features**: Comments, student notes, sharing

# Technologies Used

- **React** + **Vite** (fast dev server, optimized builds)
- **React Router DOM** (client-side routing)
- **JavaScript ES6+** (Hooks, async/await)
- **localStorage** + `useEffect` for persistence
- **react-icons** for icons
- **UUID v4** (unique student IDs)
- **CSS Grid / Flexbox** for responsive layout

# Architecture & File Connections

## Entry Point Flow

`src/main.jsx` → `BrowserRouter` → `src/App.jsx` → Routes → Page components

## Complete Props Flow (overview)

`src/App.jsx` (Global State)
├── `src/components/Navbar.jsx` (receives: `openLoginModal`, navigation callbacks)
├── `src/components/Footer.jsx` (static)
├── `src/pages/HomePage.jsx` (receives: `students`, `favorites`, `toggleFavorite`)
│ ├── `src/components/Search.jsx` (local filtering)
│ └── `src/components/StudentsList.jsx` (receives: `studentsToShow`, `favorites`, `toggleFavorite`)
│   └── `src/components/StudentCard.jsx` (receives: `student`, `isFavorite`, `toggleFavorite`, `onEdit`, `onDelete`)
│     └── `src/components/FavoriteButton.jsx` (receives: `isFavorite`, `onToggle`)
├── `src/pages/FavoritesPage.jsx` (receives: `favorites`, `toggleFavorite`)
├── `src/pages/AddStudentPage.jsx` (receives: `onAddStudent`, optional `initialStudent`)
├── `src/pages/EditStudentPage.jsx` (receives: `onUpdateStudent`, `studentId`)
├── `src/pages/StudentsDetailsPage.jsx` (receives: `students`, `params.id`)
└── `src/pages/NotFoundPage.jsx`

# Data Structure

## `src/App.jsx` - Global State Hub

### State Properties

- `students` — `Array[StudentObject]` (seeded/mock dataset)
- `favorites` — `Array[StudentObject]` (user-selected favorites)
- `profile` — `{ username, email, image }` (synced with `localStorage`)
- `isLoggedIn` — `boolean` (authentication flag)
- `isModalOpen` — `boolean` (Login modal visibility)

### Core Methods (Passed as Props)

#### `toggleFavorite(student)`

```js
setFavorites(prev =>
  prev.some(s => s.id === student.id)
	 ? prev.filter(s => s.id !== student.id)
	 : [...prev, student]
);
```

#### `handleAddStudent(newStudent)`

```js
setStudents(prev => [newStudent, ...prev]);
```

#### `handleDeleteStudent(studentId)`

```js
setStudents(prev => prev.filter(s => s.id !== studentId));
```

#### `handleLogin(username, password)`

// Example: validate against stored `profile`

# studentsData.js — Data Layer

### Student Schema Example

```js
{
  id: 'uuid-v4',
  firstName: 'Harry',
  lastName: 'Potter',
  fullName: 'Harry Potter',
  house: 'Gryffindor',
  year: 5,
  patronus: 'Stag',
  bloodStatus: 'Half-blood',
  wand: 'Holly, 11", Phoenix feather',
  image: 'src/assets/images/harry.png',
  bio: 'The Boy Who Lived...',
}
```

# StudentsList.jsx — Pagination & Filtering

### State & Logic

- `const [currentPage, setCurrentPage] = useState(1);`
- `const ITEMS_PER_PAGE = 6;`
- `const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;`
- `const studentsToShow = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);`

# Add/Edit Student Form

### Dual Mode Operation

- **Create Mode**: `initialStudent = null` → generates `uuidv4()` and adds new record
- **Edit Mode**: `initialStudent` pre-populates fields; submit updates existing record

# Component Breakdown

## HomePage.jsx — Main Orchestrator

**Purpose**: Composes the primary discovery experience: search, filter, pagination, and quick actions

**Children Chain**:
- `Search` (local filtering)
- `StudentsList` (pagination)
- `StudentCard` ×6 (per page)
- `FavoriteButton`
- Links to `StudentsDetailsPage` and edit/delete actions

## Navbar.jsx — Global Navigation

**Responsibilities**:

- Logo → Home (`/`)
- NavLinks → `/profile`, `/favorites`, `/add-student`
- Login button → opens login modal managed in `src/App.jsx`

## ProfilePage.jsx — User Dashboard

**Data Flow**: `localStorage.getItem('hp_profile')` → `src/App.jsx` state → `ProfilePage` props

# Media

## Screenshots (placeholders)
- **Home Dashboard**: `src/assets/images/home-dashboard.png`
- **Mobile Responsive**: `src/assets/images/mobile-responsive.gif`
- **Profile Management**: `src/assets/images/profile-management.png`
- **Student Details**: `src/assets/images/student-details-full.gif`
- **Favorites Page**: `src/assets/images/favorites-page.gif`

# States and State Transitions

## Application States

1. **Unauthenticated Home** (`/`)

	- Full student grid + login prompt in `Navbar`

2. **Login Flow**
	- `Navbar` Login → Login modal → (No profile) CreateProfile → (Has profile) ProfilePage

3. **Authenticated State**
	- ProfilePage ↔ Home ↔ Favorites ↔ AddStudent

4. **Student Deep Dive**
	- Any `StudentCard` → `StudentsDetailsPage` (`/students/:id`)

5. **Protected Routes**
	- `/profile`, `/favorites`, `/add-student` (redirects unauthenticated users)

# Task — Development Roadmap

## Phase 1: Foundation (Complete)

1. Vite + Router Setup

```bash
npm create vite@latest --template react
npm i react-router-dom uuid react-icons
```

2. Core Architecture

- `src/App.jsx` (Routes + Global State)
- Master layout (Navbar/Footer)

3. Data Layer

- `studentsData.js` seed dataset
- Global state with `localStorage` persistence

## Phase 2: Core Features (Complete)

4. Student Browsing

- HomePage → StudentsList → StudentCard chain
- Pagination (6/page) + `Search`

5. Profile & Persistence

- Login modal + CreateProfile + Profile persistence

6. CRUD-like Flows

- Add/Edit student with single form
- Delete with confirmation

## Phase 3: Polish (Complete/In-progress)

7. Additional Pages

- FavoritesPage, NotFoundPage, StudentsDetailsPage

8. Responsive Design

- CSS Grid breakpoints and mobile-first adjustments

# Recent Updates

- ✅ Add/Edit/Delete single reusable form
- ✅ Favorites sync across pages via global state
- ✅ Profile persistence in `localStorage`
- ✅ Paginated student list with memoized filters

# Getting Started

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

# Project Structure (important files)

- `src/main.jsx` — app entry
- `src/App.jsx` — top-level routes and state
- `src/components/Navbar.jsx`, `src/components/Footer.jsx`
- `src/components/Search.jsx`, `src/components/StudentsList.jsx`, `src/components/StudentCard.jsx`, `src/components/FavoriteButton.jsx`
- `src/pages/HomePage.jsx`, `src/pages/AddStudentPage.jsx`, `src/pages/EditStudentPage.jsx`, `src/pages/FavoritesPage.jsx`, `src/pages/StudentsDetailsPage.jsx`, `src/pages/NotFoundPage.jsx`
- `src/assets/images/*` — logos and screenshots

# Notes

- Current data is client-side and intended for demo purposes. Add a backend API for production persistence.
- Adjust `ITEMS_PER_PAGE` in `StudentsList.jsx` to change pagination.

# Contributing

- Open an issue for feature requests or bugs. Pull requests must include focused changes and pass lint/tests if added.

# License

- MIT

# Contact

- Open an issue in this repository for questions or suggestions.