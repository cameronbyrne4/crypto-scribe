"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundBeams = React.memo(() => {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_17_60)">
        <g filter="url(#filter0_f_17_60)">
          <path
            d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
            fill="url(#paint0_linear_17_60)"
          ></path>
          <path
            d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
            fill="url(#paint1_linear_17_60)"
          ></path>
          <path
            d="M320 400H400V78.75L106.2 134.75L320 400Z"
            fill="url(#paint2_linear_17_60)"
          ></path>
          <path
            d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
            fill="url(#paint3_linear_17_60)"
          ></path>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_17_60"
          x="-50"
          y="-50"
          width="500"
          height="500"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="25"
            result="effect1_foregroundBlur_17_60"
          ></feGaussianBlur>
        </filter>
        <clipPath id="clip0_17_60">
          <rect width="400" height="400" fill="white"></rect>
        </clipPath>
        <linearGradient
          id="paint0_linear_17_60"
          x1="64.3"
          y1="0"
          x2="64.3"
          y2="322.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--crypto-blue))"></stop>
          <stop offset="1" stopColor="hsl(var(--crypto-blue))" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_17_60"
          x1="160"
          y1="322.2"
          x2="160"
          y2="400"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--primary))"></stop>
          <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_17_60"
          x1="360"
          y1="400"
          x2="360"
          y2="78.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--crypto-purple))"></stop>
          <stop offset="1" stopColor="hsl(var(--crypto-purple))" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient
          id="paint3_linear_17_60"
          x1="264.3"
          y1="0"
          x2="264.3"
          y2="134.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--accent))"></stop>
          <stop offset="1" stopColor="hsl(var(--accent))" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";