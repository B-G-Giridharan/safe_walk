import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, MapPin, Navigation, Users, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Location() {
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [userPos, setUserPos] = useState<[number, number]>([12.9566, 77.5365]);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      () => {}
    );
  }, []);

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${userPos[1] - 0.005}%2C${userPos[0] - 0.003}%2C${userPos[1] + 0.005}%2C${userPos[0] + 0.003}&layer=mapnik&marker=${userPos[0]}%2C${userPos[1]}`;

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
            <h1 className="font-display text-xl font-semibold">Live Location</h1>
            <p className="text-sm text-muted-foreground">Share and track your location</p>
          </div>
        </div>

        {/* Map */}
        <div className="glass-card p-4 animate-fade-in">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <iframe
              src={mapSrc}
              style={{ height: "100%", width: "100%", border: "none", borderRadius: "0.75rem" }}
              title="Campus Map"
              loading="lazy"
            />
          </div>

          {/* Current Location */}
          <div className="mt-4 p-3 rounded-xl bg-safe/10 border border-safe/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-safe/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-safe" />
              </div>
              <div>
                <p className="font-medium text-sm">Current Location</p>
                <p className="text-xs text-muted-foreground">Main Academic Block, Floor 2, Room 204</p>
              </div>
            </div>
          </div>
        </div>

        {/* Share Location */}
        <div className="glass-card p-4 animate-slide-up">
          <h3 className="font-display font-semibold mb-3">Share Location</h3>
          <button
            onClick={() => setIsSharing(!isSharing)}
            className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              isSharing
                ? "bg-safe text-safe-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            <Navigation className={`w-4 h-4 ${isSharing ? "animate-pulse" : ""}`} />
            {isSharing ? "Sharing Live Location..." : "Start Sharing Location"}
          </button>
          {isSharing && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Your location is being shared with the security team
            </p>
          )}
        </div>

        {/* Safety Insights */}
        <div className="glass-card p-4">
          <h3 className="font-display font-semibold mb-3">Area Safety Insights</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-safe" />
                <div>
                  <p className="font-medium text-sm">Safe Zone</p>
                  <p className="text-xs text-muted-foreground">High security presence</p>
                </div>
              </div>
              <span className="safe-zone text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Shakti Volunteers</p>
                  <p className="text-xs text-muted-foreground">Nearby volunteers</p>
                </div>
              </div>
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold" />
                <div>
                  <p className="font-medium text-sm">Response Time</p>
                  <p className="text-xs text-muted-foreground">Average security response</p>
                </div>
              </div>
              <span className="text-sm font-bold text-gold">~2 min</span>
            </div>
          </div>
        </div>

        {/* Safe Walk Request */}
        <button
          onClick={() => navigate("/safe-walk")}
          className="w-full glass-card p-4 flex items-center gap-4 hover:-translate-y-1 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
            <Users className="w-6 h-6 text-gold" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Request Safe Walk</p>
            <p className="text-sm text-muted-foreground">Get escorted to your destination</p>
          </div>
          <ChevronLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
        </button>
      </div>
    </AppLayout>
  );
}
