// Import mock API functions instead of using PocketBase
import { mockAuthApi, mockScenariosApi, mockTasksApi, mockSubmissionsApi, mockAnalyticsApi } from '@/lib/mock/api';

// Types for our collections based on the PocketBase schema
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'trainee' | 'trainer' | 'admin';
  organization?: string;
  created: string;
  updated: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: 'developer' | 'designer' | 'project_manager' | 'data_entry' | 'ai_engineer';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number;
  cover_image?: string;
  is_active: boolean;
  created_by: string;
  created: string;
  updated: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  scenario: string;
  type: 'code' | 'design' | 'decision' | 'data_entry' | 'prompt_engineering';
  content: {
    instructions: string;
    resources?: Array<{
      type: string;
      url: string;
      description: string;
    }>;
    acceptance_criteria?: string[];
    hints?: string[];
    code_template?: string;
    design_assets?: Array<{
      type: string;
      url: string;
    }>;
    terminal_config?: {
      allowed_commands: string[];
      initial_directory: string;
      environment_variables: Record<string, string>;
    };
  };
  order: number;
  time_limit?: number;
  points: number;
  created: string;
  updated: string;
}

export interface Submission {
  id: string;
  user: string;
  task: string;
  content: {
    answers?: Record<string, any>;
    code?: string;
    design_notes?: string;
    terminal_history?: string[];
    decisions?: Array<{
      question: string;
      answer: string;
      reasoning: string;
    }>;
  };
  files?: string[];
  score?: number;
  feedback?: string;
  time_spent: number;
  completed: boolean;
  created: string;
  updated: string;
}

export interface Analytics {
  id: string;
  user: string;
  scenario: string;
  metrics: {
    accuracy: number;
    efficiency: number;
    problem_solving: number;
    creativity: number;
    technical_skills: number;
    communication: number;
    decision_quality: number;
    task_completion: Array<{
      task_id: string;
      score: number;
      time_spent: number;
    }>;
  };
  session_recording?: Record<string, any>;
  total_score: number;
  completion_time: number;
  completed_at: string;
  created: string;
  updated: string;
}

// API functions for authentication - using mock implementation
export const authApi = mockAuthApi;

// API functions for scenarios - using mock implementation
export const scenariosApi = mockScenariosApi;

// API functions for tasks - using mock implementation
export const tasksApi = mockTasksApi;

// API functions for submissions - using mock implementation
export const submissionsApi = mockSubmissionsApi;

// API functions for analytics - using mock implementation
export const analyticsApi = mockAnalyticsApi;

// Export a dummy PocketBase instance for compatibility
const dummyPb = {
  authStore: {
    isValid: false,
    model: null,
    clear: () => {}
  }
};

export default dummyPb;
