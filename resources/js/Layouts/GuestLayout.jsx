import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-office-colorful-bg pt-6 sm:justify-center sm:pt-0 dark:bg-office-black-bg" dir="ltr">
            <div className="flex justify-center">
                <Link href="/">
                    <ApplicationLogo vertical={true} />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-office-colorful-surface px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                {children}
            </div>
        </div>
    );
}
