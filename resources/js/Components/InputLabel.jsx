export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-medium text-office-colorful-text dark:text-office-black-text ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
