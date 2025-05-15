import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Table,
  Container,
  Spinner,
  Modal,
  Button,
  Pagination,
  Navbar,
  Nav,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logout } from '../auth'

/**
 * ToDo page component fetches tasks from API and displays them in a paginated table.
 * Clicking a task opens a modal with details.
 */
export default function Todo() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const todosPerPage = 10
  const navigate = useNavigate()

  // Custom task titles for realistic intern tasks
  const customTasks = [
    'Fix login validation bug',
    'Implement user dashboard UI',
    'Write unit tests for Auth module',
    'Refactor API service functions',
    'Add password visibility toggle',
    'Integrate form validation',
    'Setup GitHub Actions CI',
    'Optimize React performance',
    'Add lazy loading to routes',
    'Convert components to TypeScript',
    'Deploy app to Vercel',
    'Fix responsiveness on mobile view',
    'Improve error handling in API',
    'Create reusable card component',
    'Style buttons with consistent theme',
    'Clean up unused dependencies',
    'Document API endpoints',
    'Add ESLint and Prettier configs',
    'Setup environment variables',
    'Fix broken links in navbar',
    'Design 404 Not Found page',
    'Fix double form submission issue',
    'Show loading spinner on fetch',
    'Implement dark mode toggle',
    'Optimize image assets',
    'Update project README',
    'Resolve merge conflicts',
    'Add unit tests for Login page',
    'Improve accessibility (a11y)',
    'Finish pagination logic',
  ]

  useEffect(() => {
    // Fetch ToDos and replace titles with custom intern tasks
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        const limited = res.data.slice(0, 30).map((todo, index) => ({
          ...todo,
          title: customTasks[index] || todo.title,
        }))
        setTodos(limited)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Calculate ToDos for current page
  const currentTodos = todos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  )

  // Logout handler
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Pagination items generation
  const totalPages = Math.ceil(todos.length / todosPerPage)
  const paginationItems = []
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    )
  }

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Intern ToDo List
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link
            style={{ fontWeight: '600', fontSize: '1.1rem', cursor: 'pointer' }}
            onClick={() => setCurrentPage(1)}
          >
            ToDo
          </Nav.Link>
          <Nav.Link
            style={{ fontWeight: '600', fontSize: '1.1rem', cursor: 'pointer' }}
            onClick={handleLogout}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>

      <Container className="my-4 shadow p-4 rounded bg-white">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status" variant="primary" />
          </div>
        ) : (
          <>
            <Table
              striped
              bordered
              hover
              responsive
              className="align-middle text-center"
              style={{ fontSize: '0.95rem' }}
            >
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Task</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentTodos.map((todo) => (
                  <tr
                    key={todo.id}
                    onClick={() => setSelectedTodo(todo)}
                    style={{ cursor: 'pointer' }}
                    title="Click to view task details"
                  >
                    <td>{todo.id}</td>
                    <td className="text-start">{todo.title}</td>
                    <td>
                      <span
                        className={`badge px-3 py-1 rounded-pill ${
                          todo.completed ? 'bg-success' : 'bg-danger'
                        }`}
                        style={{ fontSize: '0.85rem' }}
                      >
                        {todo.completed ? 'Done' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination className="justify-content-center">
              {paginationItems}
            </Pagination>

            {/* Modal for ToDo details */}
            <Modal
              show={!!selectedTodo}
              onHide={() => setSelectedTodo(null)}
              centered
              size="md"
              backdrop="static"
            >
              <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>Task Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p><strong>ID:</strong> {selectedTodo?.id}</p>
                <p><strong>Task:</strong> {selectedTodo?.title}</p>
                <p><strong>Status:</strong> {selectedTodo?.completed ? 'Done' : 'Pending'}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setSelectedTodo(null)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Container>
    </>
  )
}
