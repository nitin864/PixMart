 

import axios from 'axios'
import { ArrowLeft, EyeIcon, EyeOff, Mail, ShoppingCart, User, Lock, Check, X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from "motion/react"
import React, { useState, useMemo, use } from 'react'
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react'


type propType = {
  previosStep: (s: number) => void
}

const passwordChecks = (password: string) => [
  { label: "At least 8 characters", pass: password.length >= 8 },
  { label: "Contains uppercase", pass: /[A-Z]/.test(password) },
  { label: "Contains a number", pass: /[0-9]/.test(password) },
  { label: "Contains a symbol", pass: /[^A-Za-z0-9]/.test(password) },
]

const RegisterForm = ({ previosStep }: propType) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const checks = useMemo(() => passwordChecks(password), [password])
  const passwordStrength = checks.filter(c => c.pass).length
  const strengthColor = passwordStrength <= 1 ? "#ef4444" : passwordStrength <= 2 ? "#f59e0b" : passwordStrength <= 3 ? "#3b82f6" : "#10b981"
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength]

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const nameValid = name.trim().length >= 2
  const router = useRouter()
  const handleBlur = (field: string) => {
    setFocused(null)
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post("/api/auth/register", {
        name, email, password
      })
      console.log(result.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const inputFields = [
    {
      id: "name",
      icon: <User className="w-5 h-5" />,
      type: "text",
      placeholder: "Your Name",
      value: name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      error: touched.name && !nameValid ? "Name must be at least 2 characters" : "",
      valid: nameValid,
    },
    {
      id: "email",
      icon: <Mail className="w-5 h-5" />,
      type: "email",
      placeholder: "Your Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      error: touched.email && !emailValid ? "Enter a valid email address" : "",
      valid: emailValid,
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[-5rem] right-[-5rem] w-96 h-96 bg-gradient-to-br from-emerald-400/25 to-green-600/25 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 left-[-5rem] w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[-4rem] left-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 pointer-events-none" />

      {/* Floating Food Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🥬', '🍎', '🥛', '🍕', '🛒', '🥑', '🍊'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${10 + (i * 13) % 80}%`,
              top: `${5 + (i * 17) % 75}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.08, 0.2, 0.08],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-green-700 hover:text-green-900 transition-colors cursor-pointer group"
        onClick={() => previosStep(1)}
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="font-semibold text-sm">Back</span>
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-emerald-200 mb-4"
          >
            <ShoppingCart className="w-7 h-7 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl font-extrabold text-gray-800 tracking-tight"
          >
            Create Account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-gray-500 text-sm mt-1.5"
          >
            Join PixMart and start shopping today
          </motion.p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          {/* Name & Email Fields */}
          {inputFields.map((field, idx) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
            >
              <div
                className={`relative flex items-center rounded-xl border transition-all duration-200 ${field.error
                    ? "border-red-400 bg-red-50/40"
                    : focused === field.id
                      ? "border-green-500 bg-white shadow-md shadow-green-100"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
              >
                <span
                  className={`ml-3 transition-colors duration-200 ${field.error ? "text-red-400" : focused === field.id ? "text-green-500" : "text-gray-400"
                    }`}
                >
                  {field.icon}
                </span>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="flex-1 py-3 pl-3 pr-3 bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none"
                  value={field.value}
                  onChange={field.onChange}
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => handleBlur(field.id)}
                />
                {/* Validation Icon */}
                <AnimatePresence>
                  {touched[field.id] && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mr-3"
                    >
                      {field.valid ? (
                        <Check className="w-4.5 h-4.5 text-green-500" />
                      ) : (
                        <X className="w-4.5 h-4.5 text-red-400" />
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* Error Message */}
              <AnimatePresence>
                {field.error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-red-500 text-xs mt-1.5 ml-1"
                  >
                    {field.error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.36 }}
          >
            <div
              className={`relative flex items-center rounded-xl border transition-all duration-200 ${touched.password && passwordStrength < 4
                  ? "border-amber-400 bg-amber-50/30"
                  : focused === "password"
                    ? "border-green-500 bg-white shadow-md shadow-green-100"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
            >
              <span
                className={`ml-3 transition-colors duration-200 ${focused === "password" ? "text-green-500" : "text-gray-400"
                  }`}
              >
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="flex-1 py-3 pl-3 pr-3 bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => handleBlur("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mr-3 text-gray-400 hover:text-green-500 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <EyeIcon className="w-4.5 h-4.5" />}
              </button>
            </div>

            {/* Strength Bar */}
            <AnimatePresence>
              {password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 overflow-hidden"
                >
                  {/* Progress Bar */}
                  <div className="flex gap-1.5 mb-2">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="h-1 flex-1 rounded-full bg-gray-200 transition-all duration-500 overflow-hidden"
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: level <= passwordStrength ? strengthColor : "transparent" }}
                          initial={{ width: "0%" }}
                          animate={{ width: level <= passwordStrength ? "100%" : "0%" }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    ))}
                  </div>
                  {/* Label */}
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">Password strength</p>
                    <p className="text-xs font-semibold" style={{ color: strengthColor }}>
                      {strengthLabel}
                    </p>
                  </div>
                  {/* Checklist */}
                  <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {checks.map((c, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <motion.span
                          animate={{ scale: c.pass ? [1.3, 1] : 1 }}
                          transition={{ duration: 0.25 }}
                        >
                          {c.pass ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <div className="w-3.5 h-3.5 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            </div>
                          )}
                        </motion.span>
                        <span className={`text-xs transition-colors duration-200 ${c.pass ? "text-green-600" : "text-gray-400"}`}>
                          {c.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sign In Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            className="text-center text-sm text-gray-500 mt-1"
          >
            Already have an account?{" "}
            <span
              className="text-green-600 font-semibold cursor-pointer hover:text-green-700 hover:underline underline-offset-2 transition-colors"
              onClick={() => router.push("/login")}
            >
              Sign in
            </span>
          </motion.p>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.48 }}
            className="mt-1"
          >
            <button
              type="button"
              onClick={handleRegister}
              disabled={loading || !nameValid || !emailValid || passwordStrength < 3}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center transition-all duration-300 ${!loading && nameValid && emailValid && passwordStrength >= 3
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
            </button>
          </motion.div>

          {/* OR Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.54 }}
            className="flex items-center gap-3"
          >
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </motion.div>

          {/* Google Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.58 }}
          >
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm active:scale-[0.98] transition-all duration-200 cursor-pointer"
              onClick={()=>signIn("google")}
            >
              {/* Google SVG Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default RegisterForm