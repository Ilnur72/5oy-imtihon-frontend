import React from "react";

export const  useDebonunce = (value, delay = 500) => {
    const [debonunceValue, setDebonunceValuec] = React.useState(value);

    React.useEffect(() => {
        const handle = setTimeout(() => {
            setDebonunceValuec(value)
        }, delay)

        return () => {
            clearTimeout(handle)
        }
    }, [value, delay]);

    return debonunceValue

}