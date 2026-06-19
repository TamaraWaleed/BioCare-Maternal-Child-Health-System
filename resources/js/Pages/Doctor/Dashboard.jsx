import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserNurse, faUserMd, faBaby, faWeight, faWalking,
    faCalendarAlt, faSearch, faEye, faHospital
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard({ auth, mothers, todayAppointments, filters }) {
    const [searchVal, setSearchVal] = useState(filters?.search || '');
    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        setSearchVal(filters?.search || '');
    }, [filters]);

    const applyFilters = (search = searchVal) => {
        router.get(route('doctor.dashboard'), {
            search,
        }, {
            preserveState: true,
            replace: true
        });
    };

    useEffect(() => {
        if (searchVal !== (filters?.search || '')) {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            debounceTimeoutRef.current = setTimeout(() => {
                applyFilters(searchVal);
            }, 400);
        }

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [searchVal]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        applyFilters();
    };

    const handleClearFilters = () => {
        setSearchVal('');
        router.get(route('doctor.dashboard'), {}, {
            preserveState: true,
            replace: true
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Doctor Dashboard (Welcome {auth.user.name})</h2>}
            breadcrumbs={[]}
        >
            <Head title="Doctor Dashboard" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Sidebar / Quick Menu */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faUserNurse} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Patient Care
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('doctor.child_examination')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faBaby} className="mr-2 w-4" /> Child Examination
                                </Link>
                                <Link href={route('doctor.measurements')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faWeight} className="mr-2 w-4" /> Baby Measurements
                                </Link>
                                <Link href={route('doctor.followup')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faWalking} className="mr-2 w-4" /> Child Follow-up
                                </Link>
                            </div>
                        </div>

                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faHospital} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Clinic Operations
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('doctor.schedule')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 w-4" /> Schedule
                                </Link>

                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        {/* Today's Appointments */}
                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border mb-6">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4 flex items-center border-b pb-2">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Today's Appointments
                            </h3>

                            {todayAppointments && todayAppointments.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Mother</th>
                                                <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Doctor</th>
                                                <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Status</th>
                                                <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                            {todayAppointments.map((apt) => (
                                                <tr key={apt.id}>
                                                    <td className="px-5 py-4 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                        <p className="text-office-colorful-text font-semibold dark:text-white">{apt.mother?.name}</p>
                                                        <p className="text-office-colorful-subtext text-xs dark:text-office-black-subtext">{apt.mother?.email}</p>
                                                    </td>
                                                    <td className="px-5 py-4 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-white">
                                                        {apt.doctor?.name || 'Any Available Doctor'}
                                                    </td>
                                                    <td className="px-5 py-4 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${apt.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : apt.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                                            {apt.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                        <Link
                                                            href={route('doctor.schedule')}
                                                            className="text-office-colorful-ribbon hover:underline dark:text-office-accent font-semibold text-xs"
                                                        >
                                                            Go to Schedule
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-office-colorful-subtext text-sm dark:text-office-black-subtext italic">No appointments scheduled for today.</p>
                            )}
                        </div>

                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                <h3 className="text-lg font-bold text-office-colorful-text dark:text-white">Registered Mothers & Children</h3>

                                <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                                    <div className="relative min-w-[240px]">
                                        <input
                                            type="text"
                                            placeholder="Search mother name or email..."
                                            value={searchVal}
                                            onChange={(e) => setSearchVal(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 dark:border-office-black-border rounded-md leading-5 bg-white dark:bg-office-black-bg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-office-colorful-ribbon dark:focus:ring-office-accent focus:border-office-colorful-ribbon dark:focus:border-office-accent sm:text-sm transition-all"
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
                                        </div>
                                    </div>
                                    {filters?.search && (
                                        <button
                                            type="button"
                                            onClick={handleClearFilters}
                                            className="px-3 py-1.5 border border-gray-300 dark:border-office-black-border dark:text-gray-900 dark:text-white rounded-md text-sm hover:bg-gray-50 dark:hover:bg-office-black-bg"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </form>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Mother</th>
                                            <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Children</th>
                                            <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                        {mothers && mothers.data && mothers.data.map((mother) => (
                                            <tr key={mother.id}>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                    <p className="text-office-colorful-text font-semibold dark:text-white">{mother.name}</p>
                                                    <p className="text-office-colorful-subtext text-xs dark:text-office-black-subtext">{mother.email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                    {mother.children && mother.children.length > 0 ? (
                                                        <div className="flex flex-wrap gap-1">
                                                            {mother.children.map(child => (
                                                                <span key={child.id} className="bg-office-colorful-bg text-office-colorful-ribbon text-xs px-2 py-1 rounded-full dark:bg-office-black-bg dark:text-office-accent">{child.name}</span>
                                                            ))}
                                                        </div>
                                                    ) : <span className="text-office-colorful-subtext text-xs dark:text-office-black-subtext">No children</span>}
                                                </td>
                                                <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                    <Link
                                                        href={route('doctor.patients.show', mother.id)}
                                                        className="text-office-colorful-ribbon hover:underline dark:text-office-accent flex items-center"
                                                    >
                                                        <FontAwesomeIcon icon={faEye} className="mr-1" /> View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Links */}
                            {mothers && mothers.links && mothers.links.length > 3 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {mothers.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`px-3 py-1 border rounded text-xs transition ${link.active ? 'bg-office-colorful-ribbon text-white border-office-colorful-ribbon dark:bg-office-accent dark:border-office-accent' : 'bg-office-colorful-surface text-office-colorful-text border-office-colorful-border dark:bg-office-black-surface dark:text-office-black-text dark:border-office-black-border'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
