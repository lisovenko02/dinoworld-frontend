import { User } from '@/app/types/User'
import Image from 'next/image'

type UserCardProps = {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  const { username, firstName } = user

  return (
    <li className="flex justify-between bg-gray-100 border-2 rounded-md p-5 items-center">
      {/* LEFT SIDE */}
      <div className="flex gap-5">
        <Image
          src="/images/dinosaur-bones.png"
          width={50}
          height={50}
          alt={username}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-xl">{username}</h2>
          <p className="text-lg">{firstName}</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <button className="button-offer">Exchange offer</button>
      </div>
    </li>
  )
}

export default UserCard
