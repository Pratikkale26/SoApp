"use client"

import Image from "next/image"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useRef } from "react"

export default function RevolutionSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5])

  const points = [
    "Eliminating long queues and reducing checkout times.",
    "Minimizing the need for manpower in checkout counters.",
    "Allowing stores to focus on customer service and product availability.",
    "Encouraging cashless payment between customers.",
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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="revolution" ref={containerRef} className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90 z-0" />

      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 z-0"
        style={{
          scale: imageScale,
          rotate: imageRotate,
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
        >
          <motion.div variants={imageVariants} className="relative order-2 lg:order-1">
            <motion.div
              style={{
                scale: imageScale,
                rotate: imageRotate,
              }}
              className="relative z-10 bg-gradient-to-br from-background to-muted p-1 rounded-2xl shadow-xl"
            >
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-purple-500/5">
                <Image
                  src="/shopping.webp?height=550&width=550"
                  width={550}
                  height={550}
                  alt="SoApp Revolution"
                  className="mx-auto aspect-video overflow-hidden object-cover sm:w-full"
                />
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -left-4 bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg z-20"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-sm font-medium">Revolutionary Shopping</p>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-primary/10 z-0"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="flex flex-col justify-center space-y-6 order-1 lg:order-2"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
                <span>Game Changer</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                The SoApp Revolution
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                SoApp is transforming the retail industry by addressing key challenges in the current shopping
                experience:
              </p>
            </motion.div>

            <motion.ul variants={containerVariants} className="grid gap-4">
              {points.map((point, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </motion.div>
                  <span className="text-base">{point}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants} className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Link
                href="#features"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-primary to-purple-500 px-8 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Features
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t">
              {[
                { label: "Retail Partners", value: "200+" },
                { label: "Happy Shoppers", value: "50K+" },
              ].map((stat, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} className="flex flex-col">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

