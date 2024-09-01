import './header.scss'
import { UserAvatar } from '../authPage/components/UserAvatar'
import { SignOutButton } from '../authPage/components/signOutButton/SignOutButton'
import { Price } from './price/Price'

export const Header = () => {
  return (
    <header>
      <UserAvatar/>
      <SignOutButton/>
    </header>
  )
}
