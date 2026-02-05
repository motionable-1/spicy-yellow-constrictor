import { AbsoluteFill, Artifact, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { OpeningScene } from "./scenes/OpeningScene";
import { RevealScene } from "./scenes/RevealScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { ClosingScene } from "./scenes/ClosingScene";

// This re-runs on every HMR update of this file
const hmrKey = Date.now();

// Scene durations (in frames at 30fps)
const OPENING_DURATION = 105; // 3.5s
const REVEAL_DURATION = 105; // 3.5s
const FEATURES_DURATION = 120; // 4s
const CLOSING_DURATION = 120; // 4s (includes buffer at end)
const TRANSITION_DURATION = 20; // ~0.67s per transition

// Total: 105 + 105 + 120 + 120 - (20 * 3) = 390 frames = 13s

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* Leave this here to generate a thumbnail */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill style={{ backgroundColor: "#0B132B" }}>
        <TransitionSeries>
          {/* Scene 1: Opening - CLAUDE title with neural network */}
          <TransitionSeries.Sequence durationInFrames={OPENING_DURATION}>
            <OpeningScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 2: Reveal - OPUS 4.6 version reveal */}
          <TransitionSeries.Sequence durationInFrames={REVEAL_DURATION}>
            <RevealScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 3: Features - Stats and capability cards */}
          <TransitionSeries.Sequence durationInFrames={FEATURES_DURATION}>
            <FeaturesScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 4: Closing - Logo, tagline, CTA */}
          <TransitionSeries.Sequence durationInFrames={CLOSING_DURATION}>
            <ClosingScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
