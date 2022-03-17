import React, { VoidFunctionComponent } from 'react';

import { User } from '../../types/user';
import EmptyData from '../shared/EmptyData';
import UserLogin from './UserLogin';

type LoginProps = {
  users: User[];
}

const Login: VoidFunctionComponent<LoginProps> = ({users}) => {
  return (
  <>
    <div className="relative flex flex-col sm:justify-center items-center ">
      <div className="relative sm:max-w-sm w-full">
        <div className="card sm:block hidden bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
        <div className="card sm:block hidden bg-orange-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
        <div className="relative w-full sm:rounded-3xl  px-6 py-4 bg-white shadow-md">
          <label aria-label="Login" htmlFor="username" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
            Login
          </label>
          <div className="max-w-2xl mx-auto mt-5">
            <div className="p-4 max-w-md">
              <div className="flow-root">
                {users?.length  ?  (
                <ul role="list" className={"divide-y divide-gray-200 h-72 flex flex-col p-3 overflow-y-auto scroll-bar-custom"}  tabIndex={0}>
                  {users.map(user => <UserLogin key={user.id} user={user}/>)}
                </ul>
                ): (<EmptyData listName='Users'/>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)
}

export default Login;