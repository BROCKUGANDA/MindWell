import { createContext } from 'react';
import { AuthContextType, defaultContext } from './AuthContext.types';

export const AuthContext = createContext<AuthContextType>(defaultContext);
