import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBed, faHome, faSoap, faCar, faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

export default function SafetyTips({ auth }) {
    const [selectedTip, setSelectedTip] = useState(null);

    const safetyTips = [
        {
            title: 'Safe Sleep Environment',
            description: 'Preventing SIDS and ensuring your baby sleeps soundly and safely.',
            icon: <FontAwesomeIcon icon={faBed} />,
            content: (
                <div className="space-y-4">
                    <p>Creating a safe sleep environment is one of the most important things you can do for your baby's safety.</p>
                    <h4 className="font-bold text-office-colorful-ribbon dark:text-office-accent">Safe Sleep Rules:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Back to Sleep:</strong> Always place your baby on their back to sleep, for every sleep.</li>
                        <li><strong>Clear Crib:</strong> Keep the sleep area free of blankets, pillows, bumpers, or toys.</li>
                        <li><strong>Firm Surface:</strong> Use a firm, flat sleep surface (a mattress in a safety-approved crib).</li>
                        <li><strong>Room Share:</strong> Share a room with your baby, but not a bed, for at least the first 6 months.</li>
                    </ul>
                </div>
            )
        },
        {
            title: 'Home Safety & Baby Proofing',
            description: 'Identifying and removing hazards as your baby starts to move.',
            icon: <FontAwesomeIcon icon={faHome} />,
            content: (
                <div className="space-y-4">
                    <p>As your child grows, their curiosity grows too. Baby proofing your home is essential.</p>
                    <h4 className="font-bold text-office-colorful-ribbon dark:text-office-accent">Safety Checklist:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Outlet Covers:</strong> Cover all unused electrical outlets.</li>
                        <li><strong>Gating:</strong> Use safety gates at the top and bottom of stairs.</li>
                        <li><strong>Locked Cabinets:</strong> Keep cleaning supplies, medicines, and small objects in locked cabinets.</li>
                        <li><strong>Anchoring Furniture:</strong> Secure heavy furniture (like bookshelves and TVs) to the wall.</li>
                    </ul>
                </div>
            )
        },
        {
            title: 'Kitchen & Bath Safety',
            description: 'Preventing burns, scalds, and drowning hazards.',
            icon: <FontAwesomeIcon icon={faSoap} />,
            content: (
                <div className="space-y-4">
                    <p>The kitchen and bathroom can be high-risk areas for young children.</p>
                    <h4 className="font-bold text-office-colorful-ribbon dark:text-office-accent">Key Precautions:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Water Temperature:</strong> Set your water heater to 120°F (49°C) or lower to prevent scalds.</li>
                        <li><strong>Constant Supervision:</strong> Never leave a child unattended in the bathtub, even for a second.</li>
                        <li><strong>Back Burners:</strong> Use back burners on the stove and turn pot handles toward the back.</li>
                        <li><strong>Sharp Objects:</strong> Keep knives and scissors in a locked drawer or high out of reach.</li>
                    </ul>
                </div>
            )
        },
        {
            title: 'Safe Travel & Car Seats',
            description: 'Keeping your child protected while on the move.',
            icon: <FontAwesomeIcon icon={faCar} />,
            content: (
                <div className="space-y-4">
                    <p>Ensuring your child is properly restrained in a vehicle is a critical safety measure.</p>
                    <h4 className="font-bold text-office-colorful-ribbon dark:text-office-accent">Travel Guidelines:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Rear-Facing:</strong> Keep children in a rear-facing car seat for as long as possible (until they reach the height/weight limit).</li>
                        <li><strong>Proper Installation:</strong> Ensure the car seat is tightly secured and the harness is snug.</li>
                        <li><strong>No Loose Items:</strong> Avoid leaving heavy objects loose in the car that could fly around during a stop.</li>
                        <li><strong>Stroller Safety:</strong> Always use the safety straps and set the brakes when stopped.</li>
                    </ul>
                </div>
            )
        },
        {
            title: 'Emergency Readiness',
            description: 'Being prepared for the unexpected.',
            icon: <FontAwesomeIcon icon={faExclamationCircle} />,
            content: (
                <div className="space-y-4">
                    <p>Knowing what to do in an emergency can save precious time and lives.</p>
                    <h4 className="font-bold text-office-colorful-ribbon dark:text-office-accent">Preparation Steps:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Post Emergency Numbers:</strong> Keep numbers for your doctor, local hospital, and poison control near the phone.</li>
                        <li><strong>Learn First Aid/CPR:</strong> Take a class specifically for infant and child CPR.</li>
                        <li><strong>First Aid Kit:</strong> Keep a well-stocked first aid kit at home and in your car.</li>
                        <li><strong>Fire Safety:</strong> Install smoke detectors on every level and have a fire escape plan.</li>
                    </ul>
                </div>
            )
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Maternal & Child Safety Tips</h2>}
            breadcrumbs={[{ label: 'Safety Tips' }]}
        >
            <Head title="Safety Tips" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <p className="mb-8 text-office-colorful-subtext dark:text-office-black-subtext text-center max-w-2xl mx-auto">
                        Your health and your baby's safety are our top priorities. Browse the categories below for essential safety information and best practices.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {safetyTips.map((tip, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedTip(tip)}
                                className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 hover:shadow-lg transition cursor-pointer border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border hover:border-office-colorful-ribbon dark:hover:border-office-accent group"
                            >
                                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform text-office-colorful-ribbon dark:text-office-accent">{tip.icon}</div>
                                <h3 className="font-bold text-lg text-office-colorful-text dark:text-white mb-2">{tip.title}</h3>
                                <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext">{tip.description}</p>
                                <div className="mt-4">
                                    <span className="text-office-colorful-ribbon dark:text-office-accent text-sm font-semibold group-hover:underline">Read Full Tip &rarr;</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Safety Tip Modal */}
            <Modal show={!!selectedTip} onClose={() => setSelectedTip(null)}>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6 border-b border-office-colorful-border dark:border-office-black-border pb-4">
                        <span className="text-4xl text-office-colorful-ribbon dark:text-office-accent">{selectedTip?.icon}</span>
                        <h2 className="text-2xl font-bold text-office-colorful-text dark:text-white">
                            {selectedTip?.title}
                        </h2>
                    </div>

                    <div className="text-office-colorful-text dark:text-office-black-text">
                        {selectedTip?.content}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <SecondaryButton onClick={() => setSelectedTip(null)}>
                            Done Reading
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
