import { User, Scenario, Task, Submission, Analytics } from '@/lib/api/pocketbase';
import { generateId } from '@/lib/utils';

// Mock user data
export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'demo@simulex.com',
    name: 'Demo User',
    avatar: '/images/avatars/avatar-1.png',
    role: 'trainee',
    organization: 'SimulEx',
    created: new Date(2023, 0, 15).toISOString(),
    updated: new Date(2023, 0, 15).toISOString(),
  },
  {
    id: 'user2',
    email: 'trainer@simulex.com',
    name: 'Trainer User',
    avatar: '/images/avatars/avatar-2.png',
    role: 'trainer',
    organization: 'SimulEx',
    created: new Date(2023, 0, 10).toISOString(),
    updated: new Date(2023, 0, 10).toISOString(),
  },
];

// Mock scenarios data
export const mockScenarios: Scenario[] = [
  {
    id: 'scenario1',
    title: "Web Application Development",
    description: "Build a responsive web application with user authentication, data storage, and real-time updates.",
    category: "developer",
    difficulty: "intermediate",
    duration: 120, // in minutes
    cover_image: '/images/scenarios/web-dev.jpg',
    is_active: true,
    created_by: 'user2',
    created: new Date(2023, 1, 15).toISOString(),
    updated: new Date(2023, 1, 15).toISOString(),
  },
  {
    id: 'scenario2',
    title: "UI/UX Design Challenge",
    description: "Create a user interface for a mobile application that focuses on accessibility and modern design principles.",
    category: "designer",
    difficulty: "beginner",
    duration: 90, // in minutes
    cover_image: '/images/scenarios/ui-design.jpg',
    is_active: true,
    created_by: 'user2',
    created: new Date(2023, 1, 20).toISOString(),
    updated: new Date(2023, 1, 20).toISOString(),
  },
  {
    id: 'scenario3',
    title: "Project Management Crisis",
    description: "Navigate a complex project scenario with tight deadlines, resource constraints, and stakeholder conflicts.",
    category: "project_manager",
    difficulty: "advanced",
    duration: 60, // in minutes
    cover_image: '/images/scenarios/project-management.jpg',
    is_active: true,
    created_by: 'user2',
    created: new Date(2023, 2, 5).toISOString(),
    updated: new Date(2023, 2, 5).toISOString(),
  },
  {
    id: 'scenario4',
    title: "Data Processing Efficiency",
    description: "Process and organize a large dataset with accuracy and efficiency, following specific formatting requirements.",
    category: "data_entry",
    difficulty: "beginner",
    duration: 45, // in minutes
    cover_image: '/images/scenarios/data-processing.jpg',
    is_active: true,
    created_by: 'user2',
    created: new Date(2023, 2, 10).toISOString(),
    updated: new Date(2023, 2, 10).toISOString(),
  },
  {
    id: 'scenario5',
    title: "AI System Design",
    description: "Design and implement an AI system that can process natural language queries and provide relevant responses.",
    category: "ai_engineer",
    difficulty: "expert",
    duration: 180, // in minutes
    cover_image: '/images/scenarios/ai-design.jpg',
    is_active: true,
    created_by: 'user2',
    created: new Date(2023, 2, 15).toISOString(),
    updated: new Date(2023, 2, 15).toISOString(),
  },
];

// Mock tasks data
export const mockTasks: Task[] = [
  // Web Application Development tasks
  {
    id: 'task1',
    title: "Set Up Project Structure",
    description: "Create the initial project structure with the necessary files and directories.",
    scenario: 'scenario1',
    type: "code",
    content: {
      instructions: "Create a new React project with the following structure: components, pages, utils, and styles directories.",
      resources: [
        {
          type: "documentation",
          url: "https://reactjs.org/docs/getting-started.html",
          description: "React Documentation",
        },
      ],
      acceptance_criteria: [
        "Project structure is correctly set up",
        "All necessary directories are created",
        "Package.json is properly configured",
      ],
    },
    order: 1,
    time_limit: 900, // 15 minutes in seconds
    points: 10,
    created: new Date(2023, 1, 15).toISOString(),
    updated: new Date(2023, 1, 15).toISOString(),
  },
  {
    id: 'task2',
    title: "Implement User Authentication",
    description: "Create a user authentication system with login, registration, and password reset functionality.",
    scenario: 'scenario1',
    type: "code",
    content: {
      instructions: "Implement a user authentication system using JWT tokens. Create login and registration forms with proper validation.",
      resources: [
        {
          type: "documentation",
          url: "https://jwt.io/introduction",
          description: "JWT Introduction",
        },
      ],
      acceptance_criteria: [
        "User can register with email and password",
        "User can log in with credentials",
        "JWT token is properly stored and managed",
        "Form validation is implemented",
      ],
    },
    order: 2,
    time_limit: 1800, // 30 minutes in seconds
    points: 20,
    created: new Date(2023, 1, 16).toISOString(),
    updated: new Date(2023, 1, 16).toISOString(),
  },
];

// Mock submissions data
export const mockSubmissions: Submission[] = [
  {
    id: 'submission1',
    user: 'user1',
    task: 'task1',
    content: {
      code: 'console.log("Hello World");',
      notes: 'Completed the project structure setup.',
    },
    status: 'completed',
    score: 0.9,
    time_spent: 780, // in seconds
    created: new Date(2023, 3, 5).toISOString(),
    updated: new Date(2023, 3, 5).toISOString(),
  },
];

// Mock analytics data
export const mockAnalytics: Analytics[] = [
  {
    id: 'analytics1',
    user: 'user1',
    scenario: 'scenario1',
    total_score: 0.85,
    completion_time: 3600, // in seconds
    tasks_completed: 2,
    created: new Date(2023, 3, 10).toISOString(),
    updated: new Date(2023, 3, 10).toISOString(),
  },
];
