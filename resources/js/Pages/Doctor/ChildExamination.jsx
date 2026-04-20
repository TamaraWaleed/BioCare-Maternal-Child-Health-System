import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ChildExamination({ auth, children }) {
    const { data, setData, post, processing, errors } = useForm({
        child_id: '',
        examination_name: '',
        result: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('doctor.child_examination.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Child Examination</h2>}
            breadcrumbs={[{ label: 'Child Examination' }]}
        >
            <Head title="Child Examination" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="col-span-1 md:col-span-2">
                                <InputLabel htmlFor="child_id" value="Select Child" />
                                <select
                                    id="child_id"
                                    className="mt-1 block w-full border-office-colorful-border focus:border-office-accent focus:ring-office-accent rounded-md shadow-sm dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                                    value={data.child_id}
                                    onChange={(e) => setData('child_id', e.target.value)}
                                    required
                                >
                                    <option value="" className="dark:bg-office-black-surface">-- Select Child --</option>
                                    {children.map((child) => (
                                        <option key={child.id} value={child.id} className="dark:bg-office-black-surface">
                                            {child.name} (Mother: {child.mother?.name || `User #${child.mother_user_id}`})
                                        </option>
                                    ))}
                                </select>
                                {errors.child_id && <div className="text-red-500 text-sm mt-1">{errors.child_id}</div>}
                            </div>

                            <div>
                                <InputLabel htmlFor="examination_name" value="Examination Name" />
                                <TextInput
                                    id="examination_name"
                                    className="mt-1 block w-full"
                                    value={data.examination_name}
                                    onChange={(e) => setData('examination_name', e.target.value)}
                                    required
                                    placeholder="e.g. General Checkup, ENT, etc."
                                />
                                {errors.examination_name && <div className="text-red-500 text-sm mt-1">{errors.examination_name}</div>}
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <InputLabel htmlFor="result" value="Result / Findings" />
                                <TextInput
                                    id="result"
                                    className="mt-1 block w-full"
                                    value={data.result}
                                    onChange={(e) => setData('result', e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end mt-4 col-span-1 md:col-span-2">
                                <PrimaryButton disabled={processing}>
                                    Save Record
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
