import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Abebe Kebede",
    company: "Zemen Tech",
    role: "Marketing Director",
    content: "RISE Advertising delivered exceptional quality rollup banners for our tech conference. The colors were vibrant and the turnaround time was impressive. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Tigist Haile",
    company: "Ethio Coffee",
    role: "Brand Manager",
    content: "We've been working with RISE for over 2 years now. Their attention to detail and professional service keeps us coming back. Best print shop in Addis Ababa!",
    rating: 5,
  },
  {
    id: 3,
    name: "Dawit Girma",
    company: "Unity Events",
    role: "CEO",
    content: "From backdrops to pop-up stands, RISE handles all our event branding needs. Fast delivery and excellent quality every single time.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-foreground text-background overflow-hidden">
      <div className="page-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-16 h-1.5 bg-primary rounded-full mx-auto mb-6" />
          <h2 className="section-title mb-4">What Our Clients Say</h2>
          <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what businesses across Ethiopia say about working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-background/5 backdrop-blur-sm rounded-2xl p-6 border border-background/10 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/30" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-background/80 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-background/60">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
