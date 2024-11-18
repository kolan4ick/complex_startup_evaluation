'use server';

import Login from "@/app/components/Users/Login";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default async function LoginPage() {
    return <ProtectedRoute reverse={true}>
        <Login></Login>
    </ProtectedRoute>;
}
