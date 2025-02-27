"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const constraintsRef = useRef(null);

  return (
    <section className="w-full pt-24 md:pt-32 pb-16 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Transform Your Career with
              <span className="block mt-3 text-3xl md:text-4xl lg:text-5xl font-medium bg-gradient-to-r from-cyan-400 to-blue-500">
                AI-Powered Guidance
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Harness intelligent career coaching, real-time interview
              simulations, and personalized roadmap planning to accelerate your
              professional growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-7 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
                >
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div ref={constraintsRef} className="md:w-1/2 relative">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />

              <Image
                src="/logo_upcraft.png"
                width={1280}
                height={720}
                alt="Dashboard Preview"
                className="rounded-2xl border border-slate-700/50 shadow-2xl"
                priority
              />

              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* <div className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-600 shadow-lg">
                  <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Trusted by 50,000+ Professionals
                  </span>
                </div> */}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
