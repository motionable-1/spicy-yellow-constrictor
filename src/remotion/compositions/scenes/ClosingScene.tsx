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
import { Glow } from "../../library/components/effects/Glow";
import { FloatingOrbs } from "./FloatingOrbs";
import { NeuralBackground } from "./NeuralBackground";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily: headingFont } = loadBebasNeue();
  const { fontFamily: bodyFont } = loadInter();

  // Logo entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
    delay: 5,
  });

  // CTA button
  const ctaScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
    delay: 50,
  });

  const ctaOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const tagOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [30, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtle particle burst on logo reveal
  const burstOpacity = interpolate(frame, [5, 15, 30], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing ring
  const ringPulse = 1 + Math.sin(frame / 18) * 0.03;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B132B" }}>
      {/* Background */}
      <FloatingOrbs
        colors={["#1C254150", "#5BC0BE15", "#3A506B30"]}
        count={4}
      />
      <NeuralBackground color1="#5BC0BE" color2="#6FFFE9" nodeCount={20} />

      {/* Pulsing rings */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "1px solid #5BC0BE20",
            transform: `scale(${ringPulse})`,
            opacity: 0.3,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 550,
            height: 550,
            borderRadius: "50%",
            border: "1px solid #5BC0BE10",
            transform: `scale(${ringPulse * 1.01})`,
            opacity: 0.2,
          }}
        />
      </AbsoluteFill>

      {/* Burst effect */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #5BC0BE30 0%, transparent 60%)",
            opacity: burstOpacity,
            filter: "blur(30px)",
          }}
        />
      </AbsoluteFill>

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Logo mark */}
        <Glow
          color="#5BC0BE"
          intensity={25}
          pulsate
          pulseDuration={3}
          pulseMin={0.4}
        >
          <div
            style={{
              transform: `scale(${logoScale})`,
              marginBottom: 24,
            }}
          >
            {/* Stylized logo */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                background: "linear-gradient(135deg, #5BC0BE, #6FFFE9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px #5BC0BE40, 0 0 80px #5BC0BE20",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="#0B132B"
                  opacity="0.8"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="#0B132B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="#0B132B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Glow>

        {/* Brand name */}
        <TextAnimation
          className="text-center"
          style={{
            fontFamily: headingFont,
            fontSize: 90,
            letterSpacing: "0.15em",
            color: "#FFFFFF",
            lineHeight: 1,
          }}
          startFrom={12}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              { opacity: 0, y: 40, scale: 0.8 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.05,
                ease: "back.out(1.7)",
              },
            );
            return tl;
          }}
        >
          CLAUDE OPUS 4.6
        </TextAnimation>

        {/* Tagline */}
        <div
          style={{
            marginTop: 20,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 22,
              color: "#5BC0BE",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
            }}
          >
            Intelligence, Refined
          </span>
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 50,
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <div
            style={{
              padding: "16px 48px",
              background: "linear-gradient(135deg, #5BC0BE, #6FFFE9)",
              borderRadius: 12,
              fontFamily: bodyFont,
              fontSize: 16,
              fontWeight: 600,
              color: "#0B132B",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              boxShadow: "0 0 30px #5BC0BE40, 0 4px 20px #00000040",
            }}
          >
            Try on Claude.ai
          </div>
        </div>
      </AbsoluteFill>

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, #0B132B 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
