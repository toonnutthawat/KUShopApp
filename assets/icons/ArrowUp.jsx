import * as React from "react"
import Svg, { Path } from "react-native-svg";

const ArrowUp = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" {...props}>
        <Path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15" stroke="currentColor" strokeWidth={props.strokeWidth} stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
);

export default ArrowUp;