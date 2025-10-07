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
    MapPin,
    Users,
    Info,
    Building,
    Home,
    Map
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
        role: 'admin_kabupaten'
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
        admin_kabupaten: { email: 'kabupaten@infokanmas.id', password: 'kabupaten123' },
        admin_kecamatan: { email: 'kecamatan@infokanmas.id', password: 'kecamatan123' },
        admin_desa: { email: 'desa@infokanmas.id', password: 'desa123' },
        masyarakat: { email: 'masyarakat@infokanmas.id', password: 'masyarakat123' }
    };

    const features = [
        {
            icon: Shield,
            title: "Transparansi Total",
            description: "Pantau setiap rupiah anggaran dari tingkat kabupaten hingga desa"
        },
        {
            icon: MapPin,
            title: "Monitoring Wilayah",
            description: "Pantau progres proyek di setiap kecamatan dan desa"
        },
        {
            icon: Users,
            title: "Partisipasi Masyarakat",
            description: "Masyarakat bisa laporkan dan pantau langsung anggaran"
        },
        {
            icon: Building,
            title: "Multi-level Admin",
            description: "Sistem terintegrasi dari kabupaten, kecamatan, hingga desa"
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

    const handleDemoLogin = (role) => {
        setFormData({
            email: demoCredentials[role].email,
            password: demoCredentials[role].password,
            role: role
        });
        setShowDemoInfo(false);
        toast.info(`Kredensial ${getRoleLabel(role)} telah dimasukkan`);
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

    const getRoleLabel = (role) => {
        const labels = {
            admin_kabupaten: 'Admin Kabupaten',
            admin_kecamatan: 'Admin Kecamatan', 
            admin_desa: 'Admin Desa',
            masyarakat: 'Masyarakat'
        };
        return labels[role] || role;
    };

    const roleOptions = [
        { 
            value: 'admin_kabupaten', 
            label: 'Admin Kabupaten', 
            icon: Building, 
            description: 'Akses penuh data seluruh wilayah',
            color: 'from-blue-500 to-blue-600'
        },
        { 
            value: 'admin_kecamatan', 
            label: 'Admin Kecamatan', 
            icon: Map, 
            description: 'Kelola data wilayah kecamatan',
            color: 'from-blue-500 to-blue-600'
        },
        { 
            value: 'admin_desa', 
            label: 'Admin Desa', 
            icon: Home, 
            description: 'Kelola data dan proyek desa',
            color: 'from-blue-500 to-blue-600'
        },
        { 
            value: 'masyarakat', 
            label: 'Masyarakat', 
            icon: Users, 
            description: 'Akses informasi dan laporan',
            color: 'from-blue-500 to-blue-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4 relative overflow-hidden">

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
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                                    <img src="/logo.png" alt="" className='h-10 w-10 invert brightness-0 saturate-0'/>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">InfoKanMas</h1>
                                        <p className="text-blue-100 text-sm">Purbalingga Transparan</p>
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
                                        <button
                                            key={index}
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
                                    <p className="text-gray-600">Masuk sesuai peran Anda di sistem InfoKanMas</p>
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

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Role Selection */}
                                    <div>
                                        <Label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Pilih Peran
                                        </Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {roleOptions.map((option) => {
                                                const Icon = option.icon;
                                                return (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, role: option.value }))}
                                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 group h-auto ${formData.role === option.value
                                                            ? `border-blue-500 bg-gradient-to-br ${option.color} text-white shadow-md`
                                                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 text-gray-700'
                                                            } transform hover:scale-105 active:scale-95`}
                                                    >
                                                        <Icon
                                                            size={24}
                                                            className={
                                                                formData.role === option.value
                                                                    ? 'text-white'
                                                                    : 'text-gray-400 group-hover:text-blue-500'
                                                            }
                                                        />
                                                        <div className="text-center">
                                                            <div className="text-sm font-semibold">
                                                                {option.label}
                                                            </div>
                                                            <div className={`text-xs mt-1 ${formData.role === option.value ? 'text-blue-100' : 'text-gray-500'}`}>
                                                                {option.description}
                                                            </div>
                                                        </div>
                                                    </button>
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
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors p-1"
                                                disabled={isLoading}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
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
                                        <button
                                            type="button"
                                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors p-0 h-auto"
                                        >
                                            Lupa password?
                                        </button>
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
                                                <span>Masuk sebagai {getRoleLabel(formData.role)}</span>
                                            </>
                                        )}
                                    </Button>
                                </form>

                                {/* Sign Up */}
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        Belum punya akun?{' '}
                                        <button
                                            type="button"
                                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline p-0 h-auto"
                                        >
                                            Daftar sekarang
                                        </button>
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
                            <div className="flex items-center gap-2">
                                <Info size={20} />
                                Kredensial Demo
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-gray-600 mb-5">
                        Gunakan kredensial berikut untuk mencoba sistem InfoKanMas:
                    </p>

                    <div className="space-y-3">
                        {roleOptions.map((role) => (
                            <Card key={role.value} className="border-2 border-gray-200 rounded-2xl p-4 hover:border-blue-300 transition-all hover:shadow-md">
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <span className="font-semibold text-gray-900">{role.label}</span>
                                            <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                                        </div>
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
                                <strong>Catatan:</strong> Ini adalah kredensial demo untuk testing sistem InfoKanMas Purbalingga.
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

.animate-scale-up {
  animation: scale-up 0.3s ease-out;
}
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default LoginPage;