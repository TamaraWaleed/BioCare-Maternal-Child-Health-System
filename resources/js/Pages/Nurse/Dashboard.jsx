import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser, faUsersCog, faCommentMedical, faBullhorn,
    faBaby, faStethoscope, faUserShield, faSyringe, faClipboardCheck,
    faFemale, faBabyCarriage, faHistory, faExclamationTriangle,
    faMicroscope, faHeartbeat, faHandsHelping,
    faUsers, faUserDoctor, faVenus, faShieldAlt, faCalendarAlt, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard({ auth, usersCount, doctorsCount, mothersCount }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Nurse Dashboard (Welcome {auth.user.name})</h2>}
            breadcrumbs={[]}
        >
            <Head title="Nurse Dashboard" />

            <div className="py-12 min-h-screen bg-office-colorful-bg dark:bg-office-black-bg">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Sidebar / Quick Menu */}
                    <div className="md:col-span-1 space-y-6">

                        {/* Admin & User Info Group */}
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faShieldAlt} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Admin Info
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('profile.edit')} className="text-sm text-office-colorful-subtext dark:text-office-black-subtext hover:text-office-colorful-ribbon dark:hover:text-office-accent flex items-center transition">
                                    <FontAwesomeIcon icon={faUser} className="mr-2 w-4" /> Profile Info
                                </Link>
                                <Link href={route('nurse.users.index')} className="text-sm text-office-colorful-subtext dark:text-office-black-subtext hover:text-office-colorful-ribbon dark:hover:text-office-accent flex items-center transition">
                                    <FontAwesomeIcon icon={faUsersCog} className="mr-2 w-4" /> Manage Users
                                </Link>
                                <Link href={route('nurse.announcements.index')} className="text-sm text-office-colorful-subtext dark:text-office-black-subtext hover:text-office-colorful-ribbon dark:hover:text-office-accent flex items-center transition">
                                    <FontAwesomeIcon icon={faBullhorn} className="mr-2 w-4" /> Create Ads
                                </Link>
                                <Link
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                    className="text-sm text-office-colorful-subtext dark:text-office-black-subtext hover:text-red-500 dark:hover:text-red-400 flex items-center transition w-full text-left"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 w-4" /> Logout
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area (Stats) */}
                    <div className="md:col-span-3">
                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4">Dashboard Overview</h3>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-office-colorful-bg overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border flex items-center justify-between">
                                    <div>
                                        <div className="text-office-colorful-ribbon text-sm uppercase font-bold tracking-wider dark:text-office-accent">Total Users</div>
                                        <div className="text-3xl font-extrabold text-office-colorful-text dark:text-white mt-2">{usersCount}</div>
                                    </div>
                                    <FontAwesomeIcon icon={faUsers} className="text-4xl text-office-colorful-ribbon/20 dark:text-office-accent/20" />
                                </div>
                                <div className="bg-office-colorful-bg overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border flex items-center justify-between">
                                    <div>
                                        <div className="text-office-colorful-ribbon text-sm uppercase font-bold tracking-wider dark:text-office-accent">Doctors</div>
                                        <div className="text-3xl font-extrabold text-office-colorful-text dark:text-white mt-2">{doctorsCount}</div>
                                    </div>
                                    <FontAwesomeIcon icon={faUserDoctor} className="text-4xl text-office-colorful-ribbon/20 dark:text-office-accent/20" />
                                </div>
                                <div className="bg-office-colorful-bg overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border flex items-center justify-between">
                                    <div>
                                        <div className="text-office-colorful-ribbon text-sm uppercase font-bold tracking-wider dark:text-office-accent">Mothers</div>
                                        <div className="text-3xl font-extrabold text-office-colorful-text dark:text-white mt-2">{mothersCount}</div>
                                    </div>
                                    <FontAwesomeIcon icon={faVenus} className="text-4xl text-office-colorful-ribbon/20 dark:text-office-accent/20" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4">Quick Shortcuts</h3>
                            <div className="flex gap-4">
                                <Link
                                    href={route('nurse.users.index')}
                                    className="px-4 py-2 bg-office-colorful-ribbon text-white rounded-md hover:bg-office-colorful-ribbon/90 dark:bg-office-accent dark:hover:bg-office-accent/90 transition shadow-sm font-bold text-sm"
                                >
                                    Manage Users
                                </Link>
                                <Link
                                    href={route('nurse.announcements.index')}
                                    className="px-4 py-2 bg-white text-office-colorful-ribbon border border-office-colorful-ribbon rounded-md hover:bg-office-colorful-bg dark:bg-office-black-surface dark:text-office-accent dark:border-office-accent transition shadow-sm font-bold text-sm"
                                >
                                    Create Announcement
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
