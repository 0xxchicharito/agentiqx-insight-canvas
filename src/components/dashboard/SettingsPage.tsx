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
  ChevronRight,
  User,
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
    <div className="flex-1 min-h-full overflow-y-auto bg-background/50">
      {/* Minimal header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-10 pt-8 pb-6"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-primary text-[13px] font-medium hover:opacity-70 transition-opacity mb-6"
        >
          <ArrowLeft size={15} />
          Projects
        </button>
        <h1 className="text-[32px] font-bold text-foreground tracking-tight leading-none">
          Settings
        </h1>
      </motion.div>

      <div className="flex px-10 pb-12 gap-10">
        {/* Left nav — Apple-style grouped list */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-[220px] min-w-[220px] space-y-0.5 h-fit sticky top-8"
        >
          {settingsNav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors duration-150 ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground/70 hover:bg-muted/60 font-normal"
                }`}
              >
                <item.icon size={16} strokeWidth={1.6} />
                {item.label}
              </button>
            );
          })}
        </motion.nav>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          {activeSection === "general" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Profile section */}
              <section>
                <h2 className="text-[22px] font-semibold text-foreground tracking-tight mb-1">
                  Profile Picture
                </h2>
                <p className="text-[13px] text-muted-foreground mb-6">
                  Select an image to use as your profile picture.
                </p>

                {/* Current avatar display */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-[72px] h-[72px] rounded-full bg-muted flex items-center justify-center text-3xl ring-4 ring-background shadow-sm">
                    {selectedAvatar || <User size={30} className="text-muted-foreground/30" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {selectedAvatar ? "Avatar selected" : "No avatar chosen"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Pick one from the collections below
                    </p>
                  </div>
                </div>

                {/* Grouped card — Apple settings style */}
                <div className="rounded-xl bg-card border border-border/50 overflow-hidden shadow-sm">
                  {/* People row */}
                  <div className="px-5 py-4">
                    <p className="text-[13px] font-medium text-foreground mb-3">People</p>
                    <div className="flex flex-wrap gap-2.5">
                      {peopleAvatars.map((avatar, i) => (
                        <button
                          key={`p-${i}`}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-150 ${
                            selectedAvatar === avatar
                              ? "ring-[2.5px] ring-primary bg-primary/8 scale-110"
                              : "bg-secondary hover:bg-muted hover:scale-105"
                          }`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border/50 mx-5" />

                  {/* Space row */}
                  <div className="px-5 py-4">
                    <p className="text-[13px] font-medium text-foreground mb-3">Space</p>
                    <div className="flex flex-wrap gap-2.5">
                      {spaceAvatars.map((avatar, i) => (
                        <button
                          key={`s-${i}`}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-150 ${
                            selectedAvatar === avatar
                              ? "ring-[2.5px] ring-primary bg-primary/8 scale-110"
                              : "bg-secondary hover:bg-muted hover:scale-105"
                          }`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Save action — bottom strip */}
                  <div className="h-px bg-border/50" />
                  <div className="px-5 py-3 flex justify-end bg-muted/20">
                    <button className="h-8 px-4 rounded-lg bg-primary text-primary-foreground text-[13px] font-medium hover:bg-primary/90 transition-colors">
                      Save
                    </button>
                  </div>
                </div>
              </section>

              {/* Divider */}
              <div className="h-px bg-border/40" />

              {/* Password section */}
              <section>
                <h2 className="text-[22px] font-semibold text-foreground tracking-tight mb-1">
                  Password
                </h2>
                <p className="text-[13px] text-muted-foreground mb-6">
                  Type your new password and confirm it.
                </p>

                <div className="rounded-xl bg-card border border-border/50 overflow-hidden shadow-sm">
                  {/* Password field */}
                  <div className="px-5 py-4 flex items-center justify-between gap-4">
                    <label className="text-[13px] text-foreground font-medium w-[140px] flex-shrink-0">
                      New Password
                    </label>
                    <div className="flex-1 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="w-full px-3.5 py-2 rounded-lg border border-border/60 bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                      >
                        {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-border/50 mx-5" />

                  {/* Confirm field */}
                  <div className="px-5 py-4 flex items-center justify-between gap-4">
                    <label className="text-[13px] text-foreground font-medium w-[140px] flex-shrink-0">
                      Confirm
                    </label>
                    <div className="flex-1 relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm password"
                        className="w-full px-3.5 py-2 rounded-lg border border-border/60 bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      />
                      <button
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                      >
                        {showConfirm ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-border/50" />
                  <div className="px-5 py-3 flex justify-end bg-muted/20">
                    <button className="h-8 px-4 rounded-lg bg-primary text-primary-foreground text-[13px] font-medium hover:bg-primary/90 transition-colors">
                      Update
                    </button>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="flex items-center gap-5 pt-4 pb-6 text-[12px] text-muted-foreground/40">
                <a href="#" className="flex items-center gap-1 hover:text-muted-foreground transition-colors">
                  <Shield size={11} /> Privacy Policy
                </a>
                <a href="#" className="flex items-center gap-1 hover:text-muted-foreground transition-colors">
                  <Headphones size={11} /> User Support
                </a>
                <a href="#" className="flex items-center gap-1 hover:text-muted-foreground transition-colors">
                  <Phone size={11} /> Contact Us
                </a>
              </div>
            </motion.div>
          )}

          {activeSection !== "general" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-[22px] font-semibold text-foreground tracking-tight mb-6">
                {settingsNav.find(s => s.id === activeSection)?.label}
              </h2>
              <div className="rounded-xl bg-card border border-border/50 p-10 text-center shadow-sm">
                <p className="text-muted-foreground text-[13px]">
                  Coming soon.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
