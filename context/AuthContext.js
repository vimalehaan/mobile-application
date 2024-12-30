import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [clickCount, setClickCount] = useState(0);
    const [username, setUsername] = useState('');

    return (
        <AuthContext.Provider value={{ clickCount, setClickCount, username, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};