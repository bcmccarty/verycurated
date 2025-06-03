import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

const inquiryReasons = [
  "General Inquiry",
  "Product Suggestion",
  "Partnership Opportunity",
  "Report an Issue",
  "Other"
];

const Contact = () => {
  const [inquiryReason, setInquiryReason] = useState("General Inquiry");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            inquiry_reason: inquiryReason,
            email: email,
            message: message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Error submitting form:', error);
        toast.error("There was an error submitting your message. Please try again.");
      } else {
        toast.success("Thank you! Your message has been sent successfully.");
        // Reset form
        setEmail("");
        setMessage("");
        setInquiryReason("General Inquiry");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-neutral-800">Curated Savings Hub</h1>
            <p className="mt-2 text-neutral-500">Discover amazing products at unbeatable prices</p>
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* About Us Section */}
          <div className="mb-8 p-6 bg-neutral-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-neutral-600">
              We're dedicated to bringing you the best curated products at unbeatable prices. 
              Our team carefully selects each item to ensure quality and value for our community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg border p-6">
            <div>
              <label className="block text-sm font-medium mb-2">Reason for Contact</label>
              <Select
                value={inquiryReason}
                onValueChange={setInquiryReason}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue>{inquiryReason}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {inquiryReasons.map((reason) => (
                    <SelectItem key={reason} value={reason} className="hover:bg-neutral-100">
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="bg-white" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message *</label>
              <Textarea 
                placeholder="Type your message here..." 
                className="min-h-[150px] bg-white" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 py-3 fixed bottom-0 left-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 text-sm text-neutral-500">
            <Link to="/privacy-policy" className="hover:text-neutral-700">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-neutral-700">Terms of Service</Link>
            <Link to="/affiliate-disclosure" className="hover:text-neutral-700">Affiliate Disclosure</Link>
            <Link to="/contact" className="hover:text-neutral-700">Contact & Submit</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
