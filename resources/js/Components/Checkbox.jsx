export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-office-colorful-border text-office-colorful-ribbon shadow-sm focus:ring-office-accent dark:border-office-black-border dark:bg-office-black-bg dark:focus:ring-office-accent dark:focus:ring-offset-office-black-bg ' +
                className
            }
        />
    );
}
