import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser, faBaby } from '@fortawesome/free-solid-svg-icons';

export default function Show({ auth, mother }) {
    const profile = mother.mother_profile || {};
    const children = mother.children || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Patient Details</h2>}
            breadcrumbs={[{ label: 'Registered Mothers & Children' }]}
        >
            <Head title="Patient Details" />

            <div className="py-12 bg-office-colorful-bg dark:bg-office-black-bg min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    <div className="flex justify-start">
                        <Link
                            href={route('doctor.dashboard')}
                            className="bg-office-colorful-ribbon hover:bg-office-colorful-ribbon/90 text-white font-bold py-2 px-4 rounded-full shadow transition flex items-center gap-2 text-xs uppercase tracking-widest"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
                        </Link>
                    </div>

                    {/* Mother Information Table */}
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-6 uppercase tracking-wider border-b pb-2 italic flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                            Mother Information
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-center">
                                <thead>
                                    <tr className="bg-[#f0f7fa] dark:bg-office-black-bg">
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">MomID</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">MomName</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">MomBirthDate</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">Phone</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">City</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">BloodType</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">RhFactor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-[#eef2f7] dark:bg-office-black-surface">
                                        <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                            <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border font-mono">{mother.id}</div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                            <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border">{mother.name}</div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                            <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border">{profile.birth_date || 'N/A'}</div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                            <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border">{profile.phone || 'N/A'}</div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                            <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border">{profile.city || 'N/A'}</div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                            <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border">{profile.blood_group || 'N/A'}</div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                            <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border">{profile.rh_factor || 'N/A'}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Children Information Table */}
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <h3 className="text-lg font-bold text-office-colorful-info dark:text-office-accent mb-6 uppercase tracking-wider border-b pb-2 italic flex items-center">
                            <FontAwesomeIcon icon={faBaby} className="mr-2 text-office-colorful-info dark:text-office-accent" />
                            Children Information
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-center">
                                <thead>
                                    <tr className="bg-[#f0f7fa] dark:bg-office-black-bg">
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">ChildSerialNum</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">ChildName</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">ChildBirthDate</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">MomID</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">Sex</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {children.length > 0 ? children.map((child, index) => (
                                        <tr key={child.id} className="bg-[#eef2f7] dark:bg-office-black-surface">
                                            <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border font-mono">{child.id}</div>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border">{child.name}</div>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border">{child.birth_date}</div>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border font-mono">{mother.id}</div>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border capitalize">{child.sex}</div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-5 py-5 border-b border-gray-200 text-sm text-center italic text-gray-500 bg-white dark:bg-office-black-bg dark:border-office-black-border">
                                                No children registered.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
