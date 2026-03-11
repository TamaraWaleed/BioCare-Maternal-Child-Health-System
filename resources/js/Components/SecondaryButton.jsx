export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-md border border-office-colorful-border bg-office-colorful-surface px-4 py-2 text-xs font-semibold uppercase tracking-widest text-office-colorful-text shadow-sm transition duration-150 ease-in-out hover:bg-office-colorful-bg focus:outline-none focus:ring-2 focus:ring-office-accent focus:ring-offset-2 disabled:opacity-25 dark:border-office-black-border dark:bg-office-black-surface dark:text-office-black-text dark:hover:bg-office-black-bg dark:focus:ring-offset-office-black-bg ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
