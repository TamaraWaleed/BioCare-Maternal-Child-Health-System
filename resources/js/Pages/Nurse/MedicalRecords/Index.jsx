import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth }) {
    const forms = [
        { name: 'Newborn Assessment', route: 'nurse.medical.newborn.create', color: 'bg-blue-500' },
        { name: 'Postnatal Examination', route: 'nurse.medical.postnatal.create', color: 'bg-green-500' },
        { name: 'Previous Pregnancies', route: 'nurse.medical.pregnancy.create', color: 'bg-purple-500' },
        // Add placeholders for others
        { name: 'Medical/Obstetrical Risks', route: 'nurse.medical.obstetrical.create', color: 'bg-red-500' },
        { name: 'Current Risks', route: 'nurse.medical.current-risks.create', color: 'bg-orange-500' },
        { name: 'USS Examination', route: 'nurse.medical.uss.create', color: 'bg-indigo-500' },
        { name: 'Child Vaccination', route: 'nurse.medical.vaccination.create', color: 'bg-teal-500' },
        { name: 'Child Preventive Exams', route: 'nurse.medical.preventive.create', color: 'bg-pink-500' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Medical Records</h2>}
            breadcrumbs={[{ label: 'Medical Records' }]}
        >
            <Head title="Medical Records" />

            <div className="py-12 min-h-[calc(100vh-160px)]">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Maternal Records */}
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-ribbon dark:text-white mb-4">Maternal Records</h3>
                            <ul className="space-y-2">
                                <li><Link href={route('nurse.medical.pregnancy.create')} className="text-office-colorful-text dark:text-office-black-text hover:text-office-colorful-ribbon dark:hover:text-white transition">Previous Pregnancies</Link></li>
                                <li><Link href={route('nurse.medical.obstetrical.create')} className="text-office-colorful-text dark:text-office-black-text hover:text-office-colorful-ribbon dark:hover:text-white transition">Medical & Obstetrical Risks</Link></li>
                                <li><Link href={route('nurse.medical.current-risks.create')} className="text-office-colorful-text dark:text-office-black-text hover:text-office-colorful-ribbon dark:hover:text-white transition">Current Pregnancy Risks</Link></li>
                                <li><Link href={route('nurse.medical.uss.create')} className="text-office-colorful-text dark:text-office-black-text hover:text-office-colorful-ribbon dark:hover:text-white transition">USS Examination</Link></li>
                                <li><Link href={route('nurse.medical.postnatal.create')} className="text-office-colorful-text dark:text-office-black-text hover:text-office-colorful-ribbon dark:hover:text-white transition">Postnatal Examination</Link></li>
                            </ul>
                        </div>

                        {/* Child Records */}
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-ribbon dark:text-white mb-4">Child Records</h3>
                            <ul className="space-y-2">
                                <li><Link href={route('nurse.medical.newborn.create')} className="text-office-colorful-text dark:text-office-black-text hover:text-office-colorful-ribbon dark:hover:text-white transition">Newborn Assessment</Link></li>
                                <li><Link href={route('nurse.medical.preventive.create')} className="text-office-colorful-text dark:text-office-black-text hover:text-office-colorful-ribbon dark:hover:text-white transition">Child Preventive Examinations</Link></li>
                                <li><Link href={route('nurse.medical.vaccination.create')} className="text-office-colorful-text dark:text-office-black-text hover:text-office-colorful-ribbon dark:hover:text-white transition">Child Vaccination Program</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
