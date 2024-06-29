import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const MyCounter = () => {
    const [count, setCount] = React.useState(0);
    
    React.useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1);
        }, 1000);

        return () => clearInterval(id);
    }, [])

    return count
}
// export function useCounter(delay) {
//     const [count, setCount] = React.useState(0);
//     React.useEffect(() => {
//         const id = setInterval(() => {
//             setCount(c => c + 1);
//         }, delay);

//         return () => clearInterval(id);
//     }, [delay]);

//     return count;
// }