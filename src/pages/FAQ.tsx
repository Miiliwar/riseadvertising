import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CTASection } from "@/components/sections/CTASection";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const faqCategories = [
  {
    name: "General",
    faqs: [
      {
        question: "What services does RISE Advertising offer?",
        answer: "We offer a comprehensive range of print and advertising solutions including rollup banners, PVC banners, backdrops, sticker printing, pop-up stands, vehicle wraps, signage, and custom prints. We handle everything from design to delivery.",
      },
      {
        question: "Where are you located?",
        answer: "Our main office and production facility is located in ZAM Mall, Addis Ababa, Ethiopia. We deliver nationwide.",
      },
      {
        question: "What are your operating hours?",
        answer: "We're open Monday to Saturday from 8:30 AM to 6:30 PM. We're closed on Sundays and public holidays.",
      },
    ],
  },
  {
    name: "Ordering & Pricing",
    faqs: [
      {
        question: "How do I request a quote?",
        answer: "You can request a free quote through our website contact form, by calling us directly at +251 936 704 476, or via WhatsApp. Provide details about your project including quantity, size, and any design requirements.",
      },
      {
        question: "What is your minimum order quantity?",
        answer: "Minimum orders vary by product. For rollup banners, we accept orders of 1 or more. For stickers and labels, the minimum is typically 50 sheets. Contact us for specific requirements.",
      },
      {
        question: "Do you offer bulk discounts?",
        answer: "Yes, we offer volume discounts for larger orders. The more you order, the better the per-unit price. Contact us with your quantity requirements for a custom quote.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept bank transfers, cash payments, and major credit/debit cards. For new customers, we require 50% deposit before production begins, with the balance due before delivery.",
      },
    ],
  },
  {
    name: "Production & Delivery",
    faqs: [
      {
        question: "What is your turnaround time?",
        answer: "Standard turnaround is 24-48 hours for most products after design approval. For urgent orders, we offer same-day production at an additional cost. Larger projects may require 3-7 business days.",
      },
      {
        question: "Do you offer same-day delivery?",
        answer: "Yes, we offer same-day delivery within Addis Ababa for orders approved early in the day. Express delivery fees apply based on location.",
      },
      {
        question: "Do you deliver outside Addis Ababa?",
        answer: "Absolutely! We deliver nationwide. Shipping typically takes 2-5 business days depending on the destination. Shipping costs are calculated based on package size and delivery location.",
      },
      {
        question: "Can I track my order?",
        answer: "Yes, once your order is shipped, we'll provide tracking information via SMS and email. You can also call our customer service for updates.",
      },
    ],
  },
  {
    name: "Design & Files",
    faqs: [
      {
        question: "Do you offer design services?",
        answer: "Yes, our in-house design team can create custom designs for your prints. Design fees vary based on complexity. We also accept ready-to-print files from customers.",
      },
      {
        question: "What file formats do you accept?",
        answer: "We accept AI, EPS, PDF, PSD, PNG, and JPEG files. For best quality, please provide vector files (AI, EPS, PDF) with fonts outlined. Files should be at least 150 DPI at final print size.",
      },
      {
        question: "Can I see a proof before printing?",
        answer: "Absolutely! We provide digital proofs for approval before any production begins. For critical color matching, we can also produce physical proofs at an additional cost.",
      },
    ],
  },
  {
    name: "Quality & Guarantee",
    faqs: [
      {
        question: "What quality standards do you maintain?",
        answer: "We use premium materials and state-of-the-art printing equipment. All prints are inspected before delivery. We use eco-friendly inks that are UV-resistant and weatherproof for outdoor applications.",
      },
      {
        question: "Do you offer a satisfaction guarantee?",
        answer: "Yes, we stand behind our work. If there's a printing error on our part, we'll reprint your order at no additional cost. Please report any issues within 24 hours of delivery.",
      },
      {
        question: "How long will outdoor prints last?",
        answer: "Our outdoor prints using PVC and vinyl materials typically last 2-5 years depending on exposure conditions. UV-resistant lamination can extend lifespan.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const allFaqs = faqCategories.flatMap((cat) =>
    cat.faqs.map((faq) => ({ ...faq, category: cat.name }))
  );

  const filteredFaqs = searchQuery
    ? allFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : null;

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
            <h1 className="hero-title mb-6">Frequently Asked Questions</h1>
            <p className="hero-subtitle text-white/80 mb-8">
              Find answers to common questions about our services, ordering process, and more.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white text-foreground"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-24">
        <div className="page-container max-w-4xl">
          {filteredFaqs ? (
            // Search Results
            <div>
              <h2 className="text-lg font-semibold mb-6">
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for "{searchQuery}"
              </h2>
              {filteredFaqs.length === 0 ? (
                <p className="text-muted-foreground">
                  No questions found. Try a different search term or browse categories below.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <FAQItem
                      key={index}
                      faq={faq}
                      isOpen={openItems.includes(`search-${index}`)}
                      onToggle={() => toggleItem(`search-${index}`)}
                      showCategory
                    />
                  ))}
                </div>
              )}
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 text-primary font-semibold hover:underline"
              >
                Clear search & view all categories
              </button>
            </div>
          ) : (
            // Categories View
            <div className="space-y-12">
              {faqCategories.map((category, catIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-primary rounded-full" />
                    {category.name}
                  </h2>
                  <div className="space-y-3">
                    {category.faqs.map((faq, faqIndex) => (
                      <FAQItem
                        key={faqIndex}
                        faq={faq}
                        isOpen={openItems.includes(`${catIndex}-${faqIndex}`)}
                        onToggle={() => toggleItem(`${catIndex}-${faqIndex}`)}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-secondary/30">
        <div className="page-container text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/251936704476"
              target="_self"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}

interface FAQItemProps {
  faq: { question: string; answer: string; category?: string };
  isOpen: boolean;
  onToggle: () => void;
  showCategory?: boolean;
}

function FAQItem({ faq, isOpen, onToggle, showCategory }: FAQItemProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-secondary/50 transition-colors"
      >
        <div>
          {showCategory && faq.category && (
            <span className="text-xs font-semibold text-primary mb-1 block">
              {faq.category}
            </span>
          )}
          <span className="font-semibold">{faq.question}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-6 pb-4"
        >
          <p className="text-muted-foreground">{faq.answer}</p>
        </motion.div>
      )}
    </div>
  );
}
