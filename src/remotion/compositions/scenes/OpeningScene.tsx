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
import { NeuralBackground } from "./NeuralBackground";
import { FloatingOrbs } from "./FloatingOrbs";

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily: headingFont } = loadBebasNeue();
  const { fontFamily: bodyFont } = loadInter();

  // Central light burst
  const burstScale = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 80 },
    delay: 5,
  });

  const burstOpacity = interpolate(frame, [5, 20, 60, 80], [0, 0.6, 0.6, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Tagline fade
  const taglineOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const taglineY = interpolate(frame, [45, 65], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Scan line effect
  const scanLineY = interpolate(frame, [0, 90], [-10, 110], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B132B" }}>
      {/* Background orbs */}
      <FloatingOrbs
        colors={["#1C254180", "#5BC0BE30", "#3A506B50", "#0B132B"]}
        count={5}
      />

      {/* Neural network */}
      <NeuralBackground color1="#5BC0BE" color2="#6FFFE9" nodeCount={35} />

      {/* Central light burst */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #5BC0BE22 0%, #6FFFE910 40%, transparent 70%)",
            transform: `scale(${burstScale * 1.5})`,
            opacity: burstOpacity,
            filter: "blur(40px)",
          }}
        />
      </AbsoluteFill>

      {/* Scan line */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: `${scanLineY}%`,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #5BC0BE40, transparent)",
            filter: "blur(1px)",
          }}
        />
      </AbsoluteFill>

      {/* Main text */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TextAnimation
          className="text-center"
          style={{
            fontFamily: headingFont,
            fontSize: 28,
            letterSpacing: "0.4em",
            color: "#5BC0BE",
            textTransform: "uppercase" as const,
          }}
          startFrom={10}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              { opacity: 0, y: 20, filter: "blur(8px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.6,
                stagger: 0.04,
                ease: "power3.out",
              },
            );
            return tl;
          }}
        >
          Introducing
        </TextAnimation>

        <div style={{ height: 20 }} />

        <TextAnimation
          className="text-center"
          style={{
            fontFamily: headingFont,
            fontSize: 130,
            letterSpacing: "0.08em",
            color: "#FFFFFF",
            lineHeight: 1,
          }}
          startFrom={25}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              {
                opacity: 0,
                y: 80,
                rotationX: -90,
                scale: 0.5,
              },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                scale: 1,
                duration: 0.9,
                stagger: 0.04,
                ease: "back.out(1.4)",
              },
            );
            return tl;
          }}
        >
          CLAUDE
        </TextAnimation>

        {/* Tagline below */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            marginTop: 24,
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 22,
              color: "#5BC0BE",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}
          >
            The Next Frontier of Intelligence
          </span>
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
