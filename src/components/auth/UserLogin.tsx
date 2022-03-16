import Image from 'next/image';
import Link from 'next/link';
import React, { VoidFunctionComponent } from 'react';

import { User } from '../../types/user';

type UserLoginProps = {
  user: User;
}

const UserLogin: VoidFunctionComponent<UserLoginProps> = ({user}) => {
  return (
  <>
    <li>
      <Link href={{pathname: '/conversations', query: { senderId: user.id }}} passHref>
        <div className="flex items-center space-x-4 hover:bg-orange-300 p-3 sm:py-4 cursor-pointer">
          <div className="flex-shrink-0">
            <Image className="w-10 sm:w-16 h-10 sm:h-16 rounded-full z-1" src="/images/profile.jpg" height="32" width="32" alt="Profile Picture" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user.nickname}
            </p>
          </div>
        </div>
      </Link>
    </li>
  </>
)
}

export default UserLogin;