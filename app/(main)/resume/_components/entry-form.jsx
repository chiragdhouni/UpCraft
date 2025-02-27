"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { motion } from "framer-motion";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };

    onChange([...entries, formattedEntry]);

    reset();
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Add this effect to handle the improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  // Replace handleImproveDescription with this
  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(), // 'experience', 'education', or 'project'
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {entries.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {item.title} @ {item.organization}
                </CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="border-slate-600/50 text-slate-300 hover:bg-slate-700/30 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400">
                  {item.current
                    ? `${item.startDate} - Present`
                    : `${item.startDate} - ${item.endDate}`}
                </p>
                <p className="mt-2 text-sm text-slate-300 whitespace-pre-wrap">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all">
            <CardHeader>
              <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Add {type}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Title/Position"
                    className="bg-slate-700/30 border-slate-600/50 text-slate-200 focus:ring-blue-500"
                    {...register("title")}
                    error={errors.title}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Organization/Company"
                    className="bg-slate-700/30 border-slate-600/50 text-slate-200 focus:ring-blue-500"
                    {...register("organization")}
                    error={errors.organization}
                  />
                  {errors.organization && (
                    <p className="text-sm text-red-400">
                      {errors.organization.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    type="month"
                    className="bg-slate-700/30 border-slate-600/50 text-slate-200"
                    {...register("startDate")}
                    error={errors.startDate}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-400">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    type="month"
                    className="bg-slate-700/30 border-slate-600/50 text-slate-200 disabled:opacity-50"
                    {...register("endDate")}
                    disabled={current}
                    error={errors.endDate}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-400">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="current"
                  className="h-4 w-4 rounded border-slate-600/50 bg-slate-700/30 text-blue-500 focus:ring-blue-500"
                  {...register("current")}
                  onChange={(e) => {
                    setValue("current", e.target.checked);
                    if (e.target.checked) {
                      setValue("endDate", "");
                    }
                  }}
                />
                <label htmlFor="current" className="text-slate-300">
                  Current {type}
                </label>
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder={`Description of your ${type.toLowerCase()}`}
                  className="h-32 bg-slate-700/30 border-slate-600/50 text-slate-200 focus:ring-blue-500"
                  {...register("description")}
                  error={errors.description}
                />
                {errors.description && (
                  <p className="text-sm text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleImproveDescription}
                disabled={isImproving || !watch("description")}
                className="text-blue-400 hover:bg-slate-700/30"
              >
                {isImproving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin text-blue-400" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
                    Improve with AI
                  </>
                )}
              </Button>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setIsAdding(false);
                }}
                className="border-slate-600/50 text-slate-300 hover:bg-slate-700/30"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAdd}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      {!isAdding && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            className="w-full border-slate-600/50 text-slate-300 hover:bg-slate-700/30 hover:text-blue-400"
            variant="outline"
            onClick={() => setIsAdding(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add {type}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
