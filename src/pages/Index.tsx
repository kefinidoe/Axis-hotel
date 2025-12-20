import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Lounges from "@/components/Lounges";
import Restaurant from "@/components/Restaurant";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* HERO SECTION */}
        <Hero />
        
        {/* REMOVED: The BookingForm was here. 
           It is now ONLY located inside the Contact component at the bottom.
        */}

        <About />
        <Lounges />
        <Restaurant />
        <Events />
        <Testimonials />
        <Gallery />
        <Location />
        
        {/* CONTACT & RESERVATION SECTION */}
        {/* Your BookingForm lives inside this component */}
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;