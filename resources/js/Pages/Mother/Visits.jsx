import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Visits({ auth, appointments }) {
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const openDetails = (apt) => {
        if (apt.status === 'completed') {
            setSelectedAppointment(apt);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Coming Visits</h2>}
            breadcrumbs={[{ label: 'Coming Visits' }]}
        >
            <Head title="Visits" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">

                        <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4">Appointments</h3>
                        <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext mb-6 italic">Click on a completed appointment to view details.</p>

                        {appointments && appointments.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {appointments.map((apt) => (
                                    <div
                                        key={apt.id}
                                        onClick={() => openDetails(apt)}
                                        className={`p-4 border rounded-lg flex justify-between items-center transition ${apt.status === 'completed' ? 'bg-office-colorful-bg border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border cursor-pointer hover:shadow-md' : 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800 opacity-80'}`}
                                    >
                                        <div>
                                            <p className="font-bold text-office-colorful-text dark:text-office-black-text">{new Date(apt.appointment_date).toDateString()}</p>
                                            <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext">{apt.notes || 'Routine Checkup'}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${apt.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                                {apt.status.toUpperCase()}
                                            </span>
                                            {apt.status === 'completed' && <span className="text-office-colorful-ribbon dark:text-office-accent text-sm font-bold">&rarr;</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No appointments scheduled.</p>
                        )}
                    </div>
                </div>
            </div>

            <Modal show={!!selectedAppointment} onClose={() => setSelectedAppointment(null)}>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-office-colorful-text dark:text-white">Visit Details</h2>
                            <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext">{selectedAppointment && new Date(selectedAppointment.appointment_date).toDateString()}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold dark:bg-green-900/30 dark:text-green-400">COMPLETED</span>
                    </div>

                    {selectedAppointment?.antenatal_record ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-office-colorful-subtext dark:text-office-black-subtext">Weight</label>
                                    <p className="text-office-colorful-text dark:text-office-black-text font-medium">{selectedAppointment.antenatal_record.weight} kg</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-office-colorful-subtext dark:text-office-black-subtext">Blood Pressure</label>
                                    <p className="text-office-colorful-text dark:text-office-black-text font-medium">{selectedAppointment.antenatal_record.blood_pressure} mmHg</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-office-colorful-subtext dark:text-office-black-subtext">Fetal Heartbeat</label>
                                    <p className="text-office-colorful-text dark:text-office-black-text font-medium">{selectedAppointment.antenatal_record.fetal_heartbeat || 'Not recorded'}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-office-colorful-subtext dark:text-office-black-subtext">Gestation</label>
                                    <p className="text-office-colorful-text dark:text-office-black-text font-medium">{selectedAppointment.antenatal_record.gestational_age_size || 'Not recorded'}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-office-colorful-subtext dark:text-office-black-subtext">Urine Test (Alb/Sug)</label>
                                    <p className="text-office-colorful-text dark:text-office-black-text font-medium">
                                        {selectedAppointment.antenatal_record.urine_alb ? `Alb: ${selectedAppointment.antenatal_record.urine_alb}` : ''}
                                        {selectedAppointment.antenatal_record.urine_sug ? ` Sug: ${selectedAppointment.antenatal_record.urine_sug}` : ''}
                                        {!selectedAppointment.antenatal_record.urine_alb && !selectedAppointment.antenatal_record.urine_sug && 'None'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-office-colorful-subtext dark:text-office-black-subtext">Supplements</label>
                                    <p className="text-office-colorful-text dark:text-office-black-text font-medium">{selectedAppointment.antenatal_record.supplements || 'None'}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-office-colorful-subtext dark:text-office-black-subtext">Doctor</label>
                                    <p className="text-office-colorful-text dark:text-office-black-text font-medium">{selectedAppointment.doctor?.name || 'Medical Staff'}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-office-colorful-subtext dark:text-office-black-subtext">Next Appointment</label>
                                    <p className="text-office-colorful-ribbon dark:text-office-accent font-bold">{selectedAppointment.antenatal_record.next_visit || 'To be scheduled'}</p>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-office-colorful-subtext dark:text-office-black-subtext">Remarks / Complaint Management</label>
                                <div className="mt-1 p-3 bg-office-colorful-bg rounded dark:bg-office-black-bg border border-office-colorful-border dark:border-office-black-border">
                                    <p className="text-sm text-office-colorful-text dark:text-office-black-text italic">
                                        {selectedAppointment.antenatal_record.complaint_management || selectedAppointment.antenatal_record.remarks || 'No remarks recorded for this visit.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-10 text-center">
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext italic">No detailed antenatal data was recorded for this appointment.</p>
                        </div>
                    )}

                    <div className="mt-8 flex justify-end">
                        <SecondaryButton onClick={() => setSelectedAppointment(null)}>Close</SecondaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
