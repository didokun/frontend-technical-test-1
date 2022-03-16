import React, { VoidFunctionComponent } from 'react';

type EmptyData = {
  listName : string;
}

const EmptyData: VoidFunctionComponent<EmptyData> = ({listName}) => {
  return (
    <p className="text-center text-red-700 py-10">{listName} list is empty</p>)
}

export default EmptyData;