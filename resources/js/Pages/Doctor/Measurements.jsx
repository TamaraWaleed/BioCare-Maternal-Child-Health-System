import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import Swal from 'sweetalert2';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Measurements({ auth }) {
    // Dummy Data for Charts (Replace with real data later)
    const [weightData, setWeightData] = useState([
        { age: '0m', weight: 3.2, maleAvg: 3.3, femaleAvg: 3.2 },
        { age: '1m', weight: 4.5, maleAvg: 4.5, femaleAvg: 4.2 },
        { age: '2m', weight: 5.8, maleAvg: 5.6, femaleAvg: 5.1 },
        { age: '3m', weight: 6.5, maleAvg: 6.4, femaleAvg: 5.8 },
        { age: '4m', weight: 7.0, maleAvg: 7.0, femaleAvg: 6.4 },
        { age: '6m', weight: 8.2, maleAvg: 7.9, femaleAvg: 7.3 },
    ]);

    const { data, setData, post, processing, errors } = useForm({
        child_id: '',
        date: '',
        age_months: '',
        weight: '',
        height: '',
        head_circumference: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Placeholder route
        // post(route('doctor.measurements.store'));
        const theme = localStorage.getItem('theme') || 'light';
        Swal.fire({
            title: 'Saved!',
            text: 'Measurement saved (demo)',
            icon: 'success',
            background: theme === 'dark' ? '#2b2b2b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Child Growth Records (Measurements)</h2>}
            breadcrumbs={[{ label: 'Measurements' }]}
        >
            <Head title="Measurements" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Entry Form */}
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <h3 className="text-lg font-bold mb-4 text-office-colorful-text dark:text-white">Add New Measurement</h3>
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <InputLabel htmlFor="child_id" value="Child ID / Name" />
                                <TextInput
                                    id="child_id"
                                    className="mt-1 block w-full"
                                    value={data.child_id}
                                    onChange={(e) => setData('child_id', e.target.value)}
                                    placeholder="Search child..."
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="date" value="Date" />
                                <TextInput
                                    id="date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="age_months" value="Age (Months)" />
                                <TextInput
                                    id="age_months"
                                    className="mt-1 block w-full"
                                    value={data.age_months}
                                    onChange={(e) => setData('age_months', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="weight" value="Weight (kg)" />
                                <TextInput
                                    id="weight"
                                    className="mt-1 block w-full"
                                    value={data.weight}
                                    onChange={(e) => setData('weight', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="height" value="Height (cm)" />
                                <TextInput
                                    id="height"
                                    className="mt-1 block w-full"
                                    value={data.height}
                                    onChange={(e) => setData('height', e.target.value)}
                                />
                            </div>
                            <div className="flex items-end">
                                <PrimaryButton disabled={processing}>
                                    Save Measurement
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Weight Chart */}
                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold mb-4 text-office-colorful-text dark:text-white">Weight for Age (0-6 months)</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={weightData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={localStorage.getItem('theme') === 'dark' ? '#404040' : '#e5e5e5'} />
                                        <XAxis dataKey="age" stroke={localStorage.getItem('theme') === 'dark' ? '#e6e6e6' : '#333'} />
                                        <YAxis stroke={localStorage.getItem('theme') === 'dark' ? '#e6e6e6' : '#333'} />
                                        <Tooltip contentStyle={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? '#262626' : '#fff', borderColor: localStorage.getItem('theme') === 'dark' ? '#404040' : '#e5e5e5' }} />
                                        <Legend />
                                        <Line type="monotone" dataKey="maleAvg" stroke="#2B7CBD" name="Avg Male" strokeDasharray="5 5" />
                                        <Line type="monotone" dataKey="weight" stroke="#107c10" name="Child Weight" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Height Chart - Placeholder */}
                        <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <h3 className="text-lg font-bold mb-4 text-office-colorful-text dark:text-white">Height for Age (Placeholder)</h3>
                            <div className="h-64 flex items-center justify-center bg-office-colorful-bg border border-dashed border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border">
                                <p className="text-office-colorful-subtext dark:text-office-black-subtext">Select a child to view height charts</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
