import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

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

            <div className="py-12 bg-office-colorful-bg dark:bg-office-black-bg min-h-[calc(100vh-160px)]">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-office-colorful-text dark:text-office-black-text">Mother</label>
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
                                {errors.mother_user_id && <div className="text-red-500 text-xs mt-1">{errors.mother_user_id}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-office-colorful-text dark:text-office-black-text">Child Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border-office-colorful-border rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-office-colorful-text dark:text-office-black-text">Sex</label>
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
                                <label className="block text-sm font-medium text-office-colorful-text dark:text-office-black-text">Birth Date</label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full border-office-colorful-border rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    value={data.birth_date}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-office-colorful-text dark:text-office-black-text">Birth Weight (kg)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="mt-1 block w-full border-office-colorful-border rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    value={data.birth_weight}
                                    onChange={(e) => setData('birth_weight', e.target.value)}
                                />
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
