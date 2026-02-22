

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  X,
  Camera,
  User,
} from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState<"email" | "roll">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const qrRef = useRef<Html5Qrcode | null>(null);

  // ---------------------------
  // Normal Login
  // ---------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back",
        description: "You have successfully signed in.",
      });
      navigate("/home");
    }, 1500);
  };

  // ---------------------------
  // Start Scanner (ONLY opens modal)
  // ---------------------------
  const startScanner = () => {
    setShowScanner(true);
  };

  // ---------------------------
  // Stop Scanner
  // ---------------------------
  const stopScanner = async () => {
    if (qrRef.current) {
      try {
        await qrRef.current.stop();
        await qrRef.current.clear();
      } catch (err) {
        console.error("Camera stop error:", err);
      }
      qrRef.current = null;
    }
    setShowScanner(false);
  };

  // ---------------------------
  // Start QR When Modal Opens
  // ---------------------------
  useEffect(() => {
    if (!showScanner) return;

    const start = async () => {
      try {
        const html5QrCode = new Html5Qrcode("qr-reader");
        qrRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            stopScanner();
            toast({
              title: "QR Verified ✓",
              description: "Welcome to RIT Safe Campus!",
            });
            navigate("/home");
          },
          () => {}
        );
      } catch (err) {
        console.error("Camera start error:", err);
      }
    };

    const timer = setTimeout(start, 300);
    return () => clearTimeout(timer);
  }, [showScanner]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (qrRef.current) {
        qrRef.current.stop().then(() => {
          qrRef.current?.clear();
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* QR Modal */}
      {showScanner && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-background rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Scan QR Code</h2>
              <button onClick={stopScanner}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              id="qr-reader"
              className="w-full rounded-xl overflow-hidden"
              style={{ minHeight: "300px" }}
            />

            <p className="text-sm text-center text-muted-foreground">
              Point your QR code at the scanner
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-4">
            <img
              src="https://angelgroups.s3.amazonaws.com/uploads/2021/05/images_WalkSafe-Logo1614949609.jpg"
              alt="WalkSafe Logo"
              className="w-24 h-24 mx-auto object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold">RIT Safe Campus</h1>
              <p className="text-muted-foreground mt-2">
                Women Safety App
              </p>
            </div>
          </div>

          {/* QR Button */}
          <button
            type="button"
            onClick={startScanner}
            className="w-full py-4 rounded-xl bg-primary/10 hover:bg-primary/20 border-2 border-dashed border-primary/40 flex flex-col items-center gap-2 transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-primary">Scan QR to Enter</p>
              <p className="text-xs text-muted-foreground">
                No login required
              </p>
            </div>
          </button>

          <div className="relative my-4">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-border"></div>
  </div>
  <div className="relative flex justify-center">
    <span className="px-4 bg-background text-muted-foreground text-sm">
      or
    </span>
  </div>
</div>

          {/* Switch Login Type */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLoginType("email")}
              className={`flex-1 py-2 rounded-lg ${
                loginType === "email"
                  ? "bg-primary text-white"
                  : "bg-muted"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginType("roll")}
              className={`flex-1 py-2 rounded-lg ${
                loginType === "roll"
                  ? "bg-primary text-white"
                  : "bg-muted"
              }`}
            >
              Roll No
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginType === "email" ? (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 py-3 border rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Roll Number"
                  className="w-full pl-10 py-3 border rounded-xl"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-primary text-white"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-muted-foreground">
        © 2024 RIT Safe Campus • developed by giri
      </footer>
    </div>
  );
}
