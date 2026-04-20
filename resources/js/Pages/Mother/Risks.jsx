import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Risks({ auth, obstetrical, current }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Risks & History</h2>}
            breadcrumbs={[{ label: 'Risks & History' }]}
        >
            <Head title="Risks" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Obstetrical Risks (Historical) */}
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4">Medical & Obstetrical History Risk</h3>
                        {obstetrical ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(obstetrical).map(([key, value]) => {
                                    if (['id', 'mother_user_id', 'created_at', 'updated_at', 'date_of_test'].includes(key)) return null;
                                    const isRisk = value === 'yes';
                                    return (
                                        <div key={key} className={`p-3 rounded border transition ${isRisk ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : 'bg-office-colorful-bg border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border'}`}>
                                            <span className="text-[10px] uppercase text-office-colorful-subtext block dark:text-office-black-subtext">{key.replace(/_/g, ' ')}</span>
                                            <span className={`font-semibold ${isRisk ? 'text-red-700 dark:text-red-400' : 'text-office-colorful-text dark:text-office-black-text'}`}>{value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No obstetrical risk assessment found.</p>
                        )}
                    </div>

                    {/* Current Pregnancy Risks */}
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4">Current Pregnancy Risks History</h3>
                        {current && current.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Date</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Gestational Age</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Assessment</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Identified Risks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                        {current.map((record) => {
                                            const activeRisks = Object.entries(record)
                                                .filter(([key, value]) => key.startsWith('q') && value === 'yes')
                                                .map(([key]) => key);

                                            return (
                                                <tr key={record.id} className="border-b border-office-colorful-border dark:border-office-black-border hover:bg-office-colorful-bg/30 dark:hover:bg-office-black-bg/30 transition">
                                                    <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{record.date_of_visit}</td>
                                                    <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{record.gestational_age}</td>
                                                    <td className="px-6 py-4 text-office-colorful-subtext dark:text-office-black-text">{record.who_perform_assessment}</td>
                                                    <td className="px-6 py-4">
                                                        {activeRisks.length > 0 ? (
                                                            <span className="text-red-600 font-bold dark:text-red-400">{activeRisks.length} Risk Signs Present</span>
                                                        ) : (
                                                            <span className="text-office-colorful-ribbon font-semibold dark:text-office-accent">No specific risks</span>
                                                        )}
                                                        {record.others && <div className="text-xs text-office-colorful-subtext mt-1 dark:text-office-black-subtext">Note: {record.others}</div>}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No current pregnancy risk assessments found.</p>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
