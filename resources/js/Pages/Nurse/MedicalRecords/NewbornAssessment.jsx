import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function NewbornAssessment({ auth, children_list }) {
    const { data, setData, post, processing, errors } = useForm({
        child_id: '',
        date_of_birth: '',
        birth_weight: '',
        gestational_age: '',
        mode_of_delivery: '',
        temperature: '',
        pulse: '',
        resp_rate: '',
        weight: '',
        height: '',
        head_circumference: '',
        sex: '',
        congenital_malformation: 'no',
        jaundice: 'no',
        cyanosis: 'no',
        umbilical_stump: 'clean',
        feeding: 'breast',
        remarks: 'none',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('nurse.medical.newborn.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Newborn Health Record & Newborn Physical Examination</h2>}
            breadcrumbs={[
                { label: 'Medical Records', href: route('nurse.medical.index') },
                { label: 'Newborn Assessment' }
            ]}
        >
            <Head title="Newborn Assessment" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Child Selection */}
                            <div className="col-span-1 md:col-span-2">
                                <InputLabel htmlFor="child_id" value="Select Child" />
                                <select
                                    id="child_id"
                                    className="mt-1 block w-full border-office-colorful-border focus:border-office-accent focus:ring-office-accent rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    value={data.child_id}
                                    onChange={(e) => setData('child_id', e.target.value)}
                                    required
                                >
                                    <option value="" className="dark:bg-office-black-surface">-- Select Child --</option>
                                    {children_list?.map((child) => (
                                        <option key={child.id} value={child.id} className="dark:bg-office-black-surface">
                                            {child?.name} (Mother: {child?.mother?.name ?? 'Unknown'})
                                        </option>
                                    ))}
                                </select>
                                {errors.child_id && <div className="text-red-500 text-sm mt-1">{errors.child_id}</div>}
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                                <TextInput
                                    id="date_of_birth"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.date_of_birth}
                                    onChange={(e) => setData('date_of_birth', e.target.value)}
                                    required
                                />
                                {errors.date_of_birth && <div className="text-red-500 text-sm mt-1">{errors.date_of_birth}</div>}
                            </div>

                            {/* Birth Weight */}
                            <div>
                                <InputLabel htmlFor="birth_weight" value="Birth Weight (g)" />
                                <TextInput
                                    id="birth_weight"
                                    className="mt-1 block w-full"
                                    value={data.birth_weight}
                                    onChange={(e) => setData('birth_weight', e.target.value)}
                                />
                            </div>

                            {/* Gestational Age */}
                            <div>
                                <InputLabel htmlFor="gestational_age" value="Gestational Age (weeks)" />
                                <TextInput
                                    id="gestational_age"
                                    className="mt-1 block w-full"
                                    value={data.gestational_age}
                                    onChange={(e) => setData('gestational_age', e.target.value)}
                                />
                            </div>

                            {/* Mode of Delivery */}
                            <div>
                                <InputLabel htmlFor="mode_of_delivery" value="Mode of Delivery" />
                                <select
                                    id="mode_of_delivery"
                                    className="mt-1 block w-full border-office-colorful-border focus:border-office-accent focus:ring-office-accent rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    value={data.mode_of_delivery}
                                    onChange={(e) => setData('mode_of_delivery', e.target.value)}
                                >
                                    <option value="" className="dark:bg-office-black-surface">Select</option>
                                    <option value="Normal" className="dark:bg-office-black-surface">Normal</option>
                                    <option value="C.S" className="dark:bg-office-black-surface">C-Section</option>
                                    <option value="Vacuum" className="dark:bg-office-black-surface">Vacuum</option>
                                </select>
                            </div>

                            {/* Vitals */}
                            <div>
                                <InputLabel htmlFor="temperature" value="Temperature (°C)" />
                                <TextInput
                                    id="temperature"
                                    className="mt-1 block w-full"
                                    value={data.temperature}
                                    onChange={(e) => setData('temperature', e.target.value)}
                                />
                                {errors.temperature && <div className="text-red-500 text-sm mt-1">{errors.temperature}</div>}
                            </div>

                            <div>
                                <InputLabel htmlFor="pulse" value="Pulse (bpm)" />
                                <TextInput
                                    id="pulse"
                                    className="mt-1 block w-full"
                                    value={data.pulse}
                                    onChange={(e) => setData('pulse', e.target.value)}
                                />
                            </div>

                            {/* Measurements */}
                            <div>
                                <InputLabel htmlFor="weight" value="Current Weight (g)" />
                                <TextInput
                                    id="weight"
                                    className="mt-1 block w-full"
                                    value={data.weight}
                                    onChange={(e) => setData('weight', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="height" value="Height (cm)" />
                                <TextInput
                                    id="height"
                                    className="mt-1 block w-full"
                                    value={data.height}
                                    onChange={(e) => setData('height', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="head_circumference" value="Head Circumference (cm)" />
                                <TextInput
                                    id="head_circumference"
                                    className="mt-1 block w-full"
                                    value={data.head_circumference}
                                    onChange={(e) => setData('head_circumference', e.target.value)}
                                />
                            </div>

                            {/* Sex */}
                            <div>
                                <InputLabel htmlFor="sex" value="Sex" />
                                <select
                                    id="sex"
                                    className="mt-1 block w-full border-office-colorful-border focus:border-office-accent focus:ring-office-accent rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    value={data.sex}
                                    onChange={(e) => setData('sex', e.target.value)}
                                >
                                    <option value="" className="dark:bg-office-black-surface">Select</option>
                                    <option value="male" className="dark:bg-office-black-surface">Male</option>
                                    <option value="female" className="dark:bg-office-black-surface">Female</option>
                                </select>
                            </div>

                            {/* Checks */}
                            <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-2 text-office-colorful-text dark:text-office-black-text">
                                    <input type="checkbox" className="rounded dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent" checked={data.congenital_malformation === 'yes'} onChange={e => setData('congenital_malformation', e.target.checked ? 'yes' : 'no')} />
                                    <span>Congenital Malformation</span>
                                </div>
                                <div className="flex items-center gap-2 text-office-colorful-text dark:text-office-black-text">
                                    <input type="checkbox" className="rounded dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent" checked={data.jaundice === 'yes'} onChange={e => setData('jaundice', e.target.checked ? 'yes' : 'no')} />
                                    <span>Jaundice</span>
                                </div>
                                <div className="flex items-center gap-2 text-office-colorful-text dark:text-office-black-text">
                                    <input type="checkbox" className="rounded dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent" checked={data.cyanosis === 'yes'} onChange={e => setData('cyanosis', e.target.checked ? 'yes' : 'no')} />
                                    <span>Cyanosis</span>
                                </div>
                            </div>

                            {/* Remarks */}
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
