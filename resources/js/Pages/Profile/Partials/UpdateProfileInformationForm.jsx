import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
    doctorProfile = null,
    nurseProfile = null,
    motherProfile = null,
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, patch, errors, processing, recentlySuccessful, transform } =
        useForm({
            name: user.name,
            email: user.email,
            phone: doctorProfile?.phone || nurseProfile?.phone || motherProfile?.phone || '',
            city: doctorProfile?.city || nurseProfile?.city || motherProfile?.city || '',
            birth_date: motherProfile?.birth_date || '',
            blood_group: motherProfile?.blood_group || '',
            rh_factor: motherProfile?.rh_factor || '',
            husband_name: motherProfile?.husband_name || '',
            husband_id_number: motherProfile?.husband_id_number || '',
            maternity_center: motherProfile?.maternity_center || '',
            country: motherProfile?.country || '',
            health_center_phone: motherProfile?.health_center_phone || '',
            photo: null,
            password: '',
            password_confirmation: '',
        });

    const [preview, setPreview] = useState(doctorProfile?.photo_path || nurseProfile?.photo_path || motherProfile?.photo_path || null);

    const submit = (e) => {
        e.preventDefault();

        if (data.photo) {
            // Transform the data to include _method spoofing for multipart/form-data
            transform((data) => ({
                ...data,
                _method: 'PATCH',
            }));

            post(route('profile.update'), {
                forceFormData: true,
            });
        } else {
            patch(route('profile.update'));
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('photo', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const isDoctor = user.role === 'doctor';
    const isNurse = user.role === 'nurse';
    const isMother = user.role === 'mother';
    const isAdmin = isNurse;
    const isLegacy = isDoctor || isNurse || isMother;

    return (
        <section className={className}>
            {!isLegacy && (
                <header className={isLegacy ? "border-b pb-2 mb-6" : ""}>
                    <h2 className={`text-lg font-bold ${isLegacy ? "text-pink-500" : "text-office-colorful-text dark:text-white"}`}>
                        {isDoctor ? "Doctor Information" : (isMother ? "Mother Information" : "Profile Information")}
                    </h2>

                    {!isLegacy && (
                        <p className="mt-1 text-sm text-office-colorful-subtext dark:text-office-black-subtext">
                            Update your account's profile information and email address.
                        </p>
                    )}
                </header>
            )}

            <form onSubmit={submit} className="mt-6 space-y-8">
                {/* Section 1: Personal Info */}
                <div className={isLegacy ? "bg-office-colorful-surface dark:bg-office-black-surface p-6 rounded-lg border border-office-colorful-border dark:border-office-black-border shadow-sm" : ""}>
                    {isLegacy && (
                        <h3 className="text-md font-bold text-office-colorful-ribbon dark:text-office-accent mb-6 uppercase tracking-wider border-b pb-2">
                            Personal Info
                        </h3>
                    )}


                    <div className={isLegacy ? "grid grid-cols-1 md:grid-cols-12 gap-8" : "space-y-6"}>
                        <div className={isLegacy ? "md:col-span-8 space-y-4" : "space-y-6"}>
                            {isDoctor && (
                                <div className="flex items-center">
                                    <label className="w-48 text-sm text-gray-700 dark:text-office-black-subtext">Doctor ID:</label>
                                    <div className="flex-1 bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-500 shadow-sm opacity-75 dark:bg-office-black-bg dark:border-office-black-border">
                                        {user.id}
                                    </div>
                                </div>
                            )}

                            <div className={isLegacy ? "flex items-center" : ""}>
                                <InputLabel htmlFor="name" value={isNurse ? "Admin Name:" : (isDoctor ? "Doctor Name:" : (isMother ? "Mother Name:" : "Name"))} className={isLegacy ? "w-48" : ""} />
                                <div className="flex-1">
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoComplete="name"
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>
                            </div>

                            {isMother && (
                                <div className="flex items-center">
                                    <InputLabel htmlFor="birth_date" value="Mother's Birth Date:" className="w-48" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="birth_date"
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={data.birth_date}
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.birth_date} />
                                    </div>
                                </div>
                            )}

                            {isMother && (
                                <div className="flex items-center">
                                    <InputLabel htmlFor="husband_name" value="Husband Name:" className="w-48" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="husband_name"
                                            className="mt-1 block w-full"
                                            value={data.husband_name}
                                            onChange={(e) => setData('husband_name', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.husband_name} />
                                    </div>
                                </div>
                            )}

                            {isMother && (
                                <div className="flex items-center">
                                    <InputLabel htmlFor="husband_id_number" value="Husband's ID Number:" className="w-48" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="husband_id_number"
                                            className="mt-1 block w-full"
                                            value={data.husband_id_number}
                                            onChange={(e) => setData('husband_id_number', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.husband_id_number} />
                                    </div>
                                </div>
                            )}

                            {isLegacy && (
                                <div className="flex items-center">
                                    <InputLabel htmlFor="phone" value={isMother ? "Telephone Number:" : "Tel Number:"} className="w-48" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="phone"
                                            className="mt-1 block w-full"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="Enter phone number"
                                        />
                                        <InputError className="mt-2" message={errors.phone} />
                                    </div>
                                </div>
                            )}

                            {isMother && (
                                <div className="flex items-center">
                                    <InputLabel htmlFor="maternity_center" value="Nursing / maternity center:" className="w-48" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="maternity_center"
                                            className="mt-1 block w-full"
                                            value={data.maternity_center}
                                            onChange={(e) => setData('maternity_center', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.maternity_center} />
                                    </div>
                                </div>
                            )}

                            {isMother ? (
                                <div className="flex items-center">
                                    <InputLabel htmlFor="country" value="Country:" className="w-48" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="country"
                                            className="mt-1 block w-full"
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.country} />
                                    </div>
                                </div>
                            ) : (
                                isLegacy && (
                                    <div className="flex items-center">
                                        <InputLabel htmlFor="city" value="City/Town:" className="w-48" />
                                        <div className="flex-1">
                                            <TextInput
                                                id="city"
                                                className="mt-1 block w-full"
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                                placeholder="Enter city"
                                            />
                                            <InputError className="mt-2" message={errors.city} />
                                        </div>
                                    </div>
                                )
                            )}

                            {isMother && (
                                <div className="flex items-center">
                                    <InputLabel htmlFor="health_center_phone" value="Phone number for the health center:" className="w-48 text-sm" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="health_center_phone"
                                            className="mt-1 block w-full"
                                            value={data.health_center_phone}
                                            onChange={(e) => setData('health_center_phone', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.health_center_phone} />
                                    </div>
                                </div>
                            )}

                            {isMother && (
                                <div className="flex items-center">
                                    <InputLabel htmlFor="blood_group" value="Mother's blood type:" className="w-48" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="blood_group"
                                            className="mt-1 block w-full"
                                            value={data.blood_group}
                                            onChange={(e) => setData('blood_group', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.blood_group} />
                                    </div>
                                </div>
                            )}

                            {isMother && (
                                <div className="flex items-center">
                                    <InputLabel htmlFor="rh_factor" value="The Rhesic factor:" className="w-48" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="rh_factor"
                                            className="mt-1 block w-full"
                                            value={data.rh_factor}
                                            onChange={(e) => setData('rh_factor', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.rh_factor} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {(isDoctor || isMother || isNurse) && (
                            <div className="md:col-span-4 flex flex-col items-center gap-4">
                                <div className="flex items-center gap-2 self-start md:self-auto">
                                    <label className="text-sm font-medium text-gray-700 dark:text-office-black-subtext">Photo:</label>
                                    <input
                                        type="file"
                                        onChange={handlePhotoChange}
                                        className="text-xs text-gray-600 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                                    />
                                </div>

                                <div className="w-40 h-40 border-2 border-gray-200 rounded flex items-center justify-center bg-gray-50 overflow-hidden shadow-inner dark:bg-office-black-bg dark:border-office-black-border">
                                    {preview ? (
                                        <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-[#3490dc] flex items-center justify-center text-white">
                                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <InputError className="mt-2" message={errors.photo} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Section 2: Login Info */}
                <div className={isLegacy ? "bg-office-colorful-surface dark:bg-office-black-surface p-6 rounded-lg border border-office-colorful-border dark:border-office-black-border shadow-sm" : ""}>
                    {isLegacy && (
                        <h3 className="text-md font-bold text-office-colorful-ribbon dark:text-office-accent mb-6 uppercase tracking-wider border-b pb-2 text-office-info">
                            Login Info
                        </h3>
                    )}

                    <div className="space-y-4">
                        <div className={isLegacy ? "flex items-center" : ""}>
                            <InputLabel htmlFor="email" value="Email Address:" className={isLegacy ? "w-48" : ""} />
                            <div className="flex-1">
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                />
                                <InputError className="mt-2" message={errors.email} />
                            </div>
                        </div>

                        {isLegacy && (
                            <>
                                <div className="flex items-center">
                                    <InputLabel htmlFor="password" value="New Password:" className="w-48" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="password"
                                            type="password"
                                            className="mt-1 block w-full"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Leave blank to keep current"
                                        />
                                        <InputError className="mt-2" message={errors.password} />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password:" className="w-48" />
                                    <div className="flex-1">
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            className="mt-1 block w-full"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.password_confirmation} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {!isLegacy && mustVerifyEmail && user.email_verified_at === null && (
                        <div className="mt-4">
                            <p className="mt-2 text-sm text-office-colorful-text dark:text-office-black-text">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-office-colorful-subtext underline hover:text-office-colorful-text focus:outline-none focus:ring-2 focus:ring-office-accent focus:ring-offset-2 dark:text-office-black-subtext dark:hover:text-white dark:focus:ring-offset-office-black-surface"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                    A new verification link has been sent to your
                                    email address.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className={`flex flex-col gap-4 mt-8 ${isLegacy ? "items-end" : ""}`}>
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 w-full">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700 font-bold">
                                        There were errors saving your profile:
                                    </p>
                                    <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                                        {Object.entries(errors).map(([field, message]) => (
                                            <li key={field}>{message}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-4">
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            className={isLegacy ? "bg-office-colorful-ribbon hover:bg-office-colorful-ribbon/90 text-white border-transparent shadow-md font-bold py-2 px-8 rounded-full dark:bg-office-accent" : ""}
                        >
                            Save Changes
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600 dark:text-green-400 font-bold">
                                Profile updated successfully!
                            </p>
                        </Transition>
                    </div>
                </div>
            </form>
        </section>
    );
}
