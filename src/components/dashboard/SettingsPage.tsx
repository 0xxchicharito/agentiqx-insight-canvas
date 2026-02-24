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
  User,
  Lock,
  Sparkles,
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
              {/* Bento Row 1 — Banner + Selected Avatar Preview */}
              <div className="grid grid-cols-3 gap-4">
                {/* Banner — spans 2 cols */}
                <motion.div
                  variants={itemVariants}
                  className="col-span-2 rounded-2xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, hsl(221 83% 20%), hsl(250 70% 15%))",
                    minHeight: "160px",
                  }}
                >
                  {/* Animated mesh inside */}
                  <div className="absolute inset-0">
                    <div className="absolute w-40 h-40 rounded-full bg-[hsl(221_83%_53%/0.3)] blur-3xl top-[-20%] left-[10%]" />
                    <div className="absolute w-32 h-32 rounded-full bg-[hsl(263_70%_58%/0.25)] blur-3xl bottom-[-10%] right-[15%]" />
                    <div className="absolute w-24 h-24 rounded-full bg-[hsl(174_70%_45%/0.2)] blur-2xl top-[50%] right-[40%]" />
                    {/* Grid pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />
                  </div>
                  <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl cat-workflow-gradient flex items-center justify-center shadow-lg">
                        <SlidersHorizontal size={18} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-white font-bold text-lg tracking-tight">General</h2>
                        <p className="text-white/50 text-xs">Account & Preferences</p>
                      </div>
                    </div>
                    <p className="text-white/40 text-[11px] mt-auto">
                      Manage your account and AgentIQX preferences in one place.
                    </p>
                  </div>
                </motion.div>

                {/* Avatar Preview Card */}
                <motion.div
                  variants={itemVariants}
                  className="col-span-1 rounded-2xl border border-border/60 bg-surface p-5 flex flex-col items-center justify-center gap-3 gradient-border"
                >
                  <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center text-4xl border-2 border-dashed border-border/80 transition-all duration-300"
                    style={selectedAvatar ? {
                      borderStyle: "solid",
                      borderColor: "hsl(221 83% 53% / 0.4)",
                      boxShadow: "0 0 20px hsl(221 83% 53% / 0.15)",
                    } : {}}
                  >
                    {selectedAvatar || <User size={28} className="text-muted-foreground/40" />}
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    {selectedAvatar ? "Selected" : "No Avatar"}
                  </span>
                </motion.div>
              </div>

              {/* Bento Row 2 — Profile Picture full width with horizontal scroll sections */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl border border-border/60 bg-surface overflow-hidden gradient-border"
              >
                {/* Section header strip */}
                <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg cat-recommend-gradient flex items-center justify-center">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Profile Picture</h3>
                      <p className="text-[11px] text-muted-foreground">Choose your identity</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="h-8 px-4 rounded-lg bg-[hsl(211_100%_50%)] hover:bg-[hsl(211_100%_45%)] text-primary-foreground text-xs font-semibold shadow-md transition-colors duration-200"
                  >
                    Save
                  </motion.button>
                </div>

                <div className="p-6 space-y-5">
                  {/* People — horizontal scrollable */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60 mb-3 flex items-center gap-2">
                      <div className="w-1 h-3 rounded-full cat-workflow-gradient" />
                      People
                    </h4>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {peopleAvatars.map((avatar, i) => (
                        <motion.button
                          key={`p-${i}`}
                          whileHover={{ scale: 1.2, y: -4 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xl transition-all duration-200 ${
                            selectedAvatar === avatar
                              ? "bg-primary/15 ring-2 ring-primary shadow-[0_0_16px_hsl(var(--primary)/0.35)]"
                              : "bg-muted/40 hover:bg-muted ring-1 ring-border/30 hover:ring-primary/20"
                          }`}
                        >
                          {avatar}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Space — horizontal scrollable */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60 mb-3 flex items-center gap-2">
                      <div className="w-1 h-3 rounded-full cat-chatbot-gradient" />
                      Space
                    </h4>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {spaceAvatars.map((avatar, i) => (
                        <motion.button
                          key={`s-${i}`}
                          whileHover={{ scale: 1.2, y: -4 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xl transition-all duration-200 ${
                            selectedAvatar === avatar
                              ? "bg-primary/15 ring-2 ring-primary shadow-[0_0_16px_hsl(var(--primary)/0.35)]"
                              : "bg-muted/40 hover:bg-muted ring-1 ring-border/30 hover:ring-primary/20"
                          }`}
                        >
                          {avatar}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bento Row 3 — Password as side-by-side inputs in a compact strip */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl border border-border/60 bg-surface overflow-hidden gradient-border"
              >
                <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg cat-risk-gradient flex items-center justify-center">
                      <Lock size={14} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Password</h3>
                      <p className="text-[11px] text-muted-foreground">Update your credentials</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="h-8 px-4 rounded-lg bg-[hsl(211_100%_50%)] hover:bg-[hsl(211_100%_45%)] text-primary-foreground text-xs font-semibold shadow-md transition-colors duration-200"
                  >
                    Update
                  </motion.button>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60 mb-2 block">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/20 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 focus:bg-muted/40 transition-all duration-300"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                        >
                          {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                        </button>
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60 mb-2 block">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/20 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 focus:bg-muted/40 transition-all duration-300"
                        />
                        <button
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                        >
                          {showConfirm ? <Eye size={15} /> : <EyeOff size={15} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Footer — minimal inline */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-8 pt-3 pb-6"
              >
                <a href="#" className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50 hover:text-primary transition-colors duration-200 uppercase tracking-wider font-medium">
                  <Shield size={12} /> Privacy
                </a>
                <div className="w-1 h-1 rounded-full bg-border" />
                <a href="#" className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50 hover:text-primary transition-colors duration-200 uppercase tracking-wider font-medium">
                  <Headphones size={12} /> Support
                </a>
                <div className="w-1 h-1 rounded-full bg-border" />
                <a href="#" className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50 hover:text-primary transition-colors duration-200 uppercase tracking-wider font-medium">
                  <Phone size={12} /> Contact
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
