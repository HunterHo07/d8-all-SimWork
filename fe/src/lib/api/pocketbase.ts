import PocketBase from 'pocketbase';

// Create a single PocketBase instance for the entire app
// Use environment variables to determine the API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8090';
const pb = new PocketBase(API_URL);

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

// API functions for authentication
export const authApi = {
  register: async (email: string, password: string, passwordConfirm: string, name: string) => {
    const data = {
      email,
      password,
      passwordConfirm,
      name,
    };
    return await pb.collection('users').create(data);
  },

  login: async (email: string, password: string) => {
    return await pb.collection('users').authWithPassword(email, password);
  },

  logout: () => {
    pb.authStore.clear();
  },

  isAuthenticated: () => {
    return pb.authStore.isValid;
  },

  getCurrentUser: () => {
    return pb.authStore.model;
  },
};

// API functions for scenarios
export const scenariosApi = {
  getAll: async () => {
    return await pb.collection('scenarios').getFullList<Scenario>();
  },

  getById: async (id: string) => {
    return await pb.collection('scenarios').getOne<Scenario>(id);
  },

  getByCategory: async (category: Scenario['category']) => {
    return await pb.collection('scenarios').getFullList<Scenario>({
      filter: `category = "${category}"`,
    });
  },
};

// API functions for tasks
export const tasksApi = {
  getByScenario: async (scenarioId: string) => {
    return await pb.collection('tasks').getFullList<Task>({
      filter: `scenario = "${scenarioId}"`,
      sort: 'order',
    });
  },

  getById: async (id: string) => {
    return await pb.collection('tasks').getOne<Task>(id);
  },
};

// API functions for submissions
export const submissionsApi = {
  create: async (data: Omit<Submission, 'id' | 'created' | 'updated'>) => {
    return await pb.collection('submissions').create<Submission>(data);
  },

  update: async (id: string, data: Partial<Omit<Submission, 'id' | 'created' | 'updated'>>) => {
    return await pb.collection('submissions').update<Submission>(id, data);
  },

  getByUserAndTask: async (userId: string, taskId: string) => {
    return await pb.collection('submissions').getFirstListItem<Submission>(`user = "${userId}" && task = "${taskId}"`);
  },
};

// API functions for analytics
export const analyticsApi = {
  create: async (data: Omit<Analytics, 'id' | 'created' | 'updated'>) => {
    return await pb.collection('analytics').create<Analytics>(data);
  },

  getByUserAndScenario: async (userId: string, scenarioId: string) => {
    return await pb.collection('analytics').getFirstListItem<Analytics>(`user = "${userId}" && scenario = "${scenarioId}"`);
  },

  getUserAnalytics: async (userId: string) => {
    return await pb.collection('analytics').getFullList<Analytics>({
      filter: `user = "${userId}"`,
    });
  },
};

export default pb;
