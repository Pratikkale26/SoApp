"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, CheckCircle, MapPin, Search, ArrowRight, Lock } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export default function FeaturesSection() {
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

  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Smartphone,
      title: "Seamless Checkout",
      description: "Customers scan products directly while shopping using their own devices.",
    },
    {
      icon: CheckCircle,
      title: "Real-Time Inventory",
      description: "Store managers and customers receive alerts when a product is out of stock.",
    },
    {
      icon: MapPin,
      title: "In-Store Navigation",
      description: "Customers can search for items and get directions to the exact aisle in the store.",
    },
    {
      icon: Search,
      title: "Multiple Language Support",
      description:
        "Ensures accessibility for all customers, including voice commands for the elderly or visually impaired.",
    },
    {
      icon: ArrowRight,
      title: "Contactless Returns",
      description: "Process returns directly through the app, saving time and effort.",
    },
    {
      icon: Lock,
      title: "Enhanced Security",
      description: "Offers secure payments using facial recognition and fingerprint authorization.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="features" ref={containerRef} className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90 z-0" />

      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <motion.div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 z-0" style={{ y }} />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
            <span>Innovative Features</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Features of SoApp
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how SoApp transforms your shopping experience with these innovative features.
            </p>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setActiveFeature(index)}
              onHoverEnd={() => setActiveFeature(null)}
            >
              <Card
                className={cn(
                  "h-full transition-all duration-300 overflow-hidden",
                  activeFeature === index ? "border-primary shadow-lg" : "hover:border-primary/50",
                )}
              >
                <CardHeader className="pb-2 relative">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
                      activeFeature === index
                        ? "bg-gradient-to-r from-primary to-purple-500 text-white"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    <feature.icon className="h-6 w-6" />
                  </motion.div>
                  <CardTitle>{feature.title}</CardTitle>

                  {/* Decorative element */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 z-0"
                    animate={
                      activeFeature === index
                        ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span>Unlock the full potential of your shopping experience</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

