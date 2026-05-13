import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Index({ auth }) {
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hello! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const response = await axios.post('/chatbot/ask', {
                prompt: userMessage
            });

            setMessages(prev => [...prev, { role: 'ai', text: response.data.reply }]);
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.error || 'Sorry, I encountered an error communicating with the server.';
            setMessages(prev => [...prev, { role: 'ai', text: `[Error] ${errorMsg}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-office-colorful-text dark:text-gray-200 leading-tight">Chatbot</h2>}
            breadcrumbs={[{ label: 'ChatBot' }]}
        >
            <Head title="Chatbot" />

            <div className="py-8 bg-transparent min-h-[calc(100vh-160px)]">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 h-full">
                    <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-2xl overflow-hidden flex flex-col h-[70vh]">

                        {/* Header Area */}
                        <div className="bg-office-accent p-4 shadow-md flex items-center">
                            <div className="bg-white p-2 rounded-full mr-4 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-office-accent">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Chatbot</h3>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-6 overflow-y-auto bg-office-colorful-bg dark:bg-office-black-bg space-y-6">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                        {/* Avatar */}
                                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-office-accent ml-3' : 'bg-gray-700 mr-3 shadow-sm'}`}>
                                            {msg.role === 'user' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                                                </svg>
                                            )}
                                        </div>

                                        {/* Bubble */}
                                        <div className={`px-5 py-3.5 rounded-2xl shadow-sm ${msg.role === 'user'
                                            ? 'bg-office-accent text-white rounded-tr-sm'
                                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-sm'
                                            }`}>
                                            <p className="text-[15px] whitespace-pre-wrap leading-relaxed font-medium">{msg.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex max-w-[80%] flex-row">
                                        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-gray-700 mr-3 shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white animate-spin">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                        </div>
                                        <div className="px-5 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-sm flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-office-accent rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-office-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-2 h-2 bg-office-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                            <form onSubmit={handleSubmit} className="flex space-x-4">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask Gemini something..."
                                    className="flex-1 block w-full rounded-full border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white px-6 py-3 shadow-inner focus:border-office-accent focus:ring-office-accent focus:ring-2 focus:bg-white dark:focus:bg-gray-800 text-[15px] transition-all outline-none"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="inline-flex items-center justify-center rounded-full bg-office-accent hover:opacity-90 p-3.5 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-office-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
