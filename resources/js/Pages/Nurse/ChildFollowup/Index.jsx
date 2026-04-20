import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faPlusCircle, faBaby, faCalendarAlt, faStethoscope, faUserDoctor } from '@fortawesome/free-solid-svg-icons';

export default function Index({ auth, records }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight flex items-center">
                    <FontAwesomeIcon icon={faClipboardCheck} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                    Child Follow-up & Referrals
                </h2>
            }
            breadcrumbs={[{ label: 'Child Follow-up' }]}
        >
            <Head title="Child Follow-up" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white flex items-center">
                                <FontAwesomeIcon icon={faClipboardCheck} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Follow-up Records
                            </h3>
                            <Link
                                href={route('nurse.child-followup.create')}
                                className="px-4 py-2 bg-office-colorful-ribbon text-white rounded-md hover:opacity-90 transition font-bold flex items-center shadow-md dark:bg-office-accent"
                            >
                                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                                Add Follow-up
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">
                                            <FontAwesomeIcon icon={faBaby} className="mr-2" />
                                            Child
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                            Date
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">
                                            <FontAwesomeIcon icon={faStethoscope} className="mr-2" />
                                            Problem
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">
                                            <FontAwesomeIcon icon={faUserDoctor} className="mr-2" />
                                            Doctor
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                    {records.data.map((record) => (
                                        <tr key={record.id} className="hover:bg-office-colorful-bg/50 dark:hover:bg-office-black-bg/50 transition">
                                            <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                <p className="text-office-colorful-text font-semibold dark:text-white">{record.child?.name || `Child #${record.child_id}`}</p>
                                                <p className="text-office-colorful-subtext text-xs dark:text-office-black-subtext">Mother: {record.child?.mother?.name || 'Unknown'}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text">{new Date(record.date).toLocaleDateString()}</td>
                                            <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text">{record.illness_problem}</td>
                                            <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-subtext dark:text-office-black-subtext">{record.doctor?.name || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Links */}
                        <div className="mt-6 flex justify-center gap-2">
                            {records.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 border rounded-md transition font-medium text-sm ${link.active ? 'bg-office-colorful-ribbon text-white border-office-colorful-ribbon dark:bg-office-accent dark:border-office-accent' : 'bg-office-colorful-surface text-office-colorful-text border-office-colorful-border hover:bg-office-colorful-bg dark:bg-office-black-surface dark:text-office-black-text dark:border-office-black-border dark:hover:bg-office-black-bg'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
