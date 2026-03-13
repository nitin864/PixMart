'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Bike, User, UserCog, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

function EditRoleMobile() {
    const [roles] = useState([
        {
            id: "admin",
            label: "Admin",
            icon: UserCog,
            description: "Full system access & controls",
            accent: "#16a34a",
            bg: "from-green-950 via-green-900 to-emerald-950",
            badge: "All Permissions",
        },
        {
            id: "user",
            label: "User",
            icon: User,
            description: "Standard browsing & ordering",
            accent: "#0d9488",
            bg: "from-teal-950 via-teal-900 to-cyan-950",
            badge: "Basic Access",
        },
        {
            id: "deliveryBoy",
            label: "Delivery Boy",
            icon: Bike,
            description: "Route tracking & deliveries",
            accent: "#059669",
            bg: "from-emerald-950 via-emerald-900 to-green-950",
            badge: "Field Access",
        },
    ])

    const router = useRouter()
    const [selected, setSelected] = useState<string | null>(null)
    const [confirmed, setConfirmed] = useState(false)
    const [phone, setPhone] = useState("")
    const [phoneFocused, setPhoneFocused] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { update } = useSession()
    const isReady = selected !== null && phone.length === 10

    const handleEdit = async () => {
        if (!isReady || loading) return
        setLoading(true)
        setError(null)
        try {
            await axios.post("/api/user/edit-role-mobile", {
                role: selected,
                phone,
            })
            await update({role:selected  }) 
            setConfirmed(true)
            window.location.href = "/" 
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message ?? "Something went wrong. Please try again.")
            } else {
                setError("Something went wrong. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="flex flex-col min-h-screen w-full items-center justify-center px-5 py-10 relative overflow-hidden"
            style={{
                background: "radial-gradient(ellipse at 60% 0%, #052e16 0%, #0a0a0a 60%)",
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            }}
        >
            {/* Ambient blobs */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #16a34a, transparent 70%)" }}
            />
            <div
                className="absolute bottom-10 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #0d9488, transparent 70%)" }}
            />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-10"
            >
                <p className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase mb-2">
                    Account Setup
                </p>
                <h1
                    className="text-4xl font-black text-white leading-tight"
                    style={{ letterSpacing: "-0.02em" }}
                >
                    Select Your{" "}
                    <span
                        className="text-transparent bg-clip-text"
                        style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #10b981)" }}
                    >
                        Role
                    </span>
                </h1>
                <p className="text-zinc-500 text-sm mt-2">Choose how you'll use the platform</p>
            </motion.div>

            {/* Role Cards */}
            <div className="flex flex-col gap-4 w-full max-w-sm">
                {roles.map((role, i) => {
                    const Icon = role.icon
                    const isSelected = selected === role.id
                    return (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => !confirmed && setSelected(role.id)}
                            className="relative cursor-pointer rounded-2xl p-[1.5px] transition-all duration-300"
                            style={{
                                background: isSelected
                                    ? `linear-gradient(135deg, ${role.accent}, #ffffff22)`
                                    : "linear-gradient(135deg, #ffffff0a, #ffffff04)",
                                pointerEvents: confirmed ? "none" : "auto",
                            }}
                        >
                            <div
                                className={`rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 bg-linear-to-br ${role.bg}`}
                                style={{
                                    boxShadow: isSelected ? `0 8px 32px 0 ${role.accent}44` : "none",
                                }}
                            >
                                <div
                                    className="flex items-center justify-center rounded-xl w-14 h-14 shrink-0 transition-all duration-300"
                                    style={{
                                        background: isSelected
                                            ? `linear-gradient(135deg, ${role.accent}55, ${role.accent}22)`
                                            : "#ffffff0a",
                                        border: `1.5px solid ${isSelected ? role.accent + "88" : "#ffffff10"}`,
                                    }}
                                >
                                    <Icon size={26} strokeWidth={1.8} style={{ color: isSelected ? role.accent : "#a1a1aa" }} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="font-bold text-base text-white" style={{ letterSpacing: "-0.01em" }}>
                                            {role.label}
                                        </span>
                                        <span
                                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide"
                                            style={{
                                                background: isSelected ? role.accent + "33" : "#ffffff0d",
                                                color: isSelected ? role.accent : "#71717a",
                                                border: `1px solid ${isSelected ? role.accent + "55" : "#ffffff10"}`,
                                            }}
                                        >
                                            {role.badge}
                                        </span>
                                    </div>
                                    <p className="text-zinc-500 text-xs">{role.description}</p>
                                </div>

                                <div className="shrink-0">
                                    {isSelected ? (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -20 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                                        >
                                            <CheckCircle2 size={22} style={{ color: role.accent }} />
                                        </motion.div>
                                    ) : (
                                        <ChevronRight size={18} className="text-zinc-600" />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Mobile Number Input */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="w-full max-w-sm mt-6"
            >
                <label className="text-zinc-400 text-xs font-semibold tracking-[0.2em] uppercase mb-2 block">
                    Mobile Number
                </label>
                <div
                    className="flex items-center rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                        background: "#0f1f13",
                        border: `1.5px solid ${phoneFocused ? "#16a34a88" : "#ffffff10"}`,
                        boxShadow: phoneFocused ? "0 0 0 3px #16a34a22" : "none",
                    }}
                >
                    <div
                        className="flex items-center gap-1.5 px-4 py-4 shrink-0 border-r"
                        style={{ borderColor: phoneFocused ? "#16a34a44" : "#ffffff10" }}
                    >
                        <span className="text-base">🇮🇳</span>
                        <span className="text-zinc-300 font-semibold text-sm">+91</span>
                    </div>

                    <input
                        type="tel"
                        maxLength={10}
                        placeholder="98765 43210"
                        value={phone}
                        disabled={confirmed}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        onFocus={() => setPhoneFocused(true)}
                        onBlur={() => setPhoneFocused(false)}
                        className="flex-1 bg-transparent px-4 py-4 text-white text-sm font-medium outline-none placeholder:text-zinc-600 tracking-widest disabled:opacity-50"
                    />

                    {phone.length === 10 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            className="pr-4"
                        >
                            <CheckCircle2 size={18} style={{ color: "#16a34a" }} />
                        </motion.div>
                    )}
                </div>

                <p
                    className="text-xs mt-1.5 ml-1 transition-all duration-300"
                    style={{ color: phone.length === 10 ? "#16a34a" : "#52525b" }}
                >
                    {phone.length === 10 ? "✓ Valid number" : `${10 - phone.length} digits remaining`}
                </p>
            </motion.div>

            {/* Error message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-3 text-center w-full max-w-sm"
                >
                    ⚠ {error}
                </motion.p>
            )}

            {/* Confirm Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isReady ? 1 : 0.35, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-6 w-full max-w-sm"
            >
                <motion.button
                    whileTap={isReady && !loading ? { scale: 0.97 } : {}}
                    onClick={handleEdit}
                    disabled={!isReady || loading || confirmed}
                    className="w-full py-4 rounded-2xl font-bold text-base text-white tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                        background: confirmed
                            ? "#14532d"
                            : isReady
                                ? "linear-gradient(135deg, #16a34a, #0d9488)"
                                : "#1f2937",
                        cursor: isReady && !loading && !confirmed ? "pointer" : "not-allowed",
                        boxShadow: isReady && !confirmed ? "0 4px 24px #16a34a44" : "none",
                        letterSpacing: "0.02em",
                    }}
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Saving...
                        </>
                    ) : confirmed ? (
                        `✓ Redirecting...`
                    ) : (
                        "Confirm Role"
                    )}
                </motion.button>
            </motion.div>

            <p className="text-zinc-700 text-xs mt-5 text-center">
                You can change your role later in settings
            </p>
        </div>
    )
}

export default EditRoleMobile