import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft, faUser, faBaby, faSyringe, faWeight,
    faHeartbeat, faClipboardList, faStethoscope, faNotesMedical, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

export default function Show({
    auth, mother, schoolVaccinations = [], preventiveExams = [],
    newbornAssessments = [], followups = []
}) {
    const profile = mother.mother_profile || {};
    const children = mother.children || [];

    // State to track the currently selected child
    const [activeChildId, setActiveChildId] = useState(children[0]?.id || null);

    // Get the details for the active child
    const activeChild = children.find(c => c.id === activeChildId);
    
    // Filter child details
    const childMeasurements = activeChild?.measurements || [];
    const childClinicVaccinations = activeChild?.vaccinations || [];
    const childSchoolVaccinations = schoolVaccinations.filter(v => v.child_id === activeChildId);
    const childPreventiveExams = preventiveExams.filter(e => e.child_id === activeChildId);
    const childNewbornAssessment = newbornAssessments.find(a => a.child_id === activeChildId);
    const childFollowups = followups.filter(f => f.child_id === activeChildId);

    // Combine vaccinations for a single unified view
    const combinedVaccinations = [
        ...childClinicVaccinations.map(v => ({
            name: v.vaccine_name,
            type: 'Clinic Appointment',
            date: v.administered_date || v.scheduled_date,
            status: v.administered_date ? 'Administered' : 'Scheduled',
            extra: v.batch_number ? `Batch: ${v.batch_number}` : ''
        })),
        ...childSchoolVaccinations.map(v => ({
            name: v.vaccine_name,
            type: 'School Program',
            date: v.visit_date,
            status: 'Administered',
            extra: `Lot: ${v.lot_no || 'N/A'} (by ${v.vaccinator_name || 'N/A'})`
        }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight font-sans">Patient & Children Details</h2>}
            breadcrumbs={[{ label: 'Registered Mothers & Children', url: route('doctor.dashboard') }, { label: 'Patient Details' }]}
        >
            <Head title={`Patient Details - ${mother.name}`} />

            <div className="py-12 min-h-screen bg-office-colorful-bg/10 dark:bg-office-black-bg/50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Back Button */}
                    <div className="flex justify-start">
                        <Link
                            href={route('doctor.dashboard')}
                            className="bg-office-colorful-ribbon hover:bg-office-colorful-ribbon/90 text-white font-bold py-2 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-xs uppercase tracking-widest"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
                        </Link>
                    </div>

                    {/* Mother Information Panel (Compact / Context) */}
                    <div className="bg-office-colorful-surface shadow-md sm:rounded-xl p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border transition-all">
                        <h3 className="text-md font-bold text-office-colorful-text dark:text-white mb-4 uppercase tracking-wider border-b pb-2 flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                            Mother Profile Context
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                            <div>
                                <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Mother ID</span>
                                <span className="font-mono text-office-colorful-text dark:text-white font-medium">{mother.id}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Name</span>
                                <span className="text-office-colorful-text dark:text-white font-medium">{mother.name}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Email</span>
                                <span className="text-office-colorful-text dark:text-white font-medium">{mother.email}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Phone</span>
                                <span className="text-office-colorful-text dark:text-white font-medium">{profile.phone || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Birth Date</span>
                                <span className="text-office-colorful-text dark:text-white font-medium">{profile.birth_date || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Location</span>
                                <span className="text-office-colorful-text dark:text-white font-medium">{profile.city || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Blood Type</span>
                                <span className="text-office-colorful-text dark:text-white font-medium">{profile.blood_group ? `${profile.blood_group} ${profile.rh_factor || ''}` : 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Health Center</span>
                                <span className="text-office-colorful-text dark:text-white font-medium">{profile.maternity_center || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Children Details Area */}
                    <div className="bg-office-colorful-surface shadow-md sm:rounded-xl p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-6 gap-4">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white uppercase tracking-wider flex items-center">
                                <FontAwesomeIcon icon={faBaby} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Children Clinical Details
                            </h3>

                            {/* Children Selector Tabs */}
                            {children.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {children.map(child => (
                                        <button
                                            key={child.id}
                                            onClick={() => setActiveChildId(child.id)}
                                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                                activeChildId === child.id
                                                    ? 'bg-office-colorful-ribbon text-white shadow-md dark:bg-office-accent'
                                                    : 'bg-office-colorful-bg/30 text-office-colorful-text hover:bg-office-colorful-bg/50 dark:bg-office-black-bg dark:text-office-black-text dark:hover:bg-office-black-bg/80'
                                            }`}
                                        >
                                            <FontAwesomeIcon icon={faBaby} className="mr-1.5" />
                                            {child.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {children.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 dark:bg-office-black-bg rounded-xl border border-dashed border-gray-300 dark:border-office-black-border">
                                <FontAwesomeIcon icon={faBaby} className="text-4xl text-gray-300 dark:text-office-black-border mb-3" />
                                <p className="text-office-colorful-subtext dark:text-office-black-subtext italic">No registered children for this mother.</p>
                            </div>
                        ) : activeChild ? (
                            <div className="space-y-8 animate-fade-in">
                                {/* Child Core Info Summary Card */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-office-colorful-bg/10 dark:bg-office-black-bg/30 p-5 rounded-xl border border-office-colorful-border dark:border-office-black-border">
                                    <div>
                                        <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Child Name</span>
                                        <span className="text-md font-bold text-office-colorful-text dark:text-white">{activeChild.name}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Birth Date</span>
                                        <span className="text-sm font-semibold text-office-colorful-text dark:text-white">{activeChild.birth_date}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Gender</span>
                                        <span className="text-sm font-semibold text-office-colorful-text dark:text-white capitalize">{activeChild.sex}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider">Birth Weight</span>
                                        <span className="text-sm font-semibold text-office-colorful-text dark:text-white">{activeChild.birth_weight ? `${activeChild.birth_weight} kg` : 'N/A'}</span>
                                    </div>
                                </div>

                                {/* Newborn Assessment details */}
                                <div>
                                    <h4 className="text-md font-bold text-office-colorful-text dark:text-white mb-4 uppercase tracking-wider flex items-center border-b pb-1.5">
                                        <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                        Newborn Assessment Details
                                    </h4>
                                    {childNewbornAssessment ? (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-office-black-surface p-4 rounded-xl border border-office-colorful-border dark:border-office-black-border text-sm">
                                            <div><strong>Mode of Delivery:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1">{childNewbornAssessment.mode_of_delivery || 'N/A'}</span></div>
                                            <div><strong>Gestational Age:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1">{childNewbornAssessment.gestational_age || 'N/A'}</span></div>
                                            <div><strong>Temperature:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1">{childNewbornAssessment.temperature ? `${childNewbornAssessment.temperature} °C` : 'N/A'}</span></div>
                                            <div><strong>Pulse:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1">{childNewbornAssessment.pulse ? `${childNewbornAssessment.pulse} bpm` : 'N/A'}</span></div>
                                            <div><strong>Resp. Rate:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1">{childNewbornAssessment.resp_rate ? `${childNewbornAssessment.resp_rate}/min` : 'N/A'}</span></div>
                                            <div><strong>Height at Birth:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1">{childNewbornAssessment.height ? `${childNewbornAssessment.height} cm` : 'N/A'}</span></div>
                                            <div><strong>Head Circ.:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1">{childNewbornAssessment.head_circumference ? `${childNewbornAssessment.head_circumference} cm` : 'N/A'}</span></div>
                                            <div><strong>Jaundice:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1 capitalize">{childNewbornAssessment.jaundice || 'N/A'}</span></div>
                                            <div><strong>Cyanosis:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1 capitalize">{childNewbornAssessment.cyanosis || 'N/A'}</span></div>
                                            <div><strong>Feeding Method:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1">{childNewbornAssessment.feeding || 'N/A'}</span></div>
                                            <div className="col-span-2"><strong>Congenital Malformation:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1">{childNewbornAssessment.congenital_malformation || 'None'}</span></div>
                                            <div className="col-span-2"><strong>Remarks:</strong> <span className="text-office-colorful-subtext dark:text-office-black-subtext ml-1">{childNewbornAssessment.remarks || 'None'}</span></div>
                                        </div>
                                    ) : (
                                        <p className="text-xs italic text-office-colorful-subtext dark:text-office-black-subtext">No newborn assessment record found.</p>
                                    )}
                                </div>

                                {/* Measurements & Growth */}
                                <div>
                                    <h4 className="text-md font-bold text-office-colorful-text dark:text-white mb-4 uppercase tracking-wider flex items-center border-b pb-1.5">
                                        <FontAwesomeIcon icon={faWeight} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                        Measurements History
                                    </h4>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-center text-sm">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-office-black-bg">
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Record Date</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Weight (kg)</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Height (cm)</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Head Circumference (cm)</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {childMeasurements.length > 0 ? childMeasurements.map((m) => (
                                                    <tr key={m.id} className="bg-white dark:bg-office-black-surface hover:bg-gray-50 dark:hover:bg-office-black-surface/80">
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2">{m.record_date}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2 font-semibold">{m.weight}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2">{m.height || 'N/A'}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2">{m.head_circumference || 'N/A'}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2 italic text-left">{m.notes || '-'}</td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="5" className="px-4 py-4 text-center italic text-gray-500 bg-white dark:bg-office-black-bg dark:border-office-black-border">No measurements recorded.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Vaccinations */}
                                <div>
                                    <h4 className="text-md font-bold text-office-colorful-text dark:text-white mb-4 uppercase tracking-wider flex items-center border-b pb-1.5">
                                        <FontAwesomeIcon icon={faSyringe} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                        Vaccination & Immunization History
                                    </h4>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-center text-sm">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-office-black-bg">
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Vaccine Name</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Type</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Date</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Status</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Details / Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {combinedVaccinations.length > 0 ? combinedVaccinations.map((v, index) => (
                                                    <tr key={index} className="bg-white dark:bg-office-black-surface hover:bg-gray-50 dark:hover:bg-office-black-surface/80">
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2 font-bold text-left">{v.name}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs">{v.type}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2">{v.date}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2">
                                                            <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                v.status === 'Administered'
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                            }`}>
                                                                {v.status}
                                                            </span>
                                                        </td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs text-left italic">{v.extra || '-'}</td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="5" className="px-4 py-4 text-center italic text-gray-500 bg-white dark:bg-office-black-bg dark:border-office-black-border">No vaccinations recorded.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Preventive Examinations */}
                                <div>
                                    <h4 className="text-md font-bold text-office-colorful-text dark:text-white mb-4 uppercase tracking-wider flex items-center border-b pb-1.5">
                                        <FontAwesomeIcon icon={faStethoscope} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                        Preventive Examinations
                                    </h4>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-center text-sm">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-office-black-bg">
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Examination</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Date</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Result</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {childPreventiveExams.length > 0 ? childPreventiveExams.map((e) => (
                                                    <tr key={e.id} className="bg-white dark:bg-office-black-surface hover:bg-gray-50 dark:hover:bg-office-black-surface/80">
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2 font-semibold text-left">{e.examination_name}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2">{e.visit_date}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-left">{e.result || '-'}</td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="3" className="px-4 py-4 text-center italic text-gray-500 bg-white dark:bg-office-black-bg dark:border-office-black-border">No preventive examinations recorded.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Followups */}
                                <div>
                                    <h4 className="text-md font-bold text-office-colorful-text dark:text-white mb-4 uppercase tracking-wider flex items-center border-b pb-1.5">
                                        <FontAwesomeIcon icon={faNotesMedical} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                        Referred Follow-up History
                                    </h4>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-center text-sm">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-office-black-bg">
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Referred Date</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Illness/Problem</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Treatment</th>
                                                    <th className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-xs font-bold text-gray-700 dark:text-office-black-subtext uppercase">Doctor Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {childFollowups.length > 0 ? childFollowups.map((f) => (
                                                    <tr key={f.id} className="bg-white dark:bg-office-black-surface hover:bg-gray-50 dark:hover:bg-office-black-surface/80">
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2">{f.date}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-left font-semibold">{f.illness_problem || '-'}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-left">{f.treatment || '-'}</td>
                                                        <td className="border border-gray-300 dark:border-office-black-border px-4 py-2 text-left italic">{f.notes || '-'}</td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="4" className="px-4 py-4 text-center italic text-gray-500 bg-white dark:bg-office-black-bg dark:border-office-black-border">No referred follow-ups recorded.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
