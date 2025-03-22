"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Mail, Phone, Globe, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "success",
      })

      setFormState({
        name: "",
        email: "",
        message: "",
      })

      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const socialLinks = [
    { icon: Facebook, name: "Facebook" },
    { icon: Twitter, name: "Twitter" },
    { icon: Instagram, name: "Instagram" },
    { icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/company/soappnew/posts/?feedView=all" },
  ]

  return (
    <section id="contact" ref={containerRef} className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90 z-0" />

      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <motion.div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 z-0" style={{ y }} />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
            <span>Get In Touch</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Contact Us
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions about SoApp? We're here to help.
            </p>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2"
        >
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10">
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Get in Touch
                </CardTitle>
                <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={handleChange}
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                      placeholder="Enter your message"
                      required
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      className={cn(
                        "w-full transition-all duration-300",
                        isSubmitted
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90",
                      )}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : isSubmitted ? "Message Sent!" : "Send Message"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <Card className="border-primary/20 shadow-md">
              <CardHeader>
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>soappnew@gmail.com</span>
                </motion.div>
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+91 7990590921</span>
                </motion.div>
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Globe className="w-5 h-5" />
                  </div>
                  <motion.a
                    href="https://soappnew.netlify.app/"
                    className="hover:underline hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    soappnew.netlify.app
                  </motion.a>
                </motion.div>
              </CardContent>
            </Card>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <Card className="border-primary/20 shadow-md">
                <CardHeader>
                  <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    Follow Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 justify-center">
                    {socialLinks.map((platform, index) => (
                      <motion.div
                        key={platform.name}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Link
                          href={`${platform.href}`}
                          className="rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 p-3 hover:from-primary hover:to-purple-500 hover:text-white transition-all duration-300"
                          aria-label={`Follow us on ${platform.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <platform.icon className="h-5 w-5" />
                          <span className="sr-only">{platform.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievement badge */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-4 border border-primary/20 shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path d="M19 6.3a9 9 0 0 1 1.8 3.8 2 2 0 0 1 0 3.8 9 9 0 0 1-1.8 3.8c-.6.8-1.6 1.7-2.7 1a9 9 0 0 1-4.3 2.3 2 2 0 0 1-2 0 9 9 0 0 1-4.3-2.3c-1.1.7-2.1-.2-2.7-1A9 9 0 0 1 3.2 14a2 2 0 0 1 0-3.8A9 9 0 0 1 5 6.3c.6-.8 1.6-1.7 2.7-1A9 9 0 0 1 12 3a9 9 0 0 1 4.3 2.3c1.1-.7 2.1.2 2.7 1Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Award Winning App</p>
                  <p className="text-sm text-muted-foreground">E-Summit IIIT Delhi 2025</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

