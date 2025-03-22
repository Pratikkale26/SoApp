"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [showScrollTip, setShowScrollTip] = useState(false)

  useEffect(() => {
    // Show scroll tip after 3 seconds if user hasn't scrolled
    const timer = setTimeout(() => {
      if (scrollYProgress.get() < 0.05) {
        setShowScrollTip(true)

        // Hide tip after 5 seconds
        setTimeout(() => {
          setShowScrollTip(false)
        }, 5000)
      }
    }, 3000)

    // Hide tip when user scrolls
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (value > 0.05 && showScrollTip) {
        setShowScrollTip(false)
      }
    })

    return () => {
      clearTimeout(timer)
      unsubscribe()
    }
  }, [scrollYProgress, showScrollTip])

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left" style={{ scaleX }} />

      {showScrollTip && (
        <motion.div
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
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
            className="animate-bounce"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
          <span className="text-sm font-medium">Scroll to explore</span>
        </motion.div>
      )}
    </>
  )
}

