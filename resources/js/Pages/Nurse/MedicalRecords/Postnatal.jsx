import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Postnatal({ auth, mothers }) {
    const { data, setData, post, processing, errors } = useForm({
        mother_user_id: '',
        assessment_status: '',
        date_of_visit: '',
        days_after_delivery: '',
        temperature: '',
        pulse: '',
        bp: '',
        bleeding_after_delivery: 'normal',
        hb: '',
        dvt: 'no',
        rupture_uterus: 'no',
        if_rupture_yes: '',
        lochia_colour: '',
        incision_cs: '',
        seizures: 'no',
        blood_transfusion: 'no',
        breasts: 'normal',
        fundal_height: '',
        family_planning_counseling: 'no',
        fp_appointment: '',
        recommendations: '',
        remarks: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('nurse.medical.postnatal.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Postnatal Examination Health Record</h2>}
            breadcrumbs={[
                { label: 'Medical Records', href: route('nurse.medical.index') },
                { label: 'Postnatal' }
            ]}
        >
            <Head title="Postnatal Examination" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Mother Selection */}
                            <div className="col-span-1 md:col-span-2">
                                <InputLabel htmlFor="mother_user_id" value="Select Mother" />
                                <select
                                    id="mother_user_id"
                                    className="mt-1 block w-full border-office-colorful-border focus:border-office-accent focus:ring-office-accent rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    value={data.mother_user_id}
                                    onChange={(e) => setData('mother_user_id', e.target.value)}
                                    required
                                >
                                    <option value="" className="dark:bg-office-black-surface">-- Select Mother --</option>
                                    {mothers.map((mother) => (
                                        <option key={mother.id} value={mother.id} className="dark:bg-office-black-surface">
                                            {mother.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.mother_user_id && <div className="text-red-500 text-sm mt-1">{errors.mother_user_id}</div>}
                            </div>

                            {/* Visit Details */}
                            <div>
                                <InputLabel htmlFor="date_of_visit" value="Date of Visit" />
                                <TextInput
                                    id="date_of_visit"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.date_of_visit}
                                    onChange={(e) => setData('date_of_visit', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="days_after_delivery" value="Days After Delivery" />
                                <TextInput
                                    id="days_after_delivery"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.days_after_delivery}
                                    onChange={(e) => setData('days_after_delivery', e.target.value)}
                                />
                            </div>

                            {/* Vitals */}
                            <div>
                                <InputLabel htmlFor="temperature" value="Temperature" />
                                <TextInput
                                    id="temperature"
                                    className="mt-1 block w-full"
                                    value={data.temperature}
                                    onChange={(e) => setData('temperature', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="pulse" value="Pulse" />
                                <TextInput
                                    id="pulse"
                                    className="mt-1 block w-full"
                                    value={data.pulse}
                                    onChange={(e) => setData('pulse', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="bp" value="Blood Pressure" />
                                <TextInput
                                    id="bp"
                                    className="mt-1 block w-full"
                                    value={data.bp}
                                    onChange={(e) => setData('bp', e.target.value)}
                                />
                            </div>

                            {/* Conditions */}
                            <div>
                                <InputLabel htmlFor="bleeding_after_delivery" value="Bleeding After Delivery" />
                                <TextInput
                                    id="bleeding_after_delivery"
                                    className="mt-1 block w-full"
                                    value={data.bleeding_after_delivery}
                                    onChange={(e) => setData('bleeding_after_delivery', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="lochia_colour" value="Lochia Colour" />
                                <TextInput
                                    id="lochia_colour"
                                    className="mt-1 block w-full"
                                    value={data.lochia_colour}
                                    onChange={(e) => setData('lochia_colour', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="breasts" value="Breasts Condition" />
                                <TextInput
                                    id="breasts"
                                    className="mt-1 block w-full"
                                    value={data.breasts}
                                    onChange={(e) => setData('breasts', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="fundal_height" value="Fundal Height" />
                                <TextInput
                                    id="fundal_height"
                                    className="mt-1 block w-full"
                                    value={data.fundal_height}
                                    onChange={(e) => setData('fundal_height', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="hb" value="Hemoglobin (Hb)" />
                                <TextInput
                                    id="hb"
                                    className="mt-1 block w-full"
                                    value={data.hb}
                                    onChange={(e) => setData('hb', e.target.value)}
                                />
                            </div>


                            {/* Checks */}
                            <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-2 text-office-colorful-text dark:text-office-black-text">
                                    <input type="checkbox" className="rounded dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent" checked={data.dvt === 'yes'} onChange={e => setData('dvt', e.target.checked ? 'yes' : 'no')} />
                                    <span>DVT</span>
                                </div>
                                <div className="flex items-center gap-2 text-office-colorful-text dark:text-office-black-text">
                                    <input type="checkbox" className="rounded dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent" checked={data.rupture_uterus === 'yes'} onChange={e => setData('rupture_uterus', e.target.checked ? 'yes' : 'no')} />
                                    <span>Rupture Uterus</span>
                                </div>
                                <div className="flex items-center gap-2 text-office-colorful-text dark:text-office-black-text">
                                    <input type="checkbox" className="rounded dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent" checked={data.seizures === 'yes'} onChange={e => setData('seizures', e.target.checked ? 'yes' : 'no')} />
                                    <span>Seizures</span>
                                </div>
                                <div className="flex items-center gap-2 text-office-colorful-text dark:text-office-black-text">
                                    <input type="checkbox" className="rounded dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent" checked={data.blood_transfusion === 'yes'} onChange={e => setData('blood_transfusion', e.target.checked ? 'yes' : 'no')} />
                                    <span>Blood Transfusion</span>
                                </div>
                            </div>

                            {data.rupture_uterus === 'yes' && (
                                <div className="col-span-1 md:col-span-2">
                                    <InputLabel htmlFor="if_rupture_yes" value="If Rupture, specify details" />
                                    <TextInput
                                        id="if_rupture_yes"
                                        className="mt-1 block w-full"
                                        value={data.if_rupture_yes}
                                        onChange={(e) => setData('if_rupture_yes', e.target.value)}
                                    />
                                </div>
                            )}

                            {/* Family Planning */}
                            <div className="col-span-1 md:col-span-2 border-t border-office-colorful-border dark:border-office-black-border pt-4 mt-2">
                                <h3 className="font-semibold mb-2 text-office-colorful-text dark:text-white">Family Planning</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="family_planning_counseling" value="Counseling Given?" />
                                        <select
                                            value={data.family_planning_counseling}
                                            onChange={e => setData('family_planning_counseling', e.target.value)}
                                            className="mt-1 block w-full border-office-colorful-border focus:border-office-accent focus:ring-office-accent rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                        >
                                            <option value="no" className="dark:bg-office-black-surface">No</option>
                                            <option value="yes" className="dark:bg-office-black-surface">Yes</option>
                                        </select>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="fp_appointment" value="Appointment Date" />
                                        <TextInput
                                            id="fp_appointment"
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={data.fp_appointment}
                                            onChange={(e) => setData('fp_appointment', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Remarks */}
                            <div className="col-span-1 md:col-span-2">
                                <InputLabel htmlFor="recommendations" value="Recommendations" />
                                <TextInput
                                    id="recommendations"
                                    className="mt-1 block w-full"
                                    value={data.recommendations}
                                    onChange={(e) => setData('recommendations', e.target.value)}
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <InputLabel htmlFor="remarks" value="Remarks" />
                                <TextInput
                                    id="remarks"
                                    className="mt-1 block w-full"
                                    value={data.remarks}
                                    onChange={(e) => setData('remarks', e.target.value)}
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2 flex justify-end">
                                <PrimaryButton disabled={processing}>
                                    Save Record
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
