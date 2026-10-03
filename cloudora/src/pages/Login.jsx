import { Key, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useApp } from '../contexts/AppContext.jsx';

const Login = ({ mode = "login" }) => {

    const isRegister = mode === "register";
    const navigate = useNavigate();

    const { login, register } = useApp();

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const updateField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { name, email, password } = form;
        const ok = isRegister ? await register(form.name, form.email,form. password) : await login(form.email,form.password);
        setIsLoading(false);
        if (ok) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen text-zinc-900 flex flex-col md:flex-row">
            {/* Left Hero Brand Panel */}
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16 bg-linear-to-br from-blue-100 via-zinc-100 to-blue-100 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col justify-between relative overflow-hidden">
                <div className='absolute inset-0 bg-[url("pattern.svg")]'></div>
                <div className='relative z-10 flex items-center gap-3'>
                    <img src="/favicon.png" alt="Cloudora Logo" className="max-h-9" />
                    <span className='text-4xl font-medium uppercase text-zinc-900'>Cloudora</span>
                </div>
                <div className='relative z-10 my-12 space-y-6'>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl tracking-tight text-zinc-900 leading-tight'>Store smarter. Access faster. <br /><span className='text-blue-400'>Cloud Storage.</span></h2>
                    <p className='text-sm md:text-base text-zinc-600 max-w-md leading-relaxed'>Store your files securely in the cloud and access them from anywhere.</p>
                </div>
                <div className='relative z-10 text-center text-sm text-zinc-500'>© 2026 Cloudora. All rights reserved.</div>
            </div>
            {/* Right Form Panel */}
            <div className='md:w-1/2 p-8 md:p-12 lg:p-16 flex items-center justify-center bg-white'>
                <div className='w-full max-w-md space-y-6 animate-fade-in'>
                    <div>
                        <h3 className='text-2xl font-medium text-zinc-900'>{isRegister ? "Create an account" : "Welcome Back"}</h3>
                        <p className='text-sm text-zinc-500 mt-1'>{isRegister ? "Enter your credentials to continue and get started with 1GB of storage." : "Sign in to access your account and manage your resources."}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {isRegister && (
                            <Input label="Full Name" icon={UserIcon}
                                placeholder="Enter your full name" value={form.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                required
                            />
                        )}
                        <Input label="Email" icon={MailIcon}
                            placeholder="Enter your email" value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            required
                        />
                        <Input label="Password" icon={LockIcon}
                            type="password"
                            placeholder="*********" value={form.password}
                            onChange={(e) => updateField("password", e.target.value)}
                            required
                        />
                        <Button type='submit' variant='primary' className='w-full py-3' isLoading={isLoading}>
                            <span className='font-medium text-base'>{isRegister ? "Create Account" : "Sign In"}</span>
                        </Button>
                    </form>

                    <div className='text-center pt-2'>
                        {isRegister ? (
                            <p className='text-sm text-zinc-500'>Already have an account? <span className='text-blue-500 cursor-pointer hover:underline' onClick={() => navigate("/login")}>Sign In</span></p>
                        ) : (
                            <p className='text-sm text-zinc-500'>Don't have an account? <span className='text-blue-500 cursor-pointer hover:underline' onClick={() => navigate("/register")}>Create one</span></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login
