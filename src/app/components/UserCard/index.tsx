import { useUser } from '@/app/(root)/dashboardWrapper'
import { User } from '@/app/types'
import Image from 'next/image'
import Link from 'next/link'

type UserCardProps = {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  const { username, email, _id, imageUrl } = user
  const { user: currentUser } = useUser()

  return (
    <li className="flex justify-between bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* LEFT SIDE */}
      <div className="flex gap-5 items-center">
        <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-200">
          <Image
            src={imageUrl || '/images/dinosaur-bones.png'}
            fill
            alt={username}
            className="rounded-full object-cover"
            quality={90}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-xl text-gray-800">{username}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-center gap-3">
        <Link
          href={`/users/${_id}`}
          className="w-full text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          View Profile
        </Link>
        {_id !== currentUser?._id && (
          <Link
            href={`/trade/${_id}`}
            className="w-full text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out"
          >
            Start a Trade
          </Link>
        )}
      </div>
    </li>
  )
}

export default UserCard
