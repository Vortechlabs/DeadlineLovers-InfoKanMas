import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Edit3,
  Save,
  X,
  Camera,
  Home,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/services/GlobalApi';

export default function ProfilePage() {
  const { user, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    umur: '',
    rt: '',
    rw: '',
    alamat_lengkap: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData(user);
      setFormData({
        nama: user.nama || '',
        email: user.email || '',
        telepon: user.telepon || '',
        umur: user.umur || '',
        rt: user.rt || '',
        rw: user.rw || '',
        alamat_lengkap: user.alamat_lengkap || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.put('/user/profile', formData);
      
      if (response.data.success) {
        setProfileData(response.data.data);
        toast.success('Profile berhasil diperbarui');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Gagal memperbarui profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      nama: profileData.nama || '',
      email: profileData.email || '',
      telepon: profileData.telepon || '',
      umur: profileData.umur || '',
      rt: profileData.rt || '',
      rw: profileData.rw || '',
      alamat_lengkap: profileData.alamat_lengkap || ''
    });
    setIsEditing(false);
  };

  const getInitials = (nama) => {
    return nama
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Saya</h1>
          <p className="text-gray-600 mt-2">Kelola informasi profile Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader className="text-center pb-4">
                <div className="relative inline-block">
                  <Avatar className="h-24 w-24 mx-auto border-4 border-white shadow-lg">
                    <AvatarImage src="" alt={profileData.nama} />
                    <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      {getInitials(profileData.nama)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 shadow-lg">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                </div>
                <CardTitle className="mt-4 text-xl">{profileData.nama}</CardTitle>
                <CardDescription className="flex justify-center mt-2">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <Users className="h-3 w-3 mr-1" />
                    Masyarakat
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{profileData.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{profileData.telepon || 'Belum diisi'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Bergabung {formatDate(profileData.created_at)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Informasi Profile</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Keamanan</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Information Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Informasi Pribadi</CardTitle>
                      <CardDescription>
                        Kelola informasi pribadi dan kontak Anda
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" className="flex items-center space-x-2">
                        <Edit3 className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button onClick={handleCancelEdit} variant="outline" className="flex items-center space-x-2">
                          <X className="h-4 w-4" />
                          <span>Batal</span>
                        </Button>
                        <Button 
                          onClick={handleSaveProfile} 
                          disabled={isLoading}
                          className="flex items-center space-x-2"
                        >
                          <Save className="h-4 w-4" />
                          <span>{isLoading ? 'Menyimpan...' : 'Simpan'}</span>
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Nama */}
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap</Label>
                        {isEditing ? (
                          <Input
                            id="nama"
                            name="nama"
                            value={formData.nama}
                            onChange={handleInputChange}
                            placeholder="Masukkan nama lengkap"
                          />
                        ) : (
                          <div className="p-2 border border-transparent rounded-md bg-gray-50">
                            {profileData.nama}
                          </div>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Masukkan email"
                          />
                        ) : (
                          <div className="p-2 border border-transparent rounded-md bg-gray-50">
                            {profileData.email}
                          </div>
                        )}
                      </div>

                      {/* Telepon */}
                      <div className="space-y-2">
                        <Label htmlFor="telepon">Nomor Telepon</Label>
                        {isEditing ? (
                          <Input
                            id="telepon"
                            name="telepon"
                            value={formData.telepon}
                            onChange={handleInputChange}
                            placeholder="Masukkan nomor telepon"
                          />
                        ) : (
                          <div className="p-2 border border-transparent rounded-md bg-gray-50">
                            {profileData.telepon || 'Belum diisi'}
                          </div>
                        )}
                      </div>

                      {/* Umur */}
                      <div className="space-y-2">
                        <Label htmlFor="umur">Umur</Label>
                        {isEditing ? (
                          <Input
                            id="umur"
                            name="umur"
                            type="number"
                            value={formData.umur}
                            onChange={handleInputChange}
                            placeholder="Masukkan umur"
                          />
                        ) : (
                          <div className="p-2 border border-transparent rounded-md bg-gray-50">
                            {profileData.umur ? `${profileData.umur} tahun` : 'Belum diisi'}
                          </div>
                        )}
                      </div>

                      {/* RT */}
                      <div className="space-y-2">
                        <Label htmlFor="rt">RT</Label>
                        {isEditing ? (
                          <Input
                            id="rt"
                            name="rt"
                            value={formData.rt}
                            onChange={handleInputChange}
                            placeholder="Masukkan RT"
                          />
                        ) : (
                          <div className="p-2 border border-transparent rounded-md bg-gray-50">
                            {profileData.rt || 'Belum diisi'}
                          </div>
                        )}
                      </div>

                      {/* RW */}
                      <div className="space-y-2">
                        <Label htmlFor="rw">RW</Label>
                        {isEditing ? (
                          <Input
                            id="rw"
                            name="rw"
                            value={formData.rw}
                            onChange={handleInputChange}
                            placeholder="Masukkan RW"
                          />
                        ) : (
                          <div className="p-2 border border-transparent rounded-md bg-gray-50">
                            {profileData.rw || 'Belum diisi'}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Alamat Lengkap */}
                    <div className="space-y-2">
                      <Label htmlFor="alamat_lengkap">Alamat Lengkap</Label>
                      {isEditing ? (
                        <Textarea
                          id="alamat_lengkap"
                          name="alamat_lengkap"
                          value={formData.alamat_lengkap}
                          onChange={handleInputChange}
                          placeholder="Masukkan alamat lengkap"
                          rows={3}
                        />
                      ) : (
                        <div className="p-3 border border-transparent rounded-md bg-gray-50 min-h-[80px]">
                          {profileData.alamat_lengkap || 'Belum diisi'}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Statistik */}
                <Card>
                  <CardHeader>
                    <CardTitle>Aktivitas Saya</CardTitle>
                    <CardDescription>
                      Ringkasan partisipasi Anda dalam sistem
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">0</div>
                        <div className="text-sm text-gray-600">Program Diikuti</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">0</div>
                        <div className="text-sm text-gray-600">Laporan Disampaikan</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">0</div>
                        <div className="text-sm text-gray-600">Rating Diberikan</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">0</div>
                        <div className="text-sm text-gray-600">Konfirmasi</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Keamanan Akun</CardTitle>
                    <CardDescription>
                      Kelola keamanan akun dan kata sandi Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">Verifikasi Email</div>
                            <div className="text-sm text-gray-500">
                              {profileData.email_verified_at 
                                ? 'Terverifikasi' 
                                : 'Belum diverifikasi'
                              }
                            </div>
                          </div>
                        </div>
                        <Badge variant={profileData.email_verified_at ? "default" : "secondary"}>
                          {profileData.email_verified_at ? "Aman" : "Perlu Verifikasi"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">Kata Sandi</div>
                            <div className="text-sm text-gray-500">
                              Terakhir diubah {formatDate(profileData.updated_at)}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ubah Password
                        </Button>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Shield className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Tips Keamanan
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Gunakan kata sandi yang kuat dan unik</li>
                              <li>Jangan bagikan informasi login Anda</li>
                              <li>Selalu logout setelah menggunakan perangkat bersama</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}