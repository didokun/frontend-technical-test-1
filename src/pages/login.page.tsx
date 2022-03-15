import { InferGetStaticPropsType } from 'next';
import React, { FunctionComponent } from 'react';

import Layout from '../components/layout/Layout';

export const getStaticProps = async () => {

  return {
    props: {},
  }
}
const LoginPage: FunctionComponent<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({
}) => {
  return <>
  <Layout title={"Login"} onlyHeader>
      <div className="font-sans">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center ">
          <div className="relative sm:max-w-sm w-full">
            <div className="card sm:block hidden bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
            <div className="card sm:block hidden bg-orange-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
            <div className="relative w-full sm:rounded-3xl  px-6 py-4 bg-white shadow-md">
              <label htmlFor="username" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                Login
              </label>
              <form method="#" action="#" className="mt-10">
                <div>
                  <input type="email" name="username" placeholder="Username" className="pl-4 mt-1 block w-full border-none h-11 rounded-xl shadow-lg" />
                </div>
                <div className="mt-7">                
                  <input type="password" placeholder="Password" className="pl-4 mt-1 block w-full border-none h-11 rounded-xl shadow-lg" />                           
                </div>
                <div className="mt-7 flex">
                  <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                    <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me!
                    </span>
                  </label>
                  <div className="w-full text-right">     
                    <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                      Forgot password?
                    </a>                                  
                  </div>
                </div>
                <div className="mt-7">
                  <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Login
                  </button>
                </div>
                <div className="mt-7">
                  <div className="flex justify-center items-center">
                    <label className="mr-2">Not a member ?</label>
                    <a href="#" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      Sign up
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </Layout>
  </>
}

export default LoginPage;