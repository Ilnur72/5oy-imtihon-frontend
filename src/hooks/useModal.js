import React from "react";

export const useModal = (val = false) =>{
    const [isopen, setIsopen] = React.useState(val);
    const open = () => setIsopen(true);
    const toggle = () => setIsopen(!isopen)
    const close = () => setIsopen(false)

    return {isopen, open, toggle, close}
}