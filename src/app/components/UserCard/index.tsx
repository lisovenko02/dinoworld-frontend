import { useUser } from '@/app/(root)/dashboardWrapper'
import { User } from '@/app/types'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

type UserCardProps = {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  const { username, email, _id, imageUrl } = user
  const { user: currentUser } = useUser()

  const isTabletOrDesktop = useMediaQuery({ minWidth: 500 })

  return (
    <li className="flex justify-between bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* LEFT SIDE */}
      <div className="flex gap-5 items-center">
        <Link
          href={`/users/${_id}`}
          className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-200"
        >
          <Image
            src={imageUrl || '/images/dinosaur-bones.png'}
            fill
            alt={username}
            className="rounded-full object-cover"
            quality={90}
          />
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/users/${_id}`}
            className="font-bold text-xl text-gray-800"
          >
            {username}
          </Link>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      {isTabletOrDesktop && (
        <div className="flex flex-col items-center gap-3">
          <Link
            href={`/users/${_id}`}
            className="w-full text-center text-white py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            View Profile
          </Link>
          {currentUser && _id !== currentUser?._id && (
            <Link
              href={`/trade/${_id}`}
              className="w-full text-center text-white py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 transition duration-200 ease-in-out"
            >
              Start a Trade
            </Link>
          )}
        </div>
      )}
    </li>
  )
}

export default UserCard
