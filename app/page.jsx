"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
  PlayCircle,
  BrainCircuit,
  Briefcase,
  LineChart,
  ScrollText,
} from "lucide-react";
import HeroSection from "@/components/hero";
import { testimonial } from "@/data/testimonial";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";
import { motion } from "framer-motion";
import { features } from "@/data/features";
export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <section className="w-full py-24 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Powerful Features for Your Career Growth
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all hover:scale-105">
                  <CardContent className="pt-8 pb-6 text-center flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 rounded-lg mb-4">
                      {feature.icon}{" "}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-100">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-24 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            {[
              { value: "50+", label: "Industries Covered" },
              { value: "1000+", label: "Interview Questions" },
              { value: "95%", label: "Success Rate" },
              { value: "24/7", label: "AI Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-slate-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="w-full py-24 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              How It Works
            </h2>
            <p className="text-slate-300">
              Four simple steps to accelerate your career growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl text-slate-100">
                  {item.title}
                </h3>
                <p className="text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="w-full py-24 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all hover:scale-105">
                  <CardContent className="pt-8 pb-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            width={48}
                            height={48}
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="rounded-full object-cover border-2 border-blue-500/20"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">
                            {testimonial.author}
                          </p>
                          <p className="text-sm text-slate-300">
                            {testimonial.role}
                          </p>
                          <p className="text-sm text-blue-400">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote>
                        <p className="text-slate-300 italic relative">
                          <span className="text-3xl text-blue-500 absolute -top-4 -left-2">
                            &quot;
                          </span>
                          {testimonial.quote}
                          <span className="text-3xl text-blue-500 absolute -bottom-4">
                            &quot;
                          </span>
                        </p>
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="w-full py-24 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300">
              Find answers to common questions about our platform
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-slate-700/50"
                >
                  <AccordionTrigger className="text-left text-slate-100 hover:text-blue-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-24 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-slate-300 max-w-[600px] md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                className="mt-5 h-14 bg-blue-600 hover:bg-blue-700 text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
