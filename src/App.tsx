import { useEffect, useState } from "react"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { TubesBackground } from "@/components/ui/neon-flow"
import { useTheme } from "@/components/theme-provider"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  // Track resolved dark state via DOM class observer
  useEffect(() => {
    const root = document.documentElement
    const update = () => setIsDark(root.classList.contains("dark"))
    update()
    const observer = new MutationObserver(update)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <button
      id="theme-toggle"
      onPointerDown={(e) => {
        e.stopPropagation()
        e.preventDefault()
        setTheme(isDark ? "light" : "dark")
      }}
      className="fixed top-6 right-6 z-[9999] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
      aria-label="Toggle dark mode"
      style={{ pointerEvents: 'auto', isolation: 'isolate' }}
    >
      {/* Sun icon */}
      <svg
        className={`absolute h-5 w-5 text-yellow-300 transition-all duration-500 ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
      {/* Moon icon */}
      <svg
        className={`absolute h-5 w-5 text-blue-300 transition-all duration-500 ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}

export function App() {
  return (
    <div className="relative w-full h-screen">
      {/* Theme toggle — completely independent, highest z-index */}
      <ThemeToggle />

      {/* Neon Tubes Background */}
      <TubesBackground className="w-full h-full min-h-screen">
        <div className="flex flex-col items-center justify-center w-full h-full gap-12 px-6">
          
          {/* Liquid Glass Button — the hero */}
          <div className="pointer-events-auto">
            <LiquidButton className="h-22 px-28 text-2xl font-semibold tracking-wide">
              Hello World
            </LiquidButton>
          </div>

          {/* Hint */}
          <div className="absolute bottom-8 flex flex-col items-center gap-2 text-white/40 pointer-events-none">
            <span className="text-[11px] uppercase tracking-[0.25em] drop-shadow-lg">
              Move cursor to interact · Click to randomize colors
            </span>
          </div>
        </div>
      </TubesBackground>
    </div>
  )
}

export default App
