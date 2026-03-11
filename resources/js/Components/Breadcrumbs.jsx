import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Breadcrumbs({ items = [] }) {
    // Always show at least the Dashboard link as the home


    return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center text-sm font-medium text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-white transition"
                    >
                        <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-2" />
                        Dashboard
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-office-colorful-border dark:text-office-black-border mx-1" />
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="ml-1 text-sm font-medium text-office-colorful-subtext hover:text-office-colorful-ribbon md:ml-2 dark:text-office-black-subtext dark:hover:text-white transition"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="ml-1 text-sm font-medium text-office-colorful-text opacity-70 md:ml-2 dark:text-office-black-text">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
