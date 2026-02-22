import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, QrCode, Camera, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QRScan() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setScanned(true);
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
            <h1 className="font-display text-xl font-semibold">QR Code Safety</h1>
            <p className="text-sm text-muted-foreground">Quick SOS without app installation</p>
          </div>
        </div>

        {/* Scanner Area */}
        <div className="glass-card p-6 animate-fade-in">
          <div className="relative aspect-square rounded-2xl bg-muted/50 overflow-hidden flex items-center justify-center">
            {!isScanning && !scanned && (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-accent/20 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Ready to Scan</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Point camera at QR code
                  </p>
                </div>
              </div>
            )}

            {isScanning && (
              <div className="text-center space-y-4 animate-pulse">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <p className="font-medium">Scanning...</p>
                {/* Scanning animation */}
                <div className="absolute inset-4 border-2 border-primary/50 rounded-xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary animate-pulse" />
                </div>
              </div>
            )}

            {scanned && (
              <div className="text-center space-y-4 animate-scale-in">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-safe/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-safe" />
                </div>
                <div>
                  <p className="font-medium text-safe">QR Code Detected</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Location: Library, Floor 2
                  </p>
                </div>
              </div>
            )}
          </div>

          {!isScanning && !scanned && (
            <button
              onClick={handleStartScan}
              className="w-full mt-4 btn-premium flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Start Scanning
            </button>
          )}

          {scanned && (
            <div className="mt-4 space-y-3">
              <button
                onClick={() => navigate("/home")}
                className="w-full py-3 rounded-xl bg-destructive text-destructive-foreground font-medium flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                Send SOS from this Location
              </button>
              <button
                onClick={() => {
                  setScanned(false);
                }}
                className="w-full py-3 rounded-xl bg-muted text-foreground font-medium"
              >
                Scan Another Code
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="glass-card p-4 animate-slide-up">
          <h3 className="font-display font-semibold mb-3">How it Works</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <p className="font-medium text-sm">Find QR Code</p>
                <p className="text-xs text-muted-foreground">
                  Located in washrooms, lifts, staircases, hostels
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <p className="font-medium text-sm">Scan with Phone</p>
                <p className="text-xs text-muted-foreground">
                  Use any phone camera to scan
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div>
                <p className="font-medium text-sm">Send Alert</p>
                <p className="text-xs text-muted-foreground">
                  Your location is automatically shared
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
