"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/useAuth";
import { scenariosApi, Scenario } from "@/lib/api/pocketbase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ScenarioCard from "@/components/scenarios/scenario-card";

export default function ScenariosPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [filteredScenarios, setFilteredScenarios] = useState<Scenario[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const categories = [
    { value: "developer", label: "Developer" },
    { value: "designer", label: "Designer" },
    { value: "project_manager", label: "Project Manager" },
    { value: "data_entry", label: "Data Entry" },
    { value: "ai_engineer", label: "AI Engineer" },
  ];

  const difficulties = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" },
  ];

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        setIsLoadingData(true);
        const allScenarios = await scenariosApi.getAll();
        setScenarios(allScenarios);
        setFilteredScenarios(allScenarios);
      } catch (error) {
        console.error("Error fetching scenarios:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (!isLoading) {
      fetchScenarios();
    }
  }, [isLoading]);

  useEffect(() => {
    // Filter scenarios based on search query, category, and difficulty
    let filtered = [...scenarios];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (scenario) =>
          scenario.title.toLowerCase().includes(query) ||
          scenario.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (scenario) => scenario.category === selectedCategory
      );
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(
        (scenario) => scenario.difficulty === selectedDifficulty
      );
    }

    setFilteredScenarios(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty, scenarios]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading scenarios...</p>
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
              You need to be logged in to view scenarios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="futuristic" className="w-full" asChild>
                <a href="/login">Sign In</a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="/register">Create Account</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            Training Scenarios
          </h1>
          <p className="text-gray-400">
            Browse and select from our library of immersive training simulations.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card variant="futuristic" className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search scenarios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  variant="futuristic"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className={!selectedCategory && !selectedDifficulty && !searchQuery ? "opacity-50" : ""}
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 text-sm text-gray-400">Categories</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "futuristic" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 text-sm text-gray-400">Difficulty</div>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty.value}
                    variant={selectedDifficulty === difficulty.value ? "futuristic" : "outline"}
                    size="sm"
                    onClick={() => handleDifficultyChange(difficulty.value)}
                  >
                    {difficulty.label}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Scenarios Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredScenarios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          ) : (
            <Card variant="futuristic">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-2">No scenarios found</h3>
                <p className="text-gray-400 mb-4">
                  No scenarios match your current filters.
                </p>
                <Button variant="futuristic" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
