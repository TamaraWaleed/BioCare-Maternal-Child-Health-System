import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Postnatal({ auth, records }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Postnatal History</h2>}
            breadcrumbs={[{ label: 'Postnatal History' }]}
        >
            <Head title="Postnatal Exams" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        {records && records.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {records.map((exam) => (
                                    <div key={exam.id} className="border border-office-colorful-border rounded-lg p-4 hover:shadow-md transition bg-office-colorful-bg/30 dark:bg-office-black-bg/50 dark:border-office-black-border">
                                        <div className="flex justify-between mb-2">
                                            <h4 className="font-bold text-office-colorful-text dark:text-white">Date: {exam.date_of_visit}</h4>
                                            <span className="text-sm bg-office-colorful-bg text-office-colorful-ribbon px-2 py-0.5 rounded dark:bg-office-black-bg dark:text-office-accent">
                                                {exam.days_after_delivery} Days Post-Partum
                                            </span>
                                        </div>
                                        <hr className="border-office-colorful-border dark:border-office-black-border mb-2" />
                                        <div className="text-sm space-y-1">
                                            <div className="grid grid-cols-2">
                                                <span className="text-office-colorful-subtext dark:text-office-black-subtext">BP:</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{exam.bp || '-'}</span>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <span className="text-office-colorful-subtext dark:text-office-black-subtext">Pulse:</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{exam.pulse || '-'}</span>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <span className="text-office-colorful-subtext dark:text-office-black-subtext">Temp:</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{exam.temperature || '-'}</span>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <span className="text-office-colorful-subtext dark:text-office-black-subtext">Lochia:</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{exam.lochia_colour || '-'}</span>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <span className="text-office-colorful-subtext dark:text-office-black-subtext">Condition:</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{exam.assessment_status || 'Normal'}</span>
                                            </div>
                                        </div>
                                        {exam.recommendations && (
                                            <div className="mt-3 p-2 bg-office-colorful-surface rounded text-sm text-office-colorful-subtext italic border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border dark:text-office-black-subtext">
                                                "{exam.recommendations}"
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No postnatal examination records found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
