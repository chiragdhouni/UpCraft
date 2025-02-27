// Quiz.jsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { motion } from "framer-motion";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  // Show results if quiz is completed
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (generatingQuiz) {
    return (
      <div className="flex justify-center p-8">
        <BarLoader width={200} color="#60A5FA" />
      </div>
    );
  }
  if (!quizData) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (resultData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-2"
      >
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </motion.div>
    );
  }

  if (!quizData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 mx-2">
          <CardHeader>
            <CardTitle className="text-slate-200">
              Ready to test your knowledge?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">
              This quiz contains 10 questions specific to your industry and
              skills. Take your time and choose the best answer for each
              question.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={generateQuizFn}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Start Quiz
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 mx-2">
        <CardHeader>
          <CardTitle className="text-slate-200">
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-medium text-slate-200">
            {question.question}
          </p>
          <RadioGroup
            onValueChange={handleAnswer}
            value={answers[currentQuestion]}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/50 hover:border-blue-500/50 transition-all"
              >
                <RadioGroupItem
                  value={option}
                  id={`option-${index}`}
                  className="text-blue-400"
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="text-slate-200 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50"
            >
              <p className="font-medium text-slate-200">Explanation:</p>
              <p className="text-slate-400 mt-2">{question.explanation}</p>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!showExplanation && (
            <Button
              onClick={() => setShowExplanation(true)}
              variant="outline"
              disabled={!answers[currentQuestion]}
              className="border-slate-600/50 text-slate-200 hover:bg-slate-700/30"
            >
              Show Explanation
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion] || savingResult}
            className="ml-auto bg-blue-600 hover:bg-blue-700"
          >
            {currentQuestion < quizData.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
