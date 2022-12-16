import React from "react"
import { createRoot } from "react-dom/client"

import "./index.css"

import TodoApp from "./components/TodoApp"

createRoot(document.getElementById("root")).render(<TodoApp />)
