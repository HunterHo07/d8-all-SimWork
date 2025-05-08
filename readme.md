# SimulEx

![SimulEx Logo](./fe/public/images/simulex-logo.svg)

## The Future of Work Training & Assessment

SimulEx is an AI-driven, immersive simulation platform that bridges the gap between theoretical knowledge and practical application in corporate and educational training. By combining real-world tasks with adaptive difficulty and real-time analytics, SimulEx provides a comprehensive solution for skill development and assessment.

## Key Features

### 🌐 Immersive Multi-Role Environment
Navigate through a futuristic interface with specialized stations for different roles:
- Developer (terminal/code challenges)
- Designer (asset creation/evaluation)
- Project Manager (decision-making scenarios)
- Data Entry (accuracy/efficiency tasks)
- AI Engineer (prompt engineering/system design)

### 🧠 Adaptive Intelligence
- Dynamic difficulty adjustment based on performance
- AI-powered guidance and feedback
- OCR-enabled asset submission and evaluation

### 📊 Real-Time Analytics
- Comprehensive performance metrics
- Personalized feedback loops
- Session recordings for review and evaluation

## Technology Stack

### Frontend
- Next.js 15.3.1
- TailwindCSS for styling
- GSAP & Framer Motion for advanced animations
- TypeScript for type safety

### Backend
- PocketBase (SQLite-based backend)
- RESTful API architecture
- Secure authentication and data storage

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or Bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/sx15_2.git
cd sx15_2
```

2. Start the backend
```bash
cd be
./start.sh
```

3. Start the frontend
```bash
cd fe
npm install
npm run dev
# or with Bun
bun install
bun run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
sx15_2/
├── research.md         # Design research and inspiration
├── development.md      # Development process documentation
├── fe/                 # Frontend Next.js application
├── be/                 # Backend PocketBase application
└── db/                 # Database scripts and schemas
```

## Development Workflow

1. The backend server must be running for the frontend to function properly
2. Any changes to the database schema should be documented in `/db/schema.md`
3. Frontend development follows the component-based architecture in `/fe/src/components`

## Deployment

### Backend Deployment
The backend needs to be deployed separately. You can use services like:
- Render
- Railway
- Digital Ocean
- Your own server

```bash
cd be
./deploy.sh
```

### Frontend Deployment to GitHub Pages
The frontend is automatically deployed to GitHub Pages when you push to the main branch.

```bash
cd fe
npm run build
# The GitHub Actions workflow will handle the deployment
```

### Manual Frontend Deployment
```bash
cd fe
npm run build
npm run start
# or with Bun
bun run build
bun run start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need for more effective training and assessment tools in the corporate world
- Built with future-forward design principles and cutting-edge technologies
