'use client'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'
import {User} from "@/lib/types/User";
import {setUser, setToken} from "@/lib/features/users/usersSlice";


export default function StoreProvider({children, user, token}: {
    children: React.ReactNode,
    user: User | null,
    token: string | null
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore();
        storeRef.current.dispatch(setUser(user));
        storeRef.current.dispatch(setToken(token));
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}