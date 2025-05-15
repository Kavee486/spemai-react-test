import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Todo from './pages/Todo.jsx'
import ProtectedRoute from './ProtectedRoute'

/**
 * Main application component sets up routing.
 * "/" renders Login screen.
 * "/todo" renders ToDo screen with route protection.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
