import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, BookOpen, Scale, Phone, ShieldCheck, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const resources = [
  {
    id: 1,
    title: "Women's Rights",
    description: "Know your legal rights and protections",
    icon: Scale,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: 2,
    title: "Safety Guidelines",
    description: "Campus safety tips and best practices",
    icon: ShieldCheck,
    color: "text-safe",
    bgColor: "bg-safe/10",
  },
  {
    id: 3,
    title: "Emergency Numbers",
    description: "Important contacts for emergencies",
    icon: Phone,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    id: 4,
    title: "Legal Resources",
    description: "Legal aid and support information",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const emergencyNumbers = [
  { name: "Women Helpline", number: "181" },
  { name: "Police", number: "100" },
  { name: "Ambulance", number: "102" },
  { name: "National Emergency", number: "112" },
];

export default function Awareness() {
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
            <h1 className="font-display text-xl font-semibold">Awareness & Legal</h1>
            <p className="text-sm text-muted-foreground">Know your rights and stay safe</p>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-2 gap-3 stagger-children">
          {resources.map((resource) => (
            <button
              key={resource.id}
              className="glass-card p-4 text-left hover:-translate-y-1 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${resource.bgColor} flex items-center justify-center mb-3`}>
                <resource.icon className={`w-6 h-6 ${resource.color}`} />
              </div>
              <h3 className="font-medium text-sm">{resource.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
            </button>
          ))}
        </div>

        {/* Emergency Numbers */}
        <div className="glass-card p-4 animate-fade-in">
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-destructive" />
            Emergency Numbers
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {emergencyNumbers.map((item) => (
              <a
                key={item.name}
                href={`tel:${item.number}`}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-lg font-bold text-destructive">{item.number}</p>
                </div>
                <Phone className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="glass-card p-4 animate-slide-up">
          <h3 className="font-display font-semibold mb-3">Campus Safety Tips</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-safe/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-safe">1</span>
              </span>
              <p className="text-muted-foreground">
                Always share your live location with trusted contacts during late hours
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-safe/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-safe">2</span>
              </span>
              <p className="text-muted-foreground">
                Use well-lit paths and avoid isolated areas, especially at night
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-safe/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-safe">3</span>
              </span>
              <p className="text-muted-foreground">
                Save the security control room number on speed dial
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-safe/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-safe">4</span>
              </span>
              <p className="text-muted-foreground">
                Report any suspicious activity immediately through the app
              </p>
            </li>
          </ul>
        </div>

        {/* Legal Rights */}
        <div className="glass-card p-4">
          <h3 className="font-display font-semibold mb-3">Know Your Rights</h3>
          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium">Sexual Harassment at Workplace Act, 2013</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium">Protection of Women from Domestic Violence</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium">UGC Regulations on Ragging</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
