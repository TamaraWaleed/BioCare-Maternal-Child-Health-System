import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function PreviousPregnancy({ auth, mothers }) {
    const { data, setData, post, processing, errors } = useForm({
        mother_user_id: '',
        child_name: '',
        child_id_num: '',
        date_of_birth: '',
        gestational_age: '',
        mode_of_delivery: '',
        place_of_birth: '',
        complications: 'none',
        sex: '',
        birth_weight: '',
        birth_outcome: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('nurse.medical.pregnancy.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">History of Previous Pregnancies and their Outcomes</h2>}
            breadcrumbs={[
                { label: 'Medical Records', href: route('nurse.medical.index') },
                { label: 'Previous Pregnancies' }
            ]}
        >
            <Head title="Previous Pregnancy" />

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

                            {/* Child Details */}
                            <div>
                                <InputLabel htmlFor="child_name" value="Child Name" />
                                <TextInput
                                    id="child_name"
                                    className="mt-1 block w-full"
                                    value={data.child_name}
                                    onChange={(e) => setData('child_name', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="child_id_num" value="Child ID Number" />
                                <TextInput
                                    id="child_id_num"
                                    className="mt-1 block w-full"
                                    value={data.child_id_num}
                                    onChange={(e) => setData('child_id_num', e.target.value)}
                                />
                            </div>

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

                            <div>
                                <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                                <TextInput
                                    id="date_of_birth"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.date_of_birth}
                                    onChange={(e) => setData('date_of_birth', e.target.value)}
                                />
                            </div>

                            {/* Birth Details */}
                            <div>
                                <InputLabel htmlFor="birth_weight" value="Birth Weight (g)" />
                                <TextInput
                                    id="birth_weight"
                                    className="mt-1 block w-full"
                                    value={data.birth_weight}
                                    onChange={(e) => setData('birth_weight', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="gestational_age" value="Gestational Age" />
                                <TextInput
                                    id="gestational_age"
                                    className="mt-1 block w-full"
                                    value={data.gestational_age}
                                    onChange={(e) => setData('gestational_age', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="mode_of_delivery" value="Mode of Delivery" />
                                <TextInput
                                    id="mode_of_delivery"
                                    className="mt-1 block w-full"
                                    value={data.mode_of_delivery}
                                    onChange={(e) => setData('mode_of_delivery', e.target.value)}
                                    placeholder="Normal, C.S, etc."
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="place_of_birth" value="Place of Birth" />
                                <TextInput
                                    id="place_of_birth"
                                    className="mt-1 block w-full"
                                    value={data.place_of_birth}
                                    onChange={(e) => setData('place_of_birth', e.target.value)}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="birth_outcome" value="Birth Outcome" />
                                <TextInput
                                    id="birth_outcome"
                                    className="mt-1 block w-full"
                                    value={data.birth_outcome}
                                    onChange={(e) => setData('birth_outcome', e.target.value)}
                                    placeholder="Alive, Stillbirth, etc."
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <InputLabel htmlFor="complications" value="Complications" />
                                <TextInput
                                    id="complications"
                                    className="mt-1 block w-full"
                                    value={data.complications}
                                    onChange={(e) => setData('complications', e.target.value)}
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
