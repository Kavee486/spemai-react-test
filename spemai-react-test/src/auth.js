/**
 * Checks if user is authenticated.
 * @returns {boolean} True if auth token is set.
 */
export const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true'
}

/**
 * Sets auth token on login.
 */
export const login = () => {
  localStorage.setItem('auth', 'true')
}

/**
 * Clears auth token on logout.
 */
export const logout = () => {
  localStorage.removeItem('auth')
}
