import React, { useState, useEffect } from 'react';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
    AlertCircle,
    CheckCircle,
    Shield,
    User,
    Info,
    X,
    Sparkles,
    TrendingUp,
    BarChart3,
    Users,
    Zap
} from 'lucide-react';
import { toast } from 'sonner'; // Assuming you're using sonner for toast
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'admin_pusat'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showDemoInfo, setShowDemoInfo] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [activeFeature, setActiveFeature] = useState(0);

    const demoCredentials = {
        admin_pusat: { email: 'admin@infokanmas.id', password: 'admin123' },
        admin_daerah: { email: 'daerah@infokanmas.id', password: 'daerah123' },
        masyarakat: { email: 'user@infokanmas.id', password: 'user123' }
    };

    const features = [
        {
            icon: TrendingUp,
            title: "Transparansi Real-time",
            description: "Pantau anggaran sosial secara langsung dan transparan"
        },
        {
            icon: BarChart3,
            title: "Analisis Mendalam",
            description: "Dapatkan insight dari data anggaran yang terstruktur"
        },
        {
            icon: Users,
            title: "Kolaborasi Masyarakat",
            description: "Libatkan masyarakat dalam pengawasan anggaran"
        },
        {
            icon: Shield,
            title: "Keamanan Terjamin",
            description: "Data terlindungi dengan sistem keamanan berlapis"
        }
    ];

    useEffect(() => {
        if (formData.password) {
            let strength = 0;
            if (formData.password.length >= 8) strength += 1;
            if (/[A-Z]/.test(formData.password)) strength += 1;
            if (/[0-9]/.test(formData.password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
            setPasswordStrength(strength);
        } else {
            setPasswordStrength(0);
        }
    }, [formData.password]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        if (!formData.email || !formData.password) {
            setError('Email dan password harus diisi');
            toast.error('Email dan password harus diisi');
            setIsLoading(false);
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Format email tidak valid');
            toast.error('Format email tidak valid');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password harus minimal 6 karakter');
            toast.error('Password harus minimal 6 karakter');
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            const demo = demoCredentials[formData.role];
            if (formData.email === demo.email && formData.password === demo.password) {
                setIsLoading(false);
                setSuccess('Login berhasil! Mengalihkan ke dashboard...');
                toast.success('Login berhasil! Mengalihkan...');

                setTimeout(() => {
                    console.log('Redirecting to dashboard...', {
                        role: formData.role,
                        user: formData.email
                    });
                }, 2000);
            } else {
                setIsLoading(false);
                setError('Email atau password salah. Gunakan credentials demo untuk testing.');
                toast.error('Email atau password salah. Gunakan credentials demo.');
            }
        }, 1500);
    };

    const handleGoogleLogin = () => {
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            setIsLoading(false);
            setSuccess('Login dengan Google berhasil! Mengalihkan...');
            toast.success('Login dengan Google berhasil!');

            setTimeout(() => {
                console.log('Redirecting to dashboard...');
            }, 2000);
        }, 1500);
    };

    const handleDemoLogin = (role) => {
        setFormData({
            email: demoCredentials[role].email,
            password: demoCredentials[role].password,
            role: role
        });
        setShowDemoInfo(false);
        toast.info(`Kredensial ${role} telah dimasukkan`);
    };

    const getPasswordStrengthColor = (strength) => {
        if (strength === 0) return 'bg-gray-200';
        if (strength <= 2) return 'bg-red-500';
        if (strength === 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getPasswordStrengthText = (strength) => {
        if (strength === 0) return '';
        if (strength <= 2) return 'Lemah';
        if (strength === 3) return 'Sedang';
        return 'Kuat';
    };

    const roleOptions = [
        { value: 'admin_pusat', label: 'Admin Pusat', icon: Shield, description: 'Akses penuh sistem' },
        { value: 'admin_daerah', label: 'Admin Daerah', icon: User, description: 'Manajemen data daerah' },
        { value: 'masyarakat', label: 'Masyarakat', icon: Users, description: 'Akses informasi publik' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Main Container */}
            <div className="relative w-full max-w-6xl mx-auto">
                <Card className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl overflow-hidden">
                    {/* Glassmorphism Border Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 via-transparent to-blue-50/30 pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[650px] relative">
                        {/* Left Side - Features */}
                        <div className="relative p-10 flex flex-col justify-center bg-gradient-to-br from-blue-600 to-blue-800">
                            {/* Glass Overlay */}
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Logo */}
                                <div className="mb-12 flex items-center justify-center gap-3">
                                    <img src="/logo.svg" alt="" className="h-10 w-10 invert brightness-0 saturate-0" />
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">InfoKanMas</h1>
                                        <p className="text-blue-100 text-sm">Transparansi Anggaran Sosial</p>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-5 mb-10">
                                    {features.map((feature, index) => {
                                        const Icon = feature.icon;
                                        return (
                                            <Card
                                                key={index}
                                                className={`p-5 rounded-2xl backdrop-blur-xl border transition-all duration-700 transform ${index === activeFeature
                                                    ? 'bg-white/25 border-white/40 scale-100 opacity-100 translate-x-0'
                                                    : 'bg-white/10 border-white/20 scale-95 opacity-60 translate-x-2'
                                                    }`}
                                            >
                                                <CardContent className="p-0">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-white/30">
                                                            <Icon size={22} className="text-white" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                                                            <p className="text-blue-100 text-sm leading-relaxed">
                                                                {feature.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>

                                {/* Indicators */}
                                <div className="flex justify-center gap-2">
                                    {features.map((_, index) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setActiveFeature(index)}
                                            className={`h-1.5 rounded-full transition-all duration-300 p-0 ${index === activeFeature
                                                ? 'bg-white w-8'
                                                : 'bg-white/40 w-1.5 hover:bg-white/60'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right Side - Form */}
                        <div className="bg-white/90 backdrop-blur-xl p-10 flex flex-col justify-center relative">
                            <CardContent className="w-full max-w-md mx-auto p-0">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h2>
                                    <p className="text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
                                </div>

                                {/* Demo Button */}
                                <div className="flex justify-center mb-6">
                                    <Button
                                        onClick={() => setShowDemoInfo(true)}
                                        variant="outline"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-all transform hover:scale-105 border border-blue-100"
                                    >
                                        <Info size={16} />
                                        Kredensial Demo
                                    </Button>
                                </div>

                                {/* Messages */}
                                {error && (
                                    <Card className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl animate-slide-down">
                                        <CardContent className="p-0 flex items-start gap-3">
                                            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-800">{error}</p>
                                        </CardContent>
                                    </Card>
                                )}

                                {success && (
                                    <Card className="mb-4 p-4 bg-green-50 border border-green-200 rounded-2xl animate-slide-down">
                                        <CardContent className="p-0 flex items-start gap-3">
                                            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-green-800">{success}</p>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Google Button */}
                                <Button
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                    variant="outline"
                                    className="w-full mb-6 px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-medium hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group transform hover:scale-[1.01] active:scale-[0.99] shadow-sm"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span className="group-hover:text-gray-900 transition-colors">
                                        {isLoading ? 'Memproses...' : 'Masuk dengan Google'}
                                    </span>
                                </Button>

                                {/* Divider */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500 font-medium">Atau dengan email</span>
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Role */}
                                    <div>
                                        <Label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Pilih Role
                                        </Label>
                                        <div className="grid grid-cols-3 gap-2.5">
                                            {roleOptions.map((option) => {
                                                const Icon = option.icon;
                                                return (
                                                    <Button
                                                        key={option.value}
                                                        type="button"
                                                        variant={formData.role === option.value ? "default" : "outline"}
                                                        onClick={() => setFormData(prev => ({ ...prev, role: option.value }))}
                                                        className={`p-3.5 rounded-xl border-2 transition-all flex flex-col items-center gap-2 group h-auto ${formData.role === option.value
                                                            ? 'border-blue-500 bg-blue-50 shadow-md text-blue-900 hover:bg-blue-50'
                                                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
                                                            } transform hover:scale-105 active:scale-95`}
                                                    >
                                                        <Icon
                                                            size={20}
                                                            className={
                                                                formData.role === option.value
                                                                    ? 'text-blue-600'
                                                                    : 'text-gray-400 group-hover:text-blue-500'
                                                            }
                                                        />
                                                        <span className="text-xs font-medium">
                                                            {option.label}
                                                        </span>
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email
                                        </Label>
                                        <div className="relative group">
                                            <Mail size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="nama@email.com"
                                                className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:border-gray-300"
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <Label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Password
                                        </Label>
                                        <div className="relative group">
                                            <Lock size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Masukkan password"
                                                className="w-full pl-11 pr-12 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white hover:border-gray-300"
                                                disabled={isLoading}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors p-1 h-auto"
                                                disabled={isLoading}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </Button>
                                        </div>

                                        {formData.password && (
                                            <div className="mt-2.5 animate-slide-down">
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <span className="text-xs text-gray-500">Kekuatan password:</span>
                                                    <Badge variant={
                                                        passwordStrength <= 2 ? "destructive" :
                                                            passwordStrength === 3 ? "secondary" : "default"
                                                    }>
                                                        {getPasswordStrengthText(passwordStrength)}
                                                    </Badge>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-500 ${getPasswordStrengthColor(passwordStrength)}`}
                                                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Remember & Forgot */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                disabled={isLoading}
                                                className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 cursor-pointer transition-colors"
                                            />
                                            <Label
                                                htmlFor="remember"
                                                className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors cursor-pointer"
                                            >
                                                Ingat saya
                                            </Label>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors p-0 h-auto"
                                        >
                                            Lupa password?
                                        </Button>
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full px-4 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Memproses...</span>
                                            </>
                                        ) : (
                                            <>
                                                <LogIn size={18} />
                                                <span>Masuk</span>
                                            </>
                                        )}
                                    </Button>
                                </form>

                                {/* Sign Up */}
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        Belum punya akun?{' '}
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline p-0 h-auto"
                                        >
                                            Daftar sekarang
                                        </Button>
                                    </p>
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Demo Credentials Modal */}
            <Dialog open={showDemoInfo} onOpenChange={setShowDemoInfo}>
                <DialogContent className="bg-white rounded-3xl shadow-2xl max-w-md p-7 transform animate-scale-up border-0">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900 flex items-center justify-between">
                            Kredensial Demo
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-gray-600 mb-5">
                        Gunakan kredensial berikut untuk mencoba sistem:
                    </p>

                    <div className="space-y-3">
                        {roleOptions.map((role) => (
                            <Card key={role.value} className="border-2 border-gray-200 rounded-2xl p-4 hover:border-blue-300 transition-all hover:shadow-md">
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-semibold text-gray-900">{role.label}</span>
                                        <Button
                                            onClick={() => handleDemoLogin(role.value)}
                                            className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
                                        >
                                            Gunakan
                                        </Button>
                                    </div>
                                    <div className="text-xs text-gray-600 space-y-1.5 bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Mail size={12} className="text-gray-400" />
                                            <span className="font-mono">{demoCredentials[role.value].email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Lock size={12} className="text-gray-400" />
                                            <span className="font-mono">{demoCredentials[role.value].password}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="mt-5 p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl">
                        <CardContent className="p-0">
                            <p className="text-xs text-blue-800 leading-relaxed">
                                <strong>Note:</strong> Ini adalah kredensial demo untuk testing. Pada lingkungan produksi, gunakan kredensial yang sah.
                            </p>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// CSS Animations
const styles = `

@keyframes scale-up {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes slide-down {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-down {
  animation: slide-down 0.4s ease-out;
}

`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default LoginPage;