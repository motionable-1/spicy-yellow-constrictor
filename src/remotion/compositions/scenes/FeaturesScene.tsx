import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  AbsoluteFill,
} from "remotion";
import { loadFont as loadBebasNeue } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";
import { FloatingOrbs } from "./FloatingOrbs";

interface FeatureCardProps {
  icon: string;
  title: string;
  value: string;
  delay: number;
  index: number;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  value,
  delay,
  index,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily: headingFont } = loadBebasNeue();
  const { fontFamily: bodyFont } = loadInter();

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140 },
    delay,
  });

  const cardOpacity = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle hover pulse
  const pulse = 1 + Math.sin((frame - delay) / 15) * 0.02;

  return (
    <div
      style={{
        position: "absolute",
        left: index < 2 ? (index === 0 ? 100 : 480) : index === 2 ? 860 : 100,
        top: index < 3 ? (index < 2 ? 160 : 160) : 400,
        width: 320,
        opacity: cardOpacity,
        transform: `scale(${cardScale * pulse})`,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1C254180, #0B132B90)",
          border: `1px solid ${color}30`,
          borderRadius: 16,
          padding: "28px 24px",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            fontSize: 36,
            marginBottom: 12,
          }}
        >
          {icon}
        </div>

        {/* Value */}
        <div
          style={{
            fontFamily: headingFont,
            fontSize: 48,
            color: color,
            letterSpacing: "0.05em",
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          {value}
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 14,
            color: "#9DB4C0",
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily: headingFont } = loadBebasNeue();
  const { fontFamily: bodyFont } = loadInter();

  const features = [
    {
      icon: "🧠",
      title: "Context Window",
      value: "200K",
      color: "#5BC0BE",
      delay: 10,
    },
    {
      icon: "⚡",
      title: "Faster Reasoning",
      value: "3X",
      color: "#6FFFE9",
      delay: 18,
    },
    {
      icon: "🎯",
      title: "Accuracy Score",
      value: "99.2%",
      color: "#5BC0BE",
      delay: 26,
    },
  ];

  // Ambient line
  const lineProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B132B" }}>
      {/* Background */}
      <FloatingOrbs
        colors={["#1C254140", "#5BC0BE15", "#3A506B30"]}
        count={3}
      />

      {/* Grid pattern */}
      <AbsoluteFill style={{ opacity: 0.05 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#5BC0BE"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </AbsoluteFill>

      {/* Section title */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 60,
        }}
      >
        <TextAnimation
          className="text-center"
          style={{
            fontFamily: headingFont,
            fontSize: 64,
            letterSpacing: "0.1em",
            color: "#FFFFFF",
          }}
          startFrom={0}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              { opacity: 0, y: 40, rotationX: -60 },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.7,
                stagger: 0.03,
                ease: "back.out(1.5)",
              },
            );
            return tl;
          }}
        >
          UNPRECEDENTED POWER
        </TextAnimation>
      </AbsoluteFill>

      {/* Accent line under title */}
      <div
        style={{
          position: "absolute",
          top: 135,
          left: "50%",
          transform: "translateX(-50%)",
          width: `${lineProgress * 200}px`,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #5BC0BE, transparent)",
        }}
      />

      {/* Feature cards */}
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          value={feature.value}
          delay={feature.delay}
          index={index}
          color={feature.color}
        />
      ))}

      {/* Bottom stat counter */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 60,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: headingFont,
              fontSize: 56,
              color: "#6FFFE9",
              letterSpacing: "0.05em",
            }}
          >
            <Counter
              from={0}
              to={200000}
              duration={2.5}
              delay={1.2}
              separator=","
              suffix=" TOKENS"
              ease="power3.out"
              style={{
                fontFamily: headingFont,
                fontSize: 56,
                color: "#6FFFE9",
                letterSpacing: "0.05em",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 14,
              color: "#3A506B",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              marginTop: 8,
              opacity: interpolate(frame, [50, 65], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Maximum Context Window
          </div>
        </div>
      </AbsoluteFill>

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, #0B132B 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
