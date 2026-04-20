import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ObstetricalRisks({ auth, mothers }) {
    const { data, setData, post, processing, errors } = useForm({
        mother_user_id: '',
        date_of_test: '',
        age_risk: 'no',
        consecutive_abortions: 'no',
        perinatal_deaths: 'no',
        previous_cs: 'no',
        one_complicated_cs: 'no',
        grand_multiparty: 'no',
        puerperal_sepsis: 'no',
        gestational_hypertension: 'no',
        preeclampsia: 'no',
        eclampsia_seizures: 'no',
        uterine_surgery: 'no',
        previous_aph: 'no',
        previous_pph: 'no',
        gestational_diabetes: 'no',
        renal_disease: 'no',
        heart_disease: 'no',
        dvt: 'no',
        previous_preterm: 'no',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('nurse.medical.obstetrical.store'));
    };

    const risks = [
        { key: 'age_risk', label: 'Age < 18 or > 35?' },
        { key: 'consecutive_abortions', label: '3 or more Consecutive Abortions?' },
        { key: 'perinatal_deaths', label: 'Perinatal Deaths > 2?' },
        { key: 'previous_cs', label: 'Previous C.S?' },
        { key: 'one_complicated_cs', label: 'One Complicated C.S?' },
        { key: 'grand_multiparty', label: 'Grand Multiparty (>5)?' },
        { key: 'puerperal_sepsis', label: 'Puerperal Sepsis?' },
        { key: 'gestational_hypertension', label: 'Gestational Hypertension?' },
        { key: 'preeclampsia', label: 'Preeclampsia?' },
        { key: 'eclampsia_seizures', label: 'Eclampsia/Seizures?' },
        { key: 'uterine_surgery', label: 'Uterine Surgery?' },
        { key: 'previous_aph', label: 'Previous APH?' },
        { key: 'previous_pph', label: 'Previous PPH > 2 hours?' },
        { key: 'gestational_diabetes', label: 'Gestational Diabetes?' },
        { key: 'renal_disease', label: 'Renal Disease?' },
        { key: 'heart_disease', label: 'Heart Disease?' },
        { key: 'dvt', label: 'DVT?' },
        { key: 'previous_preterm', label: 'Previous Pre-term?' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Medical and Obstetrical History and Risks</h2>}
            breadcrumbs={[
                { label: 'Medical Records', href: route('nurse.medical.index') },
                { label: 'Obstetrical Risks' }
            ]}
        >
            <Head title="Obstetrical Risks" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <form onSubmit={submit} className="grid grid-cols-1 gap-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Mother Selection */}
                                <div>
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
                                    <InputLabel htmlFor="date_of_test" value="Date of Assessment" />
                                    <TextInput
                                        id="date_of_test"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.date_of_test}
                                        onChange={(e) => setData('date_of_test', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <hr className="my-4 border-office-colorful-border dark:border-office-black-border" />
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white">Risk Assessment Checklist</h3>
                            <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext mb-4">Check all that apply.</p>

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
