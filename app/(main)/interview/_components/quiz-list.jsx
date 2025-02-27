// QuizList.jsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";
import { motion } from "framer-motion";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-3xl md:text-4xl">
                  Recent Quizzes
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Review your past quiz performance
                </CardDescription>
              </div>
              <Button
                onClick={() => router.push("/interview/mock")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Start New Quiz
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessments?.map((assessment, i) => (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card
                    className="bg-slate-700/30 border border-slate-600/50 hover:border-blue-500/50 cursor-pointer transition-all"
                    onClick={() => setSelectedQuiz(assessment)}
                  >
                    <CardHeader>
                      <CardTitle className="text-slate-200 text-2xl">
                        Quiz {i + 1}
                      </CardTitle>
                      <CardDescription className="flex justify-between w-full text-slate-400">
                        <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                        <div>
                          {format(
                            new Date(assessment.createdAt),
                            "MMMM dd, yyyy HH:mm"
                          )}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    {assessment.improvementTip && (
                      <CardContent>
                        <p className="text-sm text-slate-400">
                          {assessment.improvementTip}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-slate-200">Quiz Details</DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
