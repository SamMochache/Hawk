# Hawk - Educational Platform Frontend

Hawk is a comprehensive educational platform built with React, TypeScript, and Vite. It provides a unified interface for administrators, instructors, parents, and students to manage and participate in online learning experiences.

## Features

- **Multi-Role Support**: Dedicated dashboards for Admin, Instructor, Parent, and Student roles
- **Admin Dashboard**: Manage billing, classes, instructors, reports, settings, and students
- **Instructor Tools**: Analytics, live classes, project grading, and student details
- **Parent Portal**: Monitor child progress, view reports, and manage notifications
- **Student Interface**: Access courses, lessons, leaderboards, and detailed course views
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive layouts
- **Modern Tech Stack**: React 18, TypeScript, Vite for fast development and builds

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with PostCSS
- **UI Components**: Custom component library
- **Development**: Hot module replacement, fast refresh

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hawk/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout component
│   └── ui.tsx          # UI component library
├── pages/              # Page components organized by role
│   ├── Login.tsx       # Authentication page
│   ├── admin/          # Admin-specific pages
│   ├── instructor/     # Instructor-specific pages
│   ├── parent/         # Parent-specific pages
│   └── student/        # Student-specific pages
├── App.tsx             # Main application component
├── index.css           # Global styles
└── index.tsx           # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Frontend Hosting
The frontend is already deployed on Vercel at `https://hawk-green.vercel.app/`.

### Backend Hosting
The Django backend can be deployed on Render using the instructions in `backend/README.md`.

Set the frontend environment variables in Vercel after backend deployment:

```bash
VITE_API_URL=https://your-backend.onrender.com/api/v1
VITE_WS_URL=wss://your-backend.onrender.com
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email sammochache01@gmail.com or join our Slack community.
