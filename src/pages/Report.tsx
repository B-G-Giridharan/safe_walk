import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, Upload, Mic, Camera, AlertCircle, CheckCircle2, EyeOff, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "harassment", label: "Harassment" },
  { id: "ragging", label: "Ragging" },
  { id: "stalking", label: "Stalking" },
  { id: "hostel", label: "Hostel Issues" },
  { id: "academic", label: "Academic Issues" },
  { id: "other", label: "Other" },
];

export default function Report() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully. We will review it shortly.",
      });
      navigate("/home");
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display text-xl font-semibold">Report Incident</h1>
            <p className="text-sm text-muted-foreground">File a complaint or report</p>
          </div>
        </div>

        {/* Identity Toggle */}
        <div className="glass-card p-4 animate-fade-in">
          <p className="text-sm font-medium mb-3">Report Type</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsAnonymous(true)}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                isAnonymous
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <EyeOff className="w-4 h-4" />
              <span className="font-medium">Anonymous</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAnonymous(false)}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                !isAnonymous
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="font-medium">Identified</span>
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {isAnonymous
              ? "Your identity will be kept confidential"
              : "Your details will be visible to the committee"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up">
          {/* Category Selection */}
          <div className="glass-card p-4">
            <p className="text-sm font-medium mb-3">Select Category</p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    category === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="glass-card p-4">
            <label className="text-sm font-medium mb-2 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe the incident in detail..."
              rows={5}
              className="input-premium resize-none"
              required
            />
          </div>

          {/* Evidence Upload */}
          <div className="glass-card p-4">
            <p className="text-sm font-medium mb-3">Attach Evidence (Optional)</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Upload File</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <Camera className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Take Photo</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <Mic className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Record Audio</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!category || !description || isSubmitting}
            className="w-full btn-premium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Submit Report
              </>
            )}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
