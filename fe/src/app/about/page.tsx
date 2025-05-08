"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
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

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former training director at Fortune 500 companies with 15+ years of experience in corporate education.",
      image: "/images/team-1.jpg",
    },
    {
      name: "Maya Rodriguez",
      role: "Chief Technology Officer",
      bio: "AI researcher with a background in educational technology and adaptive learning systems.",
      image: "/images/team-2.jpg",
    },
    {
      name: "David Kim",
      role: "Head of Design",
      bio: "Award-winning UX designer specializing in immersive digital experiences and simulation environments.",
      image: "/images/team-3.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Director of Learning",
      bio: "PhD in Cognitive Science with expertise in skill acquisition and knowledge transfer methodologies.",
      image: "/images/team-4.jpg",
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "Company Founded",
      description: "SimulEx was established with a mission to revolutionize corporate and educational training.",
    },
    {
      year: "2022",
      title: "First Prototype",
      description: "Developed and tested our first simulation prototype with select enterprise partners.",
    },
    {
      year: "2023",
      title: "Series A Funding",
      description: "Secured $8.5M in Series A funding to expand our platform and simulation capabilities.",
    },
    {
      year: "2024",
      title: "Platform Launch",
      description: "Official launch of the SimulEx platform with support for multiple professional roles.",
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black/50 to-black" />
        </motion.div>

        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium border border-purple-500/20 mb-4">
              About SimulEx
            </span>
          </motion.div>

          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient"
          >
            Our Mission
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            We're building the future of professional skill development through immersive, AI-driven simulations.
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bridging the Gap Between Theory and Practice</h2>
              <p className="text-gray-300 mb-6">
                SimulEx was founded on a simple observation: traditional training methods fail to prepare people for the real challenges of modern work environments.
              </p>
              <p className="text-gray-300 mb-6">
                Our platform combines cutting-edge AI technology with immersive simulations to create realistic work scenarios that adapt to each user's skill level and learning pace.
              </p>
              <p className="text-gray-300">
                By providing hands-on experience in a risk-free environment, we help individuals and organizations develop practical skills that translate directly to improved performance in the workplace.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-glow-purple"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Our Core Values</h3>
                  <ul className="space-y-4 text-left max-w-md mx-auto">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-400">✓</span>
                      </div>
                      <div>
                        <span className="font-bold">Authenticity</span>: Creating true-to-life simulations that reflect real workplace challenges
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-400">✓</span>
                      </div>
                      <div>
                        <span className="font-bold">Adaptivity</span>: Personalizing learning experiences to individual needs and skill levels
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-400">✓</span>
                      </div>
                      <div>
                        <span className="font-bold">Accessibility</span>: Making high-quality training available to everyone, everywhere
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-400">✓</span>
                      </div>
                      <div>
                        <span className="font-bold">Innovation</span>: Continuously pushing the boundaries of what's possible in training technology
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The passionate experts behind SimulEx's innovative training platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="futuristic" className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 mb-4 overflow-hidden">
                      {/* This would be a real image in production */}
                      <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-purple-400 text-sm mb-4">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The evolution of SimulEx from concept to cutting-edge training platform.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                >
                  <div className="w-1/2 pr-8 text-right">
                    {index % 2 === 0 ? (
                      <>
                        <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-gray-400">{milestone.description}</p>
                      </>
                    ) : (
                      <div className="text-4xl font-bold text-purple-400">{milestone.year}</div>
                    )}
                  </div>
                  <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-black" />
                  </div>
                  <div className="w-1/2 pl-8">
                    {index % 2 === 0 ? (
                      <div className="text-4xl font-bold text-purple-400">{milestone.year}</div>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-gray-400">{milestone.description}</p>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
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
            className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us on Our Mission</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of professional training and skill development with SimulEx.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button variant="futuristic" size="lg">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
