'use client';

import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/lib/hooks';
import Effectiveness from "@/app/components/Form/Evaluations/Effectiveness";
import Risk from "@/app/components/Form/Evaluations/Risk";
import Team from "@/app/components/Form/Evaluations/Team";

export default function Home() {
    const user = useAppSelector((state) => state.auth.user);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            evaluation: {
                effectiveness: {
                    sum: ['', '', '', '', ''],
                    min: ['', '', '', '', ''],
                    max: ['', '', '', '', ''],
                    desired: ['', '', '', '', ''],
                    weight: ['', '', '', '', ''],
                },
            },
        },
    });

    const onSubmit = (data: any) => {
        console.log(data);
        alert('Form submitted successfully!');
    };

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
                Welcome {user ? user.name : 'Guest'}!
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Effectiveness register={register} />
                <Risk register={register} />
                <Team register={register} />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
                >
                    Submit Evaluation
                </button>
            </form>
        </div>
    );
}
