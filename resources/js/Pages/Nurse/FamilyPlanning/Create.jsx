import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandsHelping, faPlusCircle, faVenus,
    faQuestionCircle, faHistory, faCheckCircle,
    faNotesMedical, faSave, faTimes
} from '@fortawesome/free-solid-svg-icons';

export default function Create({ auth, mothers }) {
    const { data, setData, post, processing, errors } = useForm({
        mother_user_id: '',
        q1: '',
        q2: '',
        family_planning_method: '',
        q3: '',
        q4: '',
        q5: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('nurse.family-planning.store'));
    };

    const RadioGroup = ({ label, name, value, onChange, options = [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }] }) => (
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <span className="text-sm font-bold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider min-w-[320px]">{label}</span>
            <div className="flex items-center gap-6">
                {options.map((opt) => (
                    <label key={opt.value} className="inline-flex items-center cursor-pointer group">
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-5 h-5 text-office-colorful-ribbon border-office-colorful-border focus:ring-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-office-accent dark:focus:ring-office-accent"
                        />
                        <span className="ml-3 text-sm font-medium text-office-colorful-text dark:text-gray-300 group-hover:text-office-colorful-ribbon dark:group-hover:text-office-accent transition-colors">{opt.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight flex items-center">
                    <FontAwesomeIcon icon={faPlusCircle} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                    Add Family Planning Record
                </h2>
            }
            breadcrumbs={[
                { label: 'Family Planning', href: route('nurse.family-planning.index') },
                { label: 'Add' }
            ]}
        >
            <Head title="Add Family Planning" />

            <div className="py-12 min-h-screen">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-8 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <div className="mb-10 border-b border-office-colorful-border pb-6 dark:border-office-black-border">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white flex items-center">
                                <FontAwesomeIcon icon={faHandsHelping} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                Family Planning Assessment
                            </h3>
                            <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext mt-1">
                                Complete the assessment form for family planning counseling and services.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Mother Selection */}
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                                <label className="text-sm font-bold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider min-w-[320px] flex items-center">
                                    <FontAwesomeIcon icon={faVenus} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                    Select Mother:
                                </label>
                                <div className="flex-1 max-w-md">
                                    <select
                                        className="block w-full bg-office-colorful-bg border-office-colorful-border text-office-colorful-text rounded-md shadow-sm focus:ring-office-colorful-ribbon focus:border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-white dark:focus:ring-office-accent dark:focus:border-office-accent transition-all"
                                        value={data.mother_user_id}
                                        onChange={(e) => setData('mother_user_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Mother</option>
                                        {mothers.map((mother) => (
                                            <option key={mother.id} value={mother.id}>{mother.name} (ID: {mother.id})</option>
                                        ))}
                                    </select>
                                    {errors.mother_user_id && <div className="text-red-500 text-xs mt-1 font-medium">{errors.mother_user_id}</div>}
                                </div>
                            </div>

                            {/* Question 1 */}
                            <RadioGroup
                                label="Do you want to use family planning methods now?"
                                name="q1"
                                value={data.q1}
                                onChange={(val) => setData('q1', val)}
                            />

                            {/* Question 2 */}
                            <RadioGroup
                                label="Have you ever used family planning methods?"
                                name="q2"
                                value={data.q2}
                                onChange={(val) => setData('q2', val)}
                            />

                            {/* Question 3 & 4 */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider block flex items-center">
                                    <FontAwesomeIcon icon={faHistory} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                    What is the method that you used for family planning?
                                </label>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-8 pl-6 border-l-2 border-office-colorful-border dark:border-office-black-border">
                                    <div className="flex-1 max-w-lg">
                                        <select
                                            className="block w-full bg-office-colorful-bg border-office-colorful-border text-office-colorful-text rounded-md shadow-sm focus:ring-office-colorful-ribbon focus:border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-white dark:focus:ring-office-accent dark:focus:border-office-accent transition-all"
                                            value={data.q3}
                                            onChange={(e) => setData('q3', e.target.value)}
                                        >
                                            <option value="">Select Method</option>
                                            <option value="Grain">Grain</option>
                                            <option value="Injection">Injection</option>
                                            <option value="Implant">Implant</option>
                                            <option value="IUD">IUD</option>
                                            <option value="Barrier">Barrier</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-sm font-medium text-office-colorful-subtext dark:text-office-black-subtext italic">Was it successful?</span>
                                        <div className="flex items-center gap-6">
                                            {['Yes', 'No'].map((opt) => (
                                                <label key={opt} className="inline-flex items-center cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="q4"
                                                        value={opt}
                                                        checked={data.q4 === opt}
                                                        onChange={(e) => setData('q4', e.target.value)}
                                                        className="w-5 h-5 text-office-colorful-ribbon border-office-colorful-border focus:ring-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-office-accent dark:focus:ring-office-accent"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-office-colorful-text dark:text-gray-300 group-hover:text-office-colorful-ribbon dark:group-hover:text-office-accent transition-colors">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Others */}
                            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                                <label className="text-sm font-bold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider min-w-[320px] pt-2 flex items-center">
                                    <FontAwesomeIcon icon={faNotesMedical} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                    Additional Notes / Others:
                                </label>
                                <div className="flex-1 max-w-xl">
                                    <textarea
                                        rows="3"
                                        className="block w-full bg-office-colorful-bg border-office-colorful-border text-office-colorful-text rounded-md shadow-sm focus:ring-office-colorful-ribbon focus:border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-white dark:focus:ring-office-accent dark:focus:border-office-accent transition-all"
                                        value={data.q5}
                                        onChange={(e) => setData('q5', e.target.value)}
                                        placeholder="Any additional details or observations..."
                                    />
                                </div>
                            </div>

                            {/* Chosen Method */}
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 pt-4">
                                <label className="text-sm font-bold text-office-colorful-subtext dark:text-office-black-subtext uppercase tracking-wider min-w-[320px] flex items-center">
                                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-office-colorful-ribbon dark:text-office-accent" />
                                    What is the chosen method?
                                </label>
                                <div className="flex-1 max-w-lg">
                                    <input
                                        type="text"
                                        className="block w-full bg-office-colorful-bg border-office-colorful-border text-office-colorful-text rounded-md shadow-sm focus:ring-office-colorful-ribbon focus:border-office-colorful-ribbon dark:bg-office-black-bg dark:border-office-black-border dark:text-white dark:focus:ring-office-accent dark:focus:border-office-accent transition-all"
                                        value={data.family_planning_method}
                                        onChange={(e) => setData('family_planning_method', e.target.value)}
                                        placeholder="Physical activity, Pills, etc."
                                    />
                                </div>
                            </div>

                            {/* Footer / Submit */}
                            <div className="flex items-center justify-end gap-6 pt-10 border-t border-office-colorful-border dark:border-office-black-border mt-10">
                                <Link
                                    href={route('nurse.family-planning.index')}
                                    className="px-6 py-2.5 bg-office-colorful-bg text-office-colorful-text font-bold rounded-md hover:bg-office-colorful-border transition flex items-center dark:bg-office-black-bg dark:text-white dark:hover:bg-office-black-border"
                                >
                                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-10 py-2.5 bg-office-colorful-ribbon text-white font-bold rounded-md hover:opacity-90 transition flex items-center shadow-md dark:bg-office-accent disabled:opacity-50"
                                >
                                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                                    {processing ? 'Saving...' : 'Save Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
