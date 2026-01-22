import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CTASection } from "@/components/sections/CTASection";
import { CheckCircle2, Users, Target, Heart, Award, Clock } from "lucide-react";

const stats = [
  { label: "Years in Business", value: "10+" },
  { label: "Happy Clients", value: "500+" },
  { label: "Projects Completed", value: "10,000+" },
  { label: "Team Members", value: "25+" },
];

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We never compromise on quality. Every print is inspected before delivery.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "We understand deadlines. Most orders delivered within 24-48 hours.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We go the extra mile, every time.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Constantly investing in the latest printing technology and techniques.",
  },
];

const milestones = [
  { year: "2014", title: "Founded", description: "Started with a single printer in Lagos" },
  { year: "2016", title: "First Major Client", description: "Landed our first corporate contract" },
  { year: "2018", title: "Expansion", description: "Moved to larger facility, tripled capacity" },
  { year: "2020", title: "Nationwide", description: "Began delivering across all 36 states" },
  { year: "2023", title: "10,000 Projects", description: "Milestone of 10,000 completed projects" },
  { year: "2024", title: "Industry Leader", description: "Recognized as top print provider in Lagos" },
];

export default function AboutPage() {
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
            <h1 className="hero-title mb-6">About .RISE</h1>
            <p className="hero-subtitle text-white/80">
              Nigeria's trusted partner for premium print and advertising solutions since 2014.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center text-primary-foreground"
              >
                <div className="text-3xl md:text-4xl font-black">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="red-accent-bar mb-6" />
              <h2 className="section-title mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  RISE Advertising was founded in 2014 with a simple mission: to provide 
                  Nigerian businesses with world-class print and advertising solutions at 
                  competitive prices.
                </p>
                <p>
                  What started as a small operation with a single large-format printer has 
                  grown into one of Lagos' leading print providers, serving hundreds of 
                  clients from startups to Fortune 500 companies.
                </p>
                <p>
                  Our success is built on three pillars: uncompromising quality, fast 
                  turnaround, and exceptional customer service. We invest continuously in 
                  the latest printing technology and train our team to deliver excellence 
                  on every project.
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-8xl font-black text-primary">.</span>
                    <div className="text-4xl font-black">RISE</div>
                    <div className="text-muted-foreground mt-2">Since 2014</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="section-title mb-4">Our Values</h2>
            <p className="section-subtitle mx-auto">
              The principles that guide everything we do.
            </p>
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

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="section-title mb-4">Our Journey</h2>
            <p className="section-subtitle mx-auto">
              Key milestones in our story of growth and excellence.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1.5 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-card rounded-xl p-5 shadow-sm">
                      <div className="text-sm font-bold text-primary mb-1">{milestone.year}</div>
                      <h3 className="text-lg font-bold mb-1">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="section-title mb-4">Meet Our Team</h2>
            <p className="section-subtitle mx-auto">
              Dedicated professionals committed to bringing your vision to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Oluwaseun Adeyemi", role: "Founder & CEO" },
              { name: "Chidinma Okonkwo", role: "Creative Director" },
              { name: "Ibrahim Yusuf", role: "Production Manager" },
              { name: "Aisha Bello", role: "Customer Success Lead" },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="aspect-square bg-secondary rounded-xl mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500" />
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
