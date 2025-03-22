"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import RevolutionSection from "@/components/revolution-section"
import SecuritySection from "@/components/security-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import ThemeToggle from "@/components/theme-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

function ClientSideApp() {
  const [activeSection, setActiveSection] = useState<string>("")
  const { toast } = useToast()
  const [hasShownWelcome, setHasShownWelcome] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle smooth scrolling for navigation
  useEffect(() => {
    if (!mounted) return;
    
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    // Handle initial hash on page load
    if (window.location.hash) {
      setTimeout(handleHashChange, 0)
    }

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange)

    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const href = link.getAttribute("href")
        if (href) {
          window.history.pushState({}, "", href)
          if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" })
          } else {
            const element = document.querySelector(href)
            if (element) {
              element.scrollIntoView({ behavior: "smooth" })
            }
          }
        }
      })
    })

    // Intersection Observer for active section detection
    const sections = document.querySelectorAll("section[id]")
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      observer.disconnect()
    }
  }, [mounted])

  // Show welcome toast
  useEffect(() => {
    if (!mounted) return;
    
    if (!hasShownWelcome) {
      setTimeout(() => {
        toast({
          title: "Welcome to SoApp!",
          description: "Explore our revolutionary shopping experience",
          action: (
            <a href="#features" className="bg-primary text-white px-3 py-2 rounded-md text-xs font-medium">
              Discover Features
            </a>
          ),
        })
        setHasShownWelcome(true)
      }, 1500)
    }
  }, [toast, hasShownWelcome, mounted])

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header activeSection={activeSection} />
      <ScrollProgress />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <RevolutionSection />
        <SecuritySection />
        <ContactSection />
      </main>
      <Footer />
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Toaster />
    </div>
  )
}

export default function Home() {
  return (
    <ThemeProvider storageKey="soapp-theme">
      <ClientSideApp />
    </ThemeProvider>
  )
}

