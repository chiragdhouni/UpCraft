"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-6 p-6 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900 min-h-screen">
      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className="bg-slate-800/50 border-slate-700/50 text-slate-300"
        >
          Last updated: {lastUpdatedDate}
        </Badge>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Market Outlook",
            content: (
              <>
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {insights.marketOutlook}
                </div>
                <p className="text-xs text-slate-400">
                  Next update {nextUpdateDistance}
                </p>
              </>
            ),
            icon: <OutlookIcon className={`h-6 w-6 ${outlookColor}`} />,
          },
          {
            title: "Industry Growth",
            content: (
              <>
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {insights.growthRate.toFixed(1)}%
                </div>
                <Progress
                  value={insights.growthRate}
                  className="mt-2 bg-slate-700/50 h-2"
                />
              </>
            ),
            icon: <TrendingUp className="h-6 w-6 text-blue-400" />,
          },
          {
            title: "Demand Level",
            content: (
              <>
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {insights.demandLevel}
                </div>
                <div
                  className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                    insights.demandLevel
                  )}`}
                />
              </>
            ),
            icon: <BriefcaseIcon className="h-6 w-6 text-blue-400" />,
          },
          {
            title: "Top Skills",
            content: (
              <div className="flex flex-wrap gap-2">
                {insights.topSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-slate-800/50 border-slate-700/50 text-slate-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            ),
            icon: <Brain className="h-6 w-6 text-blue-400" />,
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">
                  {card.title}
                </CardTitle>
                <div className="bg-blue-500/10 p-2 rounded-lg">{card.icon}</div>
              </CardHeader>
              <CardContent>{card.content}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Salary Ranges Chart */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all">
          <CardHeader>
            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Salary Ranges by Role
            </CardTitle>
            <CardDescription className="text-slate-400">
              Displaying minimum, median, and maximum salaries (in thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#CBD5E1" />
                  <YAxis stroke="#CBD5E1" />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl">
                            <p className="font-medium text-slate-100">
                              {label}
                            </p>
                            {payload.map((item) => (
                              <p
                                key={item.name}
                                className="text-sm text-slate-300"
                              >
                                {item.name}: ${item.value}K
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="min" fill="#60A5FA" name="Min Salary (K)" />
                  <Bar
                    dataKey="median"
                    fill="#3B82F6"
                    name="Median Salary (K)"
                  />
                  <Bar dataKey="max" fill="#1D4ED8" name="Max Salary (K)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Industry Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all">
            <CardHeader>
              <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Key Industry Trends
              </CardTitle>
              <CardDescription className="text-slate-400">
                Current trends shaping the industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {insights.keyTrends.map((trend, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                    <span className="text-slate-300">{trend}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all">
            <CardHeader>
              <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Recommended Skills
              </CardTitle>
              <CardDescription className="text-slate-400">
                Skills to consider developing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insights.recommendedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-blue-500/10"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardView;
