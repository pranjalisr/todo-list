import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center">
      <div className="flex gap-2">
        <Button variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white">
          Home
        </Button>
        <Button variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white">
          Documents
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="w-4 h-4 rounded-full bg-white"></div>
        <div className="w-4 h-4 rounded-full bg-green-400"></div>
        <div className="w-4 h-4 rounded-full bg-orange-400"></div>
      </div>
    </header>
  )
}

