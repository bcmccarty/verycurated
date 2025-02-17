
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const inquiryReasons = [
  "General Inquiry",
  "Product Suggestion",
  "Partnership Opportunity",
  "Report an Issue",
  "Other"
];

const Contact = () => {
  const [inquiryReason, setInquiryReason] = useState("General Inquiry");

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-neutral-800">Contact Us</h1>
          <a href="/" className="text-primary hover:text-primary-dark text-sm mt-2 inline-block">← Back to Home</a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* About Us Section */}
        <div className="mb-8 p-6 bg-neutral-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-neutral-600">
            We're dedicated to bringing you the best curated products at unbeatable prices. 
            Our team carefully selects each item to ensure quality and value for our community.
          </p>
        </div>

        <form className="space-y-6 bg-white rounded-lg border p-6">
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
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input type="email" placeholder="your@email.com" className="bg-white" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <Textarea 
              placeholder="Type your message here..." 
              className="min-h-[150px] bg-white" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
