import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faRepeat,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import TodoForm from "./TodoForm";

type TodoStatusTypes = "not started" | "in progress" | "completed" | "deleted";

export class TodoClass {
  static nextId: number = 1;
  id: number;
  name: string;
  status: TodoStatusTypes;

  constructor(name: string) {
    this.id = TodoClass.nextId++;
    this.name = name
    this.status = "not started";
  }
}

type TodoItemProps = {
  todo: TodoClass;
  updateTodo: (id: number, todo: TodoClass, setTodos: any) => void;
  setTodos: any; // TODO: Type this
};

function TodoItem({ todo, updateTodo, setTodos }: TodoItemProps) {
  const defaultFormState = todo;
  const [edit, setEdit] = useState(false);
  const [formState, setFormState] = useState<TodoClass>(defaultFormState);

  const { name, status } = todo;
  const styling = clsx("flex w-full items-center p-2 justify-between", {
    ["bg-blue-500 hover:bg-blue-300"]: status === "not started",
    ["bg-green-500 hover:bg-green-300"]: status === "completed",
  });

  function markAsComplete(todo: TodoClass) {
    todo = { ...todo, status: "completed" };
    updateTodo(todo.id, todo, setTodos);
  }

  function markAsNotStarted(todo: TodoClass) {
    todo = { ...todo, status: "not started" };
    updateTodo(todo.id, todo, setTodos);
  }

  // TODO: add confirm
  function deleteTodo(id: number) {
    setTodos((currTodos: TodoClass[]) => {
      return currTodos.filter((t) => t.id !== id);
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    updateTodo(formState.id, formState, setTodos);
    setEdit(false);
    event.preventDefault();
  }

  // TODO: Set type
  function handleChange(e: any) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  if (edit) {
    return (
      <form onSubmit={handleSubmit} className="border rounded-sm">
        <div className="p-2 grid gap-2">
          <input
            onChange={handleChange}
            type="text"
            className="w-full p-2"
            name="name"
            value={formState["name"]}
          />
          <div className="flex items-center justify-between">
            <p className="text-white">Delete Todo {todo.id}</p>
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => deleteTodo(todo.id)}
              className="text-red-600"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="text-white" onClick={() => setEdit(false)}>
              Cancel
            </button>
            <button type="submit" className="text-white">
              Update
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className={styling}>
      {status === "completed" ? (
        <FontAwesomeIcon
          onClick={() => markAsNotStarted(todo)}
          role="button"
          icon={faRepeat}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => markAsComplete(todo)}
          role="button"
          icon={faCheck}
        />
      )}
      <p className={clsx({ ["line-through"]: status === "completed" })}>
        {name}
      </p>
      <FontAwesomeIcon
        role="button"
        onClick={() => setEdit(true)}
        icon={faPencil}
      />
    </div>
  );
}

export default function Todo() {
  const [todos, setTodos] = useLocalStorage<TodoClass[]>("todos", []);
  const [add, setAdd] = useState(true);

  function addTodoItem(todo: TodoClass) {
    setTodos((currentTodos) => [...currentTodos, todo]);
  }

  function updateTodo(id: number, todo: TodoClass, setTodos: any) {
    setTodos((currentTodos: TodoClass[]) => {
      return currentTodos.map((t) => {
        if (t.id === id) {
          return { ...t, ...todo };
        } else {
          return t;
        }
      });
    });
  }

  return (
    <div>
      <div className="flex justify-end mb-2">
        {add ? (
          <button
            onClick={() => setAdd(false)}
            className="rounded-lg text-white px-4 py-2 bg-red-500 shadow-sm"
          >
            Close
          </button>
        ) : (
          <button
            onClick={() => setAdd(true)}
            className="rounded-lg text-white px-4 py-2 bg-blue-500 shadow-sm"
          >
            Add
          </button>
        )}
      </div>
      {add && (
        <TodoForm addTodoItem={addTodoItem} />
      )}
      <div className="grid gap-2">
        {todos.map((todo: TodoClass) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
}
