

import { auth } from '@/auth'
import Image from 'next/image'

import './userAvatar.scss'

export const UserAvatar = async() => {
  
  const session = await auth()

  if (!session?.user) return null;

  console.log(session.user)

  return (
    <div>
      <div className="avatarWrap">
      <Image className='userAvatar' width={30} height={30} src={session.user.image!} alt='UserAvatar' />
      </div>
    </div>
  );
}

// import { auth } from '@/auth'
// import Image from 'next/image'

// import './userAvatar.scss'

// export const UserAvatar = async() => {
  
//   const session = await auth()

//   if (!session?.user) return null;

//   return (
//     <div>
//       <div className="avatarWrap">
//       <Image className='userAvatar' width={30} height={30} src={session.user.image!} alt='UserAvatar' />
//       </div>
//     </div>
//   );
// }
