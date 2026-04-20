import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClipboardCheck, faPlusCircle, faBaby,
    faCalendarAlt, faStethoscope, faNotesMedical,
    faUserDoctor, faSave, faTimes
} from '@fortawesome/free-solid-svg-icons';

export default function Create({ auth, children, doctors }) {
    const { data, setData, post, processing, errors } = useForm({
        child_id: '',
        date: '',
        illness_problem: '',
        treatment: '',
        notes: '',
        doctor_user_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('nurse.child-followup.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight flex items-center">
                    <FontAwesomeIcon icon={faPlusCircle} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                    Add Follow-up Record
                </h2>
            }
            breadcrumbs={[
                { label: 'Child Follow-up', href: route('nurse.child-followup.index') },
                { label: 'Add' }
            ]}
        >
            <Head title="Add Follow-up" />

            <div className="py-12 min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-8 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <div className="mb-8 border-b border-office-colorful-border pb-4 dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white flex items-center">
                                <FontAwesomeIcon icon={faClipboardCheck} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Record Details
                            </h3>
                            <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext mt-1">
                                Please fill in the details for the child's follow-up visit.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-office-colorful-subtext dark:text-office-black-subtext font-bold uppercase text-xs tracking-wider mb-2 block flex items-center">
                                        <FontAwesomeIcon icon={faBaby} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                        Select Child
                                    </label>
                                    <select
                                        className="mt-1 block w-full bg-office-colorful-bg border-office-colorful-border text-office-colorful-text rounded-md shadow-sm focus:ring-office-colorful-ribbon focus:border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-white dark:focus:ring-office-accent dark:focus:border-office-accent"
                                        value={data.child_id}
                                        onChange={(e) => setData('child_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Child</option>
                                        {children.map((child) => (
                                            <option key={child.id} value={child.id}>{child.name}</option>
                                        ))}
                                    </select>
                                    {errors.child_id && <div className="text-red-500 text-xs mt-1">{errors.child_id}</div>}
                                </div>

                                <div>
                                    <label className="text-office-colorful-subtext dark:text-office-black-subtext font-bold uppercase text-xs tracking-wider mb-2 block flex items-center">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                        Date of Visit
                                    </label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full bg-office-colorful-bg border-office-colorful-border text-office-colorful-text rounded-md shadow-sm focus:ring-office-colorful-ribbon focus:border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-white dark:focus:ring-office-accent dark:focus:border-office-accent"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        required
                                    />
                                    {errors.date && <div className="text-red-500 text-xs mt-1">{errors.date}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="text-office-colorful-subtext dark:text-office-black-subtext font-bold uppercase text-xs tracking-wider mb-2 block flex items-center">
                                    <FontAwesomeIcon icon={faStethoscope} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                    Illness / Problem Description
                                </label>
                                <textarea
                                    className="mt-1 block w-full bg-office-colorful-bg border-office-colorful-border text-office-colorful-text rounded-md shadow-sm focus:ring-office-colorful-ribbon focus:border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-white dark:focus:ring-office-accent dark:focus:border-office-accent"
                                    rows="3"
                                    placeholder="Describe the illness or reason for follow-up..."
                                    value={data.illness_problem}
                                    onChange={(e) => setData('illness_problem', e.target.value)}
                                ></textarea>
                                {errors.illness_problem && <div className="text-red-500 text-xs mt-1">{errors.illness_problem}</div>}
                            </div>

                            <div>
                                <label className="text-office-colorful-subtext dark:text-office-black-subtext font-bold uppercase text-xs tracking-wider mb-2 block flex items-center">
                                    <FontAwesomeIcon icon={faNotesMedical} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                    Treatment Provided
                                </label>
                                <textarea
                                    className="mt-1 block w-full bg-office-colorful-bg border-office-colorful-border text-office-colorful-text rounded-md shadow-sm focus:ring-office-colorful-ribbon focus:border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-white dark:focus:ring-office-accent dark:focus:border-office-accent"
                                    rows="3"
                                    placeholder="Describe the treatment or medication given..."
                                    value={data.treatment}
                                    onChange={(e) => setData('treatment', e.target.value)}
                                ></textarea>
                                {errors.treatment && <div className="text-red-500 text-xs mt-1">{errors.treatment}</div>}
                            </div>

                            <div>
                                <label className="text-office-colorful-subtext dark:text-office-black-subtext font-bold uppercase text-xs tracking-wider mb-2 block flex items-center">
                                    <FontAwesomeIcon icon={faUserDoctor} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                    Doctor (Optional)
                                </label>
                                <select
                                    className="mt-1 block w-full bg-office-colorful-bg border-office-colorful-border text-office-colorful-text rounded-md shadow-sm focus:ring-office-colorful-ribbon focus:border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-white dark:focus:ring-office-accent dark:focus:border-office-accent"
                                    value={data.doctor_user_id}
                                    onChange={(e) => setData('doctor_user_id', e.target.value)}
                                >
                                    <option value="">Select Doctor</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                    ))}
                                </select>
                                {errors.doctor_user_id && <div className="text-red-500 text-xs mt-1">{errors.doctor_user_id}</div>}
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t border-office-colorful-border dark:border-office-black-border">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-office-colorful-ribbon text-white font-bold rounded-md hover:opacity-90 transition flex items-center shadow-md dark:bg-office-accent disabled:opacity-50"
                                >
                                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                                    Save Follow-up
                                </button>
                                <Link
                                    href={route('nurse.child-followup.index')}
                                    className="px-6 py-2.5 bg-office-colorful-bg text-office-colorful-text font-bold rounded-md hover:bg-office-colorful-border transition flex items-center dark:bg-office-black-bg dark:text-white dark:hover:bg-office-black-border"
                                >
                                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
