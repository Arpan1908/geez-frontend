import { useState } from "react"
import { useSession } from "next-auth/react"
import { catchAsync } from "@/errors/async"

const domain = process.env.BACKEND_DOMAIN

export const useHttp = () => {
  const { accessToken } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const httpRequest = async (url, method = 'get', body = null) => {
    setIsLoading(true)
    const response = await fetch(`${domain}${url}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? `Bearer ${accessToken}` : null
      }
    })
    setIsLoading(false)
    const { success, message, data } = await response.json()
    if (!success) throw new Error(message)
    return [message, data]
  }
  return [httpRequest, isLoading]
}

export const authenticateToBackend = async (param, body) => {
  try {
    const response = await fetch(`${domain}/users/${param}`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
    const { success, message, data } = await response.json()
    if (!success) throw new Error(message)
    return data.token
  } catch (error) {
    console.error(error)
  }
}