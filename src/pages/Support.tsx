import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, Phone, MessageCircle, Users, Heart, Clock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const supportContacts = [
  {
    id: 1,
    name: "Security Control Room",
    description: "24/7 Emergency Response",
    phone: "+91 1234567890",
    icon: Shield,
    available: "Always Available",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    id: 2,
    name: "Women Support Cell",
    description: "Guidance & Counselling",
    phone: "+91 1234567891",
    icon: Heart,
    available: "Mon-Sat, 9AM-6PM",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: 3,
    name: "Internal Complaints Committee (ICC)",
    description: "Official Complaint Handling",
    phone: "+91 1234567892",
    icon: Users,
    available: "Mon-Fri, 10AM-5PM",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 4,
    name: "Professional Counsellor",
    description: "Mental Health Support",
    phone: "+91 1234567893",
    icon: Heart,
    available: "By Appointment",
    color: "text-safe",
    bgColor: "bg-safe/10",
  },
];

export default function Support() {
  const navigate = useNavigate();

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
            <h1 className="font-display text-xl font-semibold">Support & ICC Access</h1>
            <p className="text-sm text-muted-foreground">Get help when you need it</p>
          </div>
        </div>

        {/* Quick Help Banner */}
        <div className="glass-card p-4 border-l-4 border-destructive animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="font-medium">Need Immediate Help?</p>
              <p className="text-sm text-muted-foreground mt-1">
                For emergencies, use the SOS button or call the control room directly.
              </p>
            </div>
          </div>
        </div>

        {/* Support Contacts */}
        <div className="space-y-3 stagger-children">
          {supportContacts.map((contact) => (
            <div key={contact.id} className="glass-card p-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${contact.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <contact.icon className={`w-6 h-6 ${contact.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {contact.available}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="glass-card p-4 animate-slide-up">
          <h3 className="font-display font-semibold mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              All complaints are handled with strict confidentiality
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              ICC ensures fair and timely resolution
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              Anonymous reporting is available
            </li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
