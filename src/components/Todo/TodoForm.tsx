import { useState } from "react";
import { TodoClass } from ".";


type TodoFormProps = {
  addTodoItem: any
}

export default function TodoForm({ addTodoItem }: TodoFormProps) {
  const defaultFormState = { name: '' }
  const [formState, setFormState] = useState<any>(defaultFormState)
  function handleChange(e: any) {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const todo = new TodoClass(formState['name'])
    addTodoItem(todo)
    setFormState(defaultFormState)
  }

  return (
  <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formState['name']}
        placeholder="Add Task"
        className="w-full h-10 m-1 py-2 px-3 text-lg border border-gray-300"
        />
        <button
          disabled={formState['name'] == ''}
          className="my-2 w-full rounded-lg text-white px-4 py-2 bg-blue-500 shadow-sm"
        >
        Save
        </button>
    </form>
  </div>
  )
}
