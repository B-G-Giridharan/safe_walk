import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, X, Phone, MapPin, Mic } from "lucide-react";

interface SOSButtonProps {
  onActivate: () => void;
}

export function SOSButton({ onActivate }: SOSButtonProps) {
  const [tapCount, setTapCount] = useState(0);
  const [isConfirming, setIsConfirming] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isActive, setIsActive] = useState(false);

  const resetState = useCallback(() => {
    setTapCount(0);
    setIsConfirming(false);
    setCountdown(5);
    setIsActive(false);
  }, []);

  const handleTap = () => {
    if (isActive) return;
    
    const newCount = tapCount + 1;
    setTapCount(newCount);
    
    if (newCount >= 3) {
      setIsConfirming(true);
    }
  };

  const handleCancel = () => {
    resetState();
  };

  const handleConfirm = () => {
    setIsActive(true);
    onActivate();
  };

  // Reset tap count after 2 seconds of inactivity
  useEffect(() => {
    if (tapCount > 0 && tapCount < 3) {
      const timer = setTimeout(() => setTapCount(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [tapCount]);

  // Countdown when confirming
  useEffect(() => {
    if (isConfirming && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isConfirming && countdown === 0) {
      handleConfirm();
    }
  }, [isConfirming, countdown]);

  if (isActive) {
    return (
      <div className="relative flex flex-col items-center animate-fade-in">
        <div className="relative">
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full bg-destructive/30 animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
          
          <div className="w-44 h-44 sos-button flex flex-col items-center justify-center text-white relative z-10">
            <AlertTriangle className="w-12 h-12 mb-2" />
            <span className="font-display text-xl font-bold">SOS ACTIVE</span>
          </div>
        </div>
        
        <div className="mt-6 space-y-3 text-center animate-slide-up">
          <div className="flex items-center gap-2 text-safe">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Calling Control Room...</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Sharing Live Location</span>
          </div>
          <div className="flex items-center gap-2 text-destructive">
            <Mic className="w-4 h-4" />
            <span className="text-sm">Recording Audio</span>
          </div>
        </div>

        <button
          onClick={resetState}
          className="mt-6 px-6 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
        >
          Cancel Emergency
        </button>
      </div>
    );
  }

  if (isConfirming) {
    return (
      <div className="relative flex flex-col items-center animate-scale-in">
        <div className="w-44 h-44 rounded-full border-4 border-destructive flex flex-col items-center justify-center bg-destructive/10">
          <span className="font-display text-5xl font-bold text-destructive">{countdown}</span>
          <span className="text-sm text-destructive mt-1">Activating SOS</span>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors"
          >
            Confirm Now
          </button>
        </div>

        <p className="mt-4 text-sm text-muted-foreground text-center max-w-[280px]">
          Emergency alert will be sent to security control room and nearby volunteers
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={handleTap}
        className="w-44 h-44 sos-button sos-pulse flex flex-col items-center justify-center text-white transition-transform active:scale-95"
      >
        <AlertTriangle className="w-14 h-14 mb-2" />
        <span className="font-display text-2xl font-bold">SOS</span>
        <span className="text-sm opacity-90 mt-1">Tap 3 times</span>
      </button>

      {/* Tap indicator */}
      <div className="flex gap-2 mt-4">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              tapCount >= num ? "bg-destructive scale-110" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {tapCount === 0 && "Triple tap for emergency alert"}
        {tapCount === 1 && "Tap 2 more times"}
        {tapCount === 2 && "Tap 1 more time"}
      </p>
    </div>
  );
}
