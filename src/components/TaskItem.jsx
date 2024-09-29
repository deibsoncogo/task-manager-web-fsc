import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons"
import { Button } from "./Button"

export const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
  const getVariantClasses = () => {
    if (task.status === "done") {
      return "bg-[#00adb5] text-[#00adb5]"
    }

    if (task.status === "inProgress") {
      return "bg-[#ffaa04] text-[#ffaa04]"
    }

    if (task.status === "notStarted") {
      return "bg-[#35383e] bg-opacity-10 text-[#35383e]"
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
        <Button onClick={() => handleDeleteClick(task.id)} variant="ghost">
          <TrashIcon className="text-[#9a9c9f]" />
        </Button>

        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}
