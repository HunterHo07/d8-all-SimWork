"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Scenario } from "@/lib/api/pocketbase";
import { formatDuration, getDifficultyColor, getCategoryIcon } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ScenarioCardProps {
  scenario: Scenario;
}

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Default image if none provided
  const imageUrl = scenario.cover_image 
    ? `http://127.0.0.1:8090/api/files/scenarios/${scenario.id}/${scenario.cover_image}`
    : `/images/scenario-${scenario.category}.jpg`;

  // Calculate rotation based on mouse position
  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ z: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      ref={cardRef}
    >
      <Card 
        variant="futuristic"
        className="overflow-hidden h-full transition-all duration-300 ease-out"
      >
        <div className="relative h-48">
          <Image
            src={imageUrl}
            alt={scenario.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
              {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
            </span>
            <span className="px-2 py-1 rounded-full bg-gray-800 text-xs font-medium">
              {formatDuration(scenario.duration)}
            </span>
          </div>
          
          <div className="absolute bottom-4 left-4">
            <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
          </div>
        </div>
        
        <CardContent className="p-4">
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {scenario.description}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center`}>
                <svg
                  className="w-4 h-4 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-400 capitalize">
                {scenario.category.replace('_', ' ')}
              </span>
            </div>
            
            <Link href={`/scenarios/${scenario.id}`}>
              <Button variant="futuristic" size="sm">
                Start
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
