import { motion } from "framer-motion";
import { CheckCircle2, Clock, Shield, Truck, Award, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: CheckCircle2,
    title: "Premium Quality",
    description: "We use only the finest materials and state-of-the-art printing technology.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "24-48 hour delivery available. Same-day service for urgent orders.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "We deliver across Nigeria. Lagos same-day, other states in 2-3 days.",
  },
  {
    icon: Shield,
    title: "100% Satisfaction",
    description: "Not happy? We'll reprint at no extra cost. Your satisfaction is guaranteed.",
  },
  {
    icon: Award,
    title: "10+ Years Experience",
    description: "A decade of excellence serving businesses across Nigeria.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Support",
    description: "Expert team ready to help you from design to delivery.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="red-accent-bar mb-6" />
            <h2 className="section-title mb-4">
              Why Choose <span className="text-primary">.RISE</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              For over a decade, we've been Nigeria's trusted partner for premium print 
              and advertising solutions. Here's what sets us apart.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="stat-number">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Clients</div>
              </div>
              <div>
                <div className="stat-number">10K+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Done</div>
              </div>
              <div>
                <div className="stat-number">10+</div>
                <div className="text-sm text-muted-foreground mt-1">Years Active</div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
