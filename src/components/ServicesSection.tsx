
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Smartphone, 
  Code, 
  Search, 
  LineChart, 
  Mail,
  ChevronRight
} from "lucide-react";

const ServicesSection = () => {
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

  const services = [
    {
      icon: <Globe className="h-12 w-12 text-primary" />,
      title: "Web Development",
      description: "Custom websites that engage visitors and drive conversions with responsive design and seamless functionality.",
      details: [
        "Responsive Design", 
        "E-commerce Solutions", 
        "CMS Integration", 
        "API Development"
      ]
    },
    {
      icon: <Smartphone className="h-12 w-12 text-primary" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences on any device.",
      details: [
        "iOS Development", 
        "Android Development", 
        "Cross-Platform Apps", 
        "App Maintenance"
      ]
    },
    {
      icon: <Code className="h-12 w-12 text-primary" />,
      title: "Custom Software",
      description: "Tailored software solutions designed to streamline operations and solve specific business challenges.",
      details: [
        "Business Analysis", 
        "Software Architecture", 
        "Development & Testing", 
        "Deployment & Support"
      ]
    },
    {
      icon: <Search className="h-12 w-12 text-primary" />,
      title: "SEO Optimization",
      description: "Data-driven strategies to improve your visibility in search engines and attract qualified traffic.",
      details: [
        "Keyword Research", 
        "On-page Optimization", 
        "Technical SEO", 
        "Link Building"
      ]
    },
    {
      icon: <LineChart className="h-12 w-12 text-primary" />,
      title: "Digital Marketing",
      description: "Comprehensive marketing solutions to boost your online presence and connect with your target audience.",
      details: [
        "PPC Advertising", 
        "Social Media Marketing", 
        "Content Strategy", 
        "Email Campaigns"
      ]
    },
    {
      icon: <Mail className="h-12 w-12 text-primary" />,
      title: "Email Marketing",
      description: "Effective email campaigns that nurture leads, boost engagement, and drive conversions.",
      details: [
        "Campaign Strategy", 
        "Email Design", 
        "Automation Setup", 
        "Performance Analysis"
      ]
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-24 section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="scroll-animation text-3xl md:text-4xl font-bold mb-4">Our <span className="heading-gradient">Services</span></h2>
          <p className="scroll-animation max-w-2xl mx-auto text-gray-600">
            We offer a comprehensive range of digital solutions to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceProps {
  service: {
    icon: React.ReactNode;
    title: string;
    description: string;
    details: string[];
  };
  index: number;
}

const ServiceCard = ({ service, index }: ServiceProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`scroll-animation border border-gray-100 overflow-hidden transition-all duration-300 ${
        isHovered ? "shadow-xl -translate-y-2" : "shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="rounded-full bg-primary/10 p-4 w-fit mb-6">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-6">{service.description}</p>
        
        <div className={`space-y-2 overflow-hidden transition-all duration-300 ${
          isHovered ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}>
          {service.details.map((detail, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-primary" />
              <span className="text-gray-700">{detail}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          variant="ghost" 
          className="text-primary hover:bg-primary/10 hover:text-primary p-0"
        >
          Learn More
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServicesSection;
