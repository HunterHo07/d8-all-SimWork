# SimulEx Database Schema

## Collections

### Users
Extends PocketBase's built-in auth collection.

| Field        | Type     | Required | Description                                |
|--------------|----------|----------|--------------------------------------------|
| id           | text     | Yes      | Unique identifier (system)                 |
| email        | text     | Yes      | User's email address (system)              |
| username     | text     | Yes      | Username (system)                          |
| password     | text     | Yes      | Hashed password (system)                   |
| name         | text     | Yes      | User's full name                           |
| avatar       | file     | No       | User's profile picture                     |
| role         | select   | Yes      | User role: trainee, trainer, or admin      |
| organization | text     | No       | User's organization or company             |
| created      | date     | Yes      | Creation timestamp (system)                |
| updated      | date     | Yes      | Last update timestamp (system)             |

### Scenarios

| Field        | Type     | Required | Description                                |
|--------------|----------|----------|--------------------------------------------|
| id           | text     | Yes      | Unique identifier (system)                 |
| title        | text     | Yes      | Scenario title                             |
| description  | text     | Yes      | Detailed description                       |
| category     | select   | Yes      | Role category (developer, designer, etc.)  |
| difficulty   | select   | Yes      | Difficulty level                           |
| duration     | number   | Yes      | Estimated duration in minutes              |
| cover_image  | file     | No       | Cover image for the scenario               |
| is_active    | boolean  | Yes      | Whether the scenario is active             |
| created_by   | relation | Yes      | Reference to the creator (Users)           |
| created      | date     | Yes      | Creation timestamp (system)                |
| updated      | date     | Yes      | Last update timestamp (system)             |

### Tasks

| Field        | Type     | Required | Description                                |
|--------------|----------|----------|--------------------------------------------|
| id           | text     | Yes      | Unique identifier (system)                 |
| title        | text     | Yes      | Task title                                 |
| description  | text     | Yes      | Detailed description                       |
| scenario     | relation | Yes      | Reference to parent scenario               |
| type         | select   | Yes      | Task type (code, design, etc.)             |
| content      | json     | Yes      | Task content and requirements              |
| order        | number   | Yes      | Order within scenario                      |
| time_limit   | number   | No       | Time limit in seconds (optional)           |
| points       | number   | Yes      | Points awarded for completion              |
| created      | date     | Yes      | Creation timestamp (system)                |
| updated      | date     | Yes      | Last update timestamp (system)             |

### Submissions

| Field        | Type     | Required | Description                                |
|--------------|----------|----------|--------------------------------------------|
| id           | text     | Yes      | Unique identifier (system)                 |
| user         | relation | Yes      | Reference to user                          |
| task         | relation | Yes      | Reference to task                          |
| content      | json     | Yes      | Submission content                         |
| files        | file     | No       | Uploaded files (multiple)                  |
| score        | number   | No       | Score awarded                              |
| feedback     | text     | No       | Feedback on submission                     |
| time_spent   | number   | Yes      | Time spent in seconds                      |
| completed    | boolean  | Yes      | Whether the submission is complete         |
| created      | date     | Yes      | Creation timestamp (system)                |
| updated      | date     | Yes      | Last update timestamp (system)             |

### Analytics

| Field             | Type     | Required | Description                                |
|-------------------|----------|----------|--------------------------------------------|
| id                | text     | Yes      | Unique identifier (system)                 |
| user              | relation | Yes      | Reference to user                          |
| scenario          | relation | Yes      | Reference to scenario                      |
| metrics           | json     | Yes      | Performance metrics                        |
| session_recording | json     | No       | Recording of user session                  |
| total_score       | number   | Yes      | Total score for the scenario               |
| completion_time   | number   | Yes      | Total time in seconds                      |
| completed_at      | date     | Yes      | Completion timestamp                       |
| created           | date     | Yes      | Creation timestamp (system)                |
| updated           | date     | Yes      | Last update timestamp (system)             |

## JSON Schemas

### Task Content Schema

```json
{
  "instructions": "string",
  "resources": [
    {
      "type": "string",
      "url": "string",
      "description": "string"
    }
  ],
  "acceptance_criteria": [
    "string"
  ],
  "hints": [
    "string"
  ],
  "code_template": "string",
  "design_assets": [
    {
      "type": "string",
      "url": "string"
    }
  ],
  "terminal_config": {
    "allowed_commands": ["string"],
    "initial_directory": "string",
    "environment_variables": {}
  }
}
```

### Submission Content Schema

```json
{
  "answers": {},
  "code": "string",
  "design_notes": "string",
  "terminal_history": ["string"],
  "decisions": [
    {
      "question": "string",
      "answer": "string",
      "reasoning": "string"
    }
  ]
}
```

### Analytics Metrics Schema

```json
{
  "accuracy": 0.95,
  "efficiency": 0.85,
  "problem_solving": 0.9,
  "creativity": 0.8,
  "technical_skills": 0.92,
  "communication": 0.88,
  "decision_quality": 0.87,
  "task_completion": [
    {
      "task_id": "string",
      "score": 0.9,
      "time_spent": 300
    }
  ]
}
```
