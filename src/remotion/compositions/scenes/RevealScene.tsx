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
import { FloatingOrbs } from "./FloatingOrbs";

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily: headingFont } = loadBebasNeue();
  const { fontFamily: bodyFont } = loadInter();

  // Horizontal line reveal
  const lineWidth = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 100 },
    delay: 5,
  });

  // Version badge
  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
    delay: 20,
  });

  // Bottom tagline
  const tagOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [55, 75], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Pulsing ring
  const ringScale = 1 + Math.sin(frame / 20) * 0.05;
  const ringOpacity = 0.15 + Math.sin(frame / 25) * 0.1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B132B" }}>
      {/* Subtle orbs */}
      <FloatingOrbs
        colors={["#1C254160", "#5BC0BE20", "#3A506B40"]}
        count={4}
      />

      {/* Pulsing ring behind text */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "1px solid #5BC0BE",
            opacity: ringOpacity,
            transform: `scale(${ringScale})`,
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
            width: 700,
            height: 700,
            borderRadius: "50%",
            border: "1px solid #5BC0BE",
            opacity: ringOpacity * 0.5,
            transform: `scale(${ringScale * 1.02})`,
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
        {/* OPUS text */}
        <TextAnimation
          className="text-center"
          style={{
            fontFamily: headingFont,
            fontSize: 160,
            letterSpacing: "0.15em",
            color: "#FFFFFF",
            lineHeight: 1,
          }}
          startFrom={5}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              {
                opacity: 0,
                scale: 2,
                filter: "blur(20px)",
              },
              {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.0,
                stagger: 0.06,
                ease: "expo.out",
              },
            );
            return tl;
          }}
        >
          OPUS
        </TextAnimation>

        {/* Horizontal divider line */}
        <div
          style={{
            width: `${lineWidth * 300}px`,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #5BC0BE, transparent)",
            marginTop: 16,
            marginBottom: 16,
          }}
        />

        {/* Version badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: headingFont,
              fontSize: 64,
              color: "#5BC0BE",
              letterSpacing: "0.1em",
            }}
          >
            4.6
          </div>
          <div
            style={{
              padding: "6px 16px",
              border: "1px solid #5BC0BE",
              borderRadius: 6,
              fontFamily: bodyFont,
              fontSize: 14,
              color: "#5BC0BE",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
            }}
          >
            NEW
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            marginTop: 40,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
          }}
        >
          <TextAnimation
            className="text-center"
            style={{
              fontFamily: bodyFont,
              fontSize: 20,
              color: "#6FFFE9",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
            }}
            startFrom={55}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 15 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.08,
                  ease: "power2.out",
                },
              );
              return tl;
            }}
          >
            The New Standard in Reasoning
          </TextAnimation>
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
