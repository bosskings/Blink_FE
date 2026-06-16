/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        hankenThin: ["HankenGrotesk_100Thin", "sans-serif"],
        hankenLight: ["HankenGrotesk_300Light", "sans-serif"],
        hankenRegular: ["HankenGrotesk_400Regular", "sans-serif"],
        hankenMedium: ["HankenGrotesk_500Medium", "sans-serif"],
        hankenSemiBold: ["HankenGrotesk_600SemiBold", "sans-serif"],
        hankenBold: ["HankenGrotesk_700Bold", "sans-serif"],
        hankenBlack: ["HankenGrotesk_900Black", "sans-serif"],
      },
      borderRadius: {
        card: "0.75rem", // 12px
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
