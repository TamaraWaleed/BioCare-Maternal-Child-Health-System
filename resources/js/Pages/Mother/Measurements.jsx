import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

export default function Measurements({ auth, children = [] }) {
    const theme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light';

    const [selectedChildId, setSelectedChildId] = useState(children && children.length > 0 ? children[0].id : null);
    const selectedChild = children?.find(c => c.id == selectedChildId);

    // Generate dynamic chart data based on selected child's measurements
    const generateChartData = () => {
        const baseMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const standardWeightMale = [3.3, 4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6];
        const standardWeightFemale = [3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9];
        const standardHeightMale = [49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3, 74.5, 75.7];
        const standardHeightFemale = [49.1, 53.7, 57.1, 59.8, 62.1, 64.0, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74.0];

        const childMeasurementsByMonth = {};
        if (selectedChild && selectedChild.measurements) {
            selectedChild.measurements.forEach(m => {
                if (selectedChild.birth_date) {
                    const birth = new Date(selectedChild.birth_date);
                    const record = new Date(m.record_date);
                    const months = (record.getFullYear() - birth.getFullYear()) * 12 + (record.getMonth() - birth.getMonth());
                    if (months >= 0 && months <= 12) {
                        // Reverse array order means newest overwrites oldest, we want newest per month if any
                        if (!childMeasurementsByMonth[months] || new Date(m.record_date) > new Date(childMeasurementsByMonth[months].record_date)) {
                            childMeasurementsByMonth[months] = {
                                weight: parseFloat(m.weight),
                                height: parseFloat(m.height),
                                record_date: m.record_date
                            };
                        }
                    }
                }
            });
        }

        return baseMonths.map(month => ({
            age: `${month}m`,
            maleAvgWeight: standardWeightMale[month],
            femaleAvgWeight: standardWeightFemale[month],
            maleAvgHeight: standardHeightMale[month],
            femaleAvgHeight: standardHeightFemale[month],
            childWeight: childMeasurementsByMonth[month]?.weight || null,
            childHeight: childMeasurementsByMonth[month]?.height || null,
        }));
    };

    const chartData = generateChartData();



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
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#404040' : '#e5e5e5'} />
                                            <XAxis dataKey="age" stroke={theme === 'dark' ? '#e6e6e6' : '#333'} />
                                            <YAxis stroke={theme === 'dark' ? '#e6e6e6' : '#333'} />
                                            <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#262626' : '#fff', borderColor: theme === 'dark' ? '#404040' : '#e5e5e5' }} />
                                            <Legend />
                                            <Line type="monotone" dataKey={selectedChild.sex === 'male' ? 'maleAvgWeight' : 'femaleAvgWeight'} stroke="#2B7CBD" name="Avg Standard" strokeDasharray="5 5" connectNulls />
                                            <Line type="monotone" dataKey="childWeight" stroke="#107c10" name="My Child" strokeWidth={2} connectNulls />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Height Chart */}
                            <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                                <h3 className="text-lg font-bold mb-4 text-office-colorful-text dark:text-white">{selectedChild.name}'s Height for Age</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#404040' : '#e5e5e5'} />
                                            <XAxis dataKey="age" stroke={theme === 'dark' ? '#e6e6e6' : '#333'} />
                                            <YAxis stroke={theme === 'dark' ? '#e6e6e6' : '#333'} />
                                            <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#262626' : '#fff', borderColor: theme === 'dark' ? '#404040' : '#e5e5e5' }} />
                                            <Legend />
                                            <Line type="monotone" dataKey={selectedChild.sex === 'male' ? 'maleAvgHeight' : 'femaleAvgHeight'} stroke="#2B7CBD" name="Avg Standard" strokeDasharray="5 5" connectNulls />
                                            <Line type="monotone" dataKey="childHeight" stroke="#d13b3b" name="My Child" strokeWidth={2} connectNulls />
                                        </LineChart>
                                    </ResponsiveContainer>
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
