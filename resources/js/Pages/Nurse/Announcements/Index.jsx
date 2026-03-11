import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, announcements }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        const theme = localStorage.getItem('theme') || 'light';
        Swal.fire({
            title: 'Are you sure?',
            text: "This announcement will be permanently removed.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            background: theme === 'dark' ? '#2b2b2b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('nurse.announcements.delete', id));
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Announcements</h2>}
            breadcrumbs={[{ label: 'Announcements' }]}
        >
            <Head title="Announcements" />

            <div className="py-12 bg-office-colorful-bg dark:bg-office-black-bg min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white">Recent Announcements</h3>
                            <Link href={route('nurse.announcements.create')}>
                                <PrimaryButton>+ Create New</PrimaryButton>
                            </Link>
                        </div>

                        <div className="grid gap-6">
                            {!announcements.data || announcements.data.length === 0 ? (
                                <p className="text-office-colorful-subtext dark:text-office-black-subtext">No announcements found.</p>
                            ) : (
                                announcements.data.map((ad) => (
                                    <div key={ad.id} className="p-4 border border-office-colorful-border rounded-lg bg-office-colorful-bg/50 dark:bg-office-black-bg dark:border-office-black-border">
                                        <h4 className="font-bold text-lg text-office-colorful-text dark:text-office-accent">{ad.title || 'Untitled'}</h4>
                                        <p className="mt-2 text-office-colorful-text dark:text-office-black-text whitespace-pre-wrap">{ad.content || 'No content'}</p>
                                        <div className="mt-4 text-xs text-office-colorful-subtext dark:text-office-black-subtext flex justify-between items-center">
                                            <span>Posted: {new Date(ad.created_at).toLocaleDateString()}</span>
                                            <button
                                                onClick={() => handleDelete(ad.id)}
                                                className="text-red-600 hover:underline dark:text-red-400 font-semibold"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
