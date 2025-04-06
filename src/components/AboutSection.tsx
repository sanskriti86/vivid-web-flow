
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  Lightbulb, 
  LineChart, 
  Rocket,
  CheckCircle2
} from "lucide-react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll(".scroll-animation");
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("active");
              }, 150 * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Innovative Solutions",
      description: "We create forward-thinking solutions that set you apart from competitors."
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Expert Development",
      description: "Our team of experienced developers brings your ideas to life with precision."
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Data-Driven Strategy",
      description: "We leverage analytics and insights to craft strategies that deliver results."
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: "Rapid Deployment",
      description: "Quick turnaround times without compromising on quality or performance."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="scroll-animation text-3xl md:text-4xl font-bold mb-4">About <span className="heading-gradient">Our Company</span></h2>
          <p className="scroll-animation max-w-2xl mx-auto text-gray-600">
            We're a team of passionate experts dedicated to delivering exceptional digital solutions that drive growth and success for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="scroll-animation border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24 scroll-animation">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                {[
                  "10+ years of industry experience",
                  "100+ successful projects delivered",
                  "Team of certified experts",
                  "Custom solutions for your specific needs",
                  "Ongoing support and maintenance"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-1">
                <img 
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80" 
                  alt="Our team" 
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
