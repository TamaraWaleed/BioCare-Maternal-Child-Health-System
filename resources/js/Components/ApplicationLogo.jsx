export default function ApplicationLogo({ className = 'h-10 w-auto', vertical = false, ...props }) {
    return (
        <div className={`flex ${vertical ? 'flex-col items-center text-center' : 'items-center gap-3'} ${className}`} {...props}>
            {/* Using the specific logo image uploaded by the user */}
            <div className="relative flex-shrink-0">
                <img
                    src="/images/logo.png"
                    alt="BioCare Logo"
                    className={`${vertical ? 'h-16 mb-2' : 'h-10'} w-auto object-contain`}
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-black tracking-tighter text-[#2B7CBD] dark:text-[#2B7CBD]">
                        BioCare
                    </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-office-colorful-subtext dark:text-office-black-subtext leading-none">
                    Maternal & Child Health
                </span>
            </div>
        </div>
    );
}
