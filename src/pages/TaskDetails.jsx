import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
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
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: task } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })

      if (!response.ok) throw new Error("Falha ao buscar a tarefa")

      const data = await response.json()

      reset(data)
    },
  })

  const { mutate: updateTask, isPending: isPendingUpdateTask } = useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time.trim(),
          description: data.description.trim(),
        }),
      })

      if (!response.ok) throw new Error()

      const updateTask = response.json()

      queryClient.setQueryData("tasks", (oldTasks) => {
        return oldTasks.map((taskMap) => {
          if (taskMap.id === taskId) return updateTask
          return taskMap
        })
      })
    },
  })

  const { mutate: deleteTask, isPending: isPendingDeleteTask } = useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error()

      const deleteTask = response.json()

      queryClient.setQueryData("tasks", (oldTasks) => {
        return oldTasks.filter((taskFilter) => taskFilter.id !== deleteTask.id)
      })
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso")
      },

      onError: () => {
        toast.error("Falha ao atualizar a tarefa")
      },
    })
  }

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa excluída com sucesso")
        handleBackClick()
      },

      onError: () => {
        toast.error("Falha ao excluir a tarefa")
      },
    })
  }

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })

      if (!response.ok) {
        return toast.error("Falha ao buscar as informações da tarefa")
      }

      const data = await response.json()

      reset(data)
    }

    fetchTask()
  }, [taskId, reset])

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
            disabled={isPendingUpdateTask || isPendingDeleteTask}
            color="danger"
            className="h-fit self-end"
          >
            {(isPendingUpdateTask || isPendingDeleteTask) && (
              <LoaderIcon className="animate-spin" />
            )}
            <TrashIcon /> Deletar Tarefa
          </Button>
        </div>

        <form
          onSubmit={handleSubmit(handleSaveClick)}
          className="space-y-6 rounded-xl bg-brand-white p-6"
        >
          <Input
            id="title"
            label="Título"
            placeholder="Insira o título da tarefa"
            errorMessage={errors?.title?.message}
            disabled={isPendingUpdateTask || isPendingDeleteTask}
            {...register("title", {
              required: "O título é obrigatório",
              validate: (value) => {
                if (!value.trim()) return "O título não pode ser vazio"
                return true
              },
            })}
          />

          <Select
            id="time"
            label="Horário"
            errorMessage={errors?.time?.message}
            disabled={isPendingUpdateTask || isPendingDeleteTask}
            {...register("time", {
              required: "O horário é obrigatório",
              validate: (value) => {
                if (!value.trim()) return "O horário não pode ser vazio"
                return true
              },
            })}
          />

          <Input
            id="description"
            label="Descrição"
            placeholder="Descreva a tarefa"
            errorMessage={errors?.description?.message}
            disabled={isPendingUpdateTask || isPendingDeleteTask}
            {...register("description", {
              required: "A descrição é obrigatória",
              validate: (value) => {
                if (!value.trim()) return "A descrição não pode ser vazia"
                return true
              },
            })}
          />

          <div className="flex w-full justify-end gap-3">
            <Button
              type="submit"
              disabled={isPendingUpdateTask || isPendingDeleteTask}
              size="large"
              color="primary"
            >
              {(isPendingUpdateTask || isPendingDeleteTask) && (
                <LoaderIcon className="animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
