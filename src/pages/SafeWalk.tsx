import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, MapPin, Users, Clock, CheckCircle, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const destinations = [
  "Girls Hostel - Block A",
  "Girls Hostel - Block B",
  "Library",
  "Main Gate",
  "Parking Area",
  "Sports Complex",
  "Cafeteria",
];

export default function SafeWalk() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [destination, setDestination] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleRequest = () => {
    if (!destination) return;
    setIsRequesting(true);

    setTimeout(() => {
      setIsRequesting(false);
      setIsConfirmed(true);
      toast({
        title: "Request Confirmed",
        description: "A Shakti volunteer will meet you shortly.",
      });
    }, 2000);
  };

  if (isConfirmed) {
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
              <h1 className="font-display text-xl font-semibold">Safe Walk</h1>
              <p className="text-sm text-muted-foreground">Escort requested</p>
            </div>
          </div>

          <div className="glass-card p-6 text-center animate-scale-in">
            <div className="w-20 h-20 mx-auto rounded-full bg-safe/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-safe" />
            </div>
            <h2 className="font-display text-xl font-semibold mb-2">Request Confirmed</h2>
            <p className="text-muted-foreground">
              A Shakti volunteer is on their way to escort you.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Volunteer</span>
                <span className="font-medium">Priya S.</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Destination</span>
                <span className="font-medium">{destination}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ETA</span>
                <span className="font-medium text-safe">~3 minutes</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsConfirmed(false);
                setDestination("");
              }}
              className="w-full mt-4 py-3 rounded-xl bg-muted text-foreground font-medium"
            >
              Cancel Request
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

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
            <h1 className="font-display text-xl font-semibold">Request Safe Walk</h1>
            <p className="text-sm text-muted-foreground">Get escorted by a Shakti volunteer</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="glass-card p-4 border-l-4 border-gold animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="font-medium">Shakti Volunteer Service</p>
              <p className="text-sm text-muted-foreground mt-1">
                Trained student volunteers will escort you safely to your destination, especially during evening and night hours.
              </p>
            </div>
          </div>
        </div>

        {/* Current Location */}
        <div className="glass-card p-4 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-safe/20 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-safe" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Your Location</p>
              <p className="font-medium">Main Academic Block, Floor 2</p>
            </div>
          </div>

          <div className="h-px bg-border my-4" />

          {/* Destination Selection */}
          <div>
            <label className="text-sm font-medium mb-3 block flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Select Destination
            </label>
            <div className="space-y-2">
              {destinations.map((dest) => (
                <button
                  key={dest}
                  onClick={() => setDestination(dest)}
                  className={`w-full p-3 rounded-xl text-left text-sm transition-all ${
                    destination === dest
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Available Volunteers</p>
                <p className="text-xs text-muted-foreground">Ready to assist</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-safe">5</span>
          </div>
        </div>

        {/* Request Button */}
        <button
          onClick={handleRequest}
          disabled={!destination || isRequesting}
          className="w-full btn-premium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isRequesting ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Users className="w-4 h-4" />
              Request Safe Walk
            </>
          )}
        </button>
      </div>
    </AppLayout>
  );
}
