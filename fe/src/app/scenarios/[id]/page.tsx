// This is required for static site generation with dynamic routes
export function generateStaticParams() {
  return [{ id: "demo-scenario" }];
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/useAuth";
import { scenariosApi, tasksApi, Scenario, Task } from "@/lib/api/pocketbase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDuration, getDifficultyColor } from "@/lib/utils";

export default function ScenarioDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScenarioData = async () => {
      if (!id) return;

      try {
        setIsLoadingData(true);

        // Fetch scenario details
        const scenarioData = await scenariosApi.getById(id as string);
        setScenario(scenarioData);

        // Fetch tasks for this scenario
        const scenarioTasks = await tasksApi.getByScenario(id as string);
        setTasks(scenarioTasks);
      } catch (err) {
        console.error("Error fetching scenario data:", err);
        setError("Failed to load scenario data. Please try again later.");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (!isLoading) {
      fetchScenarioData();
    }
  }, [id, isLoading]);

  const handleStartSimulation = () => {
    router.push(`/simulation/${id}`);
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading scenario details...</p>
        </div>
      </div>
    );
  }

  if (error || !scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card variant="futuristic" className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-gray-400 mb-6">
              {error || "Scenario not found."}
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
              You need to be logged in to view scenario details.
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

  // Default image if none provided
  const imageUrl = scenario.cover_image
    ? `http://127.0.0.1:8090/api/files/scenarios/${scenario.id}/${scenario.cover_image}`
    : `/images/scenario-${scenario.category}.jpg`;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/scenarios" className="text-indigo-400 hover:text-indigo-300 mb-4 inline-block">
            ← Back to Scenarios
          </Link>
        </motion.div>

        {/* Scenario Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden shadow-glow-blue">
                  <Image
                    src={imageUrl}
                    alt={scenario.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                      {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-800 text-sm font-medium">
                      {formatDuration(scenario.duration)}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium capitalize">
                      {scenario.category.replace('_', ' ')}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{scenario.title}</h1>
                  <p className="text-gray-300 mb-6">{scenario.description}</p>
                  <Button
                    variant="futuristic"
                    size="lg"
                    onClick={handleStartSimulation}
                  >
                    Start Simulation
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Card variant="futuristic">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Simulation Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Number of Tasks</p>
                      <p className="font-bold text-lg">{tasks.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Estimated Duration</p>
                      <p className="font-bold text-lg">{formatDuration(scenario.duration)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Category</p>
                      <p className="font-bold text-lg capitalize">{scenario.category.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Difficulty</p>
                      <p className="font-bold text-lg capitalize">{scenario.difficulty}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Tasks Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Tasks</h2>

          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <Card key={task.id} variant="futuristic">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-400 font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                        <p className="text-gray-400 mb-2">{task.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 rounded-full bg-gray-800 text-xs font-medium capitalize">
                            {task.type.replace('_', ' ')}
                          </span>
                          {task.time_limit && (
                            <span className="px-2 py-1 rounded-full bg-gray-800 text-xs font-medium">
                              {Math.floor(task.time_limit / 60)} min
                            </span>
                          )}
                          <span className="px-2 py-1 rounded-full bg-gray-800 text-xs font-medium">
                            {task.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="futuristic">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">No tasks available for this scenario.</p>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            variant="futuristic"
            size="lg"
            onClick={handleStartSimulation}
            className="px-12"
          >
            Start Simulation
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
