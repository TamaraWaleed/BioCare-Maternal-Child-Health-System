import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPrint, faUser, faBaby, faNotesMedical, faExclamationTriangle, faStethoscope, faSyringe } from '@fortawesome/free-solid-svg-icons';

export default function ShowMother({ 
    auth, mother, previousPregnancies, obstetricalRisks, currentRisks, 
    ussExaminations, postnatalExaminations, antenatalRecords, 
    vaccinations, preventiveExams, newbornAssessments 
}) {
    const profile = mother.mother_profile || {};
    const children = mother.children || [];

    const handlePrint = () => {
        window.print();
    };

    const SectionHeader = ({ icon, title }) => (
        <h3 className="text-lg font-bold text-office-colorful-text dark:text-white mb-4 mt-8 uppercase tracking-wider border-b pb-2 flex items-center print:text-black print:border-black print:mt-6">
            <FontAwesomeIcon icon={icon} className="mr-2 text-office-colorful-ribbon dark:text-office-accent print:text-black" />
            {title}
        </h3>
    );

    const EmptyRow = ({ colSpan, text }) => (
        <tr>
            <td colSpan={colSpan} className="px-5 py-3 border border-gray-300 text-sm text-center italic text-gray-500 bg-white dark:bg-office-black-bg dark:border-office-black-border print:border-black print:text-black">
                {text}
            </td>
        </tr>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center print:hidden">
                    <h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Comprehensive Patient Report</h2>
                    <PrimaryButton onClick={handlePrint} className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faPrint} /> Print Report
                    </PrimaryButton>
                </div>
            }
            breadcrumbs={[{ label: 'Comprehensive Patient Report' }]}
        >
            <Head title={`Report - ${mother.name}`} />

            <div className="py-12 min-h-screen print:py-0 print:bg-white print:text-black">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 print:max-w-full print:px-0">
                    
                    <div className="flex justify-start print:hidden">
                        <Link
                            href={route('admin.reports.mothers')}
                            className="bg-office-colorful-ribbon hover:bg-office-colorful-ribbon/90 text-white font-bold py-2 px-4 rounded-full shadow transition flex items-center gap-2 text-xs uppercase tracking-widest"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} /> Back to Mothers Report
                        </Link>
                    </div>

                    {/* Print Only Header */}
                    <div className="hidden print:block text-center mb-8 border-b-2 border-black pb-4">
                        <h1 className="text-2xl font-bold uppercase mb-1">BioCare Maternal Child Health System</h1>
                        <h2 className="text-xl">Comprehensive Medical Report</h2>
                        <p className="text-sm mt-2">Generated on: {new Date().toLocaleString()}</p>
                        <p className="text-sm mt-1">Patient: <strong>{mother.name}</strong> (ID: {mother.id})</p>
                    </div>

                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border print:shadow-none print:border-none print:p-0">
                        
                        <SectionHeader icon={faUser} title="Mother Information" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 print:grid-cols-4 text-sm">
                            <div><strong className="block text-gray-500 print:text-gray-700">Name</strong>{mother.name}</div>
                            <div><strong className="block text-gray-500 print:text-gray-700">Email</strong>{mother.email}</div>
                            <div><strong className="block text-gray-500 print:text-gray-700">Phone</strong>{profile.phone || 'N/A'}</div>
                            <div><strong className="block text-gray-500 print:text-gray-700">City</strong>{profile.city || 'N/A'}</div>
                            <div><strong className="block text-gray-500 print:text-gray-700">Birth Date</strong>{profile.birth_date || 'N/A'}</div>
                            <div><strong className="block text-gray-500 print:text-gray-700">Blood Type</strong>{profile.blood_group} {profile.rh_factor}</div>
                            <div><strong className="block text-gray-500 print:text-gray-700">Husband Name</strong>{profile.husband_name || 'N/A'}</div>
                            <div><strong className="block text-gray-500 print:text-gray-700">Health Center</strong>{profile.maternity_center || 'N/A'}</div>
                        </div>

                        <SectionHeader icon={faBaby} title="Registered Children" />
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-left mb-6 print:border-black text-sm">
                            <thead className="bg-gray-100 dark:bg-office-black-bg print:bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">ID</th>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">Name</th>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">Birth Date</th>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">Sex</th>
                                </tr>
                            </thead>
                            <tbody>
                                {children.length > 0 ? children.map(child => (
                                    <tr key={child.id} className="bg-white dark:bg-office-black-surface">
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{child.id}</td>
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{child.name}</td>
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{child.birth_date}</td>
                                        <td className="border border-gray-300 px-4 py-2 print:border-black capitalize">{child.sex}</td>
                                    </tr>
                                )) : <EmptyRow colSpan={4} text="No children registered." />}
                            </tbody>
                        </table>

                        <SectionHeader icon={faStethoscope} title="Antenatal Records" />
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-left mb-6 print:border-black text-sm">
                            <thead className="bg-gray-100 dark:bg-office-black-bg print:bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">Visit Date</th>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">Weight</th>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">BP</th>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">Fetal Heartbeat</th>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">Presentation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {antenatalRecords.length > 0 ? antenatalRecords.map(record => (
                                    <tr key={record.id} className="bg-white dark:bg-office-black-surface">
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{record.appointment?.appointment_date}</td>
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{record.weight}</td>
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{record.blood_pressure}</td>
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{record.fetal_heartbeat}</td>
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{record.presentation}</td>
                                    </tr>
                                )) : <EmptyRow colSpan={5} text="No antenatal records." />}
                            </tbody>
                        </table>

                        <SectionHeader icon={faNotesMedical} title="Postnatal Examinations" />
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-left mb-6 print:border-black text-sm">
                            <thead className="bg-gray-100 dark:bg-office-black-bg print:bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">Visit Date</th>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">Days After Delivery</th>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">BP</th>
                                    <th className="border border-gray-300 px-4 py-2 font-bold print:border-black">Assessment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postnatalExaminations.length > 0 ? postnatalExaminations.map(record => (
                                    <tr key={record.id} className="bg-white dark:bg-office-black-surface">
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{record.date_of_visit}</td>
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{record.days_after_delivery}</td>
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{record.bp}</td>
                                        <td className="border border-gray-300 px-4 py-2 print:border-black">{record.assessment_status}</td>
                                    </tr>
                                )) : <EmptyRow colSpan={4} text="No postnatal examinations." />}
                            </tbody>
                        </table>

                        <SectionHeader icon={faExclamationTriangle} title="Risks (Obstetrical & Current)" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 className="font-bold mb-2">Obstetrical Risks (Total: {obstetricalRisks.length})</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    {obstetricalRisks.map(r => (
                                        <li key={r.id}>Recorded on: {r.date_of_test}</li>
                                    ))}
                                    {obstetricalRisks.length === 0 && <li className="italic text-gray-500">None</li>}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Current Risks (Total: {currentRisks.length})</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    {currentRisks.map(r => (
                                        <li key={r.id}>Visit Date: {r.date_of_visit} (Gestational Age: {r.gestational_age})</li>
                                    ))}
                                    {currentRisks.length === 0 && <li className="italic text-gray-500">None</li>}
                                </ul>
                            </div>
                        </div>

                        <SectionHeader icon={faSyringe} title="Children Vaccinations & Preventives" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 className="font-bold mb-2">Vaccinations</h4>
                                <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-left print:border-black text-sm">
                                    <thead className="bg-gray-100 dark:bg-office-black-bg print:bg-gray-200">
                                        <tr>
                                            <th className="border border-gray-300 px-2 py-1 font-bold print:border-black">Child ID</th>
                                            <th className="border border-gray-300 px-2 py-1 font-bold print:border-black">Vaccine</th>
                                            <th className="border border-gray-300 px-2 py-1 font-bold print:border-black">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vaccinations.length > 0 ? vaccinations.map(v => (
                                            <tr key={v.id} className="bg-white dark:bg-office-black-surface">
                                                <td className="border border-gray-300 px-2 py-1 print:border-black">{v.child_id}</td>
                                                <td className="border border-gray-300 px-2 py-1 print:border-black">{v.vaccine_name}</td>
                                                <td className="border border-gray-300 px-2 py-1 print:border-black">{v.visit_date}</td>
                                            </tr>
                                        )) : <EmptyRow colSpan={3} text="None" />}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Preventive Exams</h4>
                                <table className="min-w-full border-collapse border border-gray-300 dark:border-office-black-border text-left print:border-black text-sm">
                                    <thead className="bg-gray-100 dark:bg-office-black-bg print:bg-gray-200">
                                        <tr>
                                            <th className="border border-gray-300 px-2 py-1 font-bold print:border-black">Child ID</th>
                                            <th className="border border-gray-300 px-2 py-1 font-bold print:border-black">Exam</th>
                                            <th className="border border-gray-300 px-2 py-1 font-bold print:border-black">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {preventiveExams.length > 0 ? preventiveExams.map(e => (
                                            <tr key={e.id} className="bg-white dark:bg-office-black-surface">
                                                <td className="border border-gray-300 px-2 py-1 print:border-black">{e.child_id}</td>
                                                <td className="border border-gray-300 px-2 py-1 print:border-black">{e.examination_name}</td>
                                                <td className="border border-gray-300 px-2 py-1 print:border-black">{e.result}</td>
                                            </tr>
                                        )) : <EmptyRow colSpan={3} text="None" />}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Global print styles */}
            <style>{`
                @media print {
                    nav, header, .waves-wrapper {
                        display: none !important;
                    }
                    body {
                        background-color: white !important;
                        color: black !important;
                        -webkit-print-color-adjust: exact;
                    }
                    .content-overlay {
                        padding-top: 0 !important;
                    }
                    .min-h-screen {
                        min-height: 0 !important;
                    }
                    /* Ensure tables don't break across pages ungracefully */
                    table { page-break-inside:auto }
                    tr    { page-break-inside:avoid; page-break-after:auto }
                    thead { display:table-header-group }
                    tfoot { display:table-footer-group }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
