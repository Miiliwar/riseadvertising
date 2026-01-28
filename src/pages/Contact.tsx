import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-pattern py-20 lg:py-28">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="hero-title mb-6">Contact Us</h1>
            <p className="hero-subtitle text-white/80">
              Get in touch with us for any inquiries or support. We are here to help you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Whether you have a question about our services, pricing, or need technical support, our team is ready to answer all your questions.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-muted-foreground mb-1">Call us directly</p>
                    <a href="tel:+251936704476" className="text-primary hover:underline block">+251 936 704 476</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-muted-foreground mb-1">Send us a message</p>
                    <a href="mailto:riseadvertising11@gmail.com" className="text-primary hover:underline block">riseadvertising11@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-muted-foreground mb-1">Visit our office</p>
                    <a
                      href="https://www.google.com/maps/place/RISE+ADVERTISING+AND+PRINTING/@8.9510213,38.7177277,17z"
                      target="_self"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline block"
                    >
                      ZAM Mall, Lebu, Addis Ababa
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Office Hours</h3>
                    <div className="text-muted-foreground">
                      <p>Mon-Sat: 8:00 AM - 6:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  {/* Facebook - Blue */}
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://m.me/riseadvertising1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-input shadow-sm flex items-center justify-center bg-white hover:shadow-md transition-shadow"
                    aria-label="Facebook"
                  >
                    <svg className="h-6 w-6" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.971.956-2.971 3.594v.376h3.617l-.571 3.667h-3.046v7.98h-4.844Z" />
                    </svg>
                  </motion.a>

                  {/* Instagram - Gradient */}
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://ig.me/riseadvertising11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-input shadow-sm flex items-center justify-center bg-white hover:shadow-md transition-shadow"
                    aria-label="Instagram"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="none">
                      <defs>
                        <linearGradient id="insta-gradient-hover" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f09433" />
                          <stop offset="25%" stopColor="#e6683c" />
                          <stop offset="50%" stopColor="#dc2743" />
                          <stop offset="75%" stopColor="#cc2366" />
                          <stop offset="100%" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#insta-gradient-hover)"
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      />
                    </svg>
                  </motion.a>

                  {/* YouTube - Red */}
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://youtube.com/@riseadvertising"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-input shadow-sm flex items-center justify-center bg-white hover:shadow-md transition-shadow"
                    aria-label="YouTube"
                  >
                    <svg className="h-6 w-6" fill="#FF0000" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </motion.a>

                  {/* TikTok - Black */}
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://tiktok.com/@riseadvertising1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-input shadow-sm flex items-center justify-center bg-white hover:shadow-md transition-shadow"
                    aria-label="TikTok"
                  >
                    <svg className="h-6 w-6" fill="#000000" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </motion.a>

                  {/* Telegram - Blue */}
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://t.me/riseadvertising1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-input shadow-sm flex items-center justify-center bg-white hover:shadow-md transition-shadow"
                    aria-label="Telegram"
                  >
                    <svg className="h-6 w-6" fill="#26A5E4" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.961 7.224c.131.021.34.005.441.446a2.68 2.68 0 0 1 .08.571s-.011.02-.303 1.944c-1.353 8.356-1.742 10.686-2.146 11.026-.819.688-2.584-.525-2.859-.724-2.844-2.072-3.868-2.607-4.22-2.888-.47-.375-.125-.97.234-1.472.102-.142 5.86-5.834 6.136-6.42a.267.267 0 0 0-.083-.223c-.161-.137-3.926 2.39-5.115 3.197-.565.383-1.077.568-1.53.551-.57-.02-1.637-.306-2.455-.572-.988-.323-1.776-.531-1.706-1.121.036-.312.428-.636 1.171-.967 4.542-2.105 7.625-3.523 9.25-4.27 4.609-2.115 5.567-2.484 6.204-2.397.142.02.457.068.707.091z" />
                    </svg>
                  </motion.a>

                  {/* Twitter/X - Black */}
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://twitter.com/riseadvertising"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-input shadow-sm flex items-center justify-center bg-white hover:shadow-md transition-shadow"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5" fill="#000000" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </motion.a>

                  {/* WhatsApp - Green */}
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/251936704476"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-input shadow-sm flex items-center justify-center bg-white hover:shadow-md transition-shadow"
                    aria-label="WhatsApp"
                  >
                    <svg className="h-6 w-6" fill="#25D366" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg border border-border"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.84!2d38.717!3d8.951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b818075755b19%3A0x324707bba2617f21!2sRISE%20ADVERTISING%20AND%20PRINTING!5e1!3m2!1sen!2set!4v1706000000000!5m2!1sen!2set"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RISE Advertising Location - ZAM Mall, Lebu, Addis Ababa"
                className="w-full h-full border-0"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
