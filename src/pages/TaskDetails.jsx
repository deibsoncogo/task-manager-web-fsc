import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { Sidebar } from "../components/Sidebar"

export const TaskDetails = () => {
  const { taskId } = useParams()

  const [task, setTask] = useState({})
  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async () => {
    setSaveIsLoading(true)

    const newErrors = []

    const title = titleRef.current.value
    const time = timeRef.current.value
    const description = descriptionRef.current.value

    if (!title.trim()) {
      newErrors.push({ inputName: "title", message: "O título é obrigatório" })
    }

    if (!time.trim()) {
      newErrors.push({ inputName: "time", message: "O horário é obrigatório" })
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória",
      })
    }

    setErrors(newErrors)

    if (newErrors.length > 0) {
      return setSaveIsLoading(false)
    }

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, time, description }),
    })

    setSaveIsLoading(false)

    if (!response.ok) {
      return toast.error("Erro ao alterar a tarefa, tente novamente")
    }

    const newTask = await response.json()

    setTask(newTask)

    toast.success("Tarefa salva com sucesso")
  }

  const handleDeleteClick = async () => {
    setSaveIsLoading(true)

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })

    setSaveIsLoading(false)

    if (!response.ok) {
      return toast.error("Erro ao excluir a tarefa, tente novamente")
    }

    toast.success("Tarefa excluída com sucesso")

    navigate(-1)
  }

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })

      const data = await response.json()

      setTask(data)
    }

    fetchTask()
  }, [taskId])

  const titleError = errors.find(({ inputName }) => inputName === "title")
  const timeError = errors.find(({ inputName }) => inputName === "time")

  const descriptionError = errors.find(
    ({ inputName }) => inputName === "description"
  )

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              type="button"
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex items-center gap-1 text-xs">
              <Link to="/" className="text-brand-text-gray">
                Minhas tarefas
              </Link>

              <ChevronRightIcon className="text-brand-text-gray" />

              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            type="button"
            onClick={handleDeleteClick}
            disabled={saveIsLoading}
            color="danger"
            className="h-fit self-end"
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            <TrashIcon /> Deletar Tarefa
          </Button>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <Input
            id="title"
            label="Título"
            placeholder="Insira o título da tarefa"
            errorMessage={titleError?.message}
            defaultValue={task?.title}
            ref={titleRef}
            disabled={saveIsLoading}
          />

          <Select
            id="time"
            label="Horário"
            errorMessage={timeError?.message}
            defaultValue={task?.time}
            ref={timeRef}
            disabled={saveIsLoading}
          />

          <Input
            id="description"
            label="Descrição"
            placeholder="Descreva a tarefa"
            errorMessage={descriptionError?.message}
            defaultValue={task?.description}
            ref={descriptionRef}
            disabled={saveIsLoading}
          />
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button
            onClick={handleSaveClick}
            disabled={saveIsLoading}
            size="large"
            color="primary"
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
