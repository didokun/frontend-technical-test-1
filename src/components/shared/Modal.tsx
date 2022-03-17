import React, { Dispatch, FunctionComponent, ReactNode, SetStateAction } from 'react';

import Svg from './Svg';

export type ModalProps = {
  isOpen:  boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  title: string;
}

const Modal: FunctionComponent<ModalProps> = ({isOpen, closeModal, title, children}) => {
  if(!isOpen) {
    return <></>;
  }
  return (
    <>
    <div className="flex items-center justify-center left-0 bottom-0 w-full h-full bg-gray-800 fixed z-50">
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4 divide-y">
          <div className="flex items-center w-full divider">
            <div className="text-gray-900 font-medium text-lg">{title}</div>
            <span className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" onClick={() => closeModal(true)}>
              <Svg src="/images/close.svg" />
            </span>
          </div>
          <div className='flex items-center w-full divider'>{children}</div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Modal;