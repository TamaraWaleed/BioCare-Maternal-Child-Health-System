import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status, auth, doctorProfile, nurseProfile, motherProfile }) {
    const isDoctor = auth.user.role === 'doctor';
    const isNurse = auth.user.role === 'nurse';
    const isMother = auth.user.role === 'mother';
    const isLegacy = isDoctor || isNurse || isMother;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Profile</h2>}
            breadcrumbs={[{ label: 'Profile' }]}
        >
            <Head title="Profile" />

            <div className="py-12 bg-office-colorful-bg dark:bg-office-black-bg min-h-screen">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className={isLegacy ? "" : "bg-office-colorful-surface p-4 shadow sm:rounded-lg sm:p-8 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border"}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            doctorProfile={doctorProfile}
                            nurseProfile={nurseProfile}
                            motherProfile={motherProfile}
                            className="w-full text-office-colorful-text dark:text-office-black-text"
                        />
                    </div>

                    {!isLegacy && (
                        <div className="bg-office-colorful-surface p-4 shadow sm:rounded-lg sm:p-8 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <UpdatePasswordForm className="max-w-xl text-office-colorful-text dark:text-office-black-text" />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
