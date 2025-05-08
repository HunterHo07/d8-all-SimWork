# SimulEx User Guide

This guide will help you understand how to use the SimulEx application.

## Getting Started

### Prerequisites
- Node.js (v18+)
- PocketBase

### Starting the Application

1. Start the PocketBase backend:
   ```bash
   cd be
   ./pocketbase serve --http="0.0.0.0:8090"
   ```

2. Start the Next.js frontend:
   ```bash
   cd fe
   npm run dev
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - PocketBase Admin: http://localhost:8090/_/

### Initial Setup

1. Create an admin account in PocketBase
2. Set up collections using the provided scripts
3. Add sample data using the provided scripts

## Using the Application

### As an Admin

1. **Managing Scenarios**
   - Log in to the PocketBase Admin UI
   - Navigate to the "Scenarios" collection
   - Create, edit, or delete scenarios

2. **Managing Tasks**
   - Navigate to the "Tasks" collection
   - Create tasks and link them to scenarios
   - Set task details like type, content, and points

3. **Viewing Analytics**
   - Navigate to the "Analytics" collection
   - View user performance data

### As a User

1. **Registration and Login**
   - Visit the frontend application
   - Click "Register" to create a new account
   - Log in with your credentials

2. **Dashboard**
   - View your progress and statistics
   - See available scenarios
   - Track your completed scenarios

3. **Scenarios**
   - Browse available scenarios
   - Filter by category and difficulty
   - Select a scenario to view details

4. **Simulation**
   - Start a simulation from the scenario details page
   - Complete tasks in sequence
   - Submit your work for each task
   - View your results after completion

## Application Structure

### Frontend

- `/fe/src/app`: Next.js pages and routes
- `/fe/src/components`: Reusable UI components
- `/fe/src/lib`: Utilities, hooks, and API clients

### Backend

- `/be`: PocketBase server and configuration
- `/be/pb_data`: Database files (created automatically)
- `/be/pb_migrations`: Database migrations (if any)

## Collections

### Users
- Standard PocketBase users collection with additional fields:
  - `name`: User's full name
  - `avatar`: User's profile picture
  - `role`: User role (trainee, trainer, admin)
  - `organization`: User's organization

### Scenarios
- `title`: Scenario title
- `description`: Detailed description
- `category`: Role category (developer, designer, etc.)
- `difficulty`: Difficulty level
- `duration`: Estimated duration in minutes
- `cover_image`: Cover image
- `is_active`: Whether the scenario is active
- `created_by`: Reference to the creator

### Tasks
- `title`: Task title
- `description`: Detailed description
- `scenario`: Reference to parent scenario
- `type`: Task type (code, design, decision, etc.)
- `content`: Task content and requirements (JSON)
- `order`: Order within scenario
- `time_limit`: Time limit in seconds (optional)
- `points`: Points awarded for completion

### Submissions
- `user`: Reference to user
- `task`: Reference to task
- `content`: Submission content (JSON)
- `files`: Uploaded files (multiple)
- `score`: Score awarded
- `feedback`: Feedback on submission
- `time_spent`: Time spent in seconds
- `completed`: Whether the submission is complete

### Analytics
- `user`: Reference to user
- `scenario`: Reference to scenario
- `metrics`: Performance metrics (JSON)
- `session_recording`: Recording of user session (JSON)
- `total_score`: Total score for the scenario
- `completion_time`: Total time in seconds
- `completed_at`: Completion timestamp

## Troubleshooting

### Backend Issues
- Check if PocketBase is running
- Verify that collections are properly set up
- Check for errors in the PocketBase console

### Frontend Issues
- Check if Next.js is running
- Clear browser cache and refresh
- Check browser console for errors

## Next Steps

1. Create more scenarios and tasks
2. Customize the UI to match your brand
3. Add more features like team collaboration or custom reporting
