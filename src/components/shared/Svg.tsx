import React, { VoidFunctionComponent } from 'react';
import { ReactSVG, Props } from 'react-svg'

type SvgProps = Pick<Props, "src" | "wrapper" | "useRequestCache" | "loading" | "beforeInjection" | "afterInjection">;
const Svg: VoidFunctionComponent<SvgProps> = (props) => {
  return (<ReactSVG {...props}/>)
}

export default Svg;