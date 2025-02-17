
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSignup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [birthday, setBirthday] = useState("")
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
      <DialogContent className="sm:max-w-[500px]">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
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
              <Input
                type="text"
                placeholder="First name (optional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full"
              />
              <Input
                type="text"
                placeholder="Birthday MM/DD (optional)"
                value={birthday}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d/]/g, '')
                  if (value.length <= 5) {
                    let formattedValue = value
                    if (value.length === 2 && !value.includes('/')) {
                      formattedValue = value + '/'
                    }
                    setBirthday(formattedValue)
                  }
                }}
                className="w-full"
              />
              <Button 
                type="submit" 
                className="w-full bg-[#355E3B] hover:bg-[#2f5534] text-white uppercase text-sm font-medium tracking-wide h-10"
              >
                Subscribe Now
              </Button>
            </form>
          </div>
          <div className="hidden sm:block">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500"
              alt="Woman using laptop"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
