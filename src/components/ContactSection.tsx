
import { useState, useEffect, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin,
  Send,
  CheckCircle2
} from "lucide-react";
import emailjs from 'emailjs-com';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
  }, []);
  
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    console.log("Form submitted:", { name, email, message });

    // Send the email using EmailJS
    emailjs.sendForm(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      e.currentTarget as HTMLFormElement,
      'YOUR_USER_ID' // Replace with your EmailJS user ID
    )
    .then((result) => {
      console.log('Email successfully sent!', result.text);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      
      // Reset the form
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Reset success state after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    });
  };
  
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "sankalpgour2@gmail.com",
      link: "mailto:sankalpgour2@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "+91 9977827050",
      link: "tel:+919977827050"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Address",
      value: "123 Business Avenue, Tech Park, City",
      link: "https://maps.google.com"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="scroll-animation text-3xl md:text-4xl font-bold mb-4">Get In <span className="heading-gradient">Touch</span></h2>
          <p className="scroll-animation max-w-2xl mx-auto text-gray-600">
            Have a question or want to work together? Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="scroll-animation">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="h-10 w-1 bg-primary rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold">Send Us A Message</h3>
              </div>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="How can we help you?" 
                      rows={5} 
                      required 
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="bg-white rounded-xl shadow-xl p-8 mb-8 scroll-animation">
              <div className="flex items-center mb-6">
                <div className="h-10 w-1 bg-accent rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold">Contact Information</h3>
              </div>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">{info.title}</h4>
                      <a 
                        href={info.link}
                        className="text-gray-600 hover:text-primary transition-colors"
                        target={info.title === "Address" ? "_blank" : undefined}
                        rel="noreferrer"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary to-accent rounded-xl text-white p-8 mt-auto scroll-animation">
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="mb-6">
                Ready to take your business to the next level? Get in touch with our experts today.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
