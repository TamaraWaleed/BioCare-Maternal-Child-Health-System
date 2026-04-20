import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function USSExamination({ auth, mothers }) {
    const { data, setData, post, processing, errors } = useForm({
        mother_user_id: '',
        date: '',
        gestation_week: '',
        no_of_fetuses: '1',
        heart_activity: 'normal',
        placenta: '',
        presentation: '',
        fetal_sex: '',
        quantity_liquor: 'normal',
        deep_packet_liquor: '',
        afi_liquor: '',
        gs: '',
        crl: '',
        bpd: '',
        fl: '',
        ac: '',
        ega: '',
        efw: '',
        edd: '',
        congenital_anomalies: 'no',
        suspected_large: 'no',
        suspected_iugr: 'no',
        suspected_small: 'no',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('nurse.medical.uss.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">USS Examination Record</h2>}
            breadcrumbs={[
                { label: 'Medical Records', href: route('nurse.medical.index') },
                { label: 'USS Examination' }
            ]}
        >
            <Head title="USS Examination" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

                            <div>
                                <InputLabel htmlFor="date" value="Date of Scan" />
                                <TextInput
                                    id="date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="gestation_week" value="Gestation Week" />
                                <TextInput
                                    id="gestation_week"
                                    className="mt-1 block w-full"
                                    value={data.gestation_week}
                                    onChange={(e) => setData('gestation_week', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="no_of_fetuses" value="No. of Fetuses" />
                                <TextInput
                                    id="no_of_fetuses"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.no_of_fetuses}
                                    onChange={(e) => setData('no_of_fetuses', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="heart_activity" value="Heart Activity" />
                                <TextInput
                                    id="heart_activity"
                                    className="mt-1 block w-full"
                                    value={data.heart_activity}
                                    onChange={(e) => setData('heart_activity', e.target.value)}
                                />
                            </div>

                            {/* Biometrics */}
                            <div>
                                <InputLabel htmlFor="bpd" value="BPD" />
                                <TextInput id="bpd" className="mt-1 block w-full" value={data.bpd} onChange={(e) => setData('bpd', e.target.value)} />
                            </div>
                            <div>
                                <InputLabel htmlFor="fl" value="FL" />
                                <TextInput id="fl" className="mt-1 block w-full" value={data.fl} onChange={(e) => setData('fl', e.target.value)} />
                            </div>
                            <div>
                                <InputLabel htmlFor="ac" value="AC" />
                                <TextInput id="ac" className="mt-1 block w-full" value={data.ac} onChange={(e) => setData('ac', e.target.value)} />
                            </div>
                            <div>
                                <InputLabel htmlFor="efw" value="EFW" />
                                <TextInput id="efw" className="mt-1 block w-full" value={data.efw} onChange={(e) => setData('efw', e.target.value)} />
                            </div>

                            {/* Conditions */}
                            <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-2 text-office-colorful-text dark:text-office-black-text">
                                    <input type="checkbox" className="rounded dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent" checked={data.congenital_anomalies === 'yes'} onChange={e => setData('congenital_anomalies', e.target.checked ? 'yes' : 'no')} />
                                    <span>Congenital Anomalies</span>
                                </div>
                                <div className="flex items-center gap-2 text-office-colorful-text dark:text-office-black-text">
                                    <input type="checkbox" className="rounded dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent" checked={data.suspected_large === 'yes'} onChange={e => setData('suspected_large', e.target.checked ? 'yes' : 'no')} />
                                    <span>Suspected Large</span>
                                </div>
                                <div className="flex items-center gap-2 text-office-colorful-text dark:text-office-black-text">
                                    <input type="checkbox" className="rounded dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent" checked={data.suspected_iugr === 'yes'} onChange={e => setData('suspected_iugr', e.target.checked ? 'yes' : 'no')} />
                                    <span>Suspected IUGR</span>
                                </div>
                            </div>


                            <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
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
