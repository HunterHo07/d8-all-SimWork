// This script helps you set up the collections in PocketBase
// You can copy and paste this into the PocketBase Admin UI Console

// Create Scenarios Collection
const scenariosCollection = {
  name: "scenarios",
  type: "base",
  schema: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: {
        values: ["developer", "designer", "project_manager", "data_entry", "ai_engineer"],
      },
      required: true,
    },
    {
      name: "difficulty",
      type: "select",
      options: {
        values: ["beginner", "intermediate", "advanced", "expert"],
      },
      required: true,
    },
    {
      name: "duration",
      type: "number",
      required: true,
    },
    {
      name: "cover_image",
      type: "file",
      required: false,
    },
    {
      name: "is_active",
      type: "bool",
      required: true,
      default: true,
    },
    {
      name: "created_by",
      type: "relation",
      options: {
        collectionId: "_pb_users_auth_",
        cascadeDelete: false,
      },
      required: true,
    },
  ],
};

// Create Tasks Collection
const tasksCollection = {
  name: "tasks",
  type: "base",
  schema: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "scenario",
      type: "relation",
      options: {
        collectionId: "scenarios",
        cascadeDelete: true,
      },
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: {
        values: ["code", "design", "decision", "data_entry", "prompt_engineering"],
      },
      required: true,
    },
    {
      name: "content",
      type: "json",
      required: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
    },
    {
      name: "time_limit",
      type: "number",
      required: false,
    },
    {
      name: "points",
      type: "number",
      required: true,
      default: 10,
    },
  ],
};

// Create Submissions Collection
const submissionsCollection = {
  name: "submissions",
  type: "base",
  schema: [
    {
      name: "user",
      type: "relation",
      options: {
        collectionId: "_pb_users_auth_",
        cascadeDelete: true,
      },
      required: true,
    },
    {
      name: "task",
      type: "relation",
      options: {
        collectionId: "tasks",
        cascadeDelete: true,
      },
      required: true,
    },
    {
      name: "content",
      type: "json",
      required: true,
    },
    {
      name: "files",
      type: "file",
      required: false,
      options: {
        maxSelect: 10,
      },
    },
    {
      name: "score",
      type: "number",
      required: false,
    },
    {
      name: "feedback",
      type: "text",
      required: false,
    },
    {
      name: "time_spent",
      type: "number",
      required: true,
    },
    {
      name: "completed",
      type: "bool",
      required: true,
      default: false,
    },
  ],
};

// Create Analytics Collection
const analyticsCollection = {
  name: "analytics",
  type: "base",
  schema: [
    {
      name: "user",
      type: "relation",
      options: {
        collectionId: "_pb_users_auth_",
        cascadeDelete: true,
      },
      required: true,
    },
    {
      name: "scenario",
      type: "relation",
      options: {
        collectionId: "scenarios",
        cascadeDelete: true,
      },
      required: true,
    },
    {
      name: "metrics",
      type: "json",
      required: true,
    },
    {
      name: "session_recording",
      type: "json",
      required: false,
    },
    {
      name: "total_score",
      type: "number",
      required: true,
    },
    {
      name: "completion_time",
      type: "number",
      required: true,
    },
    {
      name: "completed_at",
      type: "date",
      required: true,
    },
  ],
};

// Create the collections
async function createCollections() {
  try {
    // Create scenarios collection
    await $app.dao.createCollection(scenariosCollection);
    console.log("Scenarios collection created successfully");

    // Create tasks collection
    await $app.dao.createCollection(tasksCollection);
    console.log("Tasks collection created successfully");

    // Create submissions collection
    await $app.dao.createCollection(submissionsCollection);
    console.log("Submissions collection created successfully");

    // Create analytics collection
    await $app.dao.createCollection(analyticsCollection);
    console.log("Analytics collection created successfully");

    console.log("All collections created successfully");
  } catch (error) {
    console.error("Error creating collections:", error);
  }
}

// Call the function to create collections
createCollections();
