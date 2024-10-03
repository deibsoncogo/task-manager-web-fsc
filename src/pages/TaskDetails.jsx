import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "../assets/icons"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { Sidebar } from "../components/Sidebar"

export const TaskDetails = () => {
  const { taskId } = useParams()

  const [task, setTask] = useState({})

  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "get",
      })

      const data = await response.json()

      setTask(data)
    }

    fetchTasks()
  }, [taskId])

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
              <button
                onClick={handleBackClick}
                className="text-brand-text-gray"
              >
                Minhas tarefas
              </button>

              <ChevronRightIcon className="text-brand-text-gray" />

              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button color="danger" className="h-fit self-end">
            <TrashIcon /> Deletar Tarefa
          </Button>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <Input
            id="title"
            label="Título"
            placeholder="Insira o título da tarefa"
            value={task?.title}
          />

          <Select id="time" label="Horário" value={task?.time} />

          <Input
            id="description"
            label="Descrição"
            placeholder="Descreva a tarefa"
            value={task?.description}
          />
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary">
            Cancelar
          </Button>

          <Button size="large" color="primary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
