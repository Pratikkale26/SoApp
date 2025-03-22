"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ShoppingBag, CreditCard, CheckCircle, ArrowRight } from "lucide-react"

export default function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps = [
    {
      number: 1,
      icon: ShoppingBag,
      title: "Scan Products",
      description: "Scan products directly using your smartphone while shopping.",
    },
    {
      number: 2,
      icon: ShoppingBag,
      title: "Track Items",
      description: "View product details and track items as you add them to your own shopping/carry bag.",
    },
    {
      number: 3,
      icon: CreditCard,
      title: "Complete Payment",
      description:
        "Complete your payment via the app after shopping and scan the receipt while checking out from the store.",
    },
    {
      number: 4,
      icon: CheckCircle,
      title: "Skip the Queue",
      description: "No more waiting in checkout queues or using store-provided carts.",
    },
  ]

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
    <section id="how-it-works" ref={containerRef} className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-0" />

      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 z-0"
        style={{ opacity, y }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
            <span>Simple Process</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              How It Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience the simplicity of shopping with SoApp in just a few steps.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto max-w-5xl items-center gap-6 py-12"
        >
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2 hidden md:block" />

            <div className="grid gap-12 md:gap-24">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setActiveStep(index)}
                  onHoverEnd={() => setActiveStep(null)}
                  className={cn(
                    "flex flex-col md:flex-row items-center md:items-start gap-8 relative",
                    index % 2 === 1 ? "md:flex-row-reverse" : "",
                  )}
                >
                  <motion.div
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-full text-white z-10 transition-all duration-300 shadow-lg",
                      activeStep === index ? "bg-gradient-to-r from-primary to-purple-500" : "bg-primary",
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <step.icon className="h-8 w-8" />
                  </motion.div>

                  <div
                    className={cn(
                      "flex flex-col items-center md:items-start space-y-4 text-center md:text-left",
                      index % 2 === 1 ? "md:items-end md:text-right" : "",
                    )}
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground max-w-sm">{step.description}</p>
                    </div>

                    {/* Interactive element */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={activeStep === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="bg-primary/10 text-primary rounded-lg px-4 py-2 text-sm"
                    >
                      <span>
                        Step {step.number} of {steps.length}
                      </span>
                    </motion.div>
                  </div>

                  {/* Connector arrow for desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-[-60px]"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={inView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    >
                      <ArrowRight className="h-8 w-8 text-primary/40 rotate-90" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-primary to-purple-500 px-8 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg"
          >
            Explore Features
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

