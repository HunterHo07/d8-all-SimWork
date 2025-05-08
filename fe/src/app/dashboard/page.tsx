"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/useAuth";
import { scenariosApi, analyticsApi, Scenario, Analytics } from "@/lib/api/pocketbase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScenarioCard from "@/components/scenarios/scenario-card";
import { formatDate, formatScore } from "@/lib/utils";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [recentScenarios, setRecentScenarios] = useState<Scenario[]>([]);
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        setIsLoadingData(true);
        
        // Fetch scenarios
        const allScenarios = await scenariosApi.getAll();
        setScenarios(allScenarios);
        
        // Get recent scenarios (first 3)
        setRecentScenarios(allScenarios.slice(0, 3));
        
        // Fetch user analytics
        const userAnalytics = await analyticsApi.getUserAnalytics(user.id);
        setAnalytics(userAnalytics);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isAuthenticated && !isLoading) {
      fetchData();
    }
  }, [isAuthenticated, isLoading, user]);

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading your dashboard...</p>
        </div>
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
              You need to be logged in to view this page.
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

  // Calculate stats
  const completedScenarios = analytics.length;
  const averageScore = analytics.length > 0
    ? analytics.reduce((sum, item) => sum + item.total_score, 0) / analytics.length
    : 0;
  const totalTime = analytics.reduce((sum, item) => sum + item.completion_time, 0);
  const hoursSpent = Math.floor(totalTime / 3600);
  const minutesSpent = Math.floor((totalTime % 3600) / 60);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-gray-400">
            Track your progress and continue your training journey.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <Card variant="futuristic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed Scenarios</p>
                  <h3 className="text-3xl font-bold">{completedScenarios}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-indigo-400"
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
              </div>
            </CardContent>
          </Card>

          <Card variant="futuristic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Average Score</p>
                  <h3 className="text-3xl font-bold">{formatScore(averageScore)}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="futuristic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Time Spent</p>
                  <h3 className="text-3xl font-bold">{hoursSpent}h {minutesSpent}m</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="futuristic">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Available Scenarios</p>
                  <h3 className="text-3xl font-bold">{scenarios.length}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Scenarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Scenarios</h2>
            <Link href="/scenarios">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          {recentScenarios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentScenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          ) : (
            <Card variant="futuristic">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400 mb-4">No scenarios available yet.</p>
                <Link href="/scenarios">
                  <Button variant="futuristic">Browse Scenarios</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

          {analytics.length > 0 ? (
            <Card variant="futuristic">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-800">
                  {analytics.slice(0, 5).map((item) => (
                    <div key={item.id} className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.scenario}</h3>
                        <p className="text-sm text-gray-400">
                          Completed on {formatDate(item.completed_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatScore(item.total_score)}</p>
                        <p className="text-sm text-gray-400">
                          {Math.floor(item.completion_time / 60)} minutes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card variant="futuristic">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400 mb-4">No activity recorded yet.</p>
                <p className="text-sm text-gray-500 mb-4">
                  Complete scenarios to see your activity here.
                </p>
                <Link href="/scenarios">
                  <Button variant="futuristic">Start a Scenario</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
