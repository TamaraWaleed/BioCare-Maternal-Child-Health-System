import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-office-colorful-bg pt-6 sm:justify-center sm:pt-0 dark:bg-office-black-bg bg-wave-container" dir="ltr">
            <div className="waves-wrapper">
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" />
                    </g>
                </svg>
            </div>
            <div className="flex flex-col items-center content-overlay w-full">
            <div className="flex justify-center">
                <Link href="/">
                    <ApplicationLogo vertical={true} />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-office-colorful-surface px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                {children}
            </div>
            </div>
        </div>
    );
}
