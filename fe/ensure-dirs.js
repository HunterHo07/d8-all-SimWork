const fs = require('fs');
const path = require('path');

// Directories to ensure exist
const directories = [
  'public/images',
  'public/images/avatars',
  'public/images/scenarios',
];

// Create directories if they don't exist
directories.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(fullPath, { recursive: true });
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

console.log('All directories created successfully!');
