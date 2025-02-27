// StatsCards.jsx
"use client";
import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        {
          title: "Average Score",
          value: `${getAverageScore()}%`,
          icon: <Trophy className="h-5 w-5 text-blue-400" />,
          description: "Across all assessments",
        },
        {
          title: "Questions Practiced",
          value: getTotalQuestions(),
          icon: <Brain className="h-5 w-5 text-purple-400" />,
          description: "Total questions",
        },
        {
          title: "Latest Score",
          value: `${getLatestAssessment()?.quizScore.toFixed(1) || 0}%`,
          icon: <Target className="h-5 w-5 text-green-400" />,
          description: "Most recent quiz",
        },
      ].map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                {stat.title}
              </CardTitle>
              <div className="bg-blue-500/10 p-2 rounded-lg">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {stat.value}
              </div>
              <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
