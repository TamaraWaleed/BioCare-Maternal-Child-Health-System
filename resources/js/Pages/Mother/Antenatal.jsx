import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Antenatal({ auth, records }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Antenatal Records</h2>}
            breadcrumbs={[{ label: 'Antenatal Records' }]}
        >
            <Head title="Antenatal History" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        {records && records.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Date</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Gestation</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Weight (kg)</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">BP (mmHg)</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Urine</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">FHS</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Oedema</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Supplements</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Next Visit</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Remarks</th>
                                            <th className="px-6 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Doctor</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                        {records.map((appointment) => (
                                            <tr key={appointment.id} className="border-b border-office-colorful-border dark:border-office-black-border hover:bg-office-colorful-bg/50 dark:hover:bg-office-black-bg/50 transition">
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{appointment.appointment_date}</td>
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{appointment.antenatal_record?.gestational_age_size || '-'}</td>
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{appointment.antenatal_record?.weight || '-'}</td>
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{appointment.antenatal_record?.blood_pressure || '-'}</td>
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">
                                                    {appointment.antenatal_record?.urine_alb ? `Alb: ${appointment.antenatal_record.urine_alb}` : ''}
                                                    {appointment.antenatal_record?.urine_sug ? ` Sug: ${appointment.antenatal_record.urine_sug}` : ''}
                                                </td>
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{appointment.antenatal_record?.fetal_heartbeat || '-'}</td>
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{appointment.antenatal_record?.oedema || '-'}</td>
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{appointment.antenatal_record?.supplements || '-'}</td>
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">{appointment.antenatal_record?.next_visit || '-'}</td>
                                                <td className="px-6 py-4 text-office-colorful-subtext dark:text-office-black-subtext">
                                                    {appointment.antenatal_record?.complaint_management || appointment.antenatal_record?.remarks || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-office-colorful-text dark:text-office-black-text">
                                                    {appointment.doctor ? appointment.doctor.name : 'Unknown'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No antenatal records found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
