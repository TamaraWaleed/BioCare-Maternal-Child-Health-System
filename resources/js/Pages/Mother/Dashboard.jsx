import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeartbeat, faBabyCarriage, faExclamationTriangle, faMicroscope,
    faHandsHelping, faCalendarAlt, faSyringe, faWeight,
    faBookMedical, faShieldAlt, faBaby, faBullhorn
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard({ auth, mother, announcements }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Mother Dashboard (Welcome {auth.user.name})</h2>}
            breadcrumbs={[]}
        >
            <Head title="Mother Dashboard" />

            <div className="py-12 bg-office-colorful-bg dark:bg-office-black-bg min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Sidebar Links */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faShieldAlt} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Account Info
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('profile.edit')} className="text-sm text-office-colorful-subtext dark:text-office-black-subtext hover:text-office-colorful-ribbon dark:hover:text-office-accent flex items-center transition">
                                    <FontAwesomeIcon icon={faBaby} className="mr-2 w-4" /> My Profile
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Dashboard Content */}
                    <div className="md:col-span-3">

                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-2">My Children</h3>
                            {mother.children && mother.children.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {mother.children.map((child) => (
                                        <div key={child.id} className="border border-office-colorful-border rounded-lg p-4 hover:shadow-md transition dark:border-office-black-border dark:bg-office-black-bg flex items-center">
                                            <div className="bg-office-colorful-bg p-3 rounded-full mr-4 dark:bg-office-black-bg">
                                                <FontAwesomeIcon icon={faBaby} className="text-office-colorful-ribbon text-xl dark:text-office-accent" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-office-colorful-text dark:text-white">{child.name}</h4>
                                                <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext">DOB: {child.birth_date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-office-colorful-subtext italic dark:text-office-black-subtext">No children registered yet.</p>
                            )}
                        </div>

                        {/* Recent Announcements (Main Area) */}
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-6 mb-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4 flex items-center">
                                <FontAwesomeIcon icon={faBullhorn} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Latest Announcements
                            </h3>
                            {announcements && announcements.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {announcements.map((ad) => (
                                        <div key={ad.id} className="p-4 bg-office-colorful-bg border-l-4 border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-accent">
                                            <h4 className="font-bold text-office-colorful-text dark:text-white">{ad.title}</h4>
                                            <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext mt-2">{ad.content}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-office-colorful-subtext italic dark:text-office-black-subtext">No new announcements from medical staff.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
