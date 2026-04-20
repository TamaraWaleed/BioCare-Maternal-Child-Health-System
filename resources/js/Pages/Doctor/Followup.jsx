import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Followup({ auth, records }) {
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
                                        {records.map((record) => (
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
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No follow-up records found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
