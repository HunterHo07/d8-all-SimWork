import { User, Scenario, Task, Submission, Analytics } from '@/lib/api/pocketbase';
import { mockUsers, mockScenarios, mockTasks, mockSubmissions, mockAnalytics } from './data';
import { generateId } from '@/lib/utils';

// Helper to simulate async API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock localStorage auth store
const AUTH_STORE_KEY = 'simulex_auth';

interface AuthStore {
  token: string;
  model: User | null;
}

// Initialize auth store
const getAuthStore = (): AuthStore => {
  if (typeof window === 'undefined') {
    return { token: '', model: null };
  }
  
  const stored = localStorage.getItem(AUTH_STORE_KEY);
  if (!stored) {
    return { token: '', model: null };
  }
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    return { token: '', model: null };
  }
};

const setAuthStore = (store: AuthStore) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_STORE_KEY, JSON.stringify(store));
};

const clearAuthStore = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_STORE_KEY);
};

// Mock auth API
export const mockAuthApi = {
  register: async (email: string, password: string, passwordConfirm: string, name: string) => {
    await delay(500); // Simulate network delay
    
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Check if passwords match
    if (password !== passwordConfirm) {
      throw new Error('Passwords do not match');
    }
    
    // Create new user
    const newUser: User = {
      id: generateId(),
      email,
      name,
      role: 'trainee',
      organization: 'SimulEx',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    
    // Set auth store
    setAuthStore({
      token: `mock_token_${newUser.id}`,
      model: newUser,
    });
    
    return newUser;
  },
  
  login: async (email: string, password: string) => {
    await delay(500); // Simulate network delay
    
    // Find user
    const user = mockUsers.find(user => user.email === email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // In a real app, we would check the password hash
    // For the mock, we'll just assume the password is correct
    
    // Set auth store
    setAuthStore({
      token: `mock_token_${user.id}`,
      model: user,
    });
    
    return { token: `mock_token_${user.id}`, record: user };
  },
  
  logout: () => {
    clearAuthStore();
  },
  
  isAuthenticated: () => {
    const authStore = getAuthStore();
    return !!authStore.token;
  },
  
  getCurrentUser: () => {
    const authStore = getAuthStore();
    return authStore.model;
  },
};

// Mock scenarios API
export const mockScenariosApi = {
  getAll: async () => {
    await delay(300);
    return [...mockScenarios];
  },
  
  getById: async (id: string) => {
    await delay(200);
    const scenario = mockScenarios.find(s => s.id === id);
    if (!scenario) {
      throw new Error('Scenario not found');
    }
    return scenario;
  },
  
  getByCategory: async (category: Scenario['category']) => {
    await delay(300);
    return mockScenarios.filter(s => s.category === category);
  },
};

// Mock tasks API
export const mockTasksApi = {
  getByScenario: async (scenarioId: string) => {
    await delay(300);
    return mockTasks.filter(t => t.scenario === scenarioId).sort((a, b) => a.order - b.order);
  },
  
  getById: async (id: string) => {
    await delay(200);
    const task = mockTasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  },
};

// Mock submissions API
export const mockSubmissionsApi = {
  create: async (data: Omit<Submission, 'id' | 'created' | 'updated'>) => {
    await delay(400);
    
    const newSubmission: Submission = {
      ...data,
      id: generateId(),
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };
    
    mockSubmissions.push(newSubmission);
    return newSubmission;
  },
  
  update: async (id: string, data: Partial<Omit<Submission, 'id' | 'created' | 'updated'>>) => {
    await delay(300);
    
    const index = mockSubmissions.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Submission not found');
    }
    
    const updatedSubmission = {
      ...mockSubmissions[index],
      ...data,
      updated: new Date().toISOString(),
    };
    
    mockSubmissions[index] = updatedSubmission;
    return updatedSubmission;
  },
  
  getByUserAndTask: async (userId: string, taskId: string) => {
    await delay(200);
    
    const submission = mockSubmissions.find(s => s.user === userId && s.task === taskId);
    if (!submission) {
      throw new Error('Submission not found');
    }
    
    return submission;
  },
};

// Mock analytics API
export const mockAnalyticsApi = {
  create: async (data: Omit<Analytics, 'id' | 'created' | 'updated'>) => {
    await delay(400);
    
    const newAnalytics: Analytics = {
      ...data,
      id: generateId(),
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };
    
    mockAnalytics.push(newAnalytics);
    return newAnalytics;
  },
  
  getByUserAndScenario: async (userId: string, scenarioId: string) => {
    await delay(200);
    
    const analytics = mockAnalytics.find(a => a.user === userId && a.scenario === scenarioId);
    if (!analytics) {
      throw new Error('Analytics not found');
    }
    
    return analytics;
  },
  
  getUserAnalytics: async (userId: string) => {
    await delay(300);
    return mockAnalytics.filter(a => a.user === userId);
  },
};
