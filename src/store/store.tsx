import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SharedState {
    count: number | null;
    setCount: (count: number | null ) => void;
}

const SharedStateContext = createContext<SharedState | undefined>(undefined);

export const SharedStateProvider = ({ children } : { children: ReactNode}) => {
    const [count, setCount] = useState<number | null>(0);

    return (
        <SharedStateContext.Provider value={{ count , setCount}} >
            {children}
        </SharedStateContext.Provider>
    );
};

export const useShareState = (): SharedState => {
    const context = useContext(SharedStateContext);
    if(!context) {
        throw new Error("useSharedState must be used within SharedStateProvider");
    }
    return context;
}