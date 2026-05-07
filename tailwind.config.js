/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}", // Важно: tsx для TypeScript
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0D13',       // Основной фон (темный)
        surface: '#161822',  // Фон карточек
        border: '#232633',   // Цвет рамок
        accent: '#6C5DD3',   // Фиолетовый акцент StomaGaming
        accentHover: '#5a4cbf',
        text: '#FFFFFF',     // Белый текст
        textMuted: '#94A3B8',// Серый текст
        success: '#10B981',  // Зеленый (победа)
        danger: '#EF4444',   // Красный (поражение)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '16px',
        xl: '20px',
      }
    },
  },
  plugins: [],
}