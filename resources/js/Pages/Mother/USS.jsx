import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function USS({ auth, records }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">USS Examination Records</h2>}
            breadcrumbs={[{ label: 'USS Records' }]}
        >
            <Head title="USS" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        {records && records.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {records.map((scan) => (
                                    <div key={scan.id} className="border border-office-colorful-border rounded-lg p-4 bg-office-colorful-bg/30 dark:bg-office-black-bg/50 dark:border-office-black-border shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-lg text-office-colorful-ribbon dark:text-office-accent">Scan Date: {scan.date}</h4>
                                                <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext">Gestation: {scan.gestation_week}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-office-colorful-subtext block dark:text-office-black-subtext">No. of Fetuses</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{scan.no_of_fetuses}</span>
                                            </div>
                                            <div>
                                                <span className="text-office-colorful-subtext block dark:text-office-black-subtext">Heart Activity</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{scan.heart_activity}</span>
                                            </div>
                                            <div>
                                                <span className="text-office-colorful-subtext block dark:text-office-black-subtext">Placenta</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{scan.placenta}</span>
                                            </div>
                                            <div>
                                                <span className="text-office-colorful-subtext block dark:text-office-black-subtext">Presentation</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{scan.presentation}</span>
                                            </div>
                                            <div>
                                                <span className="text-office-colorful-subtext block dark:text-office-black-subtext">Est. Fetal Weight</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{scan.efw}</span>
                                            </div>
                                            <div>
                                                <span className="text-office-colorful-subtext block dark:text-office-black-subtext">EDD (Scan)</span>
                                                <span className="font-medium text-office-colorful-text dark:text-office-black-text">{scan.edd}</span>
                                            </div>
                                        </div>

                                        {(scan.congenital_anomalies === 'yes' || scan.suspected_large === 'yes' || scan.suspected_iugr === 'yes') && (
                                            <div className="mt-4 p-2 bg-red-100 text-red-800 text-xs rounded border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                                                <strong>Alerts:</strong> Anomaly: {scan.congenital_anomalies} | Large: {scan.suspected_large} | IUGR: {scan.suspected_iugr}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">No USS records found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
