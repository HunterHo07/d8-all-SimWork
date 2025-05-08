"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/hooks/useAuth";
import { scenariosApi, tasksApi, submissionsApi, analyticsApi, Scenario, Task } from "@/lib/api/pocketbase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateTimeDifference } from "@/lib/utils";

export default function SimulationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [submissions, setSubmissions] = useState<Record<string, any>>({});
  const startTimeRef = useRef<Date | null>(null);
  const taskStartTimeRef = useRef<Date | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchSimulationData = async () => {
      if (!id) return;
      
      try {
        setIsLoadingData(true);
        
        // Fetch scenario details
        const scenarioData = await scenariosApi.getById(id as string);
        setScenario(scenarioData);
        
        // Fetch tasks for this scenario
        const scenarioTasks = await tasksApi.getByScenario(id as string);
        setTasks(scenarioTasks.sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error("Error fetching simulation data:", err);
        setError("Failed to load simulation data. Please try again later.");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (!isLoading && isAuthenticated) {
      fetchSimulationData();
    }
  }, [id, isLoading, isAuthenticated]);

  useEffect(() => {
    // Clean up timer on unmount
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const startSimulation = () => {
    setSimulationStarted(true);
    startTimeRef.current = new Date();
    taskStartTimeRef.current = new Date();
    
    // Start timer
    timerIntervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const now = new Date();
        const elapsed = calculateTimeDifference(startTimeRef.current, now);
        setTimeSpent(elapsed);
      }
    }, 1000);
  };

  const handleTaskSubmission = async (taskData: any) => {
    if (!user || !scenario || !tasks[currentTaskIndex]) return;
    
    const taskId = tasks[currentTaskIndex].id;
    const now = new Date();
    const taskTimeSpent = taskStartTimeRef.current 
      ? calculateTimeDifference(taskStartTimeRef.current, now) 
      : 0;
    
    // Create submission data
    const submissionData = {
      user: user.id,
      task: taskId,
      content: taskData,
      time_spent: taskTimeSpent,
      completed: true,
    };
    
    try {
      // Save submission to database
      const submission = await submissionsApi.create(submissionData);
      
      // Update local submissions state
      setSubmissions(prev => ({
        ...prev,
        [taskId]: submission
      }));
      
      // Move to next task or complete simulation
      if (currentTaskIndex < tasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        taskStartTimeRef.current = new Date();
      } else {
        completeSimulation();
      }
    } catch (err) {
      console.error("Error submitting task:", err);
      // Handle error (could show an error message to the user)
    }
  };

  const completeSimulation = async () => {
    if (!user || !scenario || !startTimeRef.current) return;
    
    setSimulationCompleted(true);
    
    // Stop timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    const now = new Date();
    const totalTimeSpent = calculateTimeDifference(startTimeRef.current, now);
    
    // Calculate metrics and total score
    const taskCompletionData = Object.entries(submissions).map(([taskId, submission]) => ({
      task_id: taskId,
      score: submission.score || 0.8, // Default score if not provided
      time_spent: submission.time_spent
    }));
    
    const totalScore = taskCompletionData.reduce((sum, task) => sum + task.score, 0) / taskCompletionData.length;
    
    // Create analytics data
    const analyticsData = {
      user: user.id,
      scenario: scenario.id,
      metrics: {
        accuracy: totalScore,
        efficiency: 0.85, // Example metrics
        problem_solving: 0.9,
        creativity: 0.8,
        technical_skills: 0.92,
        communication: 0.88,
        decision_quality: 0.87,
        task_completion: taskCompletionData
      },
      total_score: totalScore,
      completion_time: totalTimeSpent,
      completed_at: now.toISOString(),
    };
    
    try {
      // Save analytics to database
      await analyticsApi.create(analyticsData);
    } catch (err) {
      console.error("Error saving analytics:", err);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading simulation...</p>
        </div>
      </div>
    );
  }

  if (error || !scenario || !tasks.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card variant="futuristic" className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-gray-400 mb-6">
              {error || "Simulation data not found."}
            </p>
            <Link href="/scenarios">
              <Button variant="futuristic" className="w-full">
                Back to Scenarios
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card variant="futuristic" className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-gray-400 mb-6">
              You need to be logged in to access simulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button variant="futuristic" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="w-full">
                  Create Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentTask = tasks[currentTaskIndex];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {!simulationStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {scenario.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Simulation Overview</h3>
                  <p className="text-gray-300 mb-6">{scenario.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <span className="text-indigo-400">✓</span>
                      </div>
                      <p className="text-gray-300">
                        This simulation contains {tasks.length} tasks
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <span className="text-indigo-400">✓</span>
                      </div>
                      <p className="text-gray-300">
                        Estimated duration: {Math.floor(scenario.duration / 60)} hours {scenario.duration % 60} minutes
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <span className="text-indigo-400">✓</span>
                      </div>
                      <p className="text-gray-300">
                        Your progress will be saved automatically
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-black/50 border border-indigo-500/20 rounded-lg p-4 mb-8">
                    <p className="text-gray-300 text-sm">
                      <span className="font-bold text-indigo-400">Note:</span> Once you start the simulation, you should complete it in one session for the best experience. You can pause if needed, but your timer will continue running.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    variant="futuristic"
                    size="lg"
                    onClick={startSimulation}
                    className="px-12"
                  >
                    Start Simulation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : simulationCompleted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Simulation Completed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
                <p className="text-gray-300 mb-6">
                  You have successfully completed the {scenario.title} simulation.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-black/50 border border-indigo-500/20 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Total Time</p>
                    <p className="text-xl font-bold">{formatTime(timeSpent)}</p>
                  </div>
                  <div className="bg-black/50 border border-indigo-500/20 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Tasks Completed</p>
                    <p className="text-xl font-bold">{tasks.length}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={`/dashboard`}>
                    <Button variant="futuristic" size="lg">
                      View Results
                    </Button>
                  </Link>
                  <Link href="/scenarios">
                    <Button variant="outline" size="lg">
                      More Scenarios
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div>
            {/* Simulation Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">{scenario.title}</h1>
                <p className="text-gray-400">
                  Task {currentTaskIndex + 1} of {tasks.length}
                </p>
              </div>
              <div className="bg-black/50 border border-indigo-500/20 rounded-lg px-4 py-2">
                <p className="text-sm text-gray-400">Time</p>
                <p className="text-xl font-bold">{formatTime(timeSpent)}</p>
              </div>
            </div>
            
            {/* Task Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTaskIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="futuristic">
                  <CardHeader>
                    <CardTitle>{currentTask.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-300 mb-6">{currentTask.description}</p>
                    
                    {/* Task type specific UI would go here */}
                    <div className="bg-black/50 border border-indigo-500/20 rounded-lg p-4 mb-6">
                      <p className="text-gray-300">
                        {currentTask.content.instructions}
                      </p>
                    </div>
                    
                    {/* For demo purposes, we'll just have a simple submission button */}
                    <div className="flex justify-end">
                      <Button
                        variant="futuristic"
                        onClick={() => handleTaskSubmission({ completed: true })}
                      >
                        Submit Task
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
            
            {/* Progress Bar */}
            <div className="mt-8">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${((currentTaskIndex + 1) / tasks.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>Task {currentTaskIndex + 1}</span>
                <span>{tasks.length} Tasks</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
