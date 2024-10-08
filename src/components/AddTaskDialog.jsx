import { useMutation, useQueryClient } from "@tanstack/react-query"
import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"
import { LoaderIcon } from "../assets/icons"
import "./AddTaskDialog.css"
import { Button } from "./Button"
import { Input } from "./Input"
import { Select } from "./Select"

export const AddTaskDialog = ({ isOpen, handleClose }) => {
  const queryClient = useQueryClient()
  const nodeRef = useRef()

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "", time: "morning", description: "" },
  })

  const { mutate } = useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (task) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      })

      if (!response.ok) throw new Error()

      const result = await response.json()

      queryClient.setQueryData("tasks", (oldTasks) => {
        return [...oldTasks, result]
      })

      handleCancelClick()
    },
  })

  const handleSaveClick = async ({ title, time, description }) => {
    const task = {
      id: v4(),
      title: title.trim(),
      time: time.trim(),
      description: description.trim(),
      status: "notStarted",
    }

    mutate(task, {
      onSuccess: () => {
        toast.success("Tarefa criada com sucesso")
      },

      onError: () => {
        toast.error("Falha ao criar a tarefa")
      },
    })
  }

  const handleCancelClick = () => {
    handleClose()
    resetField("title")
    resetField("time")
    resetField("description")
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      unmountOnExit
      classNames="add-task-dialog"
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>

              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={errors?.title?.message}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  {...register("description", {
                    required: "A descrição é obrigatória",
                    validate: (value) => {
                      if (!value.trim()) return "A descrição não pode ser vazia"
                      return true
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handleCancelClick}
                    color="secondary"
                    size="large"
                    className="w-full"
                  >
                    Cancelar
                  </Button>

                  <Button
                    type="submit"
                    size="large"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting && (
                      <LoaderIcon className="mr-2 animate-spin" />
                    )}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}
