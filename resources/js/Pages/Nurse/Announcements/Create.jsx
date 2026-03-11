import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const handleAnnouncementSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting announcement:', data);
        post(route('nurse.announcements.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Create Announcement</h2>}
            breadcrumbs={[
                { label: 'Announcements', href: route('nurse.announcements.index') },
                { label: 'Create' }
            ]}
        >
            <Head title="Create Announcement" />

            <div className="py-12 bg-office-colorful-bg dark:bg-office-black-bg min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <form onSubmit={handleAnnouncementSubmit} className="max-w-xl space-y-6">
                            <div>
                                <InputLabel htmlFor="title" value="Announcement Title" />
                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    placeholder="e.g. Clinic Holiday, Vaccination Drive"
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="content" value="Detailed Message" />
                                <textarea
                                    id="content"
                                    className="mt-1 block w-full border-office-colorful-border rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    rows="5"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    required
                                    placeholder="Provide full details here..."
                                ></textarea>
                                <InputError message={errors.content} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Post Announcement</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
