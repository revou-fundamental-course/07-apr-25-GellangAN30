// Fungsi untuk menampilkan nama penggunjung dan mengelola interaksi pengguna
document.addEventListener('DOMContentLoaded', function () {
    // Mendapatkan nama dari localStorage atau prompt
    let userName = localStorage.getItem('userName');

    // Jika di halaman utama dan elemen userName ada
    if (document.getElementById('userName')) {
        if (!userName) {
            userName = prompt('Masukkan nama Anda:', 'Pengunjung');
            if (userName && userName.trim() !== '') {
                localStorage.setItem('userName', userName);
            } else {
                userName = 'Pengunjung';
            }
        }
        document.getElementById('userName').textContent = userName;
    }

    // Menangani form contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Inisialisasi tampilan hasil
        const hasilPesan = document.getElementById('hasilPesan');
        if (hasilPesan) {
            hasilPesan.style.display = 'none';
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Mendapatkan nilai dari form
            const nama = document.getElementById('nama').value;
            const tanggal = document.getElementById('tanggal').value;
            const genderEl = document.querySelector('input[name="gender"]:checked');
            const gender = genderEl ? genderEl.value : 'Laki-Laki';
            const pesan = document.getElementById('pesan').value;

            // Format tanggal
            const tanggalObj = new Date(tanggal);
            const formattedDate = `${tanggalObj.getDate()}/${tanggalObj.getMonth() + 1}/${tanggalObj.getFullYear()}`;

            // Mendapatkan waktu sekarang
            const now = new Date();
            const waktu = now.toLocaleString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            });

            // Menampilkan hasil
            document.getElementById('waktuSekarang').textContent = waktu;
            document.getElementById('hasilNama').textContent = nama;
            document.getElementById('hasilTanggal').textContent = formattedDate;
            document.getElementById('hasilGender').textContent = gender;
            document.getElementById('hasilPesanText').textContent = pesan;

            // Menampilkan bagian hasil dengan animasi fade-in
            const hasilPesan = document.getElementById('hasilPesan');
            hasilPesan.style.opacity = '0';
            hasilPesan.style.display = 'block';

            // Animasi fade-in
            let opacity = 0;
            const fadeIn = setInterval(function () {
                if (opacity < 1) {
                    opacity += 0.1;
                    hasilPesan.style.opacity = opacity;
                } else {
                    clearInterval(fadeIn);
                }
            }, 30);

            // Scroll ke hasil dengan smooth scroll
            setTimeout(function () {
                hasilPesan.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);

            // Simpan data ke localStorage untuk persistensi
            const formData = {
                nama,
                tanggal: formattedDate,
                gender,
                pesan,
                waktu
            };
            localStorage.setItem('lastFormSubmission', JSON.stringify(formData));
        });

        // Cek apakah ada data form yang tersimpan di localStorage dan tampilkan jika ada
        const savedFormData = localStorage.getItem('lastFormSubmission');
        if (savedFormData) {
            try {
                const formData = JSON.parse(savedFormData);
                document.getElementById('waktuSekarang').textContent = formData.waktu;
                document.getElementById('hasilNama').textContent = formData.nama;
                document.getElementById('hasilTanggal').textContent = formData.tanggal;
                document.getElementById('hasilGender').textContent = formData.gender;
                document.getElementById('hasilPesanText').textContent = formData.pesan;

                // Tampilkan bagian hasil
                const hasilPesan = document.getElementById('hasilPesan');
                hasilPesan.style.display = 'block';
            } catch (e) {
                console.error('Error parsing saved form data', e);
                localStorage.removeItem('lastFormSubmission');
            }
        }
    }

    // Toggle Menu untuk Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('nav-active');

            // Animasi hamburger
            const bars = document.querySelectorAll('.hamburger span');
            if (bars.length) {
                bars.forEach((bar, index) => {
                    if (navMenu.classList.contains('nav-active')) {
                        // Transformasi ke X ketika aktif
                        if (index === 0) {
                            bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        } else if (index === 1) {
                            bar.style.opacity = '0';
                        } else if (index === 2) {
                            bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                        }
                    } else {
                        // Kembali ke hamburger ketika tidak aktif
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    }
                });
            }
        });

        // Tutup menu saat klik di luar
        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('nav-active') &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)) {
                navMenu.classList.remove('nav-active');

                // Reset animasi hamburger
                const bars = document.querySelectorAll('.hamburger span');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }

    // Efek scroll untuk menu
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            // Jika link menuju ke anchor di halaman yang sama
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Tutup menu mobile jika terbuka
                    if (navMenu && navMenu.classList.contains('nav-active')) {
                        navMenu.classList.remove('nav-active');

                        // Reset animasi hamburger
                        const bars = document.querySelectorAll('.hamburger span');
                        bars.forEach(bar => {
                            bar.style.transform = 'none';
                            bar.style.opacity = '1';
                        });
                    }

                    // Offset untuk header yang mungkin fixed
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    // Scroll ke elemen target
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Efek animasi elemen saat scroll dengan Intersection Observer
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.kantor-card, .team-member, .about-content, .vm-card');

        // Menggunakan Intersection Observer API untuk animasi yang lebih efisien
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Berhenti mengobservasi elemen yang sudah terlihat
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Inisialisasi elemen untuk animasi
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };

    // Inisialisasi animasi scroll jika browser mendukung Intersection Observer
    if ('IntersectionObserver' in window) {
        animateOnScroll();
    } else {
        // Fallback untuk browser yang tidak mendukung Intersection Observer
        const elements = document.querySelectorAll('.kantor-card, .team-member, .about-content, .vm-card');
        elements.forEach(element => {
            element.classList.add('animate');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    // Validasi form
    function validateForm() {
        const namaInput = document.getElementById('nama');
        const tanggalInput = document.getElementById('tanggal');
        const pesanInput = document.getElementById('pesan');

        if (namaInput) {
            namaInput.addEventListener('input', function () {
                if (this.value.trim() === '') {
                    this.setCustomValidity('Nama tidak boleh kosong');
                } else if (this.value.length < 3) {
                    this.setCustomValidity('Nama minimal 3 karakter');
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        if (tanggalInput) {
            tanggalInput.addEventListener('change', function () {
                const selectedDate = new Date(this.value);
                const today = new Date();

                if (selectedDate > today) {
                    this.setCustomValidity('Tanggal lahir tidak boleh di masa depan');
                } else {
                    // Validasi tanggal lahir yang masuk akal (minimal 5 tahun yang lalu)
                    const minAgeDate = new Date();
                    minAgeDate.setFullYear(minAgeDate.getFullYear() - 5);

                    if (selectedDate > minAgeDate) {
                        this.setCustomValidity('Anda harus minimal berusia 5 tahun');
                    } else {
                        this.setCustomValidity('');
                    }
                }
            });
        }

        if (pesanInput) {
            pesanInput.addEventListener('input', function () {
                if (this.value.trim() === '') {
                    this.setCustomValidity('Pesan tidak boleh kosong');
                } else if (this.value.length < 10) {
                    this.setCustomValidity('Pesan minimal 10 karakter');
                } else if (this.value.length > 500) {
                    this.setCustomValidity('Pesan maksimal 500 karakter');
                } else {
                    this.setCustomValidity('');
                }

                // Update karakter tersisa jika ada elemen untuk itu
                const charCount = document.getElementById('charCount');
                if (charCount) {
                    const remaining = 500 - this.value.length;
                    charCount.textContent = `${remaining} karakter tersisa`;
                }
            });
        }
    }

    // Jalankan validasi form
    validateForm();

    // Fungsi untuk efek typing pada heading di halaman utama
    function typeEffect() {
        const welcomeHeading = document.querySelector('.hero h1');
        if (welcomeHeading) {
            const text = welcomeHeading.textContent;
            const userSpan = document.getElementById('userName');
            const userName = userSpan ? userSpan.textContent : '';

            // Sebelum memulai animasi, simpan teks asli
            const originalHtml = welcomeHeading.innerHTML;

            // Jika ada teks dan ada userName, lakukan animasi typing
            if (text && text.trim() !== '') {
                // Hilangkan userName dari teks untuk animasi
                let textToType = text.replace(userName, '');
                welcomeHeading.innerHTML = '';

                let i = 0;
                const typing = setInterval(() => {
                    if (i < textToType.length) {
                        // Sisipkan userName kembali ke posisi yang benar saat animasi
                        if (textToType.charAt(i) === '$' && textToType.charAt(i + 1) === '{') {
                            welcomeHeading.innerHTML += `<span id="userName">${userName}</span>`;
                            i += '${userName}'.length;
                        } else {
                            welcomeHeading.innerHTML += textToType.charAt(i);
                            i++;
                        }
                    } else {
                        clearInterval(typing);
                        // Kembalikan ke HTML asli untuk memastikan struktur yang benar
                        welcomeHeading.innerHTML = originalHtml;
                    }
                }, 50);
            }
        }
    }

    // Efek parallax untuk hero section
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', function () {
                const scrollPosition = window.pageYOffset;
                hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            });
        }
    }

    // Theme switcher (terang/gelap)
    function setupThemeSwitcher() {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<span>🌙</span>';
        themeToggle.style.position = 'fixed';
        themeToggle.style.bottom = '20px';
        themeToggle.style.right = '20px';
        themeToggle.style.width = '50px';
        themeToggle.style.height = '50px';
        themeToggle.style.borderRadius = '50%';
        themeToggle.style.backgroundColor = 'var(--primary-color)';
        themeToggle.style.display = 'flex';
        themeToggle.style.justifyContent = 'center';
        themeToggle.style.alignItems = 'center';
        themeToggle.style.cursor = 'pointer';
        themeToggle.style.boxShadow = 'var(--shadow)';
        themeToggle.style.zIndex = '1000';
        themeToggle.style.transition = 'var(--transition)';

        document.body.appendChild(themeToggle);

        // Cek tema tersimpan
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<span>☀️</span>';
        }

        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');

            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<span>☀️</span>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<span>🌙</span>';
            }
        });
    }

    // Inisialisasi fitur-fitur interaktif
    typeEffect();
    parallaxEffect();
    setupThemeSwitcher();

    // Tambahkan kelas animate pada load untuk elemen yang terlihat
    setTimeout(() => {
        const elements = document.querySelectorAll('.hero h1, .hero p, .cta-buttons');
        elements.forEach(element => {
            element.classList.add('animate');
        });
    }, 300);

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Back to top button
    const createBackToTopButton = () => {
        const backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.textContent = '↑';
        backToTop.style.position = 'fixed';
        backToTop.style.bottom = '80px';
        backToTop.style.right = '20px';
        backToTop.style.width = '50px';
        backToTop.style.height = '50px';
        backToTop.style.borderRadius = '50%';
        backToTop.style.backgroundColor = 'var(--primary-color)';
        backToTop.style.color = 'white';
        backToTop.style.fontSize = '20px';
        backToTop.style.border = 'none';
        backToTop.style.cursor = 'pointer';
        backToTop.style.boxShadow = 'var(--shadow)';
        backToTop.style.display = 'none';
        backToTop.style.zIndex = '999';
        backToTop.style.transition = 'var(--transition)';

        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
    };

    createBackToTopButton();
});