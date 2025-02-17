
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSignup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Check if user has seen popup this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenNewsletterPopup")
    
    if (!hasSeenPopup) {
      // Wait 3 seconds before showing popup
      const timer = setTimeout(() => {
        setOpen(true)
        sessionStorage.setItem("hasSeenNewsletterPopup", "true")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    toast({
      title: "Thanks for subscribing!",
      description: "We'll keep you updated with the best deals.",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Get the Best Deals</DialogTitle>
          <DialogDescription className="text-base text-neutral-600 mt-2">
            Subscribe to our newsletter and never miss out on exclusive savings!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
          <Button type="submit" className="w-full bg-[#355E3B] hover:bg-[#2f5534]">
            Subscribe Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
