// QuizResult.jsx
"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2"
      >
        <Trophy className="h-8 w-8 text-yellow-400" />
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-3xl font-bold">
          Quiz Results
        </h1>
      </motion.div>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center space-y-2"
        >
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {result.quizScore.toFixed(1)}%
          </h3>
          <Progress
            value={result.quizScore}
            className="w-full bg-slate-700/50 h-3"
            indicatorclassname="bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </motion.div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50"
          >
            <p className="font-medium text-slate-200">Improvement Tip:</p>
            <p className="text-slate-400 mt-2">{result.improvementTip}</p>
          </motion.div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-200">Question Review</h3>
          {result.questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-slate-200">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-slate-400">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-slate-800/50 p-3 rounded-lg mt-2">
                <p className="font-medium text-slate-200">Explanation:</p>
                <p className="text-slate-400 mt-1">{q.explanation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button
            onClick={onStartNew}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
