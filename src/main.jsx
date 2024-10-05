import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import { TaskDetails } from "./pages/TaskDetails.jsx"
import { Toaster } from "sonner"

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/task/:taskId", element: <TaskDetails /> },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster toastOptions={{ style: { color: "#35383E" } }} />
    <RouterProvider router={router} />
  </StrictMode>
)
