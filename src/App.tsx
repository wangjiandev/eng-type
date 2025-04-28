import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="secondary">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="link">Click me</Button>
    </div>
  )
}

export default App
