import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../auth'
import { Form, Button, Alert, Card } from 'react-bootstrap'

/**
 * Login page component with simple hardcoded validation.
 * On success, sets auth flag and navigates to ToDo page.
 */
export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // Validate credentials (hardcoded)
    if (user === 'admin' && pass === 'admin') {
      login()           // Set localStorage auth flag
      navigate('/todo') // Redirect to ToDo page
    } else {
      setError('Invalid username or password') // Show error message
    }
  }

  return (
    <>
      {/* Fullscreen gradient background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to right, #667eea, #764ba2)',
          zIndex: -1,
        }}
      />

      {/* Centered card container */}
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
        }}
      >
        {/* Login form card */}
        <Card
          className="shadow-lg p-4"
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
          }}
        >
          <h2 className="text-center mb-4 text-primary fw-bold">Login</h2>

          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                autoComplete="username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 py-2 fw-semibold"
              style={{
                background: 'linear-gradient(to right, #667eea, #764ba2)',
                border: 'none',
                fontSize: '1rem',
              }}
            >
              Log In
            </Button>
          </Form>
        </Card>
      </div>
    </>
  )
}
