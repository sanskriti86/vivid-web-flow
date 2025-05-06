
import { Button } from "@/components/ui/button";
import { book } from "lucide-react";

interface BookCallButtonProps {
  className?: string;
  isFloating?: boolean;
}

const BookCallButton = ({ className = "", isFloating = false }: BookCallButtonProps) => {
  const handleClick = () => {
    window.open("https://calendly.com/sankalpgour2", "_blank");
  };

  if (isFloating) {
    return (
      <Button
        onClick={handleClick}
        className={`fixed bottom-20 right-6 z-40 shadow-lg flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-5 py-6 transition-all duration-300 hover:scale-105 ${className}`}
        size="lg"
      >
        <book className="h-5 w-5" />
        Book a Call
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      className={`flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-5 py-6 transition-all duration-300 hover:scale-105 ${className}`}
      size="lg"
    >
      <book className="h-5 w-5" />
      Book a Call
    </Button>
  );
};

export default BookCallButton;
