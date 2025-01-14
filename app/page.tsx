'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { jsPDF } from 'jspdf'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const savePDF = () => {
    const doc = new jsPDF()
    doc.text('Todo List', 20, 20)
    todos.forEach((todo, index) => {
      doc.text(
        `${index + 1}. [${todo.completed ? 'X' : ' '}] ${todo.text}`,
        20,
        40 + index * 10
      )
    })
    doc.save('todo-list.pdf')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-purple-500">
      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-bold text-white text-center my-12">
          JUST DO IT.
        </h1>

        {/* Todo List */}
        <div className="max-w-4xl mx-auto space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-lg"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5"
              />
              <span className={`flex-1 text-white ${todo.completed ? 'line-through' : ''}`}>
                {todo.text}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>

        {/* Add Todo Form */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Enter a new task..."
              className="flex-1 p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
            />
            <Button 
              onClick={addTodo}
              className="bg-black hover:bg-gray-800 text-white"
            >
              Add Task
            </Button>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="fixed bottom-8 w-full left-0 px-4">
          <div className="max-w-4xl mx-auto flex justify-between">
            <Button
              variant="default"
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => setShowAddTask(true)}
            >
              Add a task!
            </Button>
            <Button
              variant="default"
              className="bg-black hover:bg-gray-800 text-white"
              onClick={savePDF}
            >
              Save as PDF
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

