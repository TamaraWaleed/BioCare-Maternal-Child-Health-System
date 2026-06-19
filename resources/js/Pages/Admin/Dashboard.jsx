import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers, faUserDoctor, faVenus, faShieldAlt, faUsersCog,
    faBullhorn, faBaby, faStethoscope, faUserShield, faSyringe,
    faClipboardCheck, faFemale, faBabyCarriage, faHistory,
    faExclamationTriangle, faMicroscope, faHeartbeat, faHandsHelping,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard({ auth, usersCount, doctorsCount, mothersCount, nursesCount, adminsCount }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Admin Dashboard (Welcome {auth.user.name})</h2>}
            breadcrumbs={[]}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Sidebar / Quick Menu */}
                    <div className="md:col-span-1 space-y-6">


                        {/* admin Tasks Group */}

                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faShieldAlt} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Admin Tasks
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('admin.users.index')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faUsersCog} className="mr-2 w-4" /> Manage Users
                                </Link>
                                <Link href={route('nurse.schedule')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center font-bold">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 w-4 text-office-colorful-ribbon dark:text-office-accent" /> Clinic Schedule
                                </Link>
                                <Link href={route('nurse.announcements.index')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faBullhorn} className="mr-2 w-4" /> Create Announcements
                                </Link>
                            </div>
                        </div>

                        {/* Mothers Info Group */}
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faFemale} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Manage Mothers
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('admin.reports.mothers')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faVenus} className="mr-2 w-4" /> Mothers Report
                                </Link>
                                <Link href={route('nurse.medical.pregnancy.create')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faBabyCarriage} className="mr-2 w-4" /> Prev. Pregnancies
                                </Link>
                                <Link href={route('nurse.medical.obstetrical.create')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faHistory} className="mr-2 w-4" /> Obstetrical Risks
                                </Link>
                                <Link href={route('nurse.medical.current-risks.create')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 w-4" /> Current Risks
                                </Link>
                                <Link href={route('nurse.medical.uss.create')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faMicroscope} className="mr-2 w-4" /> USS Exam
                                </Link>
                                <Link href={route('nurse.medical.postnatal.create')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faHeartbeat} className="mr-2 w-4" /> Postnatal Exam
                                </Link>
                                <Link href={route('nurse.family-planning.index')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faHandsHelping} className="mr-2 w-4" /> Family Planning
                                </Link>
                            </div>
                        </div>

                        {/* Child Tasks Group */}
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faBaby} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Manage Child
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('nurse.children.index')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faUsers} className="mr-2 w-4" /> Manage Children
                                </Link>
                                <Link href={route('nurse.medical.newborn.create')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faStethoscope} className="mr-2 w-4" /> Newborn Assessment
                                </Link>
                                <Link href={route('nurse.medical.preventive.create')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faUserShield} className="mr-2 w-4" /> Preventive Exam
                                </Link>
                                <Link href={route('nurse.medical.vaccination.create')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faSyringe} className="mr-2 w-4" /> Vaccination
                                </Link>
                                <Link href={route('nurse.child-followup.index')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faClipboardCheck} className="mr-2 w-4" /> Referrals
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Main Content Area (Stats) */}
                    <div className="md:col-span-3">
                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4">Dashboard Overview</h3>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Link
                                    href={route('admin.users.index', { status: 'active' })}
                                    className="bg-office-colorful-bg overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border flex items-center justify-between hover:scale-[1.02] hover:shadow-md transition duration-200 cursor-pointer block"
                                >
                                    <div>
                                        <div className="text-office-colorful-ribbon text-sm uppercase font-bold tracking-wider dark:text-office-accent">Active Users</div>
                                        <div className="text-xs text-office-colorful-subtext dark:text-office-black-subtext mt-0.5">({adminsCount} active admin{adminsCount === 1 ? '' : 's'})</div>
                                        <div className="text-3xl font-extrabold text-office-colorful-text dark:text-white mt-2">{usersCount}</div>
                                    </div>
                                    <FontAwesomeIcon icon={faUsers} className="text-4xl text-office-colorful-ribbon/20 dark:text-office-accent/20" />
                                </Link>
                                <Link
                                    href={route('admin.users.index', { role: 'nurse', status: 'active' })}
                                    className="bg-office-colorful-bg overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border flex items-center justify-between hover:scale-[1.02] hover:shadow-md transition duration-200 cursor-pointer block"
                                >
                                    <div>
                                        <div className="text-office-colorful-ribbon text-sm uppercase font-bold tracking-wider dark:text-office-accent">Active Nurses</div>
                                        {/* <div className="text-xs text-office-colorful-subtext dark:text-office-black-subtext mt-0.5">(Nurses in active state)</div> */}
                                        <div className="text-3xl font-extrabold text-office-colorful-text dark:text-white mt-2">{nursesCount}</div>
                                    </div>
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-4xl text-office-colorful-ribbon/20 dark:text-office-accent/20" />
                                </Link>
                                <Link
                                    href={route('admin.users.index', { role: 'doctor', status: 'active' })}
                                    className="bg-office-colorful-bg overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border flex items-center justify-between hover:scale-[1.02] hover:shadow-md transition duration-200 cursor-pointer block"
                                >
                                    <div>
                                        <div className="text-office-colorful-ribbon text-sm uppercase font-bold tracking-wider dark:text-office-accent">Active Doctors</div>
                                        {/* <div className="text-xs text-office-colorful-subtext dark:text-office-black-subtext mt-0.5">(Doctors in active state)</div> */}
                                        <div className="text-3xl font-extrabold text-office-colorful-text dark:text-white mt-2">{doctorsCount}</div>
                                    </div>
                                    <FontAwesomeIcon icon={faUserDoctor} className="text-4xl text-office-colorful-ribbon/20 dark:text-office-accent/20" />
                                </Link>
                                <Link
                                    href={route('admin.users.index', { role: 'mother', status: 'active' })}
                                    className="bg-office-colorful-bg overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border flex items-center justify-between hover:scale-[1.02] hover:shadow-md transition duration-200 cursor-pointer block"
                                >
                                    <div>
                                        <div className="text-office-colorful-ribbon text-sm uppercase font-bold tracking-wider dark:text-office-accent">Active Mothers</div>
                                        {/* <div className="text-xs text-office-colorful-subtext dark:text-office-black-subtext mt-0.5">(Mothers in active state)</div> */}
                                        <div className="text-3xl font-extrabold text-office-colorful-text dark:text-white mt-2">{mothersCount}</div>
                                    </div>
                                    <FontAwesomeIcon icon={faVenus} className="text-4xl text-office-colorful-ribbon/20 dark:text-office-accent/20" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4">Quick Shortcuts</h3>
                            <div className="flex gap-4">
                                <Link
                                    href={route('admin.users.index')}
                                    className="px-4 py-2 bg-office-colorful-ribbon text-white rounded-md hover:opacity-90 transition dark:bg-office-accent"
                                >
                                    Manage Users
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
