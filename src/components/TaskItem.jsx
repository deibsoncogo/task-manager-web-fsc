import PropTypes from "prop-types"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons"
import { Button } from "./Button"

export const TaskItem = ({ task, handleCheckboxClick, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true)

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "delete",
    })

    setDeleteIsLoading(false)

    if (!response.ok) {
      return toast.error("Erro ao deletar a tarefa, tente novamente")
    }

    onDeleteSuccess(task.id)
  }

  const getVariantClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary text-brand-primary"
    }

    if (task.status === "inProgress") {
      return "bg-brand-process text-brand-process"
    }

    if (task.status === "notStarted") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue"
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getVariantClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getVariantClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            onChange={() => handleCheckboxClick(task.id)}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />

          {task.status === "done" && <CheckIcon />}

          {task.status === "inProgress" && (
            <LoaderIcon className="text-brand-white" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/task/${task.id}`} className="transition hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["notStarted", "inProgress", "done"]).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
}
