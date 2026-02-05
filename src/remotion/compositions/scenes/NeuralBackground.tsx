import React, { useMemo } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  AbsoluteFill,
} from "remotion";

interface Node {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
  opacity: number;
}

interface NeuralBackgroundProps {
  color1?: string;
  color2?: string;
  nodeCount?: number;
  showConnections?: boolean;
}

export const NeuralBackground: React.FC<NeuralBackgroundProps> = ({
  color1 = "#5BC0BE",
  color2 = "#6FFFE9",
  nodeCount = 40,
  showConnections = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const nodes = useMemo<Node[]>(() => {
    const result: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      result.push({
        x: (Math.sin(i * 7.3 + 1.2) * 0.5 + 0.5) * width,
        y: (Math.cos(i * 5.1 + 3.4) * 0.5 + 0.5) * height,
        size: 2 + (Math.sin(i * 3.7) * 0.5 + 0.5) * 4,
        speed: 0.3 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 0.7,
        phase: i * 0.8,
        opacity: 0.3 + (Math.cos(i * 4.2) * 0.5 + 0.5) * 0.7,
      });
    }
    return result;
  }, [nodeCount, width, height]);

  const time = frame / fps;

  const animatedNodes = nodes.map((node, i) => {
    const xOffset = Math.sin(time * node.speed + node.phase) * 30;
    const yOffset = Math.cos(time * node.speed * 0.7 + node.phase) * 20;
    return {
      ...node,
      cx: node.x + xOffset,
      cy: node.y + yOffset,
    };
  });

  const connections = useMemo(() => {
    if (!showConnections) return [];
    const lines: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
    }[] = [];
    for (let i = 0; i < animatedNodes.length; i++) {
      for (let j = i + 1; j < animatedNodes.length; j++) {
        const dx = animatedNodes[i].cx - animatedNodes[j].cx;
        const dy = animatedNodes[i].cy - animatedNodes[j].cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          lines.push({
            x1: animatedNodes[i].cx,
            y1: animatedNodes[i].cy,
            x2: animatedNodes[j].cx,
            y2: animatedNodes[j].cy,
            opacity: (1 - dist / 200) * 0.3,
          });
        }
      }
    }
    return lines;
  }, [animatedNodes, showConnections]);

  const globalOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ opacity: globalOpacity }}>
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {connections.map((line, i) => (
          <line
            key={`c-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={color1}
            strokeWidth={1}
            opacity={line.opacity}
          />
        ))}
        {animatedNodes.map((node, i) => {
          const pulse = Math.sin(time * 2 + node.phase) * 0.3 + 0.7;
          return (
            <circle
              key={`n-${i}`}
              cx={node.cx}
              cy={node.cy}
              r={node.size * pulse}
              fill={i % 3 === 0 ? color2 : color1}
              opacity={node.opacity * pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
