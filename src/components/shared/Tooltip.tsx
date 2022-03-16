import React, { FunctionComponent } from 'react';

import Svg from './Svg';

type TooltipProps = {
  innerText: string;
}

const Tooltip: FunctionComponent<TooltipProps> = ({innerText, children}) => {
  return (<div className="group relative cursor-pointer z-50">
    <div className="hidden group-hover:block absolute my-1 mx-auto w-max -top-8 inset-x-0">
      <div className="bg-orange-500 text-white text-xs rounded  py-1 px-4 right-0 bottom-full">
        {innerText}
        <span className="absolute w-4 h-4 inset-x-0	mx-auto -bottom-2 fill-orange-500">
          <Svg src="/images/arrow-down.svg" />
        </span>
      </div>
    </div>
    {children}
  </div>
  )
}

export default Tooltip;