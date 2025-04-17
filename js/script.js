// Fungsi untuk menampilkan waktu saat ini
function updateCurrentTime() {
    const currentTimeElement = document.getElementById('currentTime');
    if (currentTimeElement) {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            timeZoneName: 'short'
        };
        currentTimeElement.textContent = now.toLocaleString('id-ID', options);
    }
}

// Fungsi untuk memeriksa dan memperbarui nama di halaman beranda
function checkUserName() {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        // Cek apakah nama sudah tersimpan di localStorage
        const savedName = localStorage.getItem('visitorName');
        if (savedName) {
            userNameElement.textContent = savedName;
        } else {
            // Jika tidak ada, minta input nama
            setTimeout(() => {
                const nama = prompt('Silakan masukkan nama Anda:');
                if (nama && nama.trim() !== '') {
                    localStorage.setItem('visitorName', nama);
                    userNameElement.textContent = nama;
                }
            }, 1000);
        }
    }
}

// Toggle menu di tampilan mobile
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
}

// Validasi form kontak
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            
            // Get form values
            const nama = document.getElementById('nama').value.trim();
            const tanggal = document.getElementById('tanggal').value;
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const pesan = document.getElementById('pesan').value.trim();
            
            // Validate
            let isValid = true;
            
            if (nama === '') {
                document.getElementById('namaError').textContent = 'Nama tidak boleh kosong';
                isValid = false;
            }
            
            if (tanggal === '') {
                document.getElementById('tanggalError').textContent = 'Tanggal lahir tidak boleh kosong';
                isValid = false;
            }
            
            if (pesan === '') {
                document.getElementById('pesanError').textContent = 'Pesan tidak boleh kosong';
                isValid = false;
            }
            
            // If valid, display the message
            if (isValid) {
                // Format date
                const formattedDate = formatDate(tanggal);
                
                // Display in message box
                document.getElementById('displayNama').textContent = nama;
                document.getElementById('displayTanggal').textContent = formattedDate;
                document.getElementById('displayGender').textContent = gender;
                document.getElementById('displayPesan').textContent = pesan;
                
                // Show success message
                alert('Pesan berhasil dikirim!');
            }
        });
    }
}

// Format date from yyyy-mm-dd to dd/mm/yyyy
function formatDate(dateString) {
    if (!dateString) return '';
    
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Animate elements when they come into view
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.location, .stat-item, .vision-box, .mission-box, .team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize everything when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update time every second
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Check for user name on home page
    checkUserName();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup form validation
    setupFormValidation();
    
    // Setup scroll animations
    setupScrollAnimations();
});