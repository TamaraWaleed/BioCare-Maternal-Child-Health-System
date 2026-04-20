import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandHoldingHeart, faAppleAlt, faSyringe,
    faUserNurse, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

export default function Guides({ auth }) {
    const [selectedGuide, setSelectedGuide] = useState(null);

    const guides = [
        {
            title: 'Breastfeeding Basics',
            description: 'Essential tips for new mothers on breastfeeding techniques and benefits.',
            icon: <FontAwesomeIcon icon={faHandHoldingHeart} />,
            content: (
                <div className="space-y-4">
                    <p>Breastfeeding provides your baby with the perfect balance of nutrients and helps protect against infections and diseases.</p>
                    <h4 className="font-bold text-office-colorful-ribbon dark:text-office-accent">Key Tips:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Proper Latch:</strong> Ensure the baby's mouth covers most of the areola.</li>
                        <li><strong>Feed on Demand:</strong> Newborns typically feed 8-12 times in 24 hours.</li>
                        <li><strong>Stay Hydrated:</strong> Drink plenty of water and eat a balanced diet.</li>
                        <li><strong>Skin-to-Skin:</strong> Helps stimulate milk production and calms the baby.</li>
                    </ul>
                </div>
            )
        },
        {
            title: 'Child Nutrition',
            description: 'A guide to healthy eating habits for your growing child.',
            icon: <FontAwesomeIcon icon={faAppleAlt} />,
            content: (
                <div className="space-y-4">
                    <p>Balanced nutrition is crucial for your child's physical and mental development.</p>
                    <h4 className="font-bold text-office-colorful-ribbon dark:text-office-accent">Introduction to Solids (6+ Months):</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Start with iron-rich foods like pureed meat or iron-fortified cereals.</li>
                        <li>Introduce one new food at a time to check for allergies.</li>
                        <li>Avoid honey, salt, and added sugars for the first year.</li>
                        <li>Encourage a variety of colorful fruits and vegetables.</li>
                    </ul>
                </div>
            )
        },
        {
            title: 'Vaccination Schedule Info',
            description: 'Understanding the importance of timely vaccinations.',
            icon: <FontAwesomeIcon icon={faSyringe} />,
            content: (
                <div className="space-y-4">
                    <p>Vaccinations protect your child from serious, preventable diseases.</p>
                    <h4 className="font-bold text-office-colorful-ribbon dark:text-office-accent">Important Milestones:</h4>
                    <ul className="list-decimal pl-5 space-y-2">
                        <li><strong>At Birth:</strong> BCG and HepB.</li>
                        <li><strong>6, 10, 14 Weeks:</strong> Pentavalent, Polio, and Rotavirus vaccines.</li>
                        <li><strong>9 Months:</strong> Measles-Rubella (1st dose).</li>
                        <li><strong>18 Months:</strong> Measles-Rubella (2nd dose) and DPT Booster.</li>
                    </ul>
                    <p className="text-sm italic">Always keep your child's vaccination card safe and bring it to every clinic visit.</p>
                </div>
            )
        },
        {
            title: 'Postnatal Self-Care',
            description: 'Taking care of your physical and mental health after delivery.',
            icon: <FontAwesomeIcon icon={faUserNurse} />,
            content: (
                <div className="space-y-4">
                    <p>Your health is just as important as your baby's. Recovery takes time.</p>
                    <h4 className="font-bold text-office-colorful-ribbon dark:text-office-accent">Self-Care Checklist:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Rest:</strong> Try to sleep when the baby sleeps.</li>
                        <li><strong>Pelvic Health:</strong> Gently start Kegel exercises when comfortable.</li>
                        <li><strong>Mental Wellness:</strong> It's normal to feel emotional; talk to your partner or a doctor if you feel overwhelmed.</li>
                        <li><strong>Nutrition:</strong> Continue your prenatal vitamins if recommended by your doctor.</li>
                    </ul>
                </div>
            )
        },
        {
            title: 'Warning Signs in Pregnancy',
            description: 'When to seek immediate medical help.',
            icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
            content: (
                <div className="space-y-4 text-red-700 dark:text-red-400">
                    <p className="font-bold">Contact your healthcare provider immediately if you experience:</p>
                    <ul className="list-disc pl-5 space-y-2 font-medium">
                        <li>Heavy vaginal bleeding.</li>
                        <li>Severe headache that won't go away.</li>
                        <li>Blurry vision or "seeing spots".</li>
                        <li>Sudden, severe swelling of face/hands.</li>
                        <li>Sharp abdominal pain or cramping.</li>
                        <li>Noticeable decrease in baby's movement.</li>
                    </ul>
                </div>
            )
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Health Guides</h2>}
            breadcrumbs={[{ label: 'Health Guides' }]}
        >
            <Head title="Guides" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guides.map((guide, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedGuide(guide)}
                                className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 hover:shadow-lg transition cursor-pointer border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border hover:border-office-colorful-ribbon dark:hover:border-office-accent group"
                            >
                                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform text-office-colorful-ribbon dark:text-office-accent">{guide.icon}</div>
                                <h3 className="font-bold text-lg text-office-colorful-text dark:text-white mb-2">{guide.title}</h3>
                                <p className="text-sm text-office-colorful-subtext dark:text-office-black-subtext">{guide.description}</p>
                                <div className="mt-4">
                                    <span className="text-office-colorful-ribbon dark:text-office-accent text-sm font-semibold group-hover:underline">Read More &rarr;</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Guide Modal */}
            <Modal show={!!selectedGuide} onClose={() => setSelectedGuide(null)}>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6 border-b border-office-colorful-border dark:border-office-black-border pb-4">
                        <span className="text-4xl text-office-colorful-ribbon dark:text-office-accent">{selectedGuide?.icon}</span>
                        <h2 className="text-2xl font-bold text-office-colorful-text dark:text-white">
                            {selectedGuide?.title}
                        </h2>
                    </div>

                    <div className="text-office-colorful-text dark:text-office-black-text">
                        {selectedGuide?.content}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <SecondaryButton onClick={() => setSelectedGuide(null)}>
                            Close Guide
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
