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

    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "contact");
      formData.append("inquiry_reason", inquiryReason);
      formData.append("email", email);
      formData.append("message", message);

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (response.ok) {
        toast.success("Thank you! Your message has been sent successfully. We'll get back to you soon!");
        setEmail("");
        setMessage("");
        setInquiryReason("General Inquiry");
      } else {
        toast.error("There was an error submitting your message. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error submitting form:", error);
      toast.error("There was an unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <Link to="/" className="inline-block">
            <img
              src="/images/verycurated_logo.svg"
              alt="Very Curated Logo"
              className="w-32 h-16 mx-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Hidden form for Netlify to detect at build time */}
          <form name="contact" data-netlify="true" hidden>
            <input type="text" name="inquiry_reason" />
            <input type="email" name="email" />
            <textarea name="message" />
          </form>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg border p-6">
            <input type="hidden" name="form-name" value="contact" />

            <div>
              <label className="block text-sm font-medium mb-2">Talk to us about...</label>
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
              <label className="block text-sm font-medium mb-2">Your best email *</label>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Drop us a note below *
                <span className="text-neutral-400 font-normal">
                  ({message.length}/500 characters)
                </span>
              </label>
              <Textarea
                name="message"
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
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                </span>
              </button>
            </div>
          </form>

          {/* Take Me Back Link - moved to bottom */}
          <div className="mt-8 flex justify-center">
            <Link to="/" className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-800 underline">
              <ArrowLeft size={16} />
              Take me back
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 py-3 fixed bottom-0 left-0 w-full z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 text-sm text-neutral-600">
            <Link to="/" className="hover:text-neutral-800">Home</Link>
            <Link to="/privacy-policy" className="hover:text-neutral-800">Privacy Policy</Link>
            <Link to="/affiliate-disclosure" className="hover:text-neutral-800">Affiliate Disclosure</Link>
            <Link to="/contact" className="hover:text-neutral-800">Contact & Submit</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
