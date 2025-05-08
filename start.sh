#!/bin/bash

# Start PocketBase in the background
cd be
./pocketbase.exe serve --http="0.0.0.0:8091" &
POCKETBASE_PID=$!
cd ..

# Start Next.js frontend
cd fe
npm run dev &
NEXTJS_PID=$!
cd ..

# Function to handle script termination
function cleanup {
  echo "Shutting down services..."
  kill $POCKETBASE_PID
  kill $NEXTJS_PID
  exit
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

echo "SimulEx is running!"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:8091"
echo "- PocketBase Admin: http://localhost:8091/_/"
echo ""
echo "Press Ctrl+C to stop all services."

# Keep the script running
wait
