
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

    if (message.length > 500) {
      toast.error("Message must be under 500 characters");
      return;
    }

    setIsSubmitting(true);
    console.log("Attempting to submit contact form...");

    try {
      // First, let's test the Supabase connection
      const { data: testData, error: testError } = await supabase
        .from('contact_submissions')
        .select('count')
        .limit(1);

      console.log("Supabase connection test:", { testData, testError });

      if (testError) {
        console.error('Supabase connection/table error:', testError);
        
        // If table doesn't exist or permission issues, show a more user-friendly message
        if (testError.code === 'PGRST116' || testError.message?.includes('relation') || testError.message?.includes('does not exist')) {
          toast.error("Contact form is currently unavailable. Please try emailing us directly.");
        } else {
          toast.error("Database connection issue. Please try again later.");
        }
        return;
      }

      // If connection test passes, proceed with the insert
      const submissionData = {
        inquiry_reason: inquiryReason,
        email: email,
        message: message,
        created_at: new Date().toISOString()
      };

      console.log("Submitting data:", submissionData);

      const { error } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (error) {
        console.error('Error submitting form:', error);
        console.error('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        
        toast.error("There was an error submitting your message. Please try again.");
      } else {
        console.log("Form submitted successfully!");
        toast.success("Thank you! Your message has been sent successfully. We'll get back to you soon!");
        // Reset form
        setEmail("");
        setMessage("");
        setInquiryReason("General Inquiry");
      }
    } catch (error) {
      console.error('Unexpected error submitting form:', error);
      toast.error("There was an unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <Link to="/" className="inline-block">
            <div className="w-32 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
              <span className="text-gray-500 text-sm">Logo</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Take Me Back Button */}
          <div className="mb-8 flex justify-center">
            <Link to="/" className="relative inline-flex items-center justify-center w-[200px] h-[50px] text-white rounded-[4px] font-['Heiti_SC'] text-sm font-bold tracking-[1px] border-2 border-transparent hover:border-[#355E3B] hover:text-[#355E3B] before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#355E3B] before:to-[#2f5534] hover:before:opacity-0 before:transition-opacity before:rounded-[4px]">
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                <ArrowLeft size={16} />
                TAKE ME BACK
              </span>
            </Link>
          </div>

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
              <label className="block text-sm font-medium mb-2">
                Message * 
                <span className="text-neutral-400 font-normal">
                  ({message.length}/500 characters)
                </span>
              </label>
              <Textarea 
                placeholder="Type your message here..." 
                className="min-h-[150px] bg-white" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                required
              />
            </div>

            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="relative inline-flex items-center justify-center w-[200px] h-[50px] text-white rounded-[4px] font-['Heiti_SC'] text-sm font-bold tracking-[1px] border-2 border-transparent hover:border-[#355E3B] hover:text-[#355E3B] before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#355E3B] before:to-[#2f5534] hover:before:opacity-0 before:transition-opacity before:rounded-[4px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-transparent disabled:hover:text-white"
              >
                <span className="relative z-10 whitespace-nowrap">
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </span>
              </button>
            </div>
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
