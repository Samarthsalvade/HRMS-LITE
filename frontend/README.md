# HRMS Lite Frontend

React frontend for the HRMS Lite application.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Pure CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update API URL in `.env`:
```
VITE_API_URL=http://localhost:8000
```

4. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The production files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx       # Main layout wrapper
│   ├── Layout.css
│   └── Modal.jsx        # Reusable modal component
├── pages/
│   ├── Dashboard.jsx    # Dashboard page
│   ├── Employees.jsx    # Employee management
│   └── Attendance.jsx   # Attendance tracking
├── services/
│   └── api.js          # API client
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Features

- ✅ Employee Management (Add, View, Delete)
- ✅ Attendance Tracking
- ✅ Dashboard with Statistics
- ✅ Responsive Design
- ✅ Loading States
- ✅ Error Handling
- ✅ Form Validation
- ✅ Filter Attendance Records

## Deployment

### Vercel:
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL`
5. Deploy

### Netlify:
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variable: `VITE_API_URL`
5. Deploy
