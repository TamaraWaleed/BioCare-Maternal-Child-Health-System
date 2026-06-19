import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCalendarAlt, faEdit, faInfoCircle, faCheckCircle, faClock, faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Schedule({ auth, appointments, mothers, doctors }) {
    const today = new Date();
    const todayDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
    const [selectedApt, setSelectedApt] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        mother_user_id: '',
        doctor_user_id: '',
        appointment_date: '',
        notes: '',
    });

    const editForm = useForm({
        appointment_date: '',
    });

    const detailsForm = useForm({
        mother_user_id: '',
        appointment_id: '',
        doctor_user_id: auth.user.id,
        date: todayDateStr,
        weight: '',
        blood_pressure: '',
        oedema: 'none',
        urine_alb: 'nil',
        urine_sug: 'nil',
        fetal_heartbeat: '',
        gestational_age_date: '',
        gestational_age_size: '',
        presentation: '',
        complaint_management: '',
        supplements: '',
        next_visit: '',
        next_doctor_user_id: auth.user.id,
    });

    const submit = (e) => {
        e.preventDefault();

        // Client-side date check
        const selectedDate = new Date(data.appointment_date);
        selectedDate.setHours(0, 0, 0, 0);
        const todayLocal = new Date();
        todayLocal.setHours(0, 0, 0, 0);

        if (selectedDate < todayLocal) {
            Swal.fire({
                title: 'Invalid Date',
                text: 'You cannot schedule an appointment for a past date.',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
            });
            return;
        }

        post(route('doctor.appointments.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        const theme = localStorage.getItem('theme') || 'light';
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            background: theme === 'dark' ? '#2b2b2b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('doctor.appointments.delete', id));
            }
        });
    };

    const openEditModal = (apt) => {
        setSelectedApt(apt);
        editForm.setData({
            appointment_date: apt.appointment_date,
        });
        setShowEditModal(true);
    };

    const handleUpdateAppointment = (e) => {
        e.preventDefault();

        // Client-side date check
        const selectedDate = new Date(editForm.data.appointment_date);
        selectedDate.setHours(0, 0, 0, 0);
        const todayLocal = new Date();
        todayLocal.setHours(0, 0, 0, 0);

        if (selectedDate < todayLocal) {
            Swal.fire({
                title: 'Invalid Date',
                text: 'You cannot update an appointment to a past date.',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
            });
            return;
        }

        editForm.patch(route('doctor.appointments.update', selectedApt.id), {
            onSuccess: () => {
                setShowEditModal(false);
                editForm.reset();
            },
        });
    };

    const openDetailsModal = (apt) => {
        setSelectedApt(apt);
        detailsForm.setData({
            ...detailsForm.data,
            mother_user_id: apt.mother_user_id,
            appointment_id: apt.id,
            doctor_user_id: auth.user.id,
            date: apt.appointment_date,
            next_doctor_user_id: auth.user.id,
        });
        setShowDetailsModal(true);
    };

    const openViewDetailsModal = (apt) => {
        setSelectedApt(apt);
        setShowViewDetailsModal(true);
    };

    const handleStoreDetails = (e) => {
        e.preventDefault();

        // Client-side next visit date check
        if (detailsForm.data.next_visit) {
            const nextVisitDate = new Date(detailsForm.data.next_visit);
            nextVisitDate.setHours(0, 0, 0, 0);
            const todayLocal = new Date();
            todayLocal.setHours(0, 0, 0, 0);

            if (nextVisitDate < todayLocal) {
                Swal.fire({
                    title: 'Invalid Next Visit Date',
                    text: 'The next visit date cannot be in the past.',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                });
                return;
            }
        }

        detailsForm.post(route('doctor.antenatal.store'), {
            onSuccess: () => {
                setShowDetailsModal(false);
                detailsForm.reset();
            },
        });
    };

    const filteredAppointments = appointments.filter(apt =>
        (apt.mother?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (apt.appointment_date || '').includes(searchQuery)
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Clinic Schedule</h2>}
            breadcrumbs={[{ label: 'Schedule' }]}
        >
            <Head title="Schedule" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Schedule Form */}
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-6 uppercase tracking-wider border-b pb-2 italic flex items-center">
                            <FontAwesomeIcon icon={faPlus} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                            Schedule Next Visit
                        </h3>

                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            <div>
                                <InputLabel htmlFor="mother_user_id" value="Select Mother" className="dark:text-office-black-subtext" />
                                <select
                                    id="mother_user_id"
                                    className="mt-1 block w-full border-gray-300 dark:border-office-black-border dark:bg-office-black-bg dark:text-office-black-text focus:border-office-colorful-ribbon dark:focus:border-office-accent focus:ring-office-colorful-ribbon dark:focus:ring-office-accent rounded-md shadow-sm text-sm"
                                    value={data.mother_user_id}
                                    onChange={(e) => setData('mother_user_id', e.target.value)}
                                    required
                                >
                                    <option value="">Choose a mother...</option>
                                    {mothers.map((mother) => (
                                        <option key={mother.id} value={mother.id}>{mother.name} ({mother.email})</option>
                                    ))}
                                </select>
                                <InputError message={errors.mother_user_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="appointment_date" value="Visit Date" className="dark:text-office-black-subtext" />
                                <TextInput
                                    id="appointment_date"
                                    type="date"
                                    className="mt-1 block w-full text-sm"
                                    value={data.appointment_date}
                                    onChange={(e) => setData('appointment_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.appointment_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="doctor_user_id" value="Assigned Doctor (Optional)" className="dark:text-office-black-subtext" />
                                <select
                                    id="doctor_user_id"
                                    className="mt-1 block w-full border-gray-300 dark:border-office-black-border dark:bg-office-black-bg dark:text-white focus:border-office-colorful-ribbon dark:focus:border-office-accent focus:ring-office-colorful-ribbon dark:focus:ring-office-accent rounded-md shadow-sm text-sm"
                                    value={data.doctor_user_id}
                                    onChange={(e) => setData('doctor_user_id', e.target.value)}
                                >
                                    <option value="">Select Doctor (Default to Me)</option>
                                    {doctors && doctors.map((doc) => (
                                        <option key={doc.id} value={doc.id}>{doc.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.doctor_user_id} className="mt-2" />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <InputLabel htmlFor="notes" value="Notes (Optional)" className="dark:text-office-black-subtext" />
                                    <TextInput
                                        id="notes"
                                        className="mt-1 block w-full text-sm"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="e.g. Next follow-up"
                                    />
                                    <InputError message={errors.notes} className="mt-2" />
                                </div>
                                <PrimaryButton className="h-[38px] px-6" disabled={processing}>
                                    Schedule
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Schedule Table */}
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2 mb-6 gap-4">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white uppercase tracking-wider italic flex items-center">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Upcoming Appointments
                            </h3>
                            <div className="relative w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-xs" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 dark:border-office-black-border rounded-md leading-5 bg-white dark:bg-office-black-bg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-office-colorful-ribbon dark:focus:ring-office-accent focus:border-office-colorful-ribbon dark:focus:border-office-accent sm:text-sm transition-all"
                                    placeholder="Search by mother name or visit date..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-center">
                                <thead>
                                    <tr className="bg-[#f0f7fa] dark:bg-office-black-bg">
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">MotherName</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">MotherSerialNum</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">Doctor Name</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">Visit Date</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">Status</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments && filteredAppointments.length > 0 ? (
                                        filteredAppointments.map((apt) => (
                                            <tr key={apt.id} className="bg-[#eef2f7] dark:bg-office-black-surface">
                                                <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                    <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border min-h-[32px] flex items-center justify-center">
                                                        {apt.mother ? apt.mother.name : 'Unknown'}
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                    <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border font-mono min-h-[32px] flex items-center justify-center">
                                                        {apt.mother_user_id}
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                    <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border min-h-[32px] flex items-center justify-center">
                                                        {apt.doctor ? apt.doctor.name : 'Unknown'}
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                    <div className="bg-white dark:bg-office-black-bg border border-gray-200 rounded px-2 py-1 text-sm shadow-inner dark:border-office-black-border min-h-[32px] flex items-center justify-center">
                                                        {apt.appointment_date}
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                    <div className={`rounded px-2 py-1 text-xs font-bold uppercase ${apt.status === 'completed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        <FontAwesomeIcon icon={apt.status === 'completed' ? faCheckCircle : faClock} className="mr-1" />
                                                        {apt.status}
                                                    </div>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">
                                                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                                        {apt.status !== 'completed' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => openEditModal(apt)}
                                                                    className="bg-office-colorful-ribbon hover:bg-office-colorful-hover text-white py-1 px-3 rounded text-xs font-bold transition-colors"
                                                                    title="Edit Visit Date"
                                                                >
                                                                    <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => openDetailsModal(apt)}
                                                                    disabled={apt.appointment_date !== todayDateStr}
                                                                    className={`py-1 px-3 rounded text-xs font-bold transition-colors ${apt.appointment_date === todayDateStr
                                                                        ? 'bg-green-600 hover:bg-green-700 text-office-surface dark:text-white'
                                                                        : 'bg-gray-400 cursor-not-allowed text-gray-200'
                                                                        }`}
                                                                    title={apt.appointment_date === todayDateStr ? "Add Antenatal Details" : "Details can only be added on the visit date"}
                                                                >
                                                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-1" /> Add Details
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(apt.id)}
                                                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs font-bold transition-colors"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => openViewDetailsModal(apt)}
                                                                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs font-bold transition-colors"
                                                                title="View Examination Details"
                                                            >
                                                                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" /> View Details
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-5 py-5 border-b border-gray-200 text-sm text-center italic text-gray-500 bg-white dark:bg-office-black-bg dark:border-office-black-border">
                                                No upcoming appointments scheduled.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Appointment Modal */}
            <Modal show={showEditModal} onClose={() => setShowEditModal(false)} maxWidth="md">
                <form onSubmit={handleUpdateAppointment} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        Edit Appointment
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="edit_appointment_date" value="Visit Date" />
                        <TextInput
                            id="edit_appointment_date"
                            type="date"
                            className="mt-1 block w-full"
                            value={editForm.data.appointment_date}
                            onChange={(e) => editForm.setData('appointment_date', e.target.value)}
                            required
                        />
                        <InputError message={editForm.errors.appointment_date} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowEditModal(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={editForm.processing}>
                            Save Changes
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Antenatal Details Modal */}
            <Modal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} maxWidth="4xl">
                <form onSubmit={handleStoreDetails} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white border-b pb-2 mb-4">
                        Antenatal Examination for {selectedApt?.mother?.name}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel value="Visit Date" />
                            <TextInput type="date" className="w-full" value={detailsForm.data.date} onChange={e => detailsForm.setData('date', e.target.value)} required />
                        </div>
                        <div>
                            <InputLabel value="Weight (kg)" />
                            <TextInput type="number" step="0.1" className="w-full" value={detailsForm.data.weight} onChange={e => detailsForm.setData('weight', e.target.value)} />
                        </div>
                        <div>
                            <InputLabel value="Blood Pressure" />
                            <TextInput placeholder="120/80" value={detailsForm.data.blood_pressure} onChange={e => detailsForm.setData('blood_pressure', e.target.value)} />
                        </div>
                        <div>
                            <InputLabel value="Oedema" />
                            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-white" value={detailsForm.data.oedema} onChange={e => detailsForm.setData('oedema', e.target.value)}>
                                <option value="none">None</option>
                                <option value="+">+</option>
                                <option value="++">++</option>
                                <option value="+++">+++</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel value="Urine Albumin" />
                            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-white" value={detailsForm.data.urine_alb} onChange={e => detailsForm.setData('urine_alb', e.target.value)}>
                                <option value="nil">Nil</option>
                                <option value="trace">Trace</option>
                                <option value="+">+</option>
                                <option value="++">++</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel value="Urine Sugar" />
                            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-white" value={detailsForm.data.urine_sug} onChange={e => detailsForm.setData('urine_sug', e.target.value)}>
                                <option value="nil">Nil</option>
                                <option value="trace">Trace</option>
                                <option value="+">+</option>
                            </select>
                        </div>
                        <div>
                            <InputLabel value="Fetal Heartbeat" />
                            <TextInput value={detailsForm.data.fetal_heartbeat} onChange={e => detailsForm.setData('fetal_heartbeat', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <InputLabel value="Gest. Age (Date)" />
                                <TextInput type="text" value={detailsForm.data.gestational_age_date} onChange={e => detailsForm.setData('gestational_age_date', e.target.value)} />
                            </div>
                            <div>
                                <InputLabel value="Gest. Age (Size)" />
                                <TextInput placeholder="weeks" value={detailsForm.data.gestational_age_size} onChange={e => detailsForm.setData('gestational_age_size', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <InputLabel value="Presentation" />
                            <TextInput value={detailsForm.data.presentation} onChange={e => detailsForm.setData('presentation', e.target.value)} />
                        </div>
                        <div>
                            <InputLabel value="Next Visit" />
                            <TextInput type="date" className="w-full" value={detailsForm.data.next_visit} onChange={e => detailsForm.setData('next_visit', e.target.value)} />
                            <InputError message={detailsForm.errors.next_visit} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel value="Next Clinician / Doctor" />
                            <select
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-white"
                                value={detailsForm.data.next_doctor_user_id}
                                onChange={e => detailsForm.setData('next_doctor_user_id', e.target.value)}
                            >
                                <option value="">Select Doctor</option>
                                {doctors && doctors.map(doc => (
                                    <option key={doc.id} value={doc.id}>{doc.name}</option>
                                ))}
                            </select>
                            <InputError message={detailsForm.errors.next_doctor_user_id} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel value="Recorded By / Clinician" />
                            <select
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-white"
                                value={detailsForm.data.doctor_user_id}
                                onChange={e => detailsForm.setData('doctor_user_id', e.target.value)}
                            >
                                <option value="">Select Clinician (Default to Me)</option>
                                {doctors && doctors.map(doc => (
                                    <option key={doc.id} value={doc.id}>{doc.name}</option>
                                ))}
                            </select>
                            <InputError message={detailsForm.errors.doctor_user_id} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel value="Complaint & Management" />
                            <textarea
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-white focus:border-office-accent focus:ring-office-accent"
                                rows="3"
                                value={detailsForm.data.complaint_management}
                                onChange={e => detailsForm.setData('complaint_management', e.target.value)}
                            ></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel value="Supplements" />
                            <TextInput value={detailsForm.data.supplements} onChange={e => detailsForm.setData('supplements', e.target.value)} />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowDetailsModal(false)}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled={detailsForm.processing}>
                            Save Examination Details
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* View Antenatal Details Modal */}
            <Modal show={showViewDetailsModal} onClose={() => setShowViewDetailsModal(false)} maxWidth="2xl">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white border-b pb-2 mb-4">
                        Antenatal Examination Details - {selectedApt?.mother?.name}
                    </h2>

                    {selectedApt?.antenatal_record ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Mother Name</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.mother?.name || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Mother Serial Num</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded font-mono dark:text-white">
                                    {selectedApt.mother_user_id}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Visit Date</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.appointment_date}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Doctor Name</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.doctor?.name || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Weight (kg)</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.antenatal_record.weight || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Blood Pressure</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.antenatal_record.blood_pressure || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Oedema</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.antenatal_record.oedema || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Urine Albumin</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.antenatal_record.urine_alb || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Urine Sugar</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.antenatal_record.urine_sug || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Fetal Heartbeat</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.antenatal_record.fetal_heartbeat || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Gestational Age (Date)</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.antenatal_record.gestational_age_date || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Gestational Age (Size)</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.antenatal_record.gestational_age_size || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Presentation</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.antenatal_record.presentation || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Supplements</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded dark:text-white">
                                    {selectedApt.antenatal_record.supplements || 'N/A'}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <span className="font-semibold block text-xs uppercase text-gray-500 dark:text-office-black-subtext">Complaint & Management</span>
                                <div className="mt-1 p-2 bg-gray-50 border border-gray-200 dark:bg-office-black-bg dark:border-office-black-border rounded min-h-[60px] whitespace-pre-wrap dark:text-white">
                                    {selectedApt.antenatal_record.complaint_management || 'N/A'}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">No examination details recorded for this completed visit.</p>
                    )}

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowViewDetailsModal(false)}>Close</SecondaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout >
    );
}
