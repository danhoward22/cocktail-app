import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorageUtils';

export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        return getLocalStorage(key,defaultValue)
    });

    useEffect(() => {
        setLocalStorage(key, value)
    }, [key, value]);

    return [value, setValue];
}