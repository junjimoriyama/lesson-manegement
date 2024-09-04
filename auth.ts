import NextAuth from "next-auth";
import github from "next-auth/providers/github"

import GitHubProvider from "next-auth/providers/github";



export const {handlers, signIn, signOut, auth} = NextAuth({
  /* v5 */
  providers: [github],
  /* v4 */
  // providers: [
  //   GitHubProvider({
  //     clientId: process.env.GITHUB_ID,
  //     clientSecret: process.env.GITHUB_SECRET
  //   })
  // ]
  // callbacks: {
  //   async redirect({url, baseUrl}) {
  //     return 'https://lesson-manegement.vercel.app'
  //   }
  // }
})


// providers: [
//   GithubProvider({
//     clientId: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   }),
// ],


// import NextAuth, { NextAuthConfig } from "next-auth"
// import github from "next-auth/providers/github"
// export const config: NextAuthConfig = {
//   providers: [github({
//     clientId: process.env.AUTH_GITHUB_ID,
//     clientSecret: process.env.AUTH_GITHUB_SECRET
//   })],
//   basePath: '/api/auth',
//   callbacks: {
//     authorized({request, auth}) {
//       try {
//         const {pathname} = request.nextUrl
//         if(pathname === '/protected-page') return !!auth
//         return true
//       } catch(err) {
//         console.log(err)
//       }
//     },
//     jwt({token, trigger, session}) {
//       if(trigger === 'update' ) token.name = session.user.name
//       return token
//     }
//   }
// }

// export const {handlers, auth, signIn, signOut} = NextAuth(config)


