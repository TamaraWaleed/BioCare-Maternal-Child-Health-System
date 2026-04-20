import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active
                    ? 'border-office-colorful-ribbon bg-office-colorful-bg text-office-colorful-ribbon focus:border-office-colorful-ribbon focus:bg-office-colorful-border focus:text-office-colorful-text dark:border-office-accent dark:bg-office-black-bg dark:text-office-accent dark:focus:border-white dark:focus:bg-office-black-surface dark:focus:text-white'
                    : 'border-transparent text-office-colorful-subtext hover:border-office-colorful-border hover:bg-office-colorful-bg hover:text-office-colorful-text focus:border-office-colorful-border focus:bg-office-colorful-bg focus:text-office-colorful-text dark:text-office-black-subtext dark:hover:border-office-black-border dark:hover:bg-office-black-bg dark:hover:text-white dark:focus:border-office-black-border dark:focus:bg-office-black-bg dark:focus:text-white'
                } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
