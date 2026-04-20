import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function FamilyPlanning({ auth, records }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Family Planning</h2>}
            breadcrumbs={[{ label: 'Family Planning' }]}
        >
            <Head title="Family Planning" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        {records && records.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Method</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Questions/Notes</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Date Recorded</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                        {records.map((record) => (
                                            <tr key={record.id} className="border-b border-office-colorful-border dark:border-office-black-border hover:bg-office-colorful-bg/50 dark:hover:bg-office-black-bg/50 transition">
                                                <td className="px-6 py-4 font-bold text-office-colorful-text dark:text-white">{record.family_planning_method || 'Not Specified'}</td>
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">
                                                    <ul className="list-disc list-inside">
                                                        {record.q1 && <li>{record.q1}</li>}
                                                        {record.q2 && <li>{record.q2}</li>}
                                                        {record.q3 && <li>{record.q3}</li>}
                                                    </ul>
                                                </td>
                                                <td className="px-6 py-4 text-office-colorful-subtext dark:text-office-black-subtext">{new Date(record.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No family planning records found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
