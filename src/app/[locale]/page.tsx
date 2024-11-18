'use server';

import ProtectedRoute from "@/app/components/ProtectedRoute";
import Home from "@/app/components/Pages/Home";
export default async function HomePage() {

    return (
        <ProtectedRoute>
            <Home></Home>
        </ProtectedRoute>
    );
}
