import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

async function sendEmail(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Rise Advertising <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });
  
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }
  
  return res.json();
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteNotificationRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  message?: string;
  quantity?: string;
  width?: string;
  height?: string;
  delivery_location?: string;
  deadline?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: QuoteNotificationRequest = await req.json();

    // Admin notification email - update this to your admin email
    const adminEmail = "riseadvertising11@gmail.com";

    // Build admin email HTML
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Quote Request</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #111827; margin-top: 0;">Customer Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 140px;">Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <a href="mailto:${data.email}" style="color: #dc2626;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                <a href="tel:${data.phone}" style="color: #dc2626;">${data.phone}</a>
              </td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Company:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.company}</td>
            </tr>
            ` : ''}
          </table>

          <h2 style="color: #111827; margin-top: 25px;">Services Requested</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.services.map(s => `<span style="background: #fee2e2; color: #dc2626; padding: 6px 12px; border-radius: 20px; font-size: 14px;">${s}</span>`).join('')}
          </div>

          ${(data.quantity || data.width || data.height) ? `
          <h2 style="color: #111827; margin-top: 25px;">Specifications</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${data.quantity ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 140px;">Quantity:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.quantity}</td>
            </tr>
            ` : ''}
            ${data.width ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Width:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.width}</td>
            </tr>
            ` : ''}
            ${data.height ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Height:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${data.height}</td>
            </tr>
            ` : ''}
          </table>
          ` : ''}

          ${data.delivery_location ? `
          <h2 style="color: #111827; margin-top: 25px;">Delivery Location</h2>
          <p style="margin: 0; color: #374151;">${data.delivery_location}</p>
          ` : ''}

          ${data.deadline ? `
          <h2 style="color: #111827; margin-top: 25px;">Deadline</h2>
          <p style="margin: 0; color: #374151;">${new Date(data.deadline).toLocaleDateString()}</p>
          ` : ''}

          ${data.message ? `
          <h2 style="color: #111827; margin-top: 25px;">Message</h2>
          <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #374151; white-space: pre-wrap;">${data.message}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background: #dc2626; border-radius: 8px; text-align: center;">
            <a href="https://riseadvertising.lovable.app/admin" style="color: white; text-decoration: none; font-weight: bold; font-size: 16px;">
              View in Admin Dashboard →
            </a>
          </div>
        </div>
        
        <div style="padding: 20px; background: #111827; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            Rise Advertising Quote Management System
          </p>
        </div>
      </div>
    `;

    // Send notification to admin
    const adminEmailResponse = await sendEmail(
      [adminEmail],
      `New Quote Request from ${data.name}`,
      adminHtml
    );

    // Build customer email HTML
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">.RISE Advertising</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #111827; margin-top: 0;">Thank you, ${data.name}!</h2>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We've received your quote request and our team is already reviewing it. 
            We'll get back to you within 24 hours with a detailed quote.
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 25px 0;">
            <h3 style="color: #111827; margin-top: 0;">What happens next?</h3>
            <ol style="color: #374151; padding-left: 20px;">
              <li style="margin-bottom: 10px;">Our team reviews your requirements</li>
              <li style="margin-bottom: 10px;">We prepare a detailed quote tailored to your needs</li>
              <li style="margin-bottom: 10px;">We'll contact you via email or phone</li>
            </ol>
          </div>

          <p style="color: #374151; font-size: 16px;">
            Have questions? Feel free to reach out to us at 
            <a href="tel:+251911123456" style="color: #dc2626;">+251 911 123 456</a> or 
            <a href="mailto:info@riseadvertising.com" style="color: #dc2626;">info@riseadvertising.com</a>
          </p>
        </div>
        
        <div style="padding: 20px; background: #111827; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            © ${new Date().getFullYear()} Rise Advertising. All rights reserved.
          </p>
        </div>
      </div>
    `;

    // Send confirmation email to customer
    const customerEmailResponse = await sendEmail(
      [data.email],
      "Thank you for your quote request - Rise Advertising",
      customerHtml
    );

    console.log("Admin email sent:", adminEmailResponse);
    console.log("Customer email sent:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        customerEmail: customerEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-quote-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
