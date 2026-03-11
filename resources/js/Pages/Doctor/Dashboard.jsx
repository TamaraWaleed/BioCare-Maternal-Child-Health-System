import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserNurse, faUserMd, faBaby, faWeight, faWalking,
    faCalendarAlt, faSearch, faEye, faHospital, faSignOutAlt, faUser
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard({ auth, mothers }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Doctor Dashboard (Welcome {auth.user.name})</h2>}
            breadcrumbs={[]}
        >
            <Head title="Doctor Dashboard" />

            <div className="py-12 bg-office-colorful-bg dark:bg-office-black-bg min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faHospital} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Menu
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('profile.edit')} className="text-sm text-office-colorful-subtext dark:text-office-black-subtext hover:text-office-colorful-ribbon dark:hover:text-office-accent flex items-center transition">
                                    <FontAwesomeIcon icon={faUser} className="mr-2 w-4" /> Profile
                                </Link>
                                <Link href={route('doctor.search')} className="text-sm text-office-colorful-subtext dark:text-office-black-subtext hover:text-office-colorful-ribbon dark:hover:text-office-accent flex items-center transition">
                                    <FontAwesomeIcon icon={faSearch} className="mr-2 w-4" /> Search Records
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

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-office-colorful-text dark:text-white">Registered Mothers & Children</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Mother</th>
                                            <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Children</th>
                                            <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                        {mothers && mothers.data && mothers.data.map((mother) => (
                                            <tr key={mother.id}>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                    <p className="text-office-colorful-text font-semibold dark:text-white">{mother.name}</p>
                                                    <p className="text-office-colorful-subtext text-xs dark:text-office-black-subtext">{mother.email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                    {mother.children && mother.children.length > 0 ? (
                                                        <div className="flex flex-wrap gap-1">
                                                            {mother.children.map(child => (
                                                                <span key={child.id} className="bg-office-colorful-bg text-office-colorful-ribbon text-xs px-2 py-1 rounded-full dark:bg-office-black-bg dark:text-office-accent">{child.name}</span>
                                                            ))}
                                                        </div>
                                                    ) : <span className="text-office-colorful-subtext text-xs dark:text-office-black-subtext">No children</span>}
                                                </td>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                    <Link
                                                        href={route('doctor.patients.show', mother.id)}
                                                        className="text-office-colorful-ribbon dark:text-office-accent hover:underline flex items-center font-bold"
                                                    >
                                                        <FontAwesomeIcon icon={faEye} className="mr-1" /> View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
