import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeartbeat, faBabyCarriage, faExclamationTriangle, faMicroscope,
    faHandsHelping, faCalendarAlt, faSyringe, faWeight,
    faBookMedical, faShieldAlt, faBaby, faBullhorn, faDownload
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard({ auth, mother, announcements, upcomingVisits }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Mother Dashboard (Welcome {auth.user.name})</h2>}
            breadcrumbs={[]}
        >
            <Head title="Mother Dashboard" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Sidebar Links */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faHeartbeat} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                My Health
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('mother.antenatal')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faHeartbeat} className="mr-2 w-4" /> Medical Examination
                                </Link>
                                <Link href={route('mother.previous_pregnancies')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faBabyCarriage} className="mr-2 w-4" /> Prev. Pregnancies
                                </Link>
                                <Link href={route('mother.risks')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 w-4" /> Risks & History
                                </Link>
                                <Link href={route('mother.uss')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faMicroscope} className="mr-2 w-4" /> USS Examination
                                </Link>
                                <Link href={route('mother.family_planning')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faHandsHelping} className="mr-2 w-4" /> Family Planning
                                </Link>
                                <Link href={route('mother.visits')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 w-4" /> Visit Schedule
                                </Link>
                            </div>
                        </div>

                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faBaby} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Children Info
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('mother.vaccinations')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faSyringe} className="mr-2 w-4" /> Vaccination Schedule
                                </Link>
                                <Link href={route('mother.measurements')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faWeight} className="mr-2 w-4" /> Daily Measurements
                                </Link>
                            </div>
                        </div>

                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-4 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="font-bold text-office-colorful-text dark:text-white mb-3 uppercase text-xs tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faBookMedical} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Resources
                            </h3>
                            <div className="flex flex-col space-y-2">
                                <Link href={route('mother.guides')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faBookMedical} className="mr-2 w-4" /> Health Guides
                                </Link>
                                <Link href={route('mother.safety_tips')} className="text-sm text-office-colorful-subtext hover:text-office-colorful-ribbon dark:text-office-black-subtext dark:hover:text-office-accent transition flex items-center">
                                    <FontAwesomeIcon icon={faShieldAlt} className="mr-2 w-4" /> Safety Tips
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Dashboard Content */}
                    <div className="md:col-span-3">
                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-office-colorful-text dark:text-white">Visit Schedule</h3>
                                <Link href={route('mother.visits')} className="text-sm text-office-colorful-ribbon hover:underline dark:text-office-accent">View All</Link>
                            </div>
                            {upcomingVisits && upcomingVisits.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingVisits.map((visit) => (
                                        <div key={visit.id} className="flex items-center p-3 bg-office-colorful-bg rounded-lg dark:bg-office-black-bg border border-transparent hover:border-office-colorful-border dark:hover:border-office-black-border transition">
                                            <div className="bg-white p-2 rounded-md shadow-sm mr-4 dark:bg-office-black-surface">
                                                <div className="text-xs font-bold text-office-colorful-ribbon dark:text-office-accent uppercase text-center">
                                                    {new Date(visit.appointment_date).toLocaleString('default', { month: 'short' })}
                                                </div>
                                                <div className="text-lg font-bold text-office-colorful-text dark:text-white text-center">
                                                    {new Date(visit.appointment_date).getDate()}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-office-colorful-text dark:text-white">{visit.notes || 'Routine Checkup'}</h4>
                                                <p className="text-xs text-office-colorful-subtext dark:text-office-black-subtext">{new Date(visit.appointment_date).toDateString()}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${visit.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                                {visit.status.toUpperCase()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-office-colorful-subtext italic dark:text-office-black-subtext">No upcoming visits scheduled.</p>
                            )}
                        </div>

                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-2">My Children</h3>
                            {mother.children && mother.children.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {mother.children.map((child) => (
                                        <div key={child.id} className="border border-office-colorful-border rounded-lg p-4 hover:shadow-md transition dark:border-office-black-border dark:bg-office-black-bg flex items-center">
                                            <div className="bg-office-colorful-bg p-3 rounded-full mr-4 dark:bg-office-black-bg">
                                                <FontAwesomeIcon icon={faBaby} className="text-office-colorful-ribbon text-xl dark:text-office-accent" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-office-colorful-text dark:text-white">{child.name}</h4>
                                                <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext">DOB: {child.birth_date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-office-colorful-subtext italic dark:text-office-black-subtext">No children registered yet.</p>
                            )}
                        </div>

                        {/* Recent Announcements (Main Area) */}
                        <div className="bg-office-colorful-surface shadow-sm sm:rounded-lg p-6 mb-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4 flex items-center">
                                <FontAwesomeIcon icon={faBullhorn} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Latest Announcements
                            </h3>
                            {announcements && announcements.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {announcements.map((ad) => (
                                        <div key={ad.id} className="p-4 bg-office-colorful-bg border-l-4 border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-accent">
                                            <h4 className="font-bold text-office-colorful-text dark:text-white">{ad.title}</h4>
                                            <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext mt-2">{ad.content}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-office-colorful-subtext italic dark:text-office-black-subtext">No new announcements from medical staff.</p>
                            )}
                        </div>



                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
