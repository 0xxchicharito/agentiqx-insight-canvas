import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  SlidersHorizontal,
  Server,
  Key,
  Globe,
  Keyboard,
  MessageSquare,
  Eye,
  EyeOff,
  Shield,
  Headphones,
  Phone,
} from "lucide-react";

const settingsNav = [
  { id: "general", label: "General", icon: SlidersHorizontal },
  { id: "mcp", label: "MCP Servers", icon: Server },
  { id: "apikeys", label: "AgentIQX API Keys", icon: Key },
  { id: "variables", label: "Global Variables", icon: Globe },
  { id: "shortcuts", label: "Shortcuts", icon: Keyboard },
  { id: "messages", label: "Messages", icon: MessageSquare },
];

const peopleAvatars = [
  "👩‍💼", "👨‍💻", "👩‍🔬", "👨‍🎨", "👩‍🚀", "👨‍⚕️", "👩‍🏫", "👨‍🍳",
  "👩‍🔧", "👨‍✈️", "👩‍⚖️", "👨‍🌾", "👩‍🎤", "👨‍🏭", "🧑‍💼", "🧑‍🔬",
];

const spaceAvatars = [
  "🌍", "🚀", "🌌", "🎯", "💎", "🔮", "⚡", "🌊",
  "🏔️", "🌸", "🎨", "🧬", "🔭", "🛸", "🌙", "🪐",
];

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState("general");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-border/50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage the general settings for AgentIQX.
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Settings Nav */}
        <nav className="w-[200px] min-w-[200px] border-r border-border/50 py-6 px-4 space-y-1">
          {settingsNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                activeSection === item.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeSection === "general" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-8 space-y-6 max-w-3xl"
            >
              {/* Section Banner */}
              <div className="rounded-xl cat-workflow-gradient p-5">
                <div className="flex items-center gap-2 text-white font-semibold text-lg">
                  General <SlidersHorizontal size={18} />
                </div>
                <p className="text-white/80 text-sm mt-1">
                  Manage your account and AgentIQX preferences in one place.
                </p>
              </div>

              {/* Profile Picture */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-5">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Select an image to use as your profile picture.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">People</h4>
                    <div className="flex flex-wrap gap-2">
                      {peopleAvatars.map((avatar, i) => (
                        <button
                          key={`p-${i}`}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-150 hover:scale-110 ${
                            selectedAvatar === avatar
                              ? "border-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.3)]"
                              : "border-transparent hover:border-border"
                          } bg-muted`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Space</h4>
                    <div className="flex flex-wrap gap-2">
                      {spaceAvatars.map((avatar, i) => (
                        <button
                          key={`s-${i}`}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-150 hover:scale-110 ${
                            selectedAvatar === avatar
                              ? "border-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.3)]"
                              : "border-transparent hover:border-border"
                          } bg-muted`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                    Save
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Password</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Type your new password and confirm it.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                    <button
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirm ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                    Save
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-6 pt-4 pb-8 text-sm text-muted-foreground">
                <a href="#" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Shield size={14} /> Privacy Policy
                </a>
                <a href="#" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Headphones size={14} /> User Support
                </a>
                <a href="#" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Phone size={14} /> Contact Us
                </a>
              </div>
            </motion.div>
          )}

          {activeSection !== "general" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8"
            >
              <div className="rounded-xl border border-border bg-card p-12 flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground text-sm">
                  {settingsNav.find(s => s.id === activeSection)?.label} settings coming soon.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
