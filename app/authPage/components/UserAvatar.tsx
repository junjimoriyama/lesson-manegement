// "use server"

import { auth } from '@/auth'
import Image from 'next/image'

export const UserAvatar = async() => {
  
  const session = await auth()

  if (!session?.user) return null;

  return (
    <div>
      <Image width={40} height={40} src={session.user.image!} alt='UserAvatar' />
    </div>
  );
}
// "use client"

// import { auth } from '@/auth'
// import { Session } from 'next-auth'
// import Image from 'next/image'
// import { useEffect, useState } from 'react'

// export const UserAvatar = () => {
//   const [session, setSession] = useState<Session | null>(null);
  
//   useEffect(() => {
//     const fetchSession = async() => {
//       const session = await auth()
//       setSession(session)
//     }
//     fetchSession()
//   }, [])

//     if (!session?.user) return null;

//   return (
//     <div>
//       <Image width={40} height={40} src={session.user.image!} alt='UserAvatar' />
//     </div>
//   );
// }

// 'use client';

// import { useSession } from 'next-auth/react';
// import Image from 'next/image';

// export const UserAvatar = () => {
//   const { data: session, status } = useSession();

//   if (status === 'loading') {
//     return <p>Loading...</p>; // セッション情報が読み込まれるまでローディング表示
//   }

//   if (!session?.user) return null; // セッションがない場合は何も表示しない

//   return (
//     <div>
//       <Image width={40} height={40} src={session.user.image!} alt='UserAvatar' />
//     </div>
//   );
// };

