/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--color-border)" /* light gray border */,
        input: "var(--color-input)" /* white */,
        ring: "var(--color-ring)" /* deep forest green */,
        background: "var(--color-background)" /* soft off-white */,
        foreground: "var(--color-foreground)" /* near-black */,
        primary: {
          DEFAULT: "var(--color-primary)" /* deep forest green */,
          foreground: "var(--color-primary-foreground)" /* white */,
        },
        secondary: {
          DEFAULT: "var(--color-secondary)" /* warm saddle brown */,
          foreground: "var(--color-secondary-foreground)" /* white */,
        },
        destructive: {
          DEFAULT: "var(--color-destructive)" /* clear red */,
          foreground: "var(--color-destructive-foreground)" /* white */,
        },
        muted: {
          DEFAULT: "var(--color-muted)" /* light gray */,
          foreground: "var(--color-muted-foreground)" /* medium gray */,
        },
        accent: {
          DEFAULT: "var(--color-accent)" /* energetic coral orange */,
          foreground: "var(--color-accent-foreground)" /* white */,
        },
        popover: {
          DEFAULT: "var(--color-popover)" /* pure white */,
          foreground: "var(--color-popover-foreground)" /* near-black */,
        },
        card: {
          DEFAULT: "var(--color-card)" /* pure white */,
          foreground: "var(--color-card-foreground)" /* near-black */,
        },
        success: {
          DEFAULT: "var(--color-success)" /* fresh green */,
          foreground: "var(--color-success-foreground)" /* white */,
        },
        warning: {
          DEFAULT: "var(--color-warning)" /* amber */,
          foreground: "var(--color-warning-foreground)" /* white */,
        },
        error: {
          DEFAULT: "var(--color-error)" /* clear red */,
          foreground: "var(--color-error-foreground)" /* white */,
        },
      },
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
        heading: ["Inter", "sans-serif"],
        caption: ["Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.1)",
        modal: "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
      transitionDuration: {
        micro: "200ms",
        state: "300ms",
      },
      transitionTimingFunction: {
        micro: "ease-out",
        state: "ease-in-out",
      },
    },
  },
  plugins: [],
};
