"use client";

import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 120, height = 36, className = "" }: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Futuristic background elements */}
      <g filter="url(#glow)">
        <path d="M10,30 L30,10 L50,30 L30,50 Z" fill="url(#logoGradient)" opacity="0.6" />
        <circle cx="160" cy="30" r="15" fill="url(#logoGradient)" opacity="0.6" />
        <rect x="70" y="15" width="30" height="30" rx="5" fill="url(#logoGradient)" opacity="0.6" />
      </g>
      
      {/* Text */}
      <text x="50" y="38" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white">
        SimulEx
      </text>
      
      {/* Decorative elements */}
      <line x1="10" y1="45" x2="190" y2="45" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.8" />
      <circle cx="10" cy="45" r="2" fill="white" />
      <circle cx="190" cy="45" r="2" fill="white" />
    </svg>
  );
}
