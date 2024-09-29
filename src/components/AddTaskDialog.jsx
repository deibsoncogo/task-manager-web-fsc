import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import "./AddTaskDialog.css"
import { Button } from "./Button"
import { Input } from "./Input"
import { Select } from "./Select"

export const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [errors, setErrors] = useState([])

  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()
  const nodeRef = useRef()

  const handleSaveClick = () => {
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
      return
    }

    handleSubmit({
      id: Math.random(),
      title,
      time,
      description,
      status: "notStarted",
    })

    handleClose()
  }

  const titleError = errors.find(({ inputName }) => inputName === "title")
  const timeError = errors.find(({ inputName }) => inputName === "time")

  const descriptionError = errors.find(
    ({ inputName }) => inputName === "description"
  )

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

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                />

                <Select
                  id="time"
                  label="Horário"
                  errorMessage={timeError?.message}
                  ref={timeRef}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                />

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleClose()}
                    variant="secondary"
                    size="large"
                    className="w-full"
                  >
                    Cancelar
                  </Button>

                  <Button
                    size="large"
                    onClick={handleSaveClick}
                    className="w-full"
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}
