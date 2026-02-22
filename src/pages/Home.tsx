import { AppLayout } from "@/components/layout/AppLayout";
import { SOSButton } from "@/components/home/SOSButton";
import { QuickActions } from "@/components/home/QuickActions";
import { SafetyStatus } from "@/components/home/SafetyStatus";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  const handleSOSActivate = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Help is on the way. Stay calm and stay where you are.",
      variant: "destructive",
    });
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 space-y-6">
        {/* Safety Status */}
        <div className="animate-fade-in">
          <SafetyStatus />
        </div>

        {/* SOS Button */}
        <div className="py-8 flex justify-center">
          <SOSButton onActivate={handleSOSActivate} />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-display text-lg font-semibold mb-3">Quick Actions</h2>
          <QuickActions />
        </div>

        {/* Emergency Contacts */}
        <div className="glass-card p-4 animate-slide-up">
          <h3 className="font-display font-semibold mb-3">Emergency Contacts</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div>
                <p className="font-medium text-sm">Security Control Room</p>
                <p className="text-xs text-muted-foreground">24/7 Available</p>
              </div>
              <a
                href="tel:1234567890"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Call
              </a>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div>
                <p className="font-medium text-sm">Women Support Cell</p>
                <p className="text-xs text-muted-foreground">Mon-Sat, 9AM-6PM</p>
              </div>
              <a
                href="tel:1234567890"
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/90 transition-colors"
              >
                Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
