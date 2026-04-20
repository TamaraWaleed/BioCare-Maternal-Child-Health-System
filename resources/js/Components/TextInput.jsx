import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const [showPassword, setShowPassword] = useState(false);
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="relative w-full">
            <input
                {...props}
                type={inputType}
                className={
                    'rounded-md border-office-colorful-border shadow-sm focus:border-office-accent focus:ring-office-accent dark:border-office-black-border dark:bg-office-black-bg dark:text-office-black-text dark:focus:border-office-accent dark:focus:ring-office-accent block w-full ' +
                    (isPassword ? 'pr-10 ' : '') +
                    className
                }
                ref={localRef}
            />
            {isPassword && (
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-office-colorful-subtext hover:text-office-colorful-text dark:text-office-black-subtext dark:hover:text-white transition-colors focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                >
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="w-4 h-4"
                    />
                </button>
            )}
        </div>
    );
});
