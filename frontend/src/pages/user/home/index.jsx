import AIFeaturesShowcase from "./AIFeaturesShowcase";
import CompetitiveAdvantages from "./CompetitiveAdvantages";
import DemoScenarios from "./DemoScenarios";
import FinalCTA from "./FinalCTA";
import HeroSection from "./HeroSection";
import HowItWorksTimeline from "./HowItWorksTimeline";
import MetricsImpact from "./MetricsImpact";
import ProblemStatement from "./ProblemStatement";
import TeamTimeline from "./TeamTimeline";
import TechnologyStack from "./TechnologyStack";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <HeroSection />
      <ProblemStatement />
      <AIFeaturesShowcase />
      <HowItWorksTimeline />
      <DemoScenarios />
      <TechnologyStack />
      <CompetitiveAdvantages />
      {/* <MetricsImpact /> */}
      <TeamTimeline />
      <FinalCTA />
    </main>
  );
}