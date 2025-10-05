# 🤝 Contributing to InfoKanMas

Terima kasih atas minat Anda untuk berkontribusi pada **InfoKanMas**! Kami sangat menghargai setiap kontribusi, baik itu berupa code, dokumentasi, bug report, atau saran fitur baru.

---

## 📋 Daftar Isi

- [Code of Conduct](#-code-of-conduct)
- [Cara Berkontribusi](#-cara-berkontribusi)
- [Setup Development Environment](#-setup-development-environment)
- [Workflow Kontribusi](#-workflow-kontribusi)
- [Coding Standards](#-coding-standards)
- [Commit Message Guidelines](#-commit-message-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Testing Guidelines](#-testing-guidelines)
- [Dokumentasi](#-dokumentasi)
- [Komunitas](#-komunitas)

---

## 📜 Code of Conduct

Proyek ini mengadopsi [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). Dengan berpartisipasi, Anda diharapkan untuk mematuhi kode etik ini.

### Prinsip Utama:
- 🤗 **Inklusif & Ramah** - Hormati semua kontributor
- 💬 **Komunikasi Konstruktif** - Berikan feedback yang membangun
- 🎯 **Fokus pada Tujuan** - Prioritaskan kepentingan proyek
- 🙌 **Saling Membantu** - Kolaborasi lebih penting dari kompetisi

---

## 🚀 Cara Berkontribusi

Ada banyak cara untuk berkontribusi ke InfoKanMas:

### 1️⃣ Melaporkan Bug 🐛

Menemukan bug? Bantu kami memperbaikinya!

**Sebelum melaporkan bug:**
- ✅ Cek [Issues](https://github.com/your-org/infokanmas/issues) apakah sudah ada yang melaporkan
- ✅ Pastikan Anda menggunakan versi terbaru
- ✅ Coba reproduksi bug di environment yang bersih

**Cara melaporkan bug:**
1. Buka [New Issue](https://github.com/your-org/infokanmas/issues/new)
2. Pilih template **"Bug Report"**
3. Isi informasi berikut:
   - **Deskripsi Bug** - Jelaskan apa yang terjadi
   - **Steps to Reproduce** - Langkah-langkah untuk mereproduksi
   - **Expected Behavior** - Apa yang seharusnya terjadi
   - **Actual Behavior** - Apa yang benar-benar terjadi
   - **Screenshots** - Jika memungkinkan
   - **Environment** - OS, Browser, Node version, dll
   - **Additional Context** - Info tambahan yang relevan

**Contoh Bug Report:**
```markdown
**Deskripsi Bug**
Form submit RAB gagal ketika upload file > 5MB

**Steps to Reproduce**
1. Login sebagai Admin Daerah
2. Buka halaman "Submit RAB"
3. Isi semua field
4. Upload file PDF 7MB
5. Klik "Submit"

**Expected Behavior**
File ter-upload dan RAB berhasil di-submit

**Actual Behavior**
Error "Request Entity Too Large" muncul

**Environment**
- OS: Windows 11
- Browser: Chrome 120
- Node: 18.17.0

**Screenshots**
[Lampirkan screenshot error]
```

---

### 2️⃣ Mengusulkan Fitur Baru 💡

Punya ide fitur keren? Kami ingin mendengarnya!

**Cara mengusulkan fitur:**
1. Buka [New Issue](https://github.com/your-org/infokanmas/issues/new)
2. Pilih template **"Feature Request"**
3. Jelaskan:
   - **Problem Statement** - Masalah apa yang ingin diselesaikan?
   - **Proposed Solution** - Solusi yang Anda usulkan
   - **Alternatives** - Solusi alternatif yang dipertimbangkan
   - **Use Case** - Siapa yang akan menggunakan fitur ini?
   - **Benefits** - Manfaat yang didapat
   - **Mockups** - Jika ada design/wireframe

**Contoh Feature Request:**
```markdown
**Problem Statement**
Admin Daerah kesulitan melacak status RAB yang sedang dalam review

**Proposed Solution**
Tambahkan notification real-time ketika status RAB berubah

**Use Case**
- Admin Daerah submit RAB
- Ketika Admin Pusat mulai review, notifikasi dikirim
- Ketika ada comment/request revision, notifikasi dikirim
- Ketika approved/rejected, notifikasi dikirim

**Benefits**
- Meningkatkan transparansi proses
- Mengurangi waktu response time
- User lebih engaged dengan platform
```

---

### 3️⃣ Berkontribusi Code 💻

Siap coding? Awesome! Ikuti langkah berikut:

#### **Good First Issues** 🌟
Untuk kontributor pemula, cari issues dengan label:
- `good first issue` - Cocok untuk pemula
- `help wanted` - Butuh bantuan komunitas
- `documentation` - Perbaiki/tambah dokumentasi

#### **Workflow Kontribusi:**
```
1. Fork repository
   ↓
2. Clone ke lokal
   ↓
3. Buat branch baru
   ↓
4. Coding & testing
   ↓
5. Commit dengan format yang benar
   ↓
6. Push ke fork Anda
   ↓
7. Buat Pull Request
   ↓
8. Code Review
   ↓
9. Merge! 🎉
```

---

## 🛠️ Setup Development Environment

### Prerequisites

Pastikan sudah terinstall:
```bash
# Check versions
node --version    # >= 16.x
npm --version     # >= 8.x
php --version     # >= 8.1
composer --version
python --version  # >= 3.9
```

### 1️⃣ Fork & Clone Repository

```bash
# Fork via GitHub UI, lalu clone
git clone https://github.com/YOUR_USERNAME/infokanmas.git
cd infokanmas

# Add upstream remote
git remote add upstream https://github.com/original-org/infokanmas.git
```

### 2️⃣ Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env dengan konfigurasi Anda
nano .env

# Start development server
npm run dev
```

**Environment Variables (.env):**
```env
VITE_API_URL=http://localhost:8000/api
VITE_AI_API_URL=http://localhost:5000
VITE_APP_NAME=InfoKanMas
```

### 3️⃣ Setup Backend

```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create database
mysql -u root -p
> CREATE DATABASE infokanmas;
> exit;

# Update .env
nano .env

# Run migrations
php artisan migrate

# Seed database (optional)
php artisan db:seed

# Start server
php artisan serve
```

**Environment Variables (.env):**
```env
DB_DATABASE=infokanmas
DB_USERNAME=root
DB_PASSWORD=your_password

AI_API_URL=http://localhost:5000
```

### 4️⃣ Setup AI/ML Service

```bash
cd ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# atau
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Start ML API
python app.py
```

### 5️⃣ Verify Setup

Cek semua service berjalan:
```bash
# Frontend: http://localhost:5173
# Backend:  http://localhost:8000
# AI/ML:    http://localhost:5000

# Test API
curl http://localhost:8000/api/health
curl http://localhost:5000/health
```

---

## 🔄 Workflow Kontribusi

### 1️⃣ Sync dengan Upstream

Sebelum mulai coding, pastikan fork Anda up-to-date:

```bash
# Fetch upstream changes
git fetch upstream

# Merge ke branch main lokal Anda
git checkout main
git merge upstream/main

# Push ke fork Anda
git push origin main
```

### 2️⃣ Buat Branch Baru

**Branch Naming Convention:**
```
feature/nama-fitur       - Untuk fitur baru
bugfix/nama-bug          - Untuk bug fix
hotfix/nama-hotfix       - Untuk urgent fix
docs/nama-dokumentasi    - Untuk dokumentasi
refactor/nama-refactor   - Untuk refactoring
test/nama-test           - Untuk testing
```

**Contoh:**
```bash
# Feature baru
git checkout -b feature/notification-center

# Bug fix
git checkout -b bugfix/login-redirect-error

# Dokumentasi
git checkout -b docs/api-documentation
```

### 3️⃣ Coding

**Tips saat coding:**
- ✅ Ikuti [Coding Standards](#-coding-standards)
- ✅ Tulis code yang self-documenting
- ✅ Tambahkan comments untuk logic yang complex
- ✅ Pastikan tidak ada console.log di production code
- ✅ Handle error dengan baik
- ✅ Tulis tests untuk fitur baru

### 4️⃣ Testing

Sebelum commit, pastikan semua test pass:

```bash
# Frontend
cd frontend
npm run test
npm run lint

# Backend
cd backend
php artisan test
./vendor/bin/phpstan analyse

# AI/ML
cd ai-service
pytest
flake8 .
```

### 5️⃣ Commit Changes

Lihat [Commit Message Guidelines](#-commit-message-guidelines) untuk format yang benar.

```bash
# Stage files
git add .

# Commit dengan message yang jelas
git commit -m "feat(frontend): add notification center component"

# Push ke fork Anda
git push origin feature/notification-center
```

---

## 📏 Coding Standards

### Frontend (React/JavaScript)

**Style Guide:**
- ✅ Gunakan **ESLint** dan **Prettier**
- ✅ Component names: **PascalCase** (e.g., `NotificationCenter.jsx`)
- ✅ Function names: **camelCase** (e.g., `handleSubmit`)
- ✅ Constants: **UPPER_SNAKE_CASE** (e.g., `MAX_FILE_SIZE`)
- ✅ File names: **PascalCase** untuk components, **camelCase** untuk utils

**React Best Practices:**
```javascript
// ✅ GOOD: Functional components dengan hooks
const NotificationCenter = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    fetchNotifications(userId);
  }, [userId]);
  
  return (
    <div className="notification-center">
      {notifications.map(notif => (
        <NotificationItem key={notif.id} {...notif} />
      ))}
    </div>
  );
};

// ❌ BAD: Class components (avoid untuk code baru)
class NotificationCenter extends React.Component {
  // ...
}

// ✅ GOOD: PropTypes atau TypeScript
NotificationCenter.propTypes = {
  userId: PropTypes.number.isRequired,
};

// ✅ GOOD: Custom hooks untuk reusable logic
const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  // ... logic
  return notifications;
};
```

**Folder Structure:**
```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── pages/               # Page components
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── services/            # API services
├── store/               # State management
└── styles/              # Global styles
```

---

### Backend (Laravel/PHP)

**Style Guide:**
- ✅ Ikuti **PSR-12** coding standard
- ✅ Class names: **PascalCase** (e.g., `RabController`)
- ✅ Method names: **camelCase** (e.g., `approveRab`)
- ✅ Use **type hints** dan **return types**

**Laravel Best Practices:**
```php
<?php

// ✅ GOOD: Type hints dan return types
public function approveRab(int $rabId): JsonResponse
{
    $rab = Rab::findOrFail($rabId);
    
    $rab->update(['status' => 'approved']);
    
    return response()->json([
        'message' => 'RAB berhasil disetujui',
        'data' => new RabResource($rab)
    ]);
}

// ✅ GOOD: Resource untuk API responses
class RabResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'program_name' => $this->program_name,
            'status' => $this->status,
            // ...
        ];
    }
}

// ✅ GOOD: Form Request untuk validation
class StoreRabRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'program_name' => 'required|string|max:255',
            'total_budget' => 'required|numeric|min:0',
            // ...
        ];
    }
}

// ✅ GOOD: Service classes untuk business logic
class RabService
{
    public function scoreRab(Rab $rab): array
    {
        // Complex business logic here
        return [
            'score' => 85,
            'fraud_risk' => 'low',
        ];
    }
}
```

**Folder Structure:**
```
app/
├── Http/
│   ├── Controllers/     # Controllers
│   ├── Requests/        # Form requests
│   ├── Resources/       # API resources
│   └── Middleware/      # Custom middleware
├── Models/              # Eloquent models
├── Services/            # Business logic
└── Repositories/        # Data access layer
```

---

### AI/ML (Python)

**Style Guide:**
- ✅ Ikuti **PEP 8**
- ✅ Use **type hints** (Python 3.9+)
- ✅ Function names: **snake_case**
- ✅ Class names: **PascalCase**
- ✅ Constants: **UPPER_SNAKE_CASE**

**Python Best Practices:**
```python
# ✅ GOOD: Type hints dan docstrings
def calculate_fraud_score(rab_data: dict) -> dict:
    """
    Calculate fraud risk score for RAB submission.
    
    Args:
        rab_data (dict): RAB submission data
        
    Returns:
        dict: Fraud analysis result with score and flags
    """
    score = fraud_model.predict(rab_data)
    
    return {
        'fraud_score': float(score),
        'risk_level': _classify_risk(score),
        'red_flags': _detect_red_flags(rab_data)
    }

# ✅ GOOD: Use dataclasses untuk structured data
from dataclasses import dataclass

@dataclass
class FraudAnalysisResult:
    fraud_score: float
    risk_level: str
    red_flags: list[str]
    confidence: float

# ✅ GOOD: Error handling
try:
    result = calculate_fraud_score(rab_data)
except ValueError as e:
    logger.error(f"Invalid RAB data: {e}")
    raise HTTPException(status_code=400, detail=str(e))
```

---

## 💬 Commit Message Guidelines

Gunakan **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat` - Fitur baru
- `fix` - Bug fix
- `docs` - Perubahan dokumentasi
- `style` - Formatting, missing semi colons, etc
- `refactor` - Refactoring code
- `test` - Menambah tests
- `chore` - Maintenance tasks

### Scope:
- `frontend` - Frontend changes
- `backend` - Backend changes
- `ml` - AI/ML changes
- `docs` - Documentation
- `ci` - CI/CD changes

### Examples:

**Good commits:**
```bash
feat(frontend): add notification center component

Implement real-time notification system with WebSocket
connection. Notifications are categorized by type and
can be marked as read/unread.

Closes #123

---

fix(backend): resolve RAB approval race condition

Add database transaction lock to prevent concurrent
approval of same RAB submission.

Fixes #456

---

docs(readme): update installation instructions

Add troubleshooting section for common setup issues
on Windows environment.

---

refactor(ml): improve fraud detection model performance

Optimize feature engineering pipeline, reducing
inference time from 500ms to 200ms.

Performance improvement: 60%
```

**Bad commits:**
```bash
❌ update stuff
❌ fix bug
❌ WIP
❌ asdasd
❌ forgot to add file
```

---

## 🔍 Pull Request Process

### 1️⃣ Sebelum Membuat PR

**Checklist:**
- ✅ Code sudah di-test dan berjalan dengan baik
- ✅ All tests passing (unit, integration, e2e)
- ✅ Linter tidak ada error/warning
- ✅ Documentation sudah diupdate (jika perlu)
- ✅ Commit messages mengikuti convention
- ✅ Branch sudah sync dengan `main`

### 2️⃣ Membuat Pull Request

1. Push branch ke fork Anda
2. Buka repository di GitHub
3. Klik **"New Pull Request"**
4. Pilih base: `main` ← compare: `your-branch`
5. Isi PR template dengan lengkap

**PR Title Format:**
```
[TYPE] Short description (#issue-number)

Examples:
[FEAT] Add notification center (#123)
[FIX] Resolve RAB approval race condition (#456)
[DOCS] Update API documentation (#789)
```

**PR Description Template:**
```markdown
## 📝 Description
Brief description of what this PR does.

## 🎯 Related Issue
Closes #123

## 🔄 Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## 🧪 How Has This Been Tested?
Describe the tests you ran:
- Unit tests: ✅ All passing (15/15)
- Integration tests: ✅ All passing (8/8)
- Manual testing: ✅ Tested on Chrome, Firefox, Safari

## 📸 Screenshots (if applicable)
[Add screenshots here]

## ✅ Checklist
- [x] My code follows the style guidelines
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] I have made corresponding changes to the documentation
- [x] My changes generate no new warnings
- [x] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests pass locally with my changes
- [x] Any dependent changes have been merged and published

## 📚 Additional Notes
Any additional information or context.
```

### 3️⃣ Code Review Process

**Sebagai Author:**
- 💬 Respond to feedback dengan terbuka
- 🔄 Update PR berdasarkan comments
- ✅ Resolve conversations setelah fix
- 🙏 Terima kasih kepada reviewer

**Sebagai Reviewer:**
- 👀 Review dalam 24-48 jam
- 💬 Berikan feedback konstruktif
- ✅ Approve jika sudah memenuhi standard
- 🎯 Fokus pada code quality, bukan personal

**Review Checklist:**
```
Code Quality:
□ Code mudah dibaca dan dipahami
□ Naming conventions konsisten
□ Tidak ada code smell
□ DRY principle diterapkan
□ Error handling adequate

Functionality:
□ Fitur berjalan sesuai requirement
□ Edge cases ditangani
□ No breaking changes (atau documented)

Testing:
□ Test coverage adequate
□ Tests meaningful dan tidak brittle

Performance:
□ No obvious performance issues
□ Database queries optimized
□ No memory leaks

Security:
□ No security vulnerabilities
□ Input validation proper
□ Authentication/authorization correct
```

### 4️⃣ Merge Requirements

PR bisa di-merge jika:
- ✅ Minimal 2 approvals (untuk major changes)
- ✅ All CI checks passing
- ✅ No merge conflicts
- ✅ All conversations resolved
- ✅ Branch updated with latest `main`

---

## 🧪 Testing Guidelines

### Frontend Testing

```bash
# Unit tests (Vitest/Jest)
npm run test

# E2E tests (Cypress/Playwright)
npm run test:e2e

# Coverage
npm run test:coverage
```

**Test Structure:**
```javascript
describe('NotificationCenter', () => {
  it('should render notifications list', () => {
    const { getByText } = render(
      <NotificationCenter notifications={mockNotifications} />
    );
    
    expect(getByText('New RAB Approved')).toBeInTheDocument();
  });
  
  it('should mark notification as read', async () => {
    const mockMarkAsRead = jest.fn();
    const { getByRole } = render(
      <NotificationCenter onMarkAsRead={mockMarkAsRead} />
    );
    
    fireEvent.click(getByRole('button', { name: /mark as read/i }));
    
    expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
  });
});
```

### Backend Testing

```bash
# All tests
php artisan test

# Specific test
php artisan test --filter=RabControllerTest

# Coverage
php artisan test --coverage
```

**Test Structure:**
```php
class RabControllerTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_admin_can_approve_rab()
    {
        $admin = User::factory()->adminPusat()->create();
        $rab = Rab::factory()->pending()->create();
        
        $response = $this->actingAs($admin)
            ->postJson("/api/rab/{$rab->id}/approve");
        
        $response->assertStatus(200)
            ->assertJson(['message' => 'RAB berhasil disetujui']);
        
        $this->assertDatabaseHas('rabs', [
            'id' => $rab->id,
            'status' => 'approved',
        ]);
    }
}
```

### AI/ML Testing

```bash
# Unit tests
pytest tests/

# Specific test
pytest tests/test_fraud_detection.py

# Coverage
pytest --cov=app tests/
```

**Test Structure:**
```python
def test_fraud_detection_accuracy():
    """Test fraud detection model accuracy on test data."""
    X_test, y_test = load_test_data()
    
    predictions = fraud_model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    
    assert accuracy > 0.85, f"Accuracy {accuracy} below threshold"

def test_fraud_score_range():
    """Test fraud score is within valid range."""
    rab_data = create_mock_rab()
    
    result = calculate_fraud_score(rab_data)
    
    assert 0 <= result['fraud_score'] <= 100
    assert result['risk_level'] in ['low', 'medium', 'high', 'critical']
```

---

## 📚 Dokumentasi

### Update Documentation

Jika PR Anda mengubah behavior atau menambah fitur, update dokumentasi:

**Lokasi Dokumentasi:**
```
docs/
├── api/              # API documentation
├── user-guide/       # User guides
├── development/      # Development guides
└── deployment/       # Deployment guides
```

**Dokumentasi yang Perlu Diupdate:**
- README.md - Jika ada perubahan setup
- API Documentation - Untuk endpoint baru/berubah
- User Guide - Untuk fitur user-facing
- CHANGELOG.md - List perubahan per version

### API Documentation

Gunakan **Swagger/OpenAPI** untuk mendokumentasikan API:

```php
/**
 * @OA\Post(
 *     path="/api/rab/{id}/approve",
 *     summary="Approve RAB submission",
 *     tags={"RAB"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="RAB approved successfully"
 *     )
 * )
 */
public function approve(int $id): JsonResponse
{
    // ...
}
```

---

## 👥 Komunitas

### Bertanya & Diskusi

- 💬 **Discord**: [Join our Discord](https://discord.gg/infokanmas)
- 🐦 **Twitter**: [@InfoKanMas](https://twitter.com/infokanmas)
- 📧 **Email**: developers@infokanmas.id

### Review Schedule

- **Code Review**: Senin - Jumat, 09:00 - 17:00 WIB
- **Weekly Sync**: Setiap Senin, 10:00 WIB
- **Sprint Planning**: Setiap 2 minggu, Jumat 14:00 WIB

### Recognition

Kontributor terbaik akan mendapat:
- 🏆 Shoutout di README
- 🎖️ Contributor badge
- 📜 Certificate of contribution
- 🎁 InfoKanMas swag (untuk kontributor aktif)

---

## 🙏 Terima Kasih!

Setiap kontribusi, sekecil apapun, sangat berarti untuk InfoKanMas dan misi kami untuk menciptakan transparansi anggaran publik yang lebih baik di Indonesia.

**Happy Contributing! 🚀**

---

<div align="center">

**Butuh Bantuan?**

[📖 Documentation](https://docs.infokanmas.id) • [💬 Discord](https://discord.gg/infokanmas) • [🐛 Report Bug](https://github.com/your-org/infokanmas/issues)

**Dibuat dengan ❤️ untuk Indonesia yang Lebih Transparan**

</div>
