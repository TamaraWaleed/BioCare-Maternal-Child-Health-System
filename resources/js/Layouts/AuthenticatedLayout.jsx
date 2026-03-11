import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt, faMoon, faSun,
    faUser, faSignOutAlt, faChevronDown, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';

export default function AuthenticatedLayout({ header, children, breadcrumbs }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Theme Logic
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        if (flash.success || flash.error) {
            Swal.fire({
                title: flash.success ? 'Success!' : 'Error!',
                text: flash.success || flash.error,
                icon: flash.success ? 'success' : 'error',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                background: theme === 'dark' ? '#2b2b2b' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
                iconColor: flash.success ? '#107c10' : '#d11010',
            });
        }
    }, [flash, theme]);

    return (
        <div className="min-h-screen bg-office-colorful-bg text-office-colorful-text dark:bg-office-black-bg dark:text-office-black-text transition-colors duration-300">
            <nav className="sticky top-0 z-40 border-b border-office-colorful-border bg-office-colorful-surface dark:border-office-black-border dark:bg-office-black-surface transition-colors duration-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={route('dashboard')}>
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-office-colorful-ribbon dark:text-white" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-office-colorful-text dark:text-office-black-text hover:text-office-colorful-ribbon dark:hover:text-white flex items-center"
                                >
                                    <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">

                            {/* Theme Toggle Button (Desktop) */}
                            <button
                                onClick={toggleTheme}
                                className="mr-4 rounded-full p-2 text-office-colorful-ribbon dark:text-office-accent hover:bg-office-colorful-bg dark:hover:bg-office-black-bg transition-colors"
                                title="Toggle Theme"
                            >
                                <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className="w-5 h-5" />
                            </button>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-office-surface px-3 py-2 text-sm font-medium leading-4 text-office-colorful-subtext transition duration-150 ease-in-out hover:text-office-colorful-text focus:outline-none dark:bg-office-black-surface dark:text-office-black-subtext dark:hover:text-white"
                                            >
                                                {user.name}

                                                <FontAwesomeIcon icon={faChevronDown} className="ms-2 h-3 w-3" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center">
                                            <FontAwesomeIcon icon={faUser} className="mr-2 w-4" />
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center">
                                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 w-4" />
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-office-colorful-subtext transition duration-150 ease-in-out hover:bg-office-colorful-bg hover:text-office-colorful-text focus:outline-none dark:text-office-black-subtext dark:hover:bg-office-black-bg dark:hover:text-white"
                            >
                                <FontAwesomeIcon
                                    icon={showingNavigationDropdown ? faTimes : faBars}
                                    className="h-6 w-6"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="text-office-colorful-text dark:text-office-black-text flex items-center"
                        >
                            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-office-colorful-border pb-1 pt-4 dark:border-office-black-border">
                        <div className="px-4 flex justify-between items-center">
                            <div>
                                <div className="text-base font-medium text-office-colorful-text dark:text-office-black-text">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-office-colorful-subtext dark:text-office-black-subtext">
                                    {user.email}
                                </div>
                            </div>

                            {/* Theme Toggle (Mobile) */}
                            <button
                                onClick={toggleTheme}
                                className="rounded-full p-2 text-office-colorful-ribbon dark:text-office-accent hover:bg-office-colorful-bg dark:hover:bg-office-black-bg transition-colors"
                            >
                                <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="flex items-center">
                                <FontAwesomeIcon icon={faUser} className="mr-2 w-4" />
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="flex items-center">
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 w-4" />
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {
                header && (
                    <header className="sticky top-16 z-30 bg-office-colorful-surface shadow-sm border-b border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border transition-colors duration-300">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <Breadcrumbs items={breadcrumbs} />
                            {header}
                        </div>
                    </header>
                )
            }

            <main className="transition-colors duration-300">{children}</main>

        </div>
    );
}
