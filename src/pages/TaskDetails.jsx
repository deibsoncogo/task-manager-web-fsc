import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const TaskDetails = () => {
  const { taskId } = useParams()

  const [task, setTask] = useState({})

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
    <div>
      <h1>{task.title}</h1>
      <h2>{task.time}</h2>
      <h2>{task.description}</h2>
    </div>
  )
}
