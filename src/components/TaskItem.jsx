import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons"
import { Button } from "./Button"

export const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
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

          {task.status === "inProgress" && <LoaderIcon />}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={() => handleDeleteClick(task.id)} color="ghost">
          <TrashIcon className="text-brand-text-gray" />
        </Button>

        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}
