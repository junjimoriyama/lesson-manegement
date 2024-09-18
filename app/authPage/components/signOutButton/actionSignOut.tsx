'use server'

// function
import {signOut} from '@/auth'

export const handleSignOut = async() => {
  await signOut({ redirectTo: '/authPage' }); 
}
