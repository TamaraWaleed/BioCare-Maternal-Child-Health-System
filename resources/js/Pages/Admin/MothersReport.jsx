import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useMemo } from 'react';

export default function MothersReport({ auth, mothers }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const filteredMothers = useMemo(() => {
        return mothers.filter(mother => {
            const matchesSearch = !searchQuery || mother.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = !statusFilter ||
                (statusFilter === 'active' && mother.IsActive) ||
                (statusFilter === 'inactive' && !mother.IsActive);
            return matchesSearch && matchesStatus;
        });
    }, [mothers, searchQuery, statusFilter]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center print:hidden">
                    <h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">
                        Mothers Report
                    </h2>
                    <PrimaryButton onClick={handlePrint} className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faPrint} /> Print Report
                    </PrimaryButton>
                </div>
            }
            breadcrumbs={[{ label: 'Mothers Report' }]}
        >
            <Head title="Mothers Report" />

            <div className="py-12 min-h-screen print:py-0 print:min-h-0 print:bg-white print:dark:bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 print:max-w-full print:px-0">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border print:shadow-none print:border-none print:rounded-none print:p-0">

                        {/* Print Header */}
                        <div className="hidden print:block mb-8 text-center text-black">
                            <h1 className="text-2xl font-bold uppercase mb-2">BioCare Maternal Child Health System</h1>
                            <h2 className="text-xl">Registered Mothers Report</h2>
                            <p className="text-sm mt-2">Generated on: {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="mb-6 print:hidden flex flex-col sm:flex-row gap-4 items-center">
                            <div className="relative w-full sm:w-80">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                                </div>
                                <TextInput
                                    type="text"
                                    className="w-full pl-10"
                                    placeholder="Search mothers by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border-office-colorful-border dark:border-office-black-border dark:bg-office-black-bg dark:text-office-black-text rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent py-2 px-3 text-sm min-w-[140px] w-full sm:w-auto"
                            >
                                <option value="" className="dark:bg-office-black-surface">All States</option>
                                <option value="active" className="dark:bg-office-black-surface">Active</option>
                                <option value="inactive" className="dark:bg-office-black-surface">Inactive</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full leading-normal print:border-collapse print:border print:border-black print:text-black">
                                <thead>
                                    <tr>

                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext print:border print:border-black print:bg-gray-200 print:text-black">
                                            Name
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext print:border print:border-black print:bg-gray-200 print:text-black">
                                            Email
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext print:border print:border-black print:bg-gray-200 print:text-black">
                                            Phone
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext print:border print:border-black print:bg-gray-200 print:text-black">
                                            Children
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext print:border print:border-black print:bg-gray-200 print:text-black">
                                            Registered Date
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext print:border print:border-black print:bg-gray-200 print:text-black">
                                            Status
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-center text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext print:hidden">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-office-colorful-surface dark:bg-office-black-surface print:bg-white print:dark:bg-white">
                                    {filteredMothers.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-5 py-5 border-b border-office-colorful-border text-center text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text print:border print:border-black">
                                                No mothers found matching filter criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredMothers.map((mother) => (
                                            <tr key={mother.id} className="print:break-inside-avoid">

                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text print:border print:border-black">
                                                    <p className="whitespace-no-wrap font-medium">{mother.name}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text print:border print:border-black">
                                                    <p className="whitespace-no-wrap">{mother.email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text print:border print:border-black">
                                                    <p className="whitespace-no-wrap">{mother.mother_profile?.phone || 'N/A'}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text print:border print:border-black">
                                                    <p className="whitespace-no-wrap">{mother.children?.length || 0}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text print:border print:border-black">
                                                    <p className="whitespace-no-wrap">{new Date(mother.created_at).toLocaleDateString()}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text print:border print:border-black">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${mother.IsActive
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                        }`}>
                                                        {mother.IsActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-center print:hidden">
                                                    <Link
                                                        href={route('admin.mothers.show', mother.id)}
                                                        className="text-office-colorful-ribbon hover:text-office-colorful-ribbon/80 dark:text-office-accent dark:hover:text-office-accent/80 transition text-lg"
                                                        title="View all reports"
                                                    >
                                                        <FontAwesomeIcon icon={faPrint} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global print styles to hide layout components */}
            <style>{`
                @media print {
                    nav, header, .waves-wrapper {
                        display: none !important;
                    }
                    body {
                        background-color: white !important;
                        color: black !important;
                    }
                    .content-overlay {
                        padding-top: 0 !important;
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
