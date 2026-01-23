import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const services = [
  "Rollup Banners",
  "PVC Banners",
  "Backdrops",
  "Sticker Printing",
  "Pop-up Stands",
  "Custom Prints",
  "Vehicle Wraps",
  "Signage",
  "3D Lightbox",
  "Keychains",
  "T-shirts",
  "Mugs & Caps",
];

const sources = [
  "Google Search",
  "Social Media",
  "Referral",
  "Returning Customer",
  "Other",
];

const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  company: z.string().max(100).optional(),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  quantity: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  location: z.string().min(2, "Please enter delivery location").max(200),
  deadline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  source: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      services: [],
      quantity: "",
      width: "",
      height: "",
      location: "",
      deadline: "",
      message: "",
      source: "",
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Quote request:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Quote request submitted successfully!");
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 lg:py-32">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Quote Request Received!</h1>
              <p className="text-muted-foreground mb-8">
                Thank you for your interest. Our team will review your request and
                get back to you within 24 hours with a detailed quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => setIsSubmitted(false)}>
                  Submit Another Request
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://wa.me/251936704476" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

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
            <h1 className="hero-title mb-6">Get a Free Quote</h1>
            <p className="hero-subtitle text-white/80">
              Tell us about your project and we'll provide a detailed quote within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-primary py-6">
        <div className="page-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-primary-foreground">
            <a href="tel:+251936704476" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Phone className="h-5 w-5" />
              <span>+251 936 704 476</span>
            </a>
            <a href="mailto:riseadvertising11@gmail.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Mail className="h-5 w-5" />
              <span>riseadvertising11@gmail.com</span>
            </a>
            <a
              href="https://www.google.com/maps/place/RISE+ADVERTISING+AND+PRINTING/@8.9510213,38.7177277,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <MapPin className="h-5 w-5" />
              <span>ZAM Mall, Lebu, Addis Ababa</span>
            </a>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5" />
              <span>Mon-Sat: 8AM - 6PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-24">
        <div className="page-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} className="form-input-rise" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company" {...field} className="form-input-rise" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@example.com" {...field} className="form-input-rise" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+251 9XX XXX XXX" {...field} className="form-input-rise" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Services Selection */}
                  <FormField
                    control={form.control}
                    name="services"
                    render={() => (
                      <FormItem>
                        <FormLabel>Services Needed *</FormLabel>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {services.map((service) => (
                            <FormField
                              key={service}
                              control={form.control}
                              name="services"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(service)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, service])
                                          : field.onChange(
                                            field.value?.filter((value) => value !== service)
                                          );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {service}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dimensions */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 10" {...field} className="form-input-rise" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 100" {...field} className="form-input-rise" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 200" {...field} className="form-input-rise" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Delivery Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Location *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Bole, Addis Ababa" {...field} className="form-input-rise" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Deadline</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="form-input-rise" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project, design requirements, and any specific needs..."
                            className="form-input-rise min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Source */}
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How did you hear about us?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="form-input-rise">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sources.map((source) => (
                              <SelectItem key={source} value={source}>
                                {source}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                  </Button>
                </form>
              </Form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Quick Contact Card */}
              <div className="bg-card rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-muted-foreground mb-6">
                  For urgent orders or quick questions, reach out directly.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="tel:+251936704476">
                      <Phone className="h-4 w-4" />
                      Call: +251 936 704 476
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://wa.me/251936704476" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Us
                    </a>
                  </Button>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-secondary/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-2">Fast Response</h3>
                <p className="text-sm text-muted-foreground">
                  We respond to all quote requests within 24 hours. For urgent orders,
                  please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Map Embed */}
      <section className="h-[400px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.84!2d38.717!3d8.951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b818075755b19%3A0x324707bba2617f21!2sRISE%20ADVERTISING%20AND%20PRINTING!5e1!3m2!1sen!2set!4v1706000000000!5m2!1sen!2set"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="RISE Advertising Location - ZAM Mall, Lebu, Addis Ababa"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute top-11 right-4 bg-background/95 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs">
          <h3 className="font-bold text-lg mb-1">Visit Our Office</h3>
          <p className="text-sm text-muted-foreground">
            ZAM Mall 2nd Floor, Lebu, Addis Ababa, Ethiopia
          </p>
          <a
            href="https://www.google.com/maps/place/RISE+ADVERTISING+AND+PRINTING/@8.9510213,38.7177277,17z/data=!3m1!1e3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary font-semibold hover:underline mt-2 inline-block"
          >
            Get Directions →
          </a>
        </div>
      </section>
    </Layout>
  );
}
