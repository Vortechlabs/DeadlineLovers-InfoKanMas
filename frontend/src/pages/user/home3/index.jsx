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


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <HeroSection />
      <ProblemStatement />
      <AIFeaturesShowcase />
      <HowItWorksTimeline />
      <DemoScenarios />
      <TechnologyStack />
      <CompetitiveAdvantages />
      <MetricsImpact />
      <TeamTimeline />
      <FinalCTA />
    </div>
  );
}
