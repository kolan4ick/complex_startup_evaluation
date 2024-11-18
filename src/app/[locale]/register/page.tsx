'use server';

import Register from "@/app/components/Users/Register";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default async function RegisterPage() {
    return <ProtectedRoute reverse={true}>
        <Register></Register>
    </ProtectedRoute>;
}
