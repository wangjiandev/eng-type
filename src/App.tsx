import { ThemeProvider } from '@/components/theme-provider'
import WordCard from '@/components/word-card'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container mx-auto flex min-h-svh flex-col items-center justify-center">
        <WordCard />
      </div>
    </ThemeProvider>
  )
}

export default App
