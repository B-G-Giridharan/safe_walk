import { FileWarning, MapPin, PhoneCall, QrCode, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: FileWarning,
    label: "Report Incident",
    description: "File a complaint",
    path: "/report",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: MapPin,
    label: "Live Location",
    description: "Share location",
    path: "/location",
    color: "text-safe",
    bgColor: "bg-safe/10",
  },
  {
    icon: PhoneCall,
    label: "Call Support",
    description: "ICC & Counsellors",
    path: "/support",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: QrCode,
    label: "Scan QR",
    description: "Quick SOS",
    path: "/qr-scan",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Users,
    label: "Safe Walk",
    description: "Request escort",
    path: "/safe-walk",
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    icon: BookOpen,
    label: "Awareness",
    description: "Safety guides",
    path: "/awareness",
    color: "text-maroon",
    bgColor: "bg-maroon/10",
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-3 stagger-children">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => navigate(action.path)}
          className="action-card"
        >
          <div className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center`}>
            <action.icon className={`w-6 h-6 ${action.color}`} />
          </div>
          <div className="text-center">
            <p className="font-medium text-sm leading-tight">{action.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
