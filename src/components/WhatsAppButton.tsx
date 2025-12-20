import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'd like to inquire about Axis Hotel.");
    window.open(`https://wa.me/254729970201?text=${message}`, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsApp}
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-warm bg-[#25D366] hover:bg-[#20BA5A] animate-fade-in p-0"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />
    </Button>
  );
};

export default WhatsAppButton;
