import { useState } from 'react'
import { Todo } from '../app/page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface TodoListProps {
  todos: Todo[]
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  showAddTask: boolean
  setShowAddTask: (show: boolean) => void
  addTodo: (text: string) => void
}

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  showAddTask,
  setShowAddTask,
  addTodo,
}: TodoListProps) {
  const [newTodoText, setNewTodoText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim())
      setNewTodoText('')
    }
  }

  return (
    <>
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

      <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Enter your task"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Add Task
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

