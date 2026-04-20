import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Dashboard</h2>}
            breadcrumbs={[]}
        >
            <Head title="Dashboard" />

            <div className="py-12 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-office-colorful-surface shadow-sm sm:rounded-lg border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <div className="p-6 text-office-colorful-text dark:text-office-black-text">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
