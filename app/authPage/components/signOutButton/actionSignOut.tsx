'use server'

import {signOut} from '@/auth'

export const handleSignOut = async() => {
  console.log('signOut function:', signOut); 
  await signOut({ redirectTo: '/authPage' }); 
}
