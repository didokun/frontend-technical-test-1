import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import Svg from '../shared/Svg';


type LayoutProps = {
  title: string;
  onlyHeader?: boolean;
}

const Layout: FunctionComponent<LayoutProps> = ({children, title, onlyHeader = false}) => {
  return (
  <>
    <Head>
      <title>leboncoin - {title}</title>
      <link rel="icon" type="image/png" href="/images/favicon.ico" />
    </Head>
    <nav className="bg-white shadow-lg z-50 sticky top-0" role="heading" aria-level={1}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center divide-x divide-orange-600 cursor-pointer">
            <Link href="/" passHref>
              <div className="flex-shrink-0 flex items-center">
                <Svg src="/images/logo.svg" />
              </div>
            </Link>
            <div className="flex ml-5">
              <span className="text-orange-600 px-3 py-2 text-lg font-semibold" aria-label={title}>{title}</span>
            </div>
          </div>
          <a href="#main"><span className='text-sm'>Skip to main content</span></a>
        </div>
      </div>
    </nav>
    <div className="z-1" id="main">
      <div className="block mx-auto py-10 md:w-2/3 w-full h-full">
        <div className={!onlyHeader ? "bg-white rounded shadow-lg" : null}>
        {children}
        </div>
      </div>
    </div>
  </>
  )
}
export default Layout;