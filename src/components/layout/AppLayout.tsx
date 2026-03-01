import { ReactNode } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Shield, Bell, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export function AppLayout({ children, showHeader = true }: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isHome = location.pathname === "/home";

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50 px-4 py-3">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              <img
               src="https://www.facultyplus.com/wp-content/uploads/2020/11/Rit-logo.png"
               alt="WalkSafe Logo"
               className="w-44 h-10 object-contain dark:invert"
              />
              



              <div>
                <h1 className="font-display text-lg font-semibold leading-tight">RIT Safe</h1>
                <p className="text-xs text-muted-foreground">Campus Safety</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  toast({
                    title: "No New Notifications",
                    description: "You're all caught up! We'll alert you if anything needs attention.",
                  });
                }}
                className="p-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-200 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <ThemeToggle />
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-muted/50 hover:bg-destructive/20 hover:text-destructive transition-colors duration-200"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      )}
      <main className={showHeader ? "pt-20 pb-24" : ""}>
        {children}
      </main>
    </div>
  );
}
