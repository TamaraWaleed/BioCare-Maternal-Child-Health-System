import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faNotesMedical, faEye } from '@fortawesome/free-solid-svg-icons';

export default function ManageUsers({ auth, users, filters }) {
    const activeRole = filters?.role;
    const pageTitle = activeRole ? `${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}s` : 'Users';
    const [showingCreateModal, setShowingCreateModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Form for Create
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'mother',
    });

    // Form for Edit
    const { data: editData, setData: setEditData, put, processing: editProcessing, reset: editReset, errors: editErrors } = useForm({
        name: '',
        email: '',
        role: '',
    });

    const submitCreate = (e) => {
        e.preventDefault();
        post(route('nurse.users.store'), {
            onSuccess: () => { setShowingCreateModal(false); reset(); },
        });
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setEditData({ name: user.name, email: user.email, role: user.role });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        put(route('nurse.users.update', editingUser.id), {
            onSuccess: () => { setEditingUser(null); editReset(); },
        });
    };

    const handleDelete = (user) => {
        const theme = localStorage.getItem('theme') || 'light';
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${user.name}. This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete user!',
            background: theme === 'dark' ? '#2b2b2b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('nurse.users.delete', user.id));
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-office-black-text leading-tight">Manage {pageTitle}</h2>}
            breadcrumbs={[{ label: `Manage ${pageTitle}` }]}
        >
            <Head title={`Manage ${pageTitle}`} />

            <div className="py-12 bg-office-colorful-bg dark:bg-office-black-bg min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <div className="flex justify-between mb-6">
                            <h3 className="text-lg font-bold text-office-colorful-text dark:text-white">{activeRole ? `All ${pageTitle}` : 'All Users'}</h3>
                            <PrimaryButton onClick={() => setShowingCreateModal(true)}>+ Create New User</PrimaryButton>
                        </div>

                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Name</th>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Email</th>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Role</th>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                {users.data.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text">{user.name}</td>
                                        <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text">{user.email}</td>
                                        <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'nurse' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : user.role === 'doctor' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => openEditModal(user)} className="text-office-colorful-ribbon hover:text-office-colorful-ribbon/80 dark:text-office-accent transition" title="Edit">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                {auth.user.id !== user.id && (
                                                    <button onClick={() => handleDelete(user)} className="text-red-600 hover:text-red-900 dark:text-red-400 transition" title="Delete">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Links */}
                        <div className="mt-4 flex gap-2">
                            {users.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 border rounded transition ${link.active ? 'bg-office-colorful-ribbon text-white border-office-colorful-ribbon dark:bg-office-accent dark:border-office-accent' : 'bg-office-colorful-surface text-office-colorful-text border-office-colorful-border dark:bg-office-black-surface dark:text-office-black-text dark:border-office-black-border'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create User Modal */}
            <Modal show={showingCreateModal} onClose={() => setShowingCreateModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-office-colorful-text dark:text-white mb-4">Create New User</h2>
                    <form onSubmit={submitCreate}>
                        <div>
                            <InputLabel value="Name" />
                            <TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full mt-1" />
                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Email" />
                            <TextInput type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full mt-1" />
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Password" />
                            <TextInput type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="w-full mt-1" />
                            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Role" />
                            <select value={data.role} onChange={(e) => setData('role', e.target.value)} className="w-full border-office-colorful-border rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text">
                                <option value="mother" className="dark:bg-office-black-surface">Mother</option>
                                <option value="doctor" className="dark:bg-office-black-surface">Doctor</option>
                                <option value="nurse" className="dark:bg-office-black-surface">Nurse</option>
                            </select>
                            {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={() => setShowingCreateModal(false)}>Cancel</SecondaryButton>
                            <PrimaryButton className="ml-3" disabled={processing}>Create</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Edit User Modal */}
            <Modal show={!!editingUser} onClose={() => setEditingUser(null)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-office-colorful-text dark:text-white mb-4">Edit User</h2>
                    <form onSubmit={submitEdit}>
                        <div>
                            <InputLabel value="Name" />
                            <TextInput value={editData.name} onChange={(e) => setEditData('name', e.target.value)} className="w-full mt-1" />
                            {editErrors.name && <div className="text-red-500 text-sm mt-1">{editErrors.name}</div>}
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Email" />
                            <TextInput type="email" value={editData.email} onChange={(e) => setEditData('email', e.target.value)} className="w-full mt-1" />
                            {editErrors.email && <div className="text-red-500 text-sm mt-1">{editErrors.email}</div>}
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Role" />
                            <select value={editData.role} onChange={(e) => setEditData('role', e.target.value)} className="w-full border-office-colorful-border rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text">
                                <option value="mother" className="dark:bg-office-black-surface">Mother</option>
                                <option value="doctor" className="dark:bg-office-black-surface">Doctor</option>
                                <option value="nurse" className="dark:bg-office-black-surface">Nurse</option>
                            </select>
                            {editErrors.role && <div className="text-red-500 text-sm mt-1">{editErrors.role}</div>}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={() => setEditingUser(null)}>Cancel</SecondaryButton>
                            <PrimaryButton className="ml-3" disabled={editProcessing}>Update</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

        </AuthenticatedLayout>
    );
}
