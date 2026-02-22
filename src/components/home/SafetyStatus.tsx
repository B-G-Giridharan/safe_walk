import { Shield, MapPin, Clock } from "lucide-react";

export function SafetyStatus() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-safe/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-safe" />
          </div>
          <div>
            <p className="font-medium text-sm">You're in a Safe Zone</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              Main Academic Block, Floor 2
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="safe-zone text-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Safe
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Response time: ~2 min
        </span>
        <span>3 Shakti volunteers nearby</span>
      </div>
    </div>
  );
}
