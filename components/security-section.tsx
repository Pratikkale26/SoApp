"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Shield, Camera, Scale, Fingerprint } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export default function SecuritySection() {
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

  const [activeCard, setActiveCard] = useState<number | null>(null)

  const securityMeasures = [
    {
      icon: Shield,
      title: "Increased Surveillance",
      description:
        "With SoApp's savings, retailers can enhance in-store security by hiring additional security guards and placing high-definition cameras throughout the store.",
    },
    {
      icon: Camera,
      title: "Product Monitoring Cameras",
      description:
        "Every shelf is equipped with cameras to monitor product counts and prevent theft or accidental misplacements, providing real-time tracking.",
    },
    {
      icon: Scale,
      title: "Weighing Systems",
      description:
        "Weighing machines for products like vegetables and fruits enable accurate tracking of quantities bought by weight for transparent pricing.",
    },
    {
      icon: Fingerprint,
      title: "AI & RFID/NFC Technology",
      description:
        "Each item is tagged with RFID/NFC technology, ensuring that only paid items can leave the store, preventing theft seamlessly.",
    },
    {
      icon: Lock,
      title: "Two Factor Authentication",
      description:
        "Everybody has to go through all the factors of security before getting out of the store, including verifying the receipt from app at the exit.",
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
    <section id="security" ref={containerRef} className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted z-0" />

      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <motion.div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 z-0" style={{ y }} />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
            <span>Advanced Protection</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Security
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SoApp prioritizes security at every step of the shopping experience.
            </p>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto grid max-w-5xl items-center gap-6 py-12"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {securityMeasures.map((measure, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <Card
                  className={cn(
                    "h-full transition-all duration-300 overflow-hidden",
                    activeCard === index ? "border-primary shadow-lg" : "hover:border-primary/50",
                  )}
                >
                  <CardHeader className="relative">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
                        activeCard === index
                          ? "bg-gradient-to-r from-primary to-purple-500 text-white"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      <measure.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{measure.title}</CardTitle>

                    {/* Decorative element */}
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 z-0"
                      animate={
                        activeCard === index
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
                    <p className="text-sm text-muted-foreground">{measure.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="flex flex-col justify-center items-center"
            >
              <Card className="h-full flex flex-col justify-center items-center bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
                <CardHeader>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg"
                  >
                    <Lock className="h-8 w-8" />
                  </motion.div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    Secure, Seamless, Simple
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-8"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Shield className="h-4 w-4 mr-2" />
            <span>Your security is our top priority</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

