import React, { useEffect, VoidFunctionComponent } from 'react';

import { mergeClassNames } from '../../utils/reactUtils';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import Svg from './Svg';
type AlertType = 'success' | 'error' | 'warning' | 'information'
export type AlertState = {
  open: boolean;
  message: string;
  type: AlertType;
}
type AlertProps = AlertState & {
  closeAlert: () => void;
  interval?: number;
}

const bgColor: Record<AlertType, string> = 
  {
    'warning': '#eab308',
    'success': '#15803d',
    'error': '#dc2626',
    'information': '#0284c7'
  } as const;

const Alert: VoidFunctionComponent<AlertProps> = ({open, message, type, interval = 2000, closeAlert}) => {
  useEffect(() => {
    const timer = setInterval(() => closeAlert(), interval);
    return () => clearInterval(timer);
  }, [open, interval, closeAlert]);

  if(!open) {
    return <></>
  }
  return (<>
    <div className={"flex max-w-sm mb-4 fixed top-2 right-2 z-50 text-white rounded shadow"} style={{backgroundColor: bgColor[type]}}>
      <div className={"w-16"}>
        <div className="p-4 h-20 w-20 fill-current">
          <Svg src={`/images/${type}.svg`}/>
        </div>
      </div>
      <div className="w-auto text-grey-darker items-center p-4">
        <span className="text-lg font-bold pb-4">
          {capitalizeFirstLetter(type)}
        </span>
        <p className="leading-tight">
          {message}
        </p>
      </div>
    </div>
  </>
  )
}

export default Alert;