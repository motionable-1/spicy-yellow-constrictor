import React from "react";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";

interface Orb {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  phase: number;
}

interface FloatingOrbsProps {
  colors?: string[];
  count?: number;
}

export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({
  colors = ["#0B132B", "#1C2541", "#5BC0BE", "#3A506B"],
  count = 6,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;

  const orbs: Orb[] = [];
  for (let i = 0; i < count; i++) {
    orbs.push({
      x: (Math.sin(i * 4.1 + 2.3) * 0.5 + 0.5) * width,
      y: (Math.cos(i * 3.7 + 1.1) * 0.5 + 0.5) * height,
      size: 200 + (Math.sin(i * 2.9) * 0.5 + 0.5) * 400,
      color: colors[i % colors.length],
      speed: 0.15 + (Math.sin(i * 1.7) * 0.5 + 0.5) * 0.25,
      phase: i * 1.2,
    });
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {orbs.map((orb, i) => {
        const xOffset = Math.sin(time * orb.speed + orb.phase) * 60;
        const yOffset = Math.cos(time * orb.speed * 0.8 + orb.phase) * 40;
        const scale = 1 + Math.sin(time * orb.speed * 1.5 + orb.phase) * 0.1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: orb.x + xOffset - orb.size / 2,
              top: orb.y + yOffset - orb.size / 2,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color}88 0%, transparent 70%)`,
              filter: `blur(${orb.size * 0.3}px)`,
              transform: `scale(${scale})`,
              opacity: 0.6,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
