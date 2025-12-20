import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import axisLogo from "@/assets/axis-hotel-logo.png";
import { useAuth } from "@/hooks/useAuth"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const { isAdmin, user } = useAuth();
  const isMasterAdmin = isAdmin && user?.email === 'kelvinmwangi1744@gmail.com';

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Logo Section */}
          <div> {/* <--- THIS WAS THE MISSING TAG CAUSING THE ERROR */}
            <div className="flex items-center">
  <img
  src={axisLogo}
  alt="Axis Hotel Nakuru Logo"
  className="
    h-16
    sm:h-20
    md:h-24
    lg:h-28
    w-auto
    max-w-full
    object-contain
  "
/>

</div>


            <p className="text-background/80 mb-4">
              Your home away from home in Nakuru. Experience comfort, hospitality, and great value.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/NakuruAxis/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/nakuruaxishotel/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://x.com/nakuruaxishotel/status/1658802593852801025" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#lounges" className="hover:text-accent transition-colors">Lounges</a></li>
              <li><a href="#restaurant" className="hover:text-accent transition-colors">Restaurant</a></li>
              <li><a href="#events" className="hover:text-accent transition-colors">Events</a></li>
              <li><a href="#testimonials" className="hover:text-accent transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-accent">Our Services</h4>
            <ul className="space-y-2 text-background/80">
              <li>Lounge Accommodation</li>
              <li>Restaurant & Dining</li>
              <li>Event Spaces</li>
              <li>Catering Services</li>
              <li>24/7 Reception</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3 text-background/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Near Nakuru Prisons Area, Nakuru, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+254 729970201</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@axishotel.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Admin Access */}
        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>&copy; {currentYear} Axis Hotel Nakuru. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Made with care for your comfort and convenience
          </p>
          
          <Link 
            to={isMasterAdmin ? "/admin" : "/auth"} 
            className="mt-4 inline-block text-xs text-background/40 hover:text-accent transition-colors"
          >
            {isMasterAdmin ? "Admin Dashboard" : "Admin Access"}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;