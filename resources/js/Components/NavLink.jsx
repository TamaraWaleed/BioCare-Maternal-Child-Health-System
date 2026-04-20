import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-office-colorful-ribbon text-office-colorful-text focus:border-office-colorful-ribbon dark:border-office-accent dark:text-white'
                    : 'border-transparent text-office-colorful-subtext hover:border-office-colorful-border hover:text-office-colorful-text focus:border-office-colorful-border focus:text-office-colorful-text dark:text-office-black-subtext dark:hover:border-office-black-border dark:hover:text-white dark:focus:border-office-black-border dark:focus:text-white') +
                className
            }
        >
            {children}
        </Link>
    );
}
