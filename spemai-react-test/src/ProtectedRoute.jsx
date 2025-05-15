import { Navigate } from 'react-router-dom'
import { isAuthenticated } from './auth'

/**
 * Protects routes by checking auth.
 * Redirects to login if user not authenticated.
 */
export default function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />
}
