import { useSpring,animated } from "@react-spring/web"
import React from "react"

export default function SlideDown(Component) {

    const propsSpring = useSpring({
        from:{
            marginTop: '-100px'
        },
        to: {
            marginTop: '0px'
        },
        config:{
            duration: 500
        }
    })


  return (
    <div>
        <animated.div style={propsSpring}>
            <Component />
        </animated.div>
    </div>
  )
}
