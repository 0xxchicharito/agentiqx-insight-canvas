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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState("general");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex-1 min-h-full overflow-y-auto">
      {/* Header — matches FlowList breadcrumb style */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="px-8 pt-7 pb-5"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3 text-xs"
        >
          <ArrowLeft size={14} />
          <span>Back to Projects</span>
        </button>
        <h1 className="text-2xl font-bold text-foreground tracking-tight text-shimmer">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage the general settings for AgentIQX.
        </p>
      </motion.div>

      <div className="flex px-8 pb-8 gap-6">
        {/* Settings Nav — glass panel */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-[200px] min-w-[200px] space-y-1 py-4 px-3 rounded-2xl glass border border-border/50 h-fit sticky top-4"
        >
          {settingsNav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.15)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <item.icon size={15} strokeWidth={isActive ? 2.2 : 1.8} />
                {item.label}
              </button>
            );
          })}
        </motion.nav>

        {/* Content */}
        <div className="flex-1 max-w-3xl">
          {activeSection === "general" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {/* Section Banner — glassmorphic with gradient */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl cat-workflow-gradient p-6 relative overflow-hidden glow-workflow"
              >
                {/* Decorative orbs inside banner */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-2xl -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-1/3 w-24 h-24 rounded-full bg-white/5 blur-xl translate-y-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 text-white font-bold text-lg">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <SlidersHorizontal size={18} />
                    </div>
                    General
                  </div>
                  <p className="text-white/70 text-sm mt-2 ml-[46px]">
                    Manage your account and AgentIQX preferences in one place.
                  </p>
                </div>
              </motion.div>

              {/* Profile Picture — glass card */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl bg-surface border border-border/60 p-6 space-y-5 gradient-border glow-workflow transition-shadow duration-300"
                style={{ boxShadow: "0 4px 24px -4px hsl(221 83% 53% / 0.08)" }}
              >
                <div>
                  <h3 className="text-base font-semibold text-foreground">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Select an image to use as your profile picture.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/70 mb-3">People</h4>
                    <div className="flex flex-wrap gap-2">
                      {peopleAvatars.map((avatar, i) => (
                        <motion.button
                          key={`p-${i}`}
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-200 ${
                            selectedAvatar === avatar
                              ? "border-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)] bg-primary/10"
                              : "border-transparent hover:border-primary/30 bg-muted/50"
                          }`}
                        >
                          {avatar}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/70 mb-3">Space</h4>
                    <div className="flex flex-wrap gap-2">
                      {spaceAvatars.map((avatar, i) => (
                        <motion.button
                          key={`s-${i}`}
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-200 ${
                            selectedAvatar === avatar
                              ? "border-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)] bg-primary/10"
                              : "border-transparent hover:border-primary/30 bg-muted/50"
                          }`}
                        >
                          {avatar}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 h-10 px-5 rounded-xl bg-[hsl(211_100%_50%)] hover:bg-[hsl(211_100%_45%)] text-primary-foreground text-sm font-semibold shadow-lg transition-colors duration-200"
                  >
                    Save
                  </motion.button>
                </div>
              </motion.div>

              {/* Password — glass card */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl bg-surface border border-border/60 p-6 space-y-4 gradient-border glow-workflow transition-shadow duration-300"
                style={{ boxShadow: "0 4px 24px -4px hsl(221 83% 53% / 0.08)" }}
              >
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
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 backdrop-blur-sm"
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
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 backdrop-blur-sm"
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
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 h-10 px-5 rounded-xl bg-[hsl(211_100%_50%)] hover:bg-[hsl(211_100%_45%)] text-primary-foreground text-sm font-semibold shadow-lg transition-colors duration-200"
                  >
                    Save
                  </motion.button>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-6 pt-2 pb-4 text-sm text-muted-foreground"
              >
                <a href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200">
                  <Shield size={14} /> Privacy Policy
                </a>
                <a href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200">
                  <Headphones size={14} /> User Support
                </a>
                <a href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200">
                  <Phone size={14} /> Contact Us
                </a>
              </motion.div>
            </motion.div>
          )}

          {activeSection !== "general" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="rounded-2xl bg-surface border border-border/60 p-12 flex flex-col items-center justify-center text-center gradient-border"
                style={{ boxShadow: "0 4px 24px -4px hsl(221 83% 53% / 0.08)" }}
              >
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
