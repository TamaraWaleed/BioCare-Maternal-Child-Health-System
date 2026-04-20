import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
{/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
*/}

export default function Index({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">ChatBot</h2>}
            breadcrumbs={[{ label: 'ChatBot' }]}
        >
            <Head title="ChatBot" />

            <div className="py-12 bg-office-colorful-bg dark:bg-office-black-bg min-h-[calc(100vh-160px)]">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
