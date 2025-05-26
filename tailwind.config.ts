import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        nerds: {
          yellow: "rgb(251, 25, 50)", // Updated red color
          darkblue: "#1A1F2C", 
          gray: "#2A2E38",
          lightgray: "#8E9196",
          darkgray: "#222529",
          red: "#FF5252",
          green: "#00FF00",  
          blue: "#2196F3"
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 8px 2px rgba(255, 215, 0, 0.3)" 
          },
          "50%": { 
            boxShadow: "0 0 15px 5px rgba(255, 215, 0, 0.5)" 
          }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "progress-fill": "progress-fill 1s ease-out"
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'rgb(209 213 219)',
            '[class~="lead"]': {
              color: 'rgb(156 163 175)',
            },
            a: {
              color: 'rgb(251, 25, 50)',
              '&:hover': {
                color: 'rgb(251, 25, 50, 0.8)',
              },
            },
            strong: {
              color: 'rgb(229 231 235)',
            },
            'ol > li::before': {
              color: 'rgb(156 163 175)',
            },
            'ul > li::before': {
              backgroundColor: 'rgb(107 114 128)',
            },
            hr: {
              borderColor: 'rgb(75 85 99)',
            },
            blockquote: {
              color: 'rgb(229 231 235)',
              borderLeftColor: 'rgb(75 85 99)',
            },
            h1: {
              color: 'rgb(255 255 255)',
            },
            h2: {
              color: 'rgb(255 255 255)',
            },
            h3: {
              color: 'rgb(255 255 255)',
            },
            h4: {
              color: 'rgb(255 255 255)',
            },
            'figure figcaption': {
              color: 'rgb(156 163 175)',
            },
            code: {
              color: 'rgb(229 231 235)',
              backgroundColor: 'rgb(42 46 56)',
              padding: '0.25rem',
              borderRadius: '0.25rem',
            },
            'a code': {
              color: 'rgb(251, 25, 50)',
            },
            pre: {
              color: 'rgb(229 231 235)',
              backgroundColor: 'rgb(42 46 56)',
            },
            thead: {
              color: 'rgb(255 255 255)',
              borderBottomColor: 'rgb(75 85 99)',
            },
            'tbody tr': {
              borderBottomColor: 'rgb(55 65 81)',
            },
          },
        },
      },
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    typography
  ],
} satisfies Config;
