import React, { useState } from 'react';

import { ApiResponse } from '../../services/performClientCall';
import Alert, { AlertState } from '../shared/Alert';
import ConfirmationModal from '../shared/ConfirmationModal';
import Svg from '../shared/Svg';

type DeleteButtonProps<T> = {
  apiCallback: () => Promise<ApiResponse<T | unknown>>;
  successCallback: () => void;
  iconSize: number;
  buttonClassName: string;
}

const DeleteButton = <T extends object>({apiCallback, iconSize, successCallback, buttonClassName}: DeleteButtonProps<T>) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [showAlert, setAlert] = useState<AlertState>({open: false, message: '', type: 'success'});
  return (
  <>
    <ConfirmationModal 
      isOpen={isModalOpen}
      closeModal={() => setModalOpen(false)}
      confirmationMessage="Are you sure to delete this conversation ?"
      agreeButtonTitle='Yes'
      refuseButtonTitle='No'
      agreeAction={async () => {
        const {error, data} = await apiCallback();
        if(!error && data) {
          setAlert({open: true, message: 'Deleted with success !', type: 'success'});
          successCallback();
        } else {
            setAlert({open: true, message: error.toString(), type: 'error'});
            setModalOpen(false);
        }
      }}
    />
    <Alert {...showAlert} closeAlert={() => setAlert({...showAlert, open:false})} />
    <button 
      type="button"
      className={buttonClassName}
      style={{width: `${iconSize+10}px`, height: `${iconSize+10}px`}}
      onClick={() => setModalOpen(true)}>
        <span style={{width: `${iconSize}px`, height: `${iconSize}px`}}>
        <Svg src="/images/delete.svg" />
      </span>
    </button>
  </>
)
}

export default DeleteButton;