import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Fake auth — swap for real API calls
  const login = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const u = { name: email.split('@')[0], email, role: 'member', joinedAt: new Date().toISOString() }
          setUser(u)
          resolve(u)
        } else {
          reject(new Error('Credenciales inválidas. Verifica tu correo y contraseña.'))
        }
      }, 800)
    })
  }

  const register = ({ nombre, email, password, carrera, ciclo }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 6) { reject(new Error('La contraseña debe tener al menos 6 caracteres.')); return }
        const u = { name: nombre, email, role: 'member', carrera, ciclo, joinedAt: new Date().toISOString() }
        setUser(u)
        resolve(u)
      }, 900)
    })
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
