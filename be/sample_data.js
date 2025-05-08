// This script helps you add sample data to PocketBase
// You can copy and paste this into the PocketBase Admin UI Console after creating the collections

// Sample scenarios data
const sampleScenarios = [
  {
    title: "Web Application Development",
    description: "Build a responsive web application with user authentication, data storage, and real-time updates.",
    category: "developer",
    difficulty: "intermediate",
    duration: 120, // in minutes
    is_active: true,
  },
  {
    title: "UI/UX Design Challenge",
    description: "Create a user interface for a mobile application that focuses on accessibility and modern design principles.",
    category: "designer",
    difficulty: "beginner",
    duration: 90, // in minutes
    is_active: true,
  },
  {
    title: "Project Management Crisis",
    description: "Navigate a complex project scenario with tight deadlines, resource constraints, and stakeholder conflicts.",
    category: "project_manager",
    difficulty: "advanced",
    duration: 60, // in minutes
    is_active: true,
  },
  {
    title: "Data Processing Efficiency",
    description: "Process and organize a large dataset with accuracy and efficiency, following specific formatting requirements.",
    category: "data_entry",
    difficulty: "beginner",
    duration: 45, // in minutes
    is_active: true,
  },
  {
    title: "AI System Design",
    description: "Design and implement an AI system that can process natural language queries and provide relevant responses.",
    category: "ai_engineer",
    difficulty: "expert",
    duration: 180, // in minutes
    is_active: true,
  },
];

// Sample tasks data (to be linked to scenarios)
const sampleTasks = [
  // Web Application Development tasks
  {
    title: "Set Up Project Structure",
    description: "Create the initial project structure with the necessary files and directories.",
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
  },
  {
    title: "Implement User Authentication",
    description: "Create a user authentication system with login, registration, and password reset functionality.",
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
  },
  
  // UI/UX Design Challenge tasks
  {
    title: "Create Wireframes",
    description: "Design wireframes for the main screens of the mobile application.",
    type: "design",
    content: {
      instructions: "Create wireframes for the following screens: login, dashboard, profile, and settings. Focus on user flow and layout.",
      resources: [
        {
          type: "tool",
          url: "https://www.figma.com",
          description: "Figma Design Tool",
        },
      ],
      acceptance_criteria: [
        "All required screens are designed",
        "User flow is logical and intuitive",
        "Layout is responsive and accessible",
      ],
    },
    order: 1,
    time_limit: 1800, // 30 minutes in seconds
    points: 15,
  },
  
  // Project Management Crisis tasks
  {
    title: "Resource Allocation",
    description: "Allocate resources to different project tasks based on priority and constraints.",
    type: "decision",
    content: {
      instructions: "You have limited resources and multiple tasks with different priorities. Allocate resources to maximize project success.",
      resources: [
        {
          type: "document",
          url: "#",
          description: "Project Resource Sheet",
        },
      ],
      acceptance_criteria: [
        "Resources are allocated efficiently",
        "High-priority tasks are properly resourced",
        "Constraints are respected",
      ],
    },
    order: 1,
    time_limit: 1200, // 20 minutes in seconds
    points: 15,
  },
];

// Function to add sample data
async function addSampleData() {
  try {
    // Get the first admin user to use as created_by
    const adminUsers = await $app.dao.findRecordsByFilter("_pb_users_auth_", "role = 'admin'");
    if (adminUsers.length === 0) {
      console.error("No admin user found. Please create an admin user first.");
      return;
    }
    
    const adminUserId = adminUsers[0].id;
    
    // Add scenarios
    const scenarioIds = [];
    for (const scenario of sampleScenarios) {
      const record = new Record("scenarios", {
        title: scenario.title,
        description: scenario.description,
        category: scenario.category,
        difficulty: scenario.difficulty,
        duration: scenario.duration,
        is_active: scenario.is_active,
        created_by: adminUserId,
      });
      
      await $app.dao.saveRecord(record);
      scenarioIds.push(record.id);
      console.log(`Scenario "${scenario.title}" added successfully`);
    }
    
    // Add tasks linked to the first scenario
    for (const task of sampleTasks) {
      // Link to the appropriate scenario based on task type
      let scenarioId = scenarioIds[0]; // Default to first scenario
      
      if (task.type === "design") {
        scenarioId = scenarioIds[1]; // UI/UX Design Challenge
      } else if (task.type === "decision") {
        scenarioId = scenarioIds[2]; // Project Management Crisis
      } else if (task.type === "data_entry") {
        scenarioId = scenarioIds[3]; // Data Processing Efficiency
      } else if (task.type === "prompt_engineering") {
        scenarioId = scenarioIds[4]; // AI System Design
      }
      
      const record = new Record("tasks", {
        title: task.title,
        description: task.description,
        scenario: scenarioId,
        type: task.type,
        content: task.content,
        order: task.order,
        time_limit: task.time_limit,
        points: task.points,
      });
      
      await $app.dao.saveRecord(record);
      console.log(`Task "${task.title}" added successfully`);
    }
    
    console.log("All sample data added successfully");
  } catch (error) {
    console.error("Error adding sample data:", error);
  }
}

// Call the function to add sample data
addSampleData();
