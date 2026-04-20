import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CurrentRisks({ auth, mothers }) {
    // q2 to q16
    const { data, setData, post, processing, errors } = useForm({
        mother_user_id: '',
        date_of_visit: '',
        gestational_age: '',
        others: '',
        who_perform_assessment: '',
        q2: 'no', // Bleeding
        q3: 'no', // Ruptured membranes
        q4: 'no', // Fever > 38
        q5: 'no', // Pallor
        q6: 'no', // Edema
        q7: 'no', // BP > 140/90
        q8: 'no', // Sugar in urine
        q9: 'no', // Protein in urine
        q10: 'no', // High weight gain
        q11: 'no', // Abnormal lie/presentation (>36w)
        q12: 'no', // Multiple pregnancy
        q13: 'no', // Diminished fetal movement
        q14: 'no', // Fetal heart not heard
        q15: 'no', // Pelvic tumor
        q16: 'no', // Abnormal vaginal discharge
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('nurse.medical.current-risks.store'));
    };

    const risks = [
        { key: 'q2', label: 'Vaginal Bleeding?' },
        { key: 'q3', label: 'Ruptured Membranes?' },
        { key: 'q4', label: 'Fever > 38°C?' },
        { key: 'q5', label: 'Severe Pallor (Anemia)?' },
        { key: 'q6', label: 'Edema (Face/Hands)?' },
        { key: 'q7', label: 'BP > 140/90?' },
        { key: 'q8', label: 'Sugar in Urine?' },
        { key: 'q9', label: 'Protein in Urine?' },
        { key: 'q10', label: 'Excessive Weight Gain?' },
        { key: 'q11', label: 'Abnormal Lie/Presentation (>36w)?' },
        { key: 'q12', label: 'Multiple Pregnancy?' },
        { key: 'q13', label: 'Diminished Fetal Movement?' },
        { key: 'q14', label: 'Fetal Heart Not Heard?' },
        { key: 'q15', label: 'Pelvic Tumor/Mass?' },
        { key: 'q16', label: 'Abnormal Vaginal Discharge?' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Current Pregnancy Risks Assessment</h2>}
            breadcrumbs={[
                { label: 'Medical Records', href: route('nurse.medical.index') },
                { label: 'Current Risks' }
            ]}
        >
            <Head title="Current Risks" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <form onSubmit={submit} className="grid grid-cols-1 gap-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="col-span-1 md:col-span-2 lg:col-span-3">
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
                                    <InputLabel htmlFor="gestational_age" value="Gestational Age (weeks)" />
                                    <TextInput
                                        id="gestational_age"
                                        className="mt-1 block w-full"
                                        value={data.gestational_age}
                                        onChange={(e) => setData('gestational_age', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="who_perform_assessment" value="Assessed By" />
                                    <TextInput
                                        id="who_perform_assessment"
                                        className="mt-1 block w-full"
                                        value={data.who_perform_assessment}
                                        onChange={(e) => setData('who_perform_assessment', e.target.value)}
                                    />
                                </div>
                            </div>

                            <hr className="my-4 border-office-colorful-border dark:border-office-black-border" />
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white">Current Risk Signs</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {risks.map((risk) => (
                                    <div key={risk.key} className="flex items-center gap-2 border border-office-colorful-border p-3 rounded dark:border-office-black-border bg-office-colorful-bg/30 dark:bg-office-black-bg/30">
                                        <input
                                            type="checkbox"
                                            id={risk.key}
                                            checked={data[risk.key] === 'yes'}
                                            onChange={e => setData(risk.key, e.target.checked ? 'yes' : 'no')}
                                            className="rounded border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border text-office-accent focus:ring-office-accent"
                                        />
                                        <label htmlFor={risk.key} className="text-sm text-office-colorful-text dark:text-office-black-text select-none cursor-pointer">{risk.label}</label>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <InputLabel htmlFor="others" value="Other Risks/Notes" />
                                <TextInput
                                    id="others"
                                    className="mt-1 block w-full"
                                    value={data.others}
                                    onChange={(e) => setData('others', e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end mt-4">
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
