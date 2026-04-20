import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Vaccinations({ auth, children }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Vaccination Schedule</h2>}
            breadcrumbs={[{ label: 'Vaccinations' }]}
        >
            <Head title="Vaccinations" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {children && children.length > 0 ? (
                        children.map((child) => (
                            <div key={child.id} className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                                <h3 className="text-xl font-bold text-office-colorful-ribbon mb-4 flex items-center gap-2 dark:text-office-accent">
                                    <span className="bg-office-colorful-bg p-1 rounded dark:bg-office-black-bg">👶</span>
                                    {child.name}
                                    <span className="text-sm font-normal text-office-colorful-subtext ml-2 dark:text-office-black-subtext">(DOB: {child.birth_date})</span>
                                </h3>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Vaccination History */}
                                    <div>
                                        <h4 className="font-bold text-office-colorful-text mb-3 border-b border-office-colorful-border pb-2 dark:text-white dark:border-office-black-border">School Vaccination Program History</h4>
                                        {child.school_vaccinations && child.school_vaccinations.length > 0 ? (
                                            <ul className="space-y-3">
                                                {child.school_vaccinations.map((vac) => (
                                                    <li key={vac.id} className="flex justify-between items-center bg-office-colorful-bg p-3 rounded hover:bg-office-colorful-border transition dark:bg-office-black-bg dark:hover:bg-office-black-bg/80">
                                                        <div>
                                                            <p className="font-bold text-office-colorful-text dark:text-office-black-text">{vac.vaccine_name}</p>
                                                            <p className="text-xs text-office-colorful-subtext dark:text-office-black-subtext">Given on: {vac.visit_date} {vac.vaccinator_name ? `by ${vac.vaccinator_name}` : ''}</p>
                                                        </div>
                                                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-bold dark:bg-green-900/30 dark:text-green-400">Done</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-office-colorful-subtext italic text-sm dark:text-office-black-subtext">No school vaccinations recorded yet.</p>
                                        )}
                                    </div>

                                    {/* Preventive Exams */}
                                    <div>
                                        <h4 className="font-bold text-office-colorful-text mb-3 border-b border-office-colorful-border pb-2 dark:text-white dark:border-office-black-border">Preventive Examinations</h4>
                                        {child.preventive_exams && child.preventive_exams.length > 0 ? (
                                            <ul className="space-y-3">
                                                {child.preventive_exams.map((exam) => (
                                                    <li key={exam.id} className="bg-orange-50 p-3 rounded border border-orange-100 dark:bg-orange-900/10 dark:border-orange-900/30">
                                                        <div className="flex justify-between">
                                                            <span className="font-bold text-orange-900 dark:text-orange-400">{exam.examination_name}</span>
                                                            <span className="text-xs text-office-colorful-subtext dark:text-office-black-subtext">{exam.visit_date}</span>
                                                        </div>
                                                        {exam.result && (
                                                            <p className="text-sm text-office-colorful-text mt-1 dark:text-office-black-text">Findings: {exam.result}</p>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-office-colorful-subtext italic text-sm dark:text-office-black-subtext">No specific preventive exams recorded.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No children registered yet.</p>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
