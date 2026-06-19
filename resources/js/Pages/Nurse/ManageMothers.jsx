import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheckCircle, faSearch, faPrint } from '@fortawesome/free-solid-svg-icons';

export default function ManageMothers({ auth, users }) {
    const pageTitle = 'Mothers';
    const [showingCreateModal, setShowingCreateModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const filteredMothers = useMemo(() => {
        return users.data.filter(mother => {
            const matchesSearch = !searchQuery || mother.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = !statusFilter ||
                (statusFilter === 'active' && mother.IsActive) ||
                (statusFilter === 'inactive' && !mother.IsActive);
            return matchesSearch && matchesStatus;
        });
    }, [users.data, searchQuery, statusFilter]);

    // Form for Create
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    // Form for Edit
    const { data: editData, setData: setEditData, put, processing: editProcessing, reset: editReset, errors: editErrors } = useForm({
        name: '',
        email: '',
    });

    const submitCreate = (e) => {
        e.preventDefault();
        post(route('nurse.mothers.store'), {
            onSuccess: () => { setShowingCreateModal(false); reset(); },
        });
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setEditData({ name: user.name, email: user.email });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        put(route('nurse.mothers.update', editingUser.id), {
            onSuccess: () => { setEditingUser(null); editReset(); },
        });
    };

    const handleDelete = (user) => {
        const theme = localStorage.getItem('theme') || 'light';
        const actionText = user.IsActive ? 'deactivate' : 'activate';
        const titleText = user.IsActive ? 'Are you sure?' : 'Activate Mother?';
        const confirmButtonText = user.IsActive ? 'Yes, deactivate!' : 'Yes, activate!';
        const confirmButtonColor = user.IsActive ? '#d33' : '#28a745';

        Swal.fire({
            title: titleText,
            text: `You are about to ${actionText} ${user.name}.`,
            icon: user.IsActive ? 'warning' : 'question',
            showCancelButton: true,
            confirmButtonColor: confirmButtonColor,
            cancelButtonColor: '#3085d6',
            confirmButtonText: confirmButtonText,
            background: theme === 'dark' ? '#2b2b2b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('nurse.mothers.delete', user.id));
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

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-office-colorful-surface overflow-hidden shadow-sm sm:rounded-lg p-6 border border-office-colorful-border dark:bg-office-black-surface dark:border-office-black-border">
                        <div className="flex justify-between mb-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="relative w-full sm:w-80">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                                    </div>
                                    <TextInput
                                        type="text"
                                        className="w-full pl-10"
                                        placeholder="Search mothers by name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="border-office-colorful-border dark:border-office-black-border dark:bg-office-black-bg dark:text-office-black-text rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent py-2 px-3 text-sm min-w-[140px] w-full sm:w-auto"
                                >
                                    <option value="" className="dark:bg-office-black-surface">All States</option>
                                    <option value="active" className="dark:bg-office-black-surface">Active</option>
                                    <option value="inactive" className="dark:bg-office-black-surface">Inactive</option>
                                </select>
                            </div>
                            <PrimaryButton onClick={() => setShowingCreateModal(true)}>+ Add New Mother</PrimaryButton>
                        </div>

                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Name</th>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Email</th>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Status</th>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Actions</th>
                                </tr>

                            </thead>
                            <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                {filteredMothers.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-5 py-5 border-b border-office-colorful-border text-center text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text">
                                            No mothers found matching filter criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMothers.map((user) => (
                                        <tr key={user.id} className={!user.IsActive ? 'opacity-60' : ''}>
                                            <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text">{user.name}</td>
                                            <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text">{user.email}</td>
                                            <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.IsActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'}`}>
                                                    {user.IsActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => openEditModal(user)} className="text-office-colorful-ribbon hover:text-office-colorful-ribbon/80 dark:text-office-accent transition" title="Edit">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user)}
                                                        className={`${user.IsActive ? 'text-red-600 hover:text-red-900 dark:text-red-400' : 'text-green-600 hover:text-green-900 dark:text-green-400'} transition`}
                                                        title={user.IsActive ? 'Deactivate' : 'Activate'}
                                                    >
                                                        <FontAwesomeIcon icon={user.IsActive ? faTrash : faCheckCircle} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
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
                    <h2 className="text-lg font-medium text-office-colorful-text dark:text-white mb-4">Add New Mother</h2>
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
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={() => setShowingCreateModal(false)}>Cancel</SecondaryButton>
                            <PrimaryButton className="ml-3" disabled={processing}>Add Mother</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Edit User Modal */}
            <Modal show={!!editingUser} onClose={() => setEditingUser(null)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-office-colorful-text dark:text-white mb-4">Edit Mother</h2>
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
