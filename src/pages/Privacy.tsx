import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

export default function PrivacyPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-pattern py-20">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl font-black mb-4">Privacy Policy</h1>
            <p className="text-white/80">Last updated: January 2024</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="page-container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              RISE Advertising ("we," "our," or "us") is committed to protecting your 
              privacy. This Privacy Policy explains how we collect, use, disclose, and 
              safeguard your information when you use our services or visit our website.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information (email, phone number, address)</li>
              <li>Company name and job title</li>
              <li>Payment information</li>
              <li>Project details and files you upload</li>
              <li>Communication history with our team</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referring website addresses</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your projects</li>
              <li>Send promotional materials and updates (with your consent)</li>
              <li>Improve our services and website</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li>Service providers who assist in our operations (delivery, payment processing)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect 
              your personal information against unauthorized access, alteration, disclosure, 
              or destruction. However, no method of transmission over the Internet is 
              100% secure.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the 
              purposes outlined in this policy, unless a longer retention period is required 
              by law. Order records are kept for 7 years for tax and legal purposes.
            </p>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h2>8. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. Cookies are 
              small files stored on your device that help us analyze web traffic and 
              customize content. You can choose to disable cookies through your browser 
              settings.
            </p>

            <h2>9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible 
              for the privacy practices of these external sites. We encourage you to review 
              their privacy policies.
            </p>

            <h2>10. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under 18 years of age. We do 
              not knowingly collect personal information from children.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of 
              any changes by posting the new policy on this page and updating the "Last 
              updated" date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your 
              rights, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@riseadvertising.ng</li>
              <li>Phone: +234 800 000 0000</li>
              <li>Address: 123 Victoria Island, Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
