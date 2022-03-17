import React, { VoidFunctionComponent } from 'react';

import Modal, { ModalProps } from './Modal';

type ConfirmationModalProps = Pick<ModalProps, "isOpen" | "closeModal"> & {
  confirmationMessage: string;
  agreeButtonTitle: string;
  agreeAction: () => void;
  refuseButtonTitle: string;
};

const ConfirmationModal: VoidFunctionComponent<ConfirmationModalProps> = ({isOpen, closeModal, agreeAction, agreeButtonTitle, refuseButtonTitle, confirmationMessage}) => {
  return (
    <>
    <Modal title='Confirmation' isOpen={isOpen} closeModal={closeModal}>
      <div className='flex flex-col w-full'>
        <div className='my-2'>{confirmationMessage}</div>
        <div className="ml-auto">
          <button onClick={() => agreeAction()} className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {agreeButtonTitle}
          </button>
          <button onClick={() => closeModal(true)} className="mx-1 bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            {refuseButtonTitle}
          </button>
        </div>
      </div>
    </Modal>
    </>
  )
}

export default ConfirmationModal;