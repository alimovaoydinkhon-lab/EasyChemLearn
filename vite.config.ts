import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ВАЖНО: Этот путь должен в точности совпадать с названием вашего репозитория на GitHub
  // Например, если репозиторий https://github.com/User/EasyChemLearn, то base должен быть '/EasyChemLearn/'
  base: "/", 
  build: {
    outDir: 'dist',
  },
  define: {
    // Прокидываем process.env для совместимости, если используются переменные окружения
    'process.env': process.env
  }
});