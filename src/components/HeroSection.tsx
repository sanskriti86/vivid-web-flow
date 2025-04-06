
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const heroElements = heroRef.current?.querySelectorAll(".hero-animate");
    heroElements?.forEach((el) => observer.observe(el));

    return () => {
      heroElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center pt-20 pb-10 section-padding overflow-hidden bg-gradient-to-b from-white to-purple-50/50"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl">
            <h1 className="hero-animate opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transforming Ideas into 
              <span className="heading-gradient"> Digital Excellence</span>
            </h1>
            <p className="hero-animate opacity-0 text-lg text-gray-600 mb-8 delay-100">
              We deliver cutting-edge solutions tailored to your business needs, 
              helping you stand out in today's competitive digital landscape.
            </p>
            <div className="hero-animate opacity-0 flex flex-col sm:flex-row gap-4 delay-200">
              <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-white px-6 py-6 text-lg rounded-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-6 py-6 text-lg rounded-lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 hero-animate opacity-0">
            <div className="relative">
              <div className="bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full w-72 h-72 md:w-96 md:h-96 absolute -top-10 -left-10 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Digital Services"
                className="rounded-lg shadow-2xl object-cover w-full max-w-lg mx-auto relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
