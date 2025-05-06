import React, { useEffect, useRef, useState } from "react";
import { NeatConfig, NeatGradient } from "@firecms/neat";

const GradientBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gradientRef = useRef<NeatGradient | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    gradientRef.current = new NeatGradient({
      ref: canvasRef.current,
      colors: [
        {
          color: "#7987DA",
          enabled: true,
        },
        {
          color: "#7952BD",
          enabled: true,
        },
        {
          color: "#522F9A",
          enabled: true,
        },
        {
          color: "#B2F1E9",
          enabled: false,
        },
        {
          color: "#2D1A46",
          enabled: false,
        },
      ],
      speed: 4,
      horizontalPressure: 4,
      verticalPressure: 5,
      waveFrequencyX: 2,
      waveFrequencyY: 4,
      waveAmplitude: 6,
      shadows: 4,
      highlights: 4,
      colorBrightness: 1,
      colorSaturation: 3,
      wireframe: false,
      colorBlending: 7,
      backgroundColor: "#FFFFFF",
      backgroundAlpha: 1,
      grainScale: 0,
      grainIntensity: 0,
      grainSpeed: 0,
      resolution: 1,
    });

    return gradientRef.current.destroy;
  }, [canvasRef.current]);

  return (
    <canvas
      className="bgColor"
      style={{
        isolation: "isolate",
        height: "100vh",
        width: "100%",
      }}
      ref={canvasRef}
    />
  );
};

export default GradientBg;
