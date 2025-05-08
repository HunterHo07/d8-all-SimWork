"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import HeroAnimation from "@/components/animations/hero-animation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!titleRef.current) return;

    const title = titleRef.current;
    const chars = title.innerText.split("");

    // Clear the title and replace with spans
    title.innerHTML = "";
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.innerText = char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      title.appendChild(span);
    });

    // Animate each character
    gsap.to(title.children, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      delay: 0.2,
      ease: "power3.out",
      duration: 0.5,
      from: { opacity: 0, y: 20 },
    });
  }, []);

  const features = [
    {
      title: "Immersive Environments",
      description: "Navigate through realistic workspaces with specialized stations for different roles.",
      icon: "🌐",
    },
    {
      title: "Real-World Tasks",
      description: "Complete authentic challenges that mirror on-the-job workflows and requirements.",
      icon: "💼",
    },
    {
      title: "Adaptive Intelligence",
      description: "Experience dynamic difficulty adjustment based on your performance and skill level.",
      icon: "🧠",
    },
    {
      title: "Comprehensive Analytics",
      description: "Track your progress with detailed metrics and personalized feedback.",
      icon: "📊",
    },
  ];

  const roles = [
    {
      title: "Developer",
      description: "Solve coding challenges in a realistic terminal environment.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Designer",
      description: "Create and evaluate design assets with AI-powered feedback.",
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Project Manager",
      description: "Make critical decisions in complex project scenarios.",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Data Entry",
      description: "Test accuracy and efficiency in data processing tasks.",
      color: "from-yellow-500 to-amber-600",
    },
    {
      title: "AI Engineer",
      description: "Design prompts and systems for artificial intelligence.",
      color: "from-red-500 to-orange-600",
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-black z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black/50 to-black" />

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-indigo-500/30 blur-xl"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </motion.div>

        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium border border-indigo-500/20 mb-4">
              The Future of Work Training
            </span>
          </motion.div>

          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient"
          >
            SimulEx
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            AI-driven, immersive training simulations that bridge the gap between theory and practice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/register">
              <Button variant="futuristic" size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <HeroAnimation />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-1 bg-gray-400 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Revolutionize Your Training Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              SimulEx combines cutting-edge technology with practical learning to create an unparalleled training platform.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="futuristic" className="h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/20 to-black opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Specialized Role Simulations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Experience realistic scenarios tailored to different professional roles.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-20`} />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 p-8">
                  <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                  <p className="text-gray-300 mb-4">{role.description}</p>
                  <div className={`h-1 w-16 bg-gradient-to-r ${role.color} rounded-full`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Training?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join SimulEx today and experience the future of professional skill development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button variant="futuristic" size="lg">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
