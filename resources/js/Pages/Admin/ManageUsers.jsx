import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function ManageUsers({ auth, users, filters }) {
    const activeRole = filters?.role;
    const pageTitle = activeRole ? `${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}s` : 'Users';
    const [showingCreateModal, setShowingCreateModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [searchVal, setSearchVal] = useState(filters?.search || '');
    const [roleVal, setRoleVal] = useState(filters?.role || '');
    const [statusVal, setStatusVal] = useState(filters?.status || '');
    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        setSearchVal(filters?.search || '');
        setRoleVal(filters?.role || '');
        setStatusVal(filters?.status || '');
    }, [filters]);

    const applyFilters = (search = searchVal, role = roleVal, status = statusVal) => {
        router.get(route('admin.users.index'), {
            search,
            role,
            status
        }, {
            preserveState: true,
            replace: true
        });
    };

    useEffect(() => {
        if (searchVal !== (filters?.search || '')) {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            debounceTimeoutRef.current = setTimeout(() => {
                applyFilters(searchVal, roleVal, statusVal);
            }, 400);
        }

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [searchVal]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        applyFilters();
    };

    const handleRoleChange = (e) => {
        const val = e.target.value;
        setRoleVal(val);
        applyFilters(searchVal, val, statusVal);
    };

    const handleStatusChange = (e) => {
        const val = e.target.value;
        setStatusVal(val);
        applyFilters(searchVal, roleVal, val);
    };

    const handleClearFilters = () => {
        setSearchVal('');
        setRoleVal('');
        setStatusVal('');
        router.get(route('admin.users.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

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
        password: '',
    });

    const submitCreate = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => { setShowingCreateModal(false); reset(); },
        });
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setEditData({ name: user.name, email: user.email, role: user.role, password: '' });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', editingUser.id), {
            onSuccess: () => { setEditingUser(null); editReset(); },
        });
    };

    const handleDelete = (user) => {
        const theme = localStorage.getItem('theme') || 'light';
        const actionText = user.IsActive ? 'deactivate' : 'activate';
        const titleText = user.IsActive ? 'Are you sure?' : 'Activate User?';
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
                router.delete(route('admin.users.delete', user.id));
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
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                            <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-3 flex-1">
                                <div className="relative min-w-[240px] flex-1 md:flex-initial">
                                    <TextInput
                                        type="text"
                                        placeholder="Search name or email..."
                                        value={searchVal}
                                        onChange={(e) => setSearchVal(e.target.value)}
                                        className="pl-10"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 z-10">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                <select
                                    value={roleVal}
                                    onChange={handleRoleChange}
                                    className="border-office-colorful-border dark:border-office-black-border dark:bg-office-black-bg dark:text-office-black-text rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent py-2 px-3 text-sm min-w-[140px]"
                                >
                                    <option value="" className="dark:bg-office-black-surface">All Roles</option>
                                    <option value="admin" className="dark:bg-office-black-surface">Admin</option>
                                    <option value="doctor" className="dark:bg-office-black-surface">Doctor</option>
                                    <option value="nurse" className="dark:bg-office-black-surface">Nurse</option>
                                    <option value="mother" className="dark:bg-office-black-surface">Mother</option>
                                </select>

                                <select
                                    value={statusVal}
                                    onChange={handleStatusChange}
                                    className="border-office-colorful-border dark:border-office-black-border dark:bg-office-black-bg dark:text-office-black-text rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent py-2 px-3 text-sm min-w-[140px]"
                                >
                                    <option value="" className="dark:bg-office-black-surface">All Status</option>
                                    <option value="active" className="dark:bg-office-black-surface">Active</option>
                                    <option value="inactive" className="dark:bg-office-black-surface">Inactive</option>
                                </select>



                                {(filters?.search || filters?.role || filters?.status) && (
                                    <SecondaryButton type="button" onClick={handleClearFilters}>
                                        Clear
                                    </SecondaryButton>
                                )}
                            </form>
                            <div>
                                <PrimaryButton onClick={() => setShowingCreateModal(true)}>+ Create New User</PrimaryButton>
                            </div>
                        </div>

                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Name</th>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Email</th>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Role</th>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Status</th>
                                    <th className="px-5 py-3 border-b-2 border-office-colorful-border bg-office-colorful-bg text-left text-xs font-semibold text-office-colorful-subtext uppercase tracking-wider dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-subtext">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-office-colorful-surface dark:bg-office-black-surface">
                                {users.data.map((user) => (
                                    <tr key={user.id} className={!user.IsActive ? 'opacity-60' : ''}>
                                        <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text">{user.name}</td>
                                        <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border text-office-colorful-text dark:text-office-black-text">{user.email}</td>
                                        <td className="px-5 py-5 border-b border-office-colorful-border text-sm dark:border-office-black-border">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' : user.role === 'nurse' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : user.role === 'doctor' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                                {user.role}
                                            </span>
                                        </td>
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
 
                                                {auth.user.id !== user.id && (
                                                    <button 
                                                        onClick={() => handleDelete(user)} 
                                                        className={`${user.IsActive ? 'text-red-600 hover:text-red-900 dark:text-red-400' : 'text-green-600 hover:text-green-900 dark:text-green-400'} transition`} 
                                                        title={user.IsActive ? 'Deactivate' : 'Activate'}
                                                    >
                                                        <FontAwesomeIcon icon={user.IsActive ? faTrash : faCheckCircle} />
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
                                <option value="admin" className="dark:bg-office-black-surface">Admin</option>
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
                            <InputLabel value="Password (Leave blank to keep current password)" />
                            <TextInput type="password" value={editData.password} onChange={(e) => setEditData('password', e.target.value)} className="w-full mt-1" />
                            {editErrors.password && <div className="text-red-500 text-sm mt-1">{editErrors.password}</div>}
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Role" />
                            <select value={editData.role} onChange={(e) => setEditData('role', e.target.value)} className="w-full border-office-colorful-border rounded-md shadow-sm focus:ring-office-accent focus:border-office-accent dark:bg-office-black-bg dark:border-office-black-border dark:text-office-black-text">
                                <option value="mother" className="dark:bg-office-black-surface">Mother</option>
                                <option value="doctor" className="dark:bg-office-black-surface">Doctor</option>
                                <option value="nurse" className="dark:bg-office-black-surface">Nurse</option>
                                <option value="admin" className="dark:bg-office-black-surface">Admin</option>
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
