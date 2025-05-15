import { Container, Navbar, Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logout } from '../auth'

/**
 * Header component with navigation links and logout functionality.
 */
export default function Header() {
  const navigate = useNavigate()

  // Handles user logout and redirects to login screen
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* Brand / app title */}
        <Navbar.Brand>Spemai ToDo</Navbar.Brand>

        {/* Navigation links */}
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/todo')}>ToDo</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
