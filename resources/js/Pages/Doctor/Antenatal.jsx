import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotesMedical, faHistory } from '@fortawesome/free-solid-svg-icons';

export default function Antenatal({ auth, mothers, records }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        mother_user_id: '',
        date: new Date().toISOString().split('T')[0],
        blood_pressure: '',
        oedema: '',
        weight: '',
        urine_alb: '',
        urine_sug: '',
        fetal_heartbeat: '',
        gestational_age_date: '',
        gestational_age_size: '',
        presentation: '',
        complaint_management: '',
        supplements: '',
        next_visit: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('doctor.antenatal.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Antenatal Records</h2>}
            breadcrumbs={[{ label: 'Antenatal Records' }]}
        >
            <Head title="Antenatal Records" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Records Table */}
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-6 uppercase tracking-wider border-b pb-2 italic flex items-center">
                            <FontAwesomeIcon icon={faHistory} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                            Recent Antenatal Records
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-center">
                                <thead>
                                    <tr className="bg-[#f0f7fa] dark:bg-office-black-bg">
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">Date</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">Mother Name</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">Mother ID</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">BP</th>
                                        <th className="border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext dark:border-office-black-border uppercase">Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records && records.length > 0 ? records.map((record) => (
                                        <tr key={record.id} className="bg-[#eef2f7] dark:bg-office-black-surface">
                                            <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">{record.visit_date}</td>
                                            <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">{record.mother_name}</td>
                                            <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">{record.mother_id}</td>
                                            <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">{record.blood_pressure}</td>
                                            <td className="border border-gray-300 px-4 py-2 dark:border-office-black-border">{record.weight}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="px-5 py-5 border-b border-gray-200 text-sm text-center italic text-gray-500 bg-white dark:bg-office-black-bg dark:border-office-black-border">
                                                No records found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* New Record Form */}
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-6 uppercase tracking-wider border-b pb-2 italic flex items-center">
                            <FontAwesomeIcon icon={faNotesMedical} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                            New Antenatal Follow Up
                        </h3>

                        <form onSubmit={submit} className="space-y-6 text-sm text-office-colorful-text dark:text-office-black-text">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="mother_user_id" value="Mother Name:" />
                                    <select
                                        id="mother_user_id"
                                        className="mt-1 block w-full border-gray-300 dark:border-office-black-border dark:bg-office-black-bg dark:text-office-black-text focus:border-office-colorful-ribbon dark:focus:border-office-accent focus:ring-office-colorful-ribbon dark:focus:ring-office-accent rounded-md shadow-sm"
                                        value={data.mother_user_id}
                                        onChange={(e) => setData('mother_user_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Mother</option>
                                        {mothers.map((mother) => (
                                            <option key={mother.id} value={mother.id}>{mother.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <InputLabel value="Mother ID:" />
                                    <TextInput value={data.mother_user_id} disabled className="mt-1 block w-full bg-gray-100 dark:bg-gray-700" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="date" value="Date:" />
                                    <TextInput id="date" type="date" className="mt-1 block w-full" value={data.date} onChange={(e) => setData('date', e.target.value)} required />
                                </div>
                                <div>
                                    <InputLabel htmlFor="blood_pressure" value="Blood Pressure:" />
                                    <TextInput id="blood_pressure" className="mt-1 block w-full" value={data.blood_pressure} onChange={(e) => setData('blood_pressure', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="oedema" value="Oedema:" />
                                    <TextInput id="oedema" className="mt-1 block w-full" value={data.oedema} onChange={(e) => setData('oedema', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="weight" value="Weight:" />
                                    <TextInput id="weight" className="mt-1 block w-full" value={data.weight} onChange={(e) => setData('weight', e.target.value)} />
                                </div>
                            </div>

                            {/* Urine Stick */}
                            <div className="flex items-center space-x-6">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Urine Stick:</span>
                                <div className="flex items-center space-x-2">
                                    <span className="dark:text-office-black-text">Alb:</span>
                                    <TextInput id="urine_alb" className="w-24" placeholder="Result" value={data.urine_alb} onChange={(e) => setData('urine_alb', e.target.value)} />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="dark:text-office-black-text">Sug:</span>
                                    <TextInput id="urine_sug" className="w-24" placeholder="Result" value={data.urine_sug} onChange={(e) => setData('urine_sug', e.target.value)} />
                                </div>
                            </div>

                            {/* Fetal Heartbeat */}
                            <div className="flex items-center space-x-6">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Fetal Heartbeat (FHS):</span>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="radio" className="form-radio text-office-colorful-ribbon focus:ring-office-colorful-ribbon" name="fetal_heartbeat" value="+ve" checked={data.fetal_heartbeat === '+ve'} onChange={() => setData('fetal_heartbeat', '+ve')} />
                                        <span className="ml-2 dark:text-office-black-text">+ve</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="radio" className="form-radio text-office-colorful-ribbon focus:ring-office-colorful-ribbon" name="fetal_heartbeat" value="-ve" checked={data.fetal_heartbeat === '-ve'} onChange={() => setData('fetal_heartbeat', '-ve')} />
                                        <span className="ml-2 dark:text-office-black-text">-ve</span>
                                    </label>
                                </div>
                            </div>

                            {/* Gestational Age */}
                            <div>
                                <InputLabel value="Gestational age :" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="whitespace-nowrap w-24">Date:</span>
                                        <TextInput id="gestational_age_date" type="text" className="mt-1 block w-full" value={data.gestational_age_date} onChange={(e) => setData('gestational_age_date', e.target.value)} />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="whitespace-nowrap w-24">Size/cm:</span>
                                        <TextInput id="gestational_age_size" className="mt-1 block w-full" value={data.gestational_age_size} onChange={(e) => setData('gestational_age_size', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="presentation" value="Presentation:" />
                                <TextInput id="presentation" className="mt-1 block w-full" value={data.presentation} onChange={(e) => setData('presentation', e.target.value)} />
                            </div>

                            <div>
                                <InputLabel htmlFor="complaint_management" value="Complaint, Management, Medication & Remarks:" />
                                <textarea
                                    id="complaint_management"
                                    className="mt-1 block w-full border-gray-300 dark:border-office-black-border dark:bg-office-black-bg dark:text-office-black-text focus:border-office-colorful-ribbon dark:focus:border-office-accent focus:ring-office-colorful-ribbon dark:focus:ring-office-accent rounded-md shadow-sm"
                                    rows="3"
                                    value={data.complaint_management}
                                    onChange={(e) => setData('complaint_management', e.target.value)}
                                ></textarea>
                            </div>

                            <div>
                                <InputLabel htmlFor="supplements" value="Supplements(iron+F.A):" />
                                <TextInput id="supplements" className="mt-1 block w-full" value={data.supplements} onChange={(e) => setData('supplements', e.target.value)} />
                            </div>

                            <div>
                                <InputLabel htmlFor="next_visit" value="Next Visit:" />
                                <TextInput id="next_visit" type="date" className="mt-1 block w-full" value={data.next_visit} onChange={(e) => setData('next_visit', e.target.value)} />
                            </div>

                            <div className="flex justify-end">
                                <PrimaryButton disabled={processing} className="px-8 bg-office-colorful-ribbon dark:bg-office-accent hover:bg-office-colorful-ribbon/90">
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
