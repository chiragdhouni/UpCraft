// PerformanceChart.jsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all">
        <CardHeader>
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-3xl md:text-4xl">
            Performance Trend
          </CardTitle>
          <CardDescription className="text-slate-400">
            Your quiz scores over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#CBD5E1" />
                <YAxis domain={[0, 100]} stroke="#CBD5E1" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl">
                          <p className="text-sm font-medium text-slate-100">
                            Score: {payload[0].value}%
                          </p>
                          <p className="text-xs text-slate-400">
                            {payload[0].payload.date}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
