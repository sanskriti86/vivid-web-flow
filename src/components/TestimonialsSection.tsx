
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Linkedin,
  Youtube,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  text: string;
  rating: number;
  platform: "general" | "linkedin" | "youtube";
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRefs = {
    general: useRef<HTMLDivElement>(null),
    linkedin: useRef<HTMLDivElement>(null),
    youtube: useRef<HTMLDivElement>(null),
  };
  
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

  const scroll = (direction: "left" | "right", platform: "general" | "linkedin" | "youtube") => {
    const container = scrollContainerRefs[platform].current;
    if (container) {
      const scrollAmount = 350;
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechCorp",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      text: "The web development services provided exceeded our expectations. Our online presence has significantly improved, resulting in a 40% increase in leads.",
      rating: 5,
      platform: "general"
    },
    {
      id: 2,
      name: "Michael Brown",
      position: "CEO",
      company: "Innovate Inc.",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      text: "The team demonstrated exceptional technical skills and creativity. They delivered our project ahead of schedule, and the results have been outstanding.",
      rating: 5,
      platform: "general"
    },
    {
      id: 3,
      name: "Emily Chen",
      position: "Product Manager",
      company: "Nexus Solutions",
      image: "https://randomuser.me/api/portraits/women/69.jpg",
      text: "Working with this company has been a game-changer for our business. Their strategic approach and attention to detail are unmatched.",
      rating: 4,
      platform: "general"
    },
    {
      id: 4,
      name: "David Wilson",
      position: "Operations Director",
      company: "Global Enterprises",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "The custom software they developed streamlined our operations and reduced costs by 30%. Exceptional service from start to finish.",
      rating: 5,
      platform: "general"
    },
    {
      id: 5,
      name: "Robert Anderson",
      position: "CTO",
      company: "Digital Dynamics",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      text: "I've been sharing our success story on LinkedIn. The SEO work they did for us resulted in a 200% increase in organic traffic within just 3 months.",
      rating: 5,
      platform: "linkedin"
    },
    {
      id: 6,
      name: "Jennifer Martinez",
      position: "Digital Marketing Manager",
      company: "Elevate Brand",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      text: "Connected with this amazing team on LinkedIn. Their social media strategy transformed our brand perception and engagement rates.",
      rating: 5,
      platform: "linkedin"
    },
    {
      id: 7,
      name: "Thomas Lee",
      position: "Startup Founder",
      company: "InnovateTech",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      text: "My LinkedIn network recommended this company, and they didn't disappoint. Excellent communication and outstanding results for our startup.",
      rating: 4,
      platform: "linkedin"
    },
    {
      id: 8,
      name: "Alex Turner",
      position: "Content Creator",
      company: "Create & Connect",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      text: "As a YouTube content creator, I needed a website that reflects my brand. The team delivered a stunning site that perfectly captures my style.",
      rating: 5,
      platform: "youtube"
    },
    {
      id: 9,
      name: "Sophia Williams",
      position: "YouTube Influencer",
      company: "TrendSetters",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      text: "My YouTube channel grew exponentially after implementing their digital marketing strategy. Couldn't be happier with the results!",
      rating: 5,
      platform: "youtube"
    },
    {
      id: 10,
      name: "Daniel Garcia",
      position: "Video Producer",
      company: "Visual Stories",
      image: "https://randomuser.me/api/portraits/men/74.jpg",
      text: "The custom YouTube channel enhancement they provided has helped me stand out from the competition. Great service and support throughout!",
      rating: 4,
      platform: "youtube"
    }
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="scroll-animation text-3xl md:text-4xl font-bold mb-4">Client <span className="heading-gradient">Testimonials</span></h2>
          <p className="scroll-animation max-w-2xl mx-auto text-gray-600">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="scroll-animation">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">General</span>
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </TabsTrigger>
              <TabsTrigger value="youtube" className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                <span className="hidden sm:inline">YouTube</span>
              </TabsTrigger>
            </TabsList>
            
            {/* General Testimonials */}
            <TabsContent value="general" className="relative">
              <div className="flex justify-end mb-4 space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => scroll("left", "general")}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => scroll("right", "general")}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div 
                ref={scrollContainerRefs.general} 
                className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
              >
                {testimonials
                  .filter(t => t.platform === "general")
                  .map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))
                }
              </div>
            </TabsContent>
            
            {/* LinkedIn Testimonials */}
            <TabsContent value="linkedin" className="relative">
              <div className="flex justify-end mb-4 space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => scroll("left", "linkedin")}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => scroll("right", "linkedin")}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div 
                ref={scrollContainerRefs.linkedin} 
                className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
              >
                {testimonials
                  .filter(t => t.platform === "linkedin")
                  .map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))
                }
              </div>
            </TabsContent>
            
            {/* YouTube Testimonials */}
            <TabsContent value="youtube" className="relative">
              <div className="flex justify-end mb-4 space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => scroll("left", "youtube")}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => scroll("right", "youtube")}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div 
                ref={scrollContainerRefs.youtube} 
                className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth"
              >
                {testimonials
                  .filter(t => t.platform === "youtube")
                  .map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const platformIcon = {
    general: <MessageSquare className="h-4 w-4 text-gray-500" />,
    linkedin: <Linkedin className="h-4 w-4 text-blue-600" />,
    youtube: <Youtube className="h-4 w-4 text-red-600" />
  };

  return (
    <Card className="min-w-[320px] max-w-md border-gray-100 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <p className="text-gray-700 mb-6 min-h-[120px]">"{testimonial.text}"</p>
        <div className="flex items-center gap-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.position}, {testimonial.company}</p>
          </div>
          <div className="ml-auto">
            {platformIcon[testimonial.platform]}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialsSection;
