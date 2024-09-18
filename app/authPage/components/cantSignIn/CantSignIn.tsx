'use client'

// hooks
import { useEffect } from "react"
// function
import { signIn } from "next-auth/react"

export const CantSignIn = () => {


  useEffect(() => {
    const fetchSession = async() => {
      const session = await signIn()
      {!session && <p>
        サインインできません
      </p>}
    }
    fetchSession()
  }, [])


  return (
    <div>CantSignIn</div>
  )
}


