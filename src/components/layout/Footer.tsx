import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { Logo } from "./Logo";

const footerLinks = {
  services: [
    { name: "Rollup Banners", href: "/services/rollup-banners" },
    { name: "PVC Banners", href: "/services/pvc-banners" },
    { name: "Backdrops", href: "/services/backdrops" },
    { name: "Sticker Printing", href: "/services/sticker-printing" },
    { name: "Pop-up Stands", href: "/services/pop-up-stands" },
    { name: "Custom Prints", href: "/services/custom-prints" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/riseadvertising1" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/riseadvertising1" },
  {
    name: "TikTok", icon: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ), href: "https://tiktok.com/@riseadvertising1"
  },
  {
    name: "Telegram", icon: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ), href: "https://t.me/riseadvertising1"
  },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="page-container py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
              <p className="text-white/70 mt-1">
                Subscribe to our newsletter for the latest offers and updates.
              </p>
            </div>
            <form className="flex gap-2 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-w-[280px]"
              />
              <Button variant="default" className="whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center">
              <Logo size="lg" variant="footer" />
            </Link>
            <p className="mt-4 text-white/70 max-w-sm">
              Ethiopia's premier advertising and print solutions provider. We bring your brand to life with high-quality prints, banners, and signage.
            </p>
            <p className="mt-2 text-sm text-primary font-semibold">
              THE BRANDING EMPIRE
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="tel:+251936704476"
                className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span>+251 936 704 476</span>
              </a>
              <a
                href="tel:+251992921401"
                className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span>+251 992 921 401</span>
              </a>
              <a
                href="mailto:riseadvertising11@gmail.com"
                className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span>riseadvertising11@gmail.com</span>
              </a>
              <a
                href="https://www.google.com/maps/place/RISE+ADVERTISING+AND+PRINTING/@8.9510213,38.7177277,17z/data=!3m1!1e3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/80 hover:text-primary transition-colors"
              >
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>ZAM Mall 2nd Floor, Lebu, Addis Ababa, Ethiopia</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="page-container py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} RISE Advertising. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-primary transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
