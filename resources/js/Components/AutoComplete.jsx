import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TextInput from './TextInput';

export default function AutoComplete({
    id,
    value,
    onChange,
    placeholder,
    className = '',
    apiRoute = 'doctor.search',
    onSelect = null
}) {
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef(null);

    // Handle clicks outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    // Fetch suggestions when value changes
    useEffect(() => {
        if (value && value.length > 2) {
            const fetchSuggestions = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(route(apiRoute), {
                        params: { q: value },
                        headers: { 'Accept': 'application/json' }
                    });
                    setSuggestions(response.data);
                    setIsOpen(true);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
            return () => clearTimeout(timeoutId);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [value, apiRoute]);

    const handleSelect = (suggestion) => {
        // Trigger the onChange with a fake event object to stay compatible with Inertia useForm's setData
        onChange({ target: { value: suggestion.name, id } });
        setIsOpen(false);

        // Immediately trigger the onSelect callback if provided
        if (onSelect) {
            onSelect(suggestion);
        }
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <TextInput
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full"
                autoComplete="off"
            />

            {isOpen && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-office-black-surface border border-office-colorful-border dark:border-office-black-border rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((item) => (
                        <div
                            key={item.id}
                            className="px-4 py-3 cursor-pointer hover:bg-office-colorful-bg dark:hover:bg-office-black-bg text-office-colorful-text dark:text-office-black-text text-sm transition-colors border-b border-office-colorful-border dark:border-office-black-border last:border-0"
                            onClick={() => handleSelect(item)}
                        >
                            <div className="font-bold flex justify-between items-center text-office-accent dark:text-office-accent">
                                <span>{item.name}</span>
                                <span className="text-[10px] uppercase tracking-widest text-office-colorful-subtext dark:text-office-black-subtext">Patient</span>
                            </div>
                            <div className="text-xs text-office-colorful-subtext dark:text-office-black-subtext mt-0.5">{item.email}</div>
                        </div>
                    ))}
                </div>
            )}

            {isLoading && (
                <div className="absolute right-3 top-3.5 text-office-colorful-subtext dark:text-office-black-subtext">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </div>
    );
}
