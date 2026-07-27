import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorageUtils';

export function useLocalStorage(key) {
    const [value, setValue] = useState(() => {
        return getLocalStorage(key)
    });

    useEffect(() => {
        setLocalStorage(key, value)
    }, [key, value]);

    return [value, setValue];
}