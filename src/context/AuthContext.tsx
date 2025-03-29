
// This file is now just a re-export of the refactored auth components
// It's kept for backwards compatibility
import { AuthProvider as Provider, useAuth as useAuthHook } from "./auth";

export const AuthProvider = Provider;
export const useAuth = useAuthHook;

export default { AuthProvider, useAuth };
