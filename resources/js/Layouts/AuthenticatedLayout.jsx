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
    faTachometerAlt, faComments, faBell, faMoon, faSun,
    faUser, faSignOutAlt, faChevronDown, faBars, faTimes,
    faEnvelope
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

    // Unread Message Logic
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const fetchUnreadData = async () => {
        try {
            // Fetch Count
            const countResponse = await axios.get(route('chatbot.unread-count'));
            const newCount = countResponse.data.count;

            // Session persistence check (user-specific)
            const storageKey = `lastNotifiedCount_${user.id}`;
            const lastNotifiedCount = parseInt(sessionStorage.getItem(storageKey) || '0');

            if (newCount > lastNotifiedCount && !route().current('chatbot.index')) {
                Swal.fire({
                    title: 'New Message!',
                    text: `You have ${newCount} unread message${newCount > 1 ? 's' : ''}.`,
                    icon: 'info',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    background: theme === 'dark' ? '#2b2b2b' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#000',
                });
                sessionStorage.setItem(storageKey, newCount.toString());
            } else if (newCount < lastNotifiedCount) {
                // If count decreased (messages read), update the session storage
                sessionStorage.setItem(storageKey, newCount.toString());
            }

            setUnreadCount(newCount);

            // Fetch Recent Notifications
            if (newCount > 0) {
                const notificationsResponse = await axios.get(route('chatbot.recent-notifications'));
                setNotifications(notificationsResponse.data.notifications);
            } else {
                setNotifications([]);
            }
        } catch (error) {
            console.error('Error fetching unread data:', error);
        }
    };

    const handleNotificationClick = async (notif) => {
        try {
            await axios.post(route('chatbot.mark-as-read', notif.id));
            // Fetch fresh count to update UI immediately
            fetchUnreadData();
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    useEffect(() => {
        fetchUnreadData();
        const interval = setInterval(fetchUnreadData, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, [theme]); // Removed unreadCount to avoid unnecessary effect restarts

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
        <div className="min-h-screen bg-office-colorful-bg text-office-colorful-text dark:bg-office-black-bg dark:text-office-black-text transition-colors duration-300 bg-wave-container">
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
            <div className="content-overlay">
                <nav className="sticky top-0 z-40 border-b border-office-colorful-border bg-office-colorful-surface dark:border-office-black-border dark:bg-office-black-surface transition-colors duration-300">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex shrink-0 items-center">
                                    <Link href="/">
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
                                    {user.role === 'mother' && (
                                        <NavLink
                                            href={route('chatbot.index')}
                                            active={route().current('chatbot.index')}
                                            className="text-office-colorful-text dark:text-office-black-text hover:text-office-colorful-ribbon dark:hover:text-white flex items-center"
                                        >
                                            <FontAwesomeIcon icon={faComments} className="mr-2" />
                                            ChatBot
                                        </NavLink>
                                    )}
                                </div>
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center">

                                {/* Notification Icon */}
                                {/* Notification Dropdown */}
                                <div className="relative mr-2">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                className="rounded-full p-2 text-office-colorful-subtext hover:bg-office-colorful-bg hover:text-office-colorful-text focus:outline-none dark:text-office-black-subtext dark:hover:bg-office-black-bg dark:hover:text-office-black-text relative transition-colors"
                                                title="Notifications"
                                            >
                                                <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
                                                {unreadCount > 0 && (
                                                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-office-colorful-surface dark:ring-office-black-surface">
                                                        {unreadCount > 99 ? '99+' : unreadCount}
                                                    </span>
                                                )}
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content align="right" width="96" contentClasses="py-1 bg-office-colorful-surface dark:bg-office-black-surface border border-office-colorful-border dark:border-office-black-border shadow-xl">
                                            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-office-colorful-subtext dark:text-office-black-subtext border-b border-office-colorful-border dark:border-office-black-border">
                                                Unread Notifications
                                            </div>
                                            <div className="max-h-64 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="p-4 text-center text-sm text-office-colorful-subtext dark:text-office-black-subtext">
                                                        No new Notifications
                                                    </div>
                                                ) : (
                                                    notifications.map((notif) => {
                                                        let targetUrl = notif.url;

                                                        // Ensure role-specific safe navigation
                                                        if (user.role === 'admin') {
                                                            if (targetUrl && (targetUrl.includes('/doctor/') || targetUrl.includes('/mother/') || targetUrl.includes('/nurse/'))) {
                                                                const match = targetUrl.match(/\/(?:patients|mothers)\/(\d+)/);
                                                                if (match && match[1]) {
                                                                    targetUrl = route('admin.mothers.show', match[1]);
                                                                } else {
                                                                    targetUrl = '#';
                                                                }
                                                            }
                                                        } else if (user.role === 'doctor') {
                                                            if (targetUrl && (targetUrl.includes('/admin/') || targetUrl.includes('/mother/') || targetUrl.includes('/nurse/'))) {
                                                                targetUrl = '#';
                                                            }
                                                        } else if (user.role === 'nurse') {
                                                            if (targetUrl && (targetUrl.includes('/admin/') || targetUrl.includes('/mother/') || targetUrl.includes('/doctor/'))) {
                                                                targetUrl = '#';
                                                            }
                                                        } else if (user.role === 'mother') {
                                                            if (targetUrl && (targetUrl.includes('/admin/') || targetUrl.includes('/doctor/') || targetUrl.includes('/nurse/'))) {
                                                                targetUrl = route('chatbot.index');
                                                            }
                                                        }

                                                        if (!targetUrl) {
                                                            targetUrl = user.role === 'mother' ? route('chatbot.index') : '#';
                                                        }

                                                        const itemContent = (
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 mr-3">
                                                                    <div className="h-8 w-8 rounded-full bg-office-colorful-ribbon dark:bg-office-accent flex items-center justify-center text-white font-bold text-xs">
                                                                        {(notif.sender_name || 'System').charAt(0).toUpperCase()}
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <span className="font-bold text-sm text-office-colorful-text dark:text-white">
                                                                            {notif.sender_name || 'System'}
                                                                        </span>
                                                                        <span className="text-[10px] text-office-colorful-subtext dark:text-office-black-subtext">
                                                                            {notif.created_at}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-xs text-office-colorful-subtext dark:text-office-black-subtext line-clamp-1 italic">
                                                                        "{notif.content}"
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );

                                                        if (targetUrl === '#') {
                                                            return (
                                                                <button
                                                                    key={notif.id}
                                                                    onClick={() => handleNotificationClick(notif)}
                                                                    className="w-full text-left block px-4 py-3 hover:bg-office-colorful-bg dark:hover:bg-office-black-bg transition border-b border-office-colorful-border dark:border-office-black-border last:border-0"
                                                                >
                                                                    {itemContent}
                                                                </button>
                                                            );
                                                        }

                                                        return (
                                                            <Link
                                                                key={notif.id}
                                                                href={targetUrl}
                                                                onClick={() => handleNotificationClick(notif)}
                                                                className="block px-4 py-3 hover:bg-office-colorful-bg dark:hover:bg-office-black-bg transition border-b border-office-colorful-border dark:border-office-black-border last:border-0"
                                                            >
                                                                {itemContent}
                                                            </Link>
                                                        );
                                                    })
                                                )}
                                            </div>

                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>

                                {/* Theme Toggle Button (Desktop) */}
                                <button
                                    onClick={toggleTheme}
                                    className="mr-4 rounded-full p-2 text-office-colorful-subtext hover:bg-office-colorful-bg hover:text-office-colorful-text focus:outline-none dark:text-office-black-subtext dark:hover:bg-office-black-bg dark:hover:text-office-black-text font-bold transition-colors"
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
                                            <Dropdown.Link
                                                href={route('profile.edit')}
                                                className="text-office-colorful-text dark:text-office-black-text hover:bg-office-colorful-bg dark:hover:bg-office-black-bg flex items-center"
                                            >
                                                <FontAwesomeIcon icon={faUser} className="mr-2 w-4" />
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="w-full text-left text-office-colorful-text dark:text-office-black-text hover:bg-office-colorful-bg dark:hover:bg-office-black-bg flex items-center"
                                            >
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
                            {user.role === 'mother' && (
                                <ResponsiveNavLink
                                    href={route('chatbot.index')}
                                    active={route().current('chatbot.index')}
                                    className="text-office-colorful-text dark:text-office-black-text flex items-center"
                                >
                                    <FontAwesomeIcon icon={faComments} className="mr-2" />
                                    Chat
                                </ResponsiveNavLink>
                            )}
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
                                {/* Notification Icon (Mobile) */}
                                <button
                                    className="mr-2 rounded-full p-2 text-office-colorful-subtext hover:bg-office-colorful-bg focus:outline-none dark:text-office-black-subtext dark:hover:bg-office-black-bg relative transition-colors"
                                    onClick={() => {
                                        if (user.role === 'mother') {
                                            window.location.href = route('chatbot.index');
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-office-colorful-surface dark:ring-office-black-surface">
                                            {unreadCount > 99 ? '99+' : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Theme Toggle (Mobile) */}
                                <button
                                    onClick={toggleTheme}
                                    className="rounded-full p-2 text-office-colorful-subtext hover:bg-office-colorful-bg focus:outline-none dark:text-office-black-subtext dark:hover:bg-office-black-bg transition-colors"
                                >
                                    <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')} className="text-office-colorful-text dark:text-office-black-text flex items-center">
                                    <FontAwesomeIcon icon={faUser} className="mr-2 w-4" />
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                    className="text-office-colorful-text dark:text-office-black-text flex items-center"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 w-4" />
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="sticky top-16 z-30 bg-office-colorful-surface shadow-sm border-b border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border transition-colors duration-300">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <Breadcrumbs items={breadcrumbs} />
                            {header}
                        </div>
                    </header>
                )}

                <main className="transition-colors duration-300">{children}</main>
            </div>
        </div>
    );
}
