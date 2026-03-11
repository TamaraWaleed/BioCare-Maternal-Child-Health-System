import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFemale, faBaby, faUserMd } from '@fortawesome/free-solid-svg-icons';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-office-colorful-bg dark:bg-office-black-bg text-office-colorful-text dark:text-office-black-text selection:bg-office-colorful-ribbon selection:text-white">
            <Head title="Welcome to BCS" />

            {/* Navbar */}
            <nav className="fixed top-0 w-full bg-office-colorful-surface dark:bg-office-black-surface border-b border-office-colorful-border dark:border-office-black-border z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <ApplicationLogo />
                        </div>
                        <div className="flex gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-office-colorful-ribbon text-white px-4 py-2 rounded font-semibold hover:bg-office-colorful-ribbon/90 dark:bg-office-accent dark:hover:bg-office-accent/90 transition shadow-sm"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-office-colorful-subtext dark:text-office-black-subtext hover:text-office-colorful-text dark:hover:text-white font-medium p-2"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-office-colorful-ribbon text-white px-4 py-2 rounded font-semibold hover:bg-office-colorful-ribbon/90 dark:bg-office-accent dark:hover:bg-office-accent/90 transition shadow-sm"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Body */}
            <main className="pt-24 pb-12 scroll-smooth">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-office-colorful-text dark:text-white mb-6">
                        BioCare Maternal & Child <br />
                        <span className="text-office-colorful-ribbon dark:text-office-accent">Health System</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-office-colorful-subtext dark:text-office-black-subtext mb-10">
                        A secure, efficient, and user-friendly platform for tracking pregnancy history, postnatal exams, and child healthcare milestones.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href={route('register')}
                            className="bg-office-colorful-ribbon text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl dark:bg-office-accent transition transform hover:-translate-y-1"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>

                {/* cards */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <a href="#mother-records" className="bg-office-colorful-surface p-8 rounded-xl shadow-sm border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border hover:border-office-colorful-ribbon dark:hover:border-office-accent transition group cursor-pointer">
                            <div className="size-12 bg-office-colorful-bg dark:bg-office-black-bg flex items-center justify-center rounded-lg mb-6 group-hover:scale-110 transition">
                                <FontAwesomeIcon icon={faFemale} className="text-2xl text-office-colorful-ribbon dark:text-office-accent" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Mother Records</h3>
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">Comprehensive Antenatal, USS, and risk assessment history for expecting mothers.</p>
                        </a>

                        <a href="#child-growth" className="bg-office-colorful-surface p-8 rounded-xl shadow-sm border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border hover:border-office-colorful-ribbon dark:hover:border-office-accent transition group cursor-pointer">
                            <div className="size-12 bg-office-colorful-bg dark:bg-office-black-bg flex items-center justify-center rounded-lg mb-6 group-hover:scale-110 transition">
                                <FontAwesomeIcon icon={faBaby} className="text-2xl text-office-colorful-ribbon dark:text-office-accent" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Child Growth</h3>
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">Track height, weight, head circumference, and vaccinations with interactive charts.</p>
                        </a>

                        <a href="#medical-portal" className="bg-office-colorful-surface p-8 rounded-xl shadow-sm border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border hover:border-office-colorful-ribbon dark:hover:border-office-accent transition group cursor-pointer">
                            <div className="size-12 bg-office-colorful-bg dark:bg-office-black-bg flex items-center justify-center rounded-lg mb-6 group-hover:scale-110 transition">
                                <FontAwesomeIcon icon={faUserMd} className="text-2xl text-office-colorful-ribbon dark:text-office-accent" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Medical Portal</h3>
                            <p className="text-office-colorful-subtext dark:text-office-black-subtext">Streamlined workflow for doctors and nurses to manage appointments and exams.</p>
                        </a>
                    </div>
                </div>

                {/* Detailed Sections */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 space-y-24">
                    <section id="mother-records" className="scroll-mt-24 pt-12 border-t border-office-colorful-border dark:border-office-black-border">
                        <h2 className="text-3xl font-bold mb-6 text-[#2B7CBD]">Mother Records Detail</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-office-colorful-subtext dark:text-office-black-subtext">
                            <p>
                                The BioCare platform provides a comprehensive digital history for mothers throughout their journey. This includes safe storage of antenatal history, ultrasonography (USS) records, and medical risk assessments. Mothers can access their medical history anytime, ensuring better preparation for consultations and emergencies.
                            </p>
                        </div>
                    </section>

                    <section id="child-growth" className="scroll-mt-24 pt-12 border-t border-office-colorful-border dark:border-office-black-border">
                        <h2 className="text-3xl font-bold mb-6 text-[#2B7CBD]">Child Growth & Health</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-office-colorful-subtext dark:text-office-black-subtext">
                            <p>
                                Every stage of your child's development is crucial. Our healthcare platform tracks vital metrics such as height, weight, and head circumference over time, presenting them in interactive growth charts. Additionally, parents can monitor vaccination schedules and receive timely reminders, ensuring no milestone or preventive care is missed.
                            </p>
                        </div>
                    </section>

                    <section id="medical-portal" className="scroll-mt-24 pt-12 border-t border-office-colorful-border dark:border-office-black-border">
                        <h2 className="text-3xl font-bold mb-6 text-[#2B7CBD]">Professional Medical Portal</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-office-colorful-subtext dark:text-office-black-subtext">
                            <p>
                                Designed for healthcare providers, the Medical Portal stream-lines clinical workflows. Doctors and nurses can manage patient queues, document examination findings instantly, and access historical records with a single click. This integration reduces administrative overhead and allows medical professionals to focus more on patient care.
                            </p>
                        </div>
                    </section>
                </div>
            </main>


            <footer className="border-t border-office-colorful-border dark:border-office-black-border py-12 bg-office-colorful-surface dark:bg-office-black-surface mt-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-office-colorful-subtext dark:text-office-black-subtext text-sm">
                        &copy; {new Date().getFullYear()} BCS Healthcare Platform. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
