import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Followup({ auth, records }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredRecords = (records || []).filter(record => 
        (record.child_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (record.mother_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (record.illness_problem || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (record.treatment || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (record.notes || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (record.date || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Child Follow up</h2>}
            breadcrumbs={[{ label: 'Follow up' }]}
        >
            <Head title="Follow-up" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        {records && records.length > 0 ? (
                            <>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-6 gap-4">
                                    <h3 className="text-lg font-bold text-office-colorful-text dark:text-white uppercase tracking-wider italic flex items-center">
                                        Follow-up Records
                                    </h3>
                                    <div className="relative w-full md:w-64">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-xs" />
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 dark:border-office-black-border rounded-md leading-5 bg-white dark:bg-office-black-bg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-office-colorful-ribbon dark:focus:ring-office-accent focus:border-office-colorful-ribbon dark:focus:border-office-accent sm:text-sm transition-all"
                                            placeholder="Search follow-ups..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {filteredRecords.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm text-left leading-normal">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Date</th>
                                                    <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Child Name</th>
                                                    <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Mother</th>
                                                    <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Illness / Problem</th>
                                                    <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Treatment</th>
                                                    <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                                {filteredRecords.map((record) => (
                                                    <tr key={record.id} className="border-b border-office-colorful-border dark:border-office-black-border hover:bg-office-colorful-bg/30 dark:hover:bg-office-black-bg/30 transition">
                                                        <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{record.date}</td>
                                                        <td className="px-6 py-4 font-bold text-office-colorful-text dark:text-white">{record.child_name}</td>
                                                        <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{record.mother_name}</td>
                                                        <td className="px-6 py-4 text-red-600 dark:text-red-400 font-semibold">{record.illness_problem}</td>
                                                        <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{record.treatment}</td>
                                                        <td className="px-6 py-4 text-office-colorful-subtext dark:text-office-black-subtext">{record.notes}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-office-colorful-subtext dark:text-office-black-subtext">No matching follow-up records found.</p>
                                )}
                            </>
                        ) : (
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No follow-up records found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
