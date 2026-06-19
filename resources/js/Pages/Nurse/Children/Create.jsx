import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Create({ auth, mothers }) {
    const { data, setData, post, processing, errors } = useForm({
        mother_user_id: '',
        name: '',
        sex: 'male',
        birth_date: '',
        birth_weight: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('nurse.children.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Add Child Record</h2>}
            breadcrumbs={[
                { label: 'Manage Children', href: route('nurse.children.index') },
                { label: 'Add Child' }
            ]}
        >
            <Head title="Add Child" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
                            <div>
                                <InputLabel htmlFor="mother_user_id" value="Mother" />
                                <select
                                    id="mother_user_id"
                                    className="mt-1 block w-full border-office-colorful-border rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    value={data.mother_user_id}
                                    onChange={(e) => setData('mother_user_id', e.target.value)}
                                    required
                                >
                                    <option value="" className="dark:bg-office-black-surface">Select Mother</option>
                                    {mothers.map((mother) => (
                                        <option key={mother.id} value={mother.id} className="dark:bg-office-black-surface">{mother.name}</option>
                                    ))}
                                </select>
                                <InputError message={errors.mother_user_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="name" value="Child Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="sex" value="Sex" />
                                <select
                                    id="sex"
                                    className="mt-1 block w-full border-office-colorful-border rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    value={data.sex}
                                    onChange={(e) => setData('sex', e.target.value)}
                                    required
                                >
                                    <option value="male" className="dark:bg-office-black-surface">Male</option>
                                    <option value="female" className="dark:bg-office-black-surface">Female</option>
                                </select>
                            </div>

                            <div>
                                <InputLabel htmlFor="birth_date" value="Birth Date" />
                                <TextInput
                                    id="birth_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.birth_date}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.birth_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="birth_weight" value="Birth Weight (kg)" />
                                <TextInput
                                    id="birth_weight"
                                    type="number"
                                    step="0.01"
                                    className="mt-1 block w-full"
                                    value={data.birth_weight}
                                    onChange={(e) => setData('birth_weight', e.target.value)}
                                />
                                <InputError message={errors.birth_weight} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <PrimaryButton disabled={processing}>Save Child</PrimaryButton>
                                <Link href={route('nurse.children.index')} className="text-sm text-office-colorful-subtext hover:underline dark:text-office-black-subtext">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
