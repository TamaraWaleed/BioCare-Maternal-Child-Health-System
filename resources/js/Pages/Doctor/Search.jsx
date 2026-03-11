import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Search({ auth, query, results }) {
    const { data, setData, get, processing } = useForm({
        q: query || '',
    });

    const submit = (e) => {
        e.preventDefault();
        get(route('doctor.search'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Search Records</h2>}
            breadcrumbs={[{ label: 'Search' }]}
        >
            <Head title="Search Patients" />

            <div className="py-12 bg-office-colorful-bg dark:bg-office-black-bg min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">

                        <form onSubmit={submit} className="flex gap-4 mb-8">
                            <TextInput
                                id="q"
                                className="block w-full"
                                value={data.q}
                                onChange={(e) => setData('q', e.target.value)}
                                placeholder="Search by name or email..."
                            />
                            <PrimaryButton disabled={processing}>
                                Search
                            </PrimaryButton>
                        </form>

                        {results && results.length > 0 ? (
                            <div>
                                <h3 className="text-lg font-medium text-office-colorful-text dark:text-white mb-4">Search Results</h3>
                                <ul className="divide-y divide-office-colorful-border dark:divide-office-black-border">
                                    {results.map((patient) => (
                                        <li key={patient.id} className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-office-colorful-text dark:text-office-black-text truncate">
                                                        {patient.name} ({patient.email})
                                                    </p>
                                                    {patient.children && patient.children.length > 0 && (
                                                        <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext truncate">
                                                            Children: {patient.children.map(c => c.name).join(', ')}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <Link
                                                        href={route('doctor.patients.show', patient.id)}
                                                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-office-colorful-border text-sm leading-5 font-medium rounded-full text-office-colorful-text bg-office-colorful-surface hover:bg-office-colorful-bg dark:text-office-black-text dark:bg-office-black-surface dark:border-office-black-border dark:hover:bg-office-black-bg"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            query && <p className="text-office-colorful-subtext dark:text-office-black-subtext">No results found for "{query}".</p>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
