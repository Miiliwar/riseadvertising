import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CTASection } from "@/components/sections/CTASection";
import { CheckCircle2, Award, Clock, Heart, Target, Wrench, Truck, Settings } from "lucide-react";

// Images
import ourStoryImage from "@/assets/about/our-story.jpg";
import teamMember1 from "@/assets/about/team-member-1.jpg";
import teamMember2 from "@/assets/about/team-member-2.jpg";
import teamMember3 from "@/assets/about/team-member-3.png";
import teamMember4 from "@/assets/about/team-member-4.png";
import riseTextureIcon from "@/assets/rise-texture-icon.png";

const teamMember = teamMember1;

const stats = [
  { label: "Years in Business", value: "10+" },
  { label: "Happy Clients", value: "500+" },
  { label: "Projects Completed", value: "10,000+" },
  { label: "Team Members", value: "25+" },
];

const values = [
  {
    icon: Award,
    title: "Quality",
    description: "We deliver excellence in every product and service.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We build trust through honesty and transparency.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We embrace creativity and modern solutions.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "We deliver on time, every time.",
  },
];

const capabilities = [
  { icon: Settings, title: "Graphic Design & Branding" },
  { icon: Wrench, title: "Signage Fabrication" },
  { icon: Award, title: "Neon & LED Production" },
  { icon: Wrench, title: "3D Lettering" },
  { icon: Settings, title: "UV Printing" },
  { icon: Truck, title: "Installation Services" },
  { icon: Settings, title: "Maintenance & Repair" },
  { icon: Truck, title: "Delivery & Logistics" },
];

const industries = [
  "Retail & Commercial Businesses",
  "Hotels, Restaurants & Cafés",
  "Corporate Offices",
  "Government Institutions",
  "NGOs & Development Organizations",
  "Educational Institutions",
  "Events & Exhibitions",
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20 lg:py-28 relative overflow-hidden">
        {/* Decorative Texture Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={riseTextureIcon}
            alt=""
            className="absolute right-0 top-0 w-96 h-96 opacity-10 animate-spin-slow"
            style={{ animationDuration: '80s' }}
          />
          <img
            src={riseTextureIcon}
            alt=""
            className="absolute left-0 bottom-0 w-80 h-80 opacity-10 animate-spin-slow"
            style={{ animationDuration: '100s', animationDirection: 'reverse' }}
          />
        </div>
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-primary-foreground max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase">
              About Rise Printing & Advertising
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              A professional printing, signage, branding, and advertising company committed to delivering high-quality visual communication solutions.
            </p><br />
            <p>We specialize in transforming ideas into powerful brand identities through creative design,
              precision production, and reliable service delivery. From concept to completion, we provide
              end-to-end branding solutions that help businesses grow, stand out, and succeed in
              competitive markets.</p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-foreground py-8">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center text-background"
              >
                <div className="text-3xl md:text-4xl font-black text-primary">{stat.value}</div>
                <div className="text-sm text-background/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                WHO WE ARE
              </p>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                A Team of Creative Professionals
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  We are a team of creative professionals, designers, fabricators, technicians, and branding specialists working together to deliver world-class printing and signage solutions.
                </p>
                <p>
                  Our company was built on the principles of quality, integrity, innovation, and customer satisfaction. Every project we handle is treated as a brand investment — not just a print job.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-secondary rounded-2xl overflow-hidden relative">
                <img
                  src={ourStoryImage}
                  alt="RISE Advertising - The Perfect Place for your Branding"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              OUR STORY
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              From Vision to Reality
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground text-left">
              <p>
                Rise Printing & Advertising was founded with a clear vision: to build a reliable, professional, and innovative branding company that businesses can trust.
              </p>
              <p>
                Starting as a small creative production company, we have grown into a full-service branding and advertising partner serving multiple industries with modern technology, skilled professionals, and strong operational systems.
              </p>
              <p>
                Our growth is driven by client trust, quality delivery, and long-term partnerships.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary text-primary-foreground p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-black mb-4">Our Vision</h3>
              <p className="text-primary-foreground/90">
                To become a leading branding, printing, and signage company recognized for quality,
                innovation, and excellence in service delivery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-foreground text-background p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-black mb-4">Our Mission</h3>
              <p className="text-background/90">
                To empower businesses and organizations through powerful branding, professional printing,
                and high-quality signage solutions that create strong market presence and lasting brand
                impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              OUR VALUES
            </p>
            <h2 className="text-3xl md:text-4xl font-black">
              The Principles That Guide Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              OUR CAPABILITIES
            </p>
            <h2 className="text-3xl md:text-4xl font-black">
              What We Can Do For You
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg"
              >
                <cap.icon className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{cap.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              INDUSTRIES WE SERVE
            </p>
            <h2 className="text-3xl md:text-4xl font-black">
              Trusted Across Sectors
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, index) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-5 py-3 bg-primary text-primary-foreground rounded-full text-sm font-semibold"
              >
                {industry}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              OUR TEAM
            </p>
            <h2 className="text-3xl md:text-4xl font-black">
              Meet The Professionals
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Dedicated professionals committed to bringing your vision to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Team Member", role: "Founder & CEO", image: teamMember },
              { name: "Production Team", role: "Manufacturing", image: teamMember },
              { name: "Team Member", role: "Creative Director", image: teamMember },
              { name: "Team Member", role: "Operations Manager", image: teamMember },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="aspect-square bg-secondary rounded-xl mb-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
