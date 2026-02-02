import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

export default function TermsPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20 lg:py-28 relative overflow-hidden">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl font-black mb-4">Terms of Service</h1>
            <p className="text-white/80">Last updated: January 2024</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="page-container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the services of RISE Advertising ("we," "our," or "us"),
              you agree to be bound by these Terms of Service. If you do not agree to these
              terms, please do not use our services.
            </p>

            <h2>2. Services</h2>
            <p>
              RISE Advertising provides print and advertising solutions including but not
              limited to rollup banners, PVC banners, backdrops, sticker printing, pop-up
              stands, vehicle wraps, signage, and custom prints.
            </p>

            <h2>3. Orders and Payment</h2>
            <h3>3.1 Quotes and Pricing</h3>
            <p>
              All quotes are valid for 7 days from the date of issue unless otherwise stated.
              Prices are subject to change based on material availability and market conditions.
            </p>

            <h3>3.2 Payment Terms</h3>
            <ul>
              <li>A 50% deposit is required before production begins for new customers</li>
              <li>The remaining balance is due before delivery or pickup</li>
              <li>We accept bank transfers, cash, and major credit/debit cards</li>
            </ul>

            <h3>3.3 Order Confirmation</h3>
            <p>
              Orders are confirmed only after receipt of payment and written approval of
              design proofs. Production begins after order confirmation.
            </p>

            <h2>4. Design and Artwork</h2>
            <h3>4.1 Customer-Supplied Files</h3>
            <p>
              Customers are responsible for ensuring their artwork is print-ready and meets
              our specifications. We accept AI, EPS, PDF, PSD, PNG, and JPEG files at
              minimum 150 DPI resolution.
            </p>

            <h3>4.2 Design Services</h3>
            <p>
              Design services are available at additional cost. All designs created by our
              team remain our intellectual property until full payment is received.
            </p>

            <h3>4.3 Proofing</h3>
            <p>
              Digital proofs are provided for customer approval before production. Changes
              requested after proof approval may incur additional charges.
            </p>

            <h2>5. Production and Delivery</h2>
            <h3>5.1 Turnaround Times</h3>
            <p>
              Standard turnaround is 24-48 hours for most products. Urgent orders may be
              accommodated at additional cost. Delivery times are estimates and not guaranteed.
            </p>

            <h3>5.2 Shipping</h3>
            <p>
              We deliver within Addis Ababa and ship nationwide. Shipping costs are calculated
              based on package size and destination. Risk of loss transfers to customer
              upon delivery to carrier.
            </p>

            <h2>6. Quality and Returns</h2>
            <h3>6.1 Quality Guarantee</h3>
            <p>
              We guarantee our products against defects in materials and workmanship. If
              there's a printing error on our part, we will reprint at no additional cost.
            </p>

            <h3>6.2 Claims and Returns</h3>
            <p>
              Claims must be reported within 24 hours of delivery with photographic evidence.
              We do not accept returns for customer-approved designs or customer-supplied
              artwork errors.
            </p>

            <h2>7. Liability</h2>
            <p>
              Our liability is limited to the value of the order. We are not responsible for
              any indirect, incidental, or consequential damages arising from the use of our
              products or services.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              Customers warrant that they have the right to use all artwork, logos, and
              content provided for printing. We are not liable for any copyright or
              trademark infringement.
            </p>

            <h2>9. Privacy</h2>
            <p>
              Your use of our services is also governed by our Privacy Policy, which
              describes how we collect and use your personal information.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of our
              services after changes constitutes acceptance of the new terms.
            </p>

            <h2>11. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <ul>
              <li>Email: riseadvertising11@gmail.com</li>
              <li>Phone: +251 936 704 476</li>
              <li>Address: ZAM Mall, Addis Ababa, Ethiopia</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
