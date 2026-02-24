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
  Plus,
  Lock,
  ImagePlus,
  Sparkles,
  Trash2,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";

const settingsNav = [
  { id: "general", label: "General", icon: SlidersHorizontal, gradient: "cat-workflow-gradient" },
  { id: "mcp", label: "MCP Servers", icon: Server, gradient: "cat-recommend-gradient" },
  { id: "apikeys", label: "AgentIQX API Keys", icon: Key, gradient: "cat-risk-gradient" },
  { id: "variables", label: "Global Variables", icon: Globe, gradient: "cat-chatbot-gradient" },
  { id: "shortcuts", label: "Shortcuts", icon: Keyboard, gradient: "cat-workflow-gradient" },
  { id: "messages", label: "Messages", icon: MessageSquare, gradient: "cat-recommend-gradient" },
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

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

function ApiKeyRow({ name, keyValue, created, lastUsed, totalUses }: {
  name: string; keyValue: string; created: string; lastUsed: string; totalUses: number;
}) {
  const [copied, setCopied] = useState(false);
  const masked = `${keyValue}${"*".repeat(16)}`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <tr className="border-b border-border/30 hover:bg-muted/30 transition-colors">
      <td className="px-5 py-3"><input type="checkbox" className="rounded border-border" /></td>
      <td className="px-4 py-3 font-medium text-foreground">{name}</td>
      <td className="px-4 py-3 text-muted-foreground font-mono text-[12px] flex items-center gap-2">
        {masked}
        <button onClick={handleCopy} className="text-muted-foreground/50 hover:text-primary transition-colors">
          {copied ? <Check size={13} className="text-primary" /> : <Copy size={13} />}
        </button>
      </td>
      <td className="px-4 py-3 text-muted-foreground">{created}</td>
      <td className="px-4 py-3 text-muted-foreground">{lastUsed}</td>
      <td className="px-4 py-3 text-foreground font-medium">{totalUses}</td>
    </tr>
  );
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState("general");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex-1 min-h-full overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-10 pt-8 pb-6"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-primary text-[13px] font-medium hover:opacity-70 transition-opacity mb-5"
        >
          <ArrowLeft size={15} />
          Projects
        </button>
        <h1 className="text-[28px] font-bold text-foreground tracking-tight text-shimmer">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage the general settings for AgentIQX.
        </p>
      </motion.div>

      <div className="flex px-10 pb-12 gap-8">
        {/* Left nav — colored icon badges */}
        <motion.nav
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="w-[220px] min-w-[220px] space-y-1 h-fit sticky top-8"
        >
          {settingsNav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 group ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.15)]"
                    : "text-foreground/65 hover:bg-muted/50 hover:text-foreground font-medium"
                }`}
              >
                <item.icon size={18} strokeWidth={1.6} className={isActive ? "text-primary" : "text-muted-foreground"} />
                {item.label}
              </button>
            );
          })}
        </motion.nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeSection === "general" && (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Hero banner */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl overflow-hidden relative settings-banner-gradient"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-48 h-48 rounded-full bg-white/10 blur-3xl -top-10 -right-10" />
                  <div className="absolute w-36 h-36 rounded-full bg-white/5 blur-3xl bottom-0 left-[20%]" />
                </div>
                <div className="relative z-10 px-7 py-6 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                    <SlidersHorizontal size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl tracking-tight">General</h2>
                    <p className="text-white/90 text-[13px] mt-0.5">
                      Manage your account and AgentIQX preferences in one place.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Profile Picture section */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg cat-recommend-gradient flex items-center justify-center shadow-sm">
                    <ImagePlus size={15} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-foreground">Profile Picture</h3>
                    <p className="text-[12px] text-muted-foreground">Select an image to use as your profile picture</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-card border border-border/50 overflow-hidden shadow-sm">
                  {/* Current avatar + indicator */}
                  <div className="px-6 py-5 flex items-center gap-5 bg-gradient-to-r from-primary/5 via-transparent to-[hsl(263_70%_58%/0.05)]">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${
                      selectedAvatar 
                        ? "bg-primary/10 ring-2 ring-primary/40 shadow-[0_0_24px_hsl(var(--primary)/0.2)]" 
                        : "bg-muted border-2 border-dashed border-border"
                    }`}>
                      {selectedAvatar || <User size={26} className="text-muted-foreground/30" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {selectedAvatar ? "Looking good! 🎉" : "No avatar chosen"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Pick one from the collections below
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-border/40" />

                  {/* People */}
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-4 rounded-full cat-workflow-gradient" />
                      <p className="text-[12px] font-semibold text-foreground/70 uppercase tracking-wider">People</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {peopleAvatars.map((avatar, i) => (
                        <motion.button
                          key={`p-${i}`}
                          whileHover={{ scale: 1.15, y: -3 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-all duration-150 ${
                            selectedAvatar === avatar
                              ? "ring-2 ring-primary bg-primary/10 shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                              : "bg-muted/40 hover:bg-accent ring-1 ring-transparent hover:ring-primary/20"
                          }`}
                        >
                          {avatar}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border/40 mx-6" />

                  {/* Space */}
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-4 rounded-full cat-chatbot-gradient" />
                      <p className="text-[12px] font-semibold text-foreground/70 uppercase tracking-wider">Space</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {spaceAvatars.map((avatar, i) => (
                        <motion.button
                          key={`s-${i}`}
                          whileHover={{ scale: 1.15, y: -3 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-all duration-150 ${
                            selectedAvatar === avatar
                              ? "ring-2 ring-primary bg-primary/10 shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                              : "bg-muted/40 hover:bg-accent ring-1 ring-transparent hover:ring-primary/20"
                          }`}
                        >
                          {avatar}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border/40" />
                  <div className="px-6 py-3 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="h-9 px-5 rounded-xl bg-[hsl(211_100%_50%)] hover:bg-[hsl(211_100%_45%)] text-primary-foreground text-[13px] font-semibold shadow-md shadow-primary/25 transition-colors"
                    >
                      Save
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Password section */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg cat-risk-gradient flex items-center justify-center shadow-sm">
                    <Lock size={15} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-foreground">Password</h3>
                    <p className="text-[12px] text-muted-foreground">Type your new password and confirm it</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-card border border-border/50 overflow-hidden shadow-sm">
                  {/* Password field */}
                  <div className="px-6 py-4 flex items-center gap-4">
                    <label className="text-[13px] text-foreground font-medium w-[130px] flex-shrink-0">
                      New Password
                    </label>
                    <div className="flex-1 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="w-full px-4 py-2.5 rounded-xl border border-border/50 bg-muted/20 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 transition-all"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                      >
                        {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-border/40 mx-6" />

                  {/* Confirm field */}
                  <div className="px-6 py-4 flex items-center gap-4">
                    <label className="text-[13px] text-foreground font-medium w-[130px] flex-shrink-0">
                      Confirm
                    </label>
                    <div className="flex-1 relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm password"
                        className="w-full px-4 py-2.5 rounded-xl border border-border/50 bg-muted/20 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 transition-all"
                      />
                      <button
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                      >
                        {showConfirm ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="h-px bg-border/40" />
                  <div className="px-6 py-3 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="h-9 px-5 rounded-xl bg-[hsl(211_100%_50%)] hover:bg-[hsl(211_100%_45%)] text-primary-foreground text-[13px] font-semibold shadow-md shadow-primary/25 transition-colors"
                    >
                      Update
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div variants={fadeUp} className="flex items-center gap-6 pt-4 pb-6 text-[12px] text-muted-foreground/40">
                <a href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Shield size={12} /> Privacy Policy
                </a>
                <a href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Headphones size={12} /> User Support
                </a>
                <a href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Phone size={12} /> Contact Us
                </a>
              </motion.div>
            </motion.div>
          )}

          {activeSection === "mcp" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* MCP Banner */}
              <div className="rounded-2xl overflow-hidden relative settings-banner-gradient">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-48 h-48 rounded-full bg-white/10 blur-3xl -top-10 -right-10" />
                  <div className="absolute w-36 h-36 rounded-full bg-white/5 blur-3xl bottom-0 left-[20%]" />
                </div>
                <div className="relative z-10 px-7 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                      <Server size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-xl tracking-tight">MCP Servers</h2>
                      <p className="text-white/90 text-[13px] mt-0.5">
                        Manage MCP servers used in your flows.
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="h-10 px-5 rounded-xl bg-white text-primary text-[13px] font-semibold shadow-lg flex items-center gap-2 hover:bg-white/90 transition-colors duration-200 cta-pulse-white"
                  >
                    <Plus size={16} />
                    Add MCP Server
                  </motion.button>
                </div>
              </div>

              {/* Empty state */}
              <div className="rounded-2xl border-2 border-dashed border-border/60 bg-card/50 min-h-[400px] flex flex-col items-center justify-center text-center p-10">
                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-5">
                  <Server size={28} className="text-muted-foreground/30" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">No MCP server added</h3>
                <p className="text-[13px] text-muted-foreground">
                  Start adding <span className="text-primary font-medium cursor-pointer hover:underline">New MCP server</span>
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === "apikeys" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* API Keys Banner */}
              <div className="rounded-2xl overflow-hidden relative settings-banner-gradient">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-48 h-48 rounded-full bg-white/10 blur-3xl -top-10 -right-10" />
                  <div className="absolute w-36 h-36 rounded-full bg-white/5 blur-3xl bottom-0 left-[20%]" />
                </div>
                <div className="relative z-10 px-7 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                      <Key size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-xl tracking-tight">AgentIQX API Keys</h2>
                      <p className="text-white/90 text-[13px] mt-0.5 max-w-md">
                        Your secret AgentIQX API keys are listed below. Do not share your API key with others, or expose it in the browser or other client-side code.
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="h-10 px-5 rounded-xl bg-white text-primary text-[13px] font-semibold shadow-lg flex items-center gap-2 hover:bg-white/90 transition-colors duration-200 cta-pulse-white flex-shrink-0"
                  >
                    <Plus size={16} />
                    Generate API Key
                  </motion.button>
                </div>
              </div>

              {/* API Keys Table */}
              <div className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left font-semibold text-foreground/70 px-5 py-3 w-8">
                          <input type="checkbox" className="rounded border-border" />
                        </th>
                        <th className="text-left font-semibold text-foreground/70 px-4 py-3">Name</th>
                        <th className="text-left font-semibold text-foreground/70 px-4 py-3">Key</th>
                        <th className="text-left font-semibold text-foreground/70 px-4 py-3">Created</th>
                        <th className="text-left font-semibold text-foreground/70 px-4 py-3">Last Used</th>
                        <th className="text-left font-semibold text-foreground/70 px-4 py-3">Total Uses</th>
                      </tr>
                    </thead>
                    <tbody>
                      <ApiKeyRow
                        name="temp_key_01"
                        keyValue="sk-oajbX"
                        created="2025-11-27T12:47:24.84"
                        lastUsed="2026-02-19 05:54:43"
                        totalUses={66}
                      />
                      <ApiKeyRow
                        name="runkey"
                        keyValue="sk-Vsxj0"
                        created="2026-01-17T06:53:17.27"
                        lastUsed="2026-02-24 06:52:27"
                        totalUses={1001}
                      />
                    </tbody>
                  </table>
                </div>

                {/* Table footer */}
                <div className="border-t border-border/50 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 size={13} /> Remove
                    </button>
                    <button className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
                      <RotateCcw size={13} /> Reset Columns
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                    <span>1 to 2 of 2</span>
                    <span className="text-foreground/50 ml-2">Page 1 of 1</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "variables" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Global Variables Banner */}
              <div className="rounded-2xl overflow-hidden relative settings-banner-gradient">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-48 h-48 rounded-full bg-white/10 blur-3xl -top-10 -right-10" />
                  <div className="absolute w-36 h-36 rounded-full bg-white/5 blur-3xl bottom-0 left-[20%]" />
                </div>
                <div className="relative z-10 px-7 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                      <Globe size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-xl tracking-tight">Global Variables</h2>
                      <p className="text-white/90 text-[13px] mt-0.5">
                        Manage global variables and assign them to fields.
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="h-10 px-5 rounded-xl bg-white text-primary text-[13px] font-semibold shadow-lg flex items-center gap-2 hover:bg-white/90 transition-colors duration-200 cta-pulse-white flex-shrink-0"
                  >
                    <Plus size={16} />
                    Add New Variable
                  </motion.button>
                </div>
              </div>

              {/* Empty state */}
              <div className="rounded-2xl border border-border/50 bg-card min-h-[450px] flex flex-col items-center justify-center text-center p-10 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-5">
                  <Globe size={28} className="text-muted-foreground/30" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">No Data Available</h3>
                <p className="text-[13px] text-muted-foreground max-w-sm">
                  Oops! It seems there's no data to display right now. Please check back later.
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === "shortcuts" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Shortcuts Banner */}
              <div className="rounded-2xl overflow-hidden relative settings-banner-gradient">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-48 h-48 rounded-full bg-white/10 blur-3xl -top-10 -right-10" />
                  <div className="absolute w-36 h-36 rounded-full bg-white/5 blur-3xl bottom-0 left-[20%]" />
                </div>
                <div className="relative z-10 px-7 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                      <Keyboard size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-xl tracking-tight">Shortcuts</h2>
                      <p className="text-white/90 text-[13px] mt-0.5">
                        Manage shortcuts for quick access to frequently used actions.
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="h-10 px-5 rounded-xl bg-white text-primary text-[13px] font-semibold shadow-lg flex items-center gap-2 hover:bg-white/90 transition-colors duration-200 cta-pulse-white flex-shrink-0"
                  >
                    <RotateCcw size={16} />
                    Restore
                  </motion.button>
                </div>
              </div>

              {/* Shortcuts Table */}
              <div className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70 w-[55%]">Functionality</th>
                      <th className="px-6 py-3 text-left font-semibold text-foreground/70">Keyboard Shortcut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Controls", "Ctrl ⇧ A"],
                      ["Search Components on Sidebar", "/"],
                      ["Minimize", "Ctrl ."],
                      ["Code", "SPACE"],
                      ["Copy", "Ctrl C"],
                      ["Duplicate", "Ctrl D"],
                      ["Component Share", "Ctrl ⇧ S"],
                      ["Docs", "Ctrl ⇧ D"],
                      ["Changes Save", "Ctrl S"],
                      ["Save Component", "Ctrl ALT S"],
                      ["Delete", "BACKSPACE"],
                      ["Open Playground", "Ctrl K"],
                      ["Undo", "Ctrl Z"],
                      ["Redo", "Ctrl Y"],
                      ["Redo (alternative)", "Ctrl ⇧ Z"],
                      ["Group", "Ctrl G"],
                      ["Cut", "Ctrl X"],
                      ["Paste", "Ctrl V"],
                      ["API", "R"],
                      ["Download", "Ctrl J"],
                      ["Update", "Ctrl U"],
                      ["Freeze", "Ctrl ⇧ F"],
                      ["Flow Share", "Ctrl ⇧ B"],
                      ["Play", "P"],
                      ["Output Inspection", "O"],
                      ["Tool Mode", "Ctrl ⇧ M"],
                      ["Toggle Sidebar", "Ctrl B"],
                    ].map(([func, shortcut], i) => (
                      <tr key={i} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-3 font-medium text-primary">{func}</td>
                        <td className="px-6 py-3 text-muted-foreground font-mono text-[12px]">{shortcut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeSection !== "general" && activeSection !== "mcp" && activeSection !== "apikeys" && activeSection !== "variables" && activeSection !== "shortcuts" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-[22px] font-semibold text-foreground tracking-tight mb-6">
                {settingsNav.find(s => s.id === activeSection)?.label}
              </h2>
              <div className="rounded-2xl bg-card border border-border/50 p-10 text-center shadow-sm">
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
