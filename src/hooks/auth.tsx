import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react'
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getAuthErrorMessageFromErrorCode} from "@helpers/errorsFirebaseAuth";

type User = {
  id: string
  name: string
  isAdmin: boolean
}

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  signOut: () => Promise<void>
  isLogging: boolean
  user: User | null
}

type AuthProviderProps = {
  children: ReactNode
}

const USER_COLLECTION = '@gopizza:user'

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o email e senha')
    }

    setIsLogging(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        

        firestore()
          .collection('users')
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User

            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin
              }

              await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData))
              setUser(userData)
            }
          }).catch(() => Alert.alert('Login', 'Não foi possivel buscar os dados de login do usuario'))
      })
      .catch((error) => getAuthErrorMessageFromErrorCode(error.code))
      .finally(() => setIsLogging(false))
  }

  async function loadUserStorageData() {
    setIsLogging(true)

    const storagedUser = await AsyncStorage.getItem(USER_COLLECTION)

    if (storagedUser) {
      const userData = JSON.parse(storagedUser) as User
      setUser(userData)
    }

   
    setIsLogging(false)
  }

  async function signOut() {
    await auth().signOut()
    await AsyncStorage.removeItem(USER_COLLECTION)
    setUser(null)
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Redefinição de senha', 'Informe o email')
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Redefinição de senha', 'Enviamos um link no seu email para redefinir sua senha'))
      .catch((error) => getAuthErrorMessageFromErrorCode(error.code))
  }

  useEffect(() => {
    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLogging,
        signIn,
        user,
        signOut,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    return null
  }

  return context
}


