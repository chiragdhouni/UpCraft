"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import { motion } from "framer-motion";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  // Watch form fields for preview updates
  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div
      data-color-mode="dark"
      className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900 p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-4xl md:text-5xl"
        >
          Resume Builder
        </motion.h1>
        <div className="flex flex-col md:flex-row gap-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="outline"
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-slate-100"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={generatePDF}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700 text-slate-100"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800/50 border border-slate-700/50">
          <TabsTrigger
            value="edit"
            className="data-[state=active]:bg-slate-700/30 data-[state=active]:text-blue-400"
          >
            Form
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="data-[state=active]:bg-slate-700/30 data-[state=active]:text-blue-400"
          >
            Markdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-slate-700/50 rounded-lg bg-slate-800/50">
                {["email", "mobile", "linkedin", "twitter"].map(
                  (field, index) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-slate-300">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <Input
                        {...register(`contactInfo.${field}`)}
                        type={
                          field === "email"
                            ? "email"
                            : field === "mobile"
                            ? "tel"
                            : "url"
                        }
                        placeholder={
                          field === "email"
                            ? "your@email.com"
                            : field === "mobile"
                            ? "+1 234 567 8900"
                            : field === "linkedin"
                            ? "https://linkedin.com/in/your-profile"
                            : "https://twitter.com/your-handle"
                        }
                        className="bg-slate-700/30 border-slate-600/50 text-slate-200 focus:ring-blue-500"
                      />
                      {errors.contactInfo?.[field] && (
                        <p className="text-sm text-red-400">
                          {errors.contactInfo[field].message}
                        </p>
                      )}
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">
                Professional Summary
              </h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32 bg-slate-700/30 border-slate-600/50 text-slate-200 focus:ring-blue-500"
                    placeholder="Write a compelling professional summary..."
                  />
                )}
              />
              {errors.summary && (
                <p className="text-sm text-red-400">{errors.summary.message}</p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-300">Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32 bg-slate-700/30 border-slate-600/50 text-slate-200 focus:ring-blue-500"
                    placeholder="List your key skills..."
                  />
                )}
              />
              {errors.skills && (
                <p className="text-sm text-red-400">{errors.skills.message}</p>
              )}
            </div>

            {/* Experience, Education, Projects */}
            {["experience", "education", "projects"].map((section) => (
              <div key={section} className="space-y-4">
                <h3 className="text-lg font-medium text-slate-300">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </h3>
                <Controller
                  name={section}
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type={section.charAt(0).toUpperCase() + section.slice(1)}
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors[section] && (
                  <p className="text-sm text-red-400">
                    {errors[section].message}
                  </p>
                )}
              </div>
            ))}
          </form>
        </TabsContent>

        <TabsContent value="preview">
          {activeTab === "preview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Button
                variant="outline"
                type="button"
                className="mb-4 border-slate-600/50 text-slate-300 hover:bg-slate-700/30"
                onClick={() =>
                  setResumeMode(resumeMode === "preview" ? "edit" : "preview")
                }
              >
                {resumeMode === "preview" ? (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Resume
                  </>
                ) : (
                  <>
                    <Monitor className="h-4 w-4 mr-2" />
                    Show Preview
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {activeTab === "preview" && resumeMode !== "preview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex p-3 gap-2 items-center border-2 border-yellow-500/50 text-yellow-400 rounded mb-4 bg-yellow-500/10"
            >
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose edited markdown if you update the form data.
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-slate-700/50 rounded-lg overflow-hidden"
          >
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </motion.div>

          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                  padding: "20px",
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
