import React from "react";

export const useInput = (schema) => {
    const [ value, setValue ] = React.useState(schema)

    return{
        value,
        change: (e) => setValue({...value, [e.target.name]: e.target.value})
    };
};