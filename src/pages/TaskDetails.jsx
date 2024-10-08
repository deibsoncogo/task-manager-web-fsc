import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
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
  const [task, setTask] = useState({})
  const { taskId } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useQuery({
    queryKey: "task",
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })

      if (!response.ok) {
        toast.error("Falha ao buscar a tarefa")
        return {}
      }

      const result = await response.json()

      setTask(result)
      reset(result)
    },
  })

  const { mutate: updateTask, isPending: isPendingUpdateTask } = useMutation({
    mutationKey: "updateTask",
    mutationFn: async ({ taskIdUpdate, title, time, description }) => {
      const response = await fetch(
        `http://localhost:3000/tasks/${taskIdUpdate}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: title.trim(),
            time: time.trim(),
            description: description.trim(),
          }),
        }
      )

      if (!response.ok) throw new Error()

      const updateTask = await response.json()

      queryClient.setQueryData("tasks", (oldTasks) => {
        const newTasks = oldTasks.map((taskMap) => {
          if (taskMap.id === taskIdUpdate) return updateTask
          return taskMap
        })

        return newTasks
      })

      setTask(updateTask)
      reset(updateTask)
    },
  })

  const { mutate: deleteTask, isPending: isPendingDeleteTask } = useMutation({
    mutationKey: "deleteTask",
    mutationFn: async (taskIdDelete) => {
      const response = await fetch(
        `http://localhost:3000/tasks/${taskIdDelete}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) throw new Error()

      queryClient.setQueryData("tasks", (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== taskIdDelete)
      })

      handleBackClick()
    },
  })

  const handleBackClick = () => {
    navigate("/")
  }

  const handleSaveClick = async (data) => {
    const preData = { taskIdUpdate: taskId, ...data }

    updateTask(preData, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso")
      },

      onError: () => {
        toast.error("Falha ao atualizar a tarefa")
      },
    })
  }

  const handleDeleteClick = async () => {
    deleteTask(taskId, {
      onSuccess: () => {
        toast.success("Tarefa excluída com sucesso")
      },

      onError: () => {
        toast.error("Falha ao excluir a tarefa")
      },
    })
  }

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
