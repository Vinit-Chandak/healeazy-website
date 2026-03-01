import IslandNav from "@/components/IslandNav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ForWho from "@/components/ForWho";
import SignUpForm from "@/components/SignUpForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <IslandNav />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Features />
        <ForWho />
        <SignUpForm />
      </main>
      <Footer />
    </>
  );
}
