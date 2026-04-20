import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export default function Measurements({ auth, children = [] }) {
    const theme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light';

    // Dummy Data for Charts (Replace with real data later) - Reusing logic from Doctor's view for consistency
    const [weightData, setWeightData] = useState([
        { age: '0m', weight: 3.2, maleAvg: 3.3, femaleAvg: 3.2 },
        { age: '1m', weight: 4.5, maleAvg: 4.5, femaleAvg: 4.2 },
        { age: '2m', weight: 5.8, maleAvg: 5.6, femaleAvg: 5.1 },
        { age: '3m', weight: 6.5, maleAvg: 6.4, femaleAvg: 5.8 },
        { age: '4m', weight: 7.0, maleAvg: 7.0, femaleAvg: 6.4 },
        { age: '6m', weight: 8.2, maleAvg: 7.9, femaleAvg: 7.3 },
    ]);

    const [selectedChildId, setSelectedChildId] = useState(children && children.length > 0 ? children[0].id : null);

    const selectedChild = children?.find(c => c.id == selectedChildId);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Growth Charts (Daily Measurements)</h2>}
            breadcrumbs={[{ label: 'Growth Charts' }]}
        >
            <Head title="Measurements" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Child Selector */}
                    {children && children.length > 0 ? (
                        <div className="bg-office-colorful-surface p-4 rounded-lg shadow-sm border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <label className="block text-sm font-medium text-office-colorful-text dark:text-white mb-2">View Charts for:</label>
                            <select
                                value={selectedChildId}
                                onChange={(e) => setSelectedChildId(e.target.value)}
                                className="block w-full md:w-1/3 rounded-md border-office-colorful-border shadow-sm focus:border-office-accent focus:ring-office-accent dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text"
                            >
                                {children.map(child => (
                                    <option key={child.id} value={child.id} className="dark:bg-office-black-surface">{child.name}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="bg-office-colorful-surface p-4 rounded-lg shadow-sm border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No children registered.</p>
                        </div>
                    )}

                    {/* Charts */}
                    {selectedChild && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Weight Chart */}
                            <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                                <h3 className="text-lg font-bold mb-4 text-office-colorful-text dark:text-white">{selectedChild.name}'s Weight for Age</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={weightData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#404040' : '#e5e5e5'} />
                                            <XAxis dataKey="age" stroke={theme === 'dark' ? '#e6e6e6' : '#333'} />
                                            <YAxis stroke={theme === 'dark' ? '#e6e6e6' : '#333'} />
                                            <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#262626' : '#fff', borderColor: theme === 'dark' ? '#404040' : '#e5e5e5' }} />
                                            <Legend />
                                            <Line type="monotone" dataKey={selectedChild.sex === 'male' ? 'maleAvg' : 'femaleAvg'} stroke="#2B7CBD" name="Avg Standard" strokeDasharray="5 5" />
                                            {/* In real app, we would map selectedChild.measurements to chart data */}
                                            <Line type="monotone" dataKey="weight" stroke="#107c10" name="My Child" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Height Chart - Placeholder */}
                            <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                                <h3 className="text-lg font-bold mb-4 text-office-colorful-text dark:text-white">{selectedChild.name}'s Height for Age</h3>
                                <div className="h-64 flex items-center justify-center bg-office-colorful-bg border border-dashed border-office-colorful-border dark:bg-office-black-bg dark:border-office-black-border">
                                    <p className="text-office-colorful-subtext dark:text-office-black-subtext">Height chart data available soon.</p>
                                </div>
                            </div>

                            {/* Recent Measurements Table */}
                            <div className="col-span-1 md:col-span-2 bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                                <h3 className="text-lg font-bold mb-4 text-office-colorful-text dark:text-white">Recent Measurements Log</h3>
                                {selectedChild.measurements && selectedChild.measurements.length > 0 ? (
                                    <table className="min-w-full text-sm text-left leading-normal">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Date</th>
                                                <th className="px-4 py-2 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Weight (kg)</th>
                                                <th className="px-4 py-2 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Height (cm)</th>
                                                <th className="px-4 py-2 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Head Circ. (cm)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                            {selectedChild.measurements.map(m => (
                                                <tr key={m.id} className="border-b border-office-colorful-border dark:border-office-black-border">
                                                    <td className="px-4 py-2 text-office-colorful-text dark:text-office-black-text">{m.record_date}</td>
                                                    <td className="px-4 py-2 text-office-colorful-text dark:text-office-black-text">{m.weight}</td>
                                                    <td className="px-4 py-2 text-office-colorful-text dark:text-office-black-text">{m.height}</td>
                                                    <td className="px-4 py-2 text-office-colorful-text dark:text-office-black-text">{m.head_circumference}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-office-colorful-subtext italic dark:text-office-black-subtext">No measurements recorded yet.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
