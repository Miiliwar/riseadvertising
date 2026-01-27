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
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";
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

export default function RequestQuotePage() {
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
        try {
            const { supabase } = await import("@/integrations/supabase/client");

            const { error } = await supabase.from("quote_requests").insert({
                name: data.name,
                email: data.email,
                phone: data.phone,
                company: data.company || null,
                services: data.services,
                quantity: data.quantity || null,
                width: data.width || null,
                height: data.height || null,
                delivery_location: data.location,
                deadline: data.deadline || null,
                message: data.message,
                source: data.source || null,
                status: "new",
            });

            if (error) {
                console.error("Error submitting quote:", error);
                toast.error("Failed to submit quote. Please try again.");
                setIsSubmitting(false);
                return;
            }

            // Send email notification (fire and forget - don't block on failure)
            try {
                const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
                await fetch(`${supabaseUrl}/functions/v1/send-quote-notification`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        company: data.company,
                        services: data.services,
                        message: data.message,
                        quantity: data.quantity,
                        width: data.width,
                        height: data.height,
                        delivery_location: data.location,
                        deadline: data.deadline,
                    }),
                });
            } catch (emailError) {
                console.error("Email notification failed:", emailError);
                // Don't show error to user - quote was still saved
            }

            setIsSubmitting(false);
            setIsSubmitted(true);
            toast.success("Quote request submitted successfully!");
        } catch (error) {
            console.error("Error submitting quote:", error);
            toast.error("Failed to submit quote. Please try again.");
            setIsSubmitting(false);
        }
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
                                    <a href="https://wa.me/251936704476" target="_self" rel="noopener noreferrer">
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
                        <h1 className="hero-title mb-6">Request a Quote</h1>
                        <p className="hero-subtitle text-white/80">
                            Tell us about your project and we'll provide a detailed quote within 24 hours.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16 lg:py-24">
                <div className="page-container">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
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

                                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                                    </Button>
                                </form>
                            </Form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
