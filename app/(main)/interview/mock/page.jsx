"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
      <div className="container mx-auto space-y-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col space-y-4"
        >
          <Link href="/interview">
            <Button
              variant="outline"
              className="gap-2 pl-3 bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/30 hover:text-blue-400 text-slate-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Interview Preparation
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Mock Interview
            </h1>
            <p className="text-slate-400 mt-2 text-lg">
              Test your knowledge with industry-specific questions
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all">
            <Quiz />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
