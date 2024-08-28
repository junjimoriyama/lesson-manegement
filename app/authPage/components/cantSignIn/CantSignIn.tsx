'use client'

import { signIn } from "next-auth/react"
import { useEffect } from "react"

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


