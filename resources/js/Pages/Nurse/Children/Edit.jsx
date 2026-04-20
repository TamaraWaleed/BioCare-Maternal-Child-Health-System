import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, child, mothers }) {
    const { data, setData, put, processing, errors } = useForm({
        mother_user_id: child.mother_user_id,
        name: child.name,
        sex: child.sex,
        birth_date: child.birth_date,
        birth_weight: child.birth_weight || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('nurse.children.update', child.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Edit Child Record</h2>}
            breadcrumbs={[
                { label: 'Manage Children', href: route('nurse.children.index') },
                { label: 'Edit Child' }
            ]}
        >
            <Head title="Edit Child" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
                            <div>
                                <InputLabel value="Mother" />
                                <select
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
                                <InputLabel value="Child Name" />
                                <TextInput
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel value="Sex" />
                                <select
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
                                <InputLabel value="Birth Date" />
                                <TextInput
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.birth_date}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <InputLabel value="Birth Weight (kg)" />
                                <TextInput
                                    type="number"
                                    step="0.01"
                                    className="mt-1 block w-full"
                                    value={data.birth_weight}
                                    onChange={(e) => setData('birth_weight', e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <PrimaryButton disabled={processing}>Update Child</PrimaryButton>
                                <Link href={route('nurse.children.index')} className="text-sm text-office-colorful-subtext hover:underline dark:text-office-black-subtext">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
