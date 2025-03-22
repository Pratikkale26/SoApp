"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useRef, useState } from "react"
import { ShoppingBag, ShoppingCart, CreditCard, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Animation for the shopping process
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 4)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [inView])

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

  return (
    <section ref={containerRef} className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/80 z-0" />

      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 z-0"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-purple-500/5 z-0"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 10,
          repeatType: "reverse",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
          style={{ y, opacity }}
        >
          <div className="flex flex-col justify-center space-y-4">
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
                <span>Revolutionary Shopping Experience</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary">
                Revolutionizing In-Store Shopping with Seamless Checkout
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Shop Fast, Checkout Faster with SoApp. No more queues, no more hassle, just scan, pay, and go.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="#features"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-primary to-purple-500 px-8 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Explore Features
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background/80 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                How It Works
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
              {[
                { label: "Faster Checkout", value: "80%" },
                { label: "Time Saved", value: "25 min" },
                { label: "Happier Shoppers", value: "100%" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center md:items-start"
                >
                  <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 bg-gradient-to-br from-background to-muted p-1 rounded-2xl shadow-xl"
            >
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-purple-500/5 aspect-[4/3]">
                <Image
                  src="/hero.webp?height=550&width=550"
                  width={550}
                  height={550}
                  alt="SoApp Shopping Experience"
                  className="object-cover w-full h-full"
                />

                {/* Shopping process animation overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-xs">
                    <div className="flex justify-between mb-4">
                      {[
                        { icon: ShoppingBag, label: "Scan" },
                        { icon: ShoppingCart, label: "Add" },
                        { icon: CreditCard, label: "Pay" },
                        { icon: Check, label: "Go" },
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          className={cn(
                            "flex flex-col items-center",
                            animationStep === index ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors duration-300",
                              animationStep === index ? "bg-primary text-white" : "bg-muted",
                            )}
                          >
                            <step.icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-medium">{step.label}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        animate={{ width: `${(animationStep + 1) * 25}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg z-20"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-sm font-medium">No more waiting in lines!</p>
            </motion.div>

            <motion.div
              className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white shadow-lg z-20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <ShoppingBag className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

