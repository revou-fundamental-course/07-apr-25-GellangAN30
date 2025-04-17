// Script.js - Futuristic Website
document.addEventListener('DOMContentLoaded', function () {
    // ===== USER NAME HANDLING =====
    // Mendapatkan nama dari localStorage atau prompt
    let userName = localStorage.getItem('userName');

    // Jika di halaman utama dan elemen userName ada
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        if (!userName) {
            userName = prompt('Masukkan nama Anda:', 'Pengunjung');
            if (userName && userName.trim() !== '') {
                localStorage.setItem('userName', userName);
            } else {
                userName = 'Pengunjung';
            }
        }
        userNameElement.textContent = userName;
    }

    // ===== FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    const hasilPesan = document.getElementById('hasilPesan');

    if (contactForm) {
        // Validasi form real-time
        const namaInput = document.getElementById('nama');
        const tanggalInput = document.getElementById('tanggal');
        const pesanInput = document.getElementById('pesan');

        // Nama validation
        if (namaInput) {
            namaInput.addEventListener('input', function () {
                if (this.value.trim().length < 3) {
                    this.setCustomValidity('Nama minimal 3 karakter');
                    this.reportValidity();
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // Tanggal validation
        if (tanggalInput) {
            tanggalInput.addEventListener('change', function () {
                const selectedDate = new Date(this.value);
                const today = new Date();

                if (selectedDate > today) {
                    this.setCustomValidity('Tanggal lahir tidak boleh di masa depan');
                    this.reportValidity();
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // Pesan validation
        if (pesanInput) {
            pesanInput.addEventListener('input', function () {
                if (this.value.trim().length < 10) {
                    this.setCustomValidity('Pesan minimal 10 karakter');
                    this.reportValidity();
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // Form submission
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Mendapatkan nilai dari form
            const nama = namaInput.value.trim();
            const tanggal = tanggalInput.value;
            const genderEl = document.querySelector('input[name="gender"]:checked');
            const gender = genderEl ? genderEl.value : 'Laki-Laki';
            const pesan = pesanInput.value.trim();

            // Validasi form sebelum submit
            if (nama.length < 3) {
                alert('Nama minimal 3 karakter');
                namaInput.focus();
                return;
            }

            if (!tanggal) {
                alert('Silakan pilih tanggal lahir');
                tanggalInput.focus();
                return;
            }

            if (pesan.length < 10) {
                alert('Pesan minimal 10 karakter');
                pesanInput.focus();
                return;
            }

            // Format tanggal
            const tanggalObj = new Date(tanggal);
            const formattedDate = `${tanggalObj.getDate().toString().padStart(2, '0')}/${(tanggalObj.getMonth() + 1).toString().padStart(2, '0')}/${tanggalObj.getFullYear()}`;

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

            // Menampilkan bagian hasil dengan animasi
            if (hasilPesan) {
                hasilPesan.style.opacity = '0';
                hasilPesan.style.display = 'block';

                // Animasi fade in
                setTimeout(() => {
                    hasilPesan.style.opacity = '1';
                    hasilPesan.style.transition = 'opacity 0.5s ease-in-out';
                }, 10);

                // Scroll ke hasil
                setTimeout(() => {
                    hasilPesan.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }

            // Simpan data ke localStorage (opsional)
            const formData = {
                nama,
                tanggal: formattedDate,
                gender,
                pesan,
                waktuSubmit: waktu
            };

            localStorage.setItem('lastFormSubmission', JSON.stringify(formData));
        });
    }

    // ===== RESPONSIVE MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('nav-active');

            // Animasi hamburger
            const bars = document.querySelectorAll('.hamburger span');
            bars.forEach(bar => {
                bar.classList.toggle('active');
            });

            // Mencegah scrolling saat menu terbuka
            document.body.classList.toggle('menu-open');
        });

        // Tutup menu saat klik di luar
        document.addEventListener('click', function (event) {
            if (navMenu.classList.contains('nav-active') &&
                !event.target.closest('nav') &&
                !event.target.closest('.hamburger')) {
                navMenu.classList.remove('nav-active');
                document.body.classList.remove('menu-open');

                const bars = document.querySelectorAll('.hamburger span');
                bars.forEach(bar => {
                    bar.classList.remove('active');
                });
            }
        });
    }

    // ===== SMOOTH SCROLL =====
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            // Jika link menuju ke anchor di halaman yang sama
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Tutup menu mobile jika terbuka
                    if (navMenu && navMenu.classList.contains('nav-active')) {
                        navMenu.classList.remove('nav-active');
                        document.body.classList.remove('menu-open');

                        if (hamburger) {
                            const bars = document.querySelectorAll('.hamburger span');
                            bars.forEach(bar => {
                                bar.classList.remove('active');
                            });
                        }
                    }

                    // Offset untuk header fixed
                    const headerOffset = 80;
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

    // ===== SCROLL ANIMATIONS =====
    // Elemen yang akan dianimasikan
    const animateElements = document.querySelectorAll('.kantor-card, .team-member, .about-content, .vm-card, .hero .container, .banner h1');

    // Fungsi animasi saat scroll
    function animateOnScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }

    // Inisialisasi animasi saat scroll
    window.addEventListener('scroll', animateOnScroll);

    // ===== SPECIAL EFFECTS =====
    // Efek typing pada heading
    function typeEffect() {
        const welcomeHeading = document.querySelector('.hero h1');
        if (welcomeHeading && !welcomeHeading.classList.contains('typed')) {
            const text = welcomeHeading.innerHTML;
            const textWithoutSpan = text.replace(/<\/?span[^>]*>/g, '');
            const spanText = text.match(/<span[^>]*>(.*?)<\/span>/);

            if (spanText) {
                welcomeHeading.innerHTML = '';
                welcomeHeading.classList.add('typed');

                let i = 0;
                const typing = setInterval(() => {
                    if (i < textWithoutSpan.length) {
                        // Cek jika kita berada di awal dari span
                        if (textWithoutSpan.substring(i).startsWith(spanText[1])) {
                            welcomeHeading.innerHTML += `<span id="userName">${spanText[1]}</span>`;
                            i += spanText[1].length;
                        } else {
                            welcomeHeading.innerHTML += textWithoutSpan.charAt(i);
                            i++;
                        }
                    } else {
                        clearInterval(typing);

                        // Tambahkan efek blink ke cursor
                        const cursor = document.createElement('span');
                        cursor.className = 'cursor';
                        welcomeHeading.appendChild(cursor);

                        // Hilangkan cursor setelah beberapa detik
                        setTimeout(() => {
                            if (cursor) {
                                cursor.style.display = 'none';
                            }
                        }, 3000);
                    }
                }, 50);
            }
        }
    }

    // Jalankan efek pada load
    setTimeout(typeEffect, 500);
    setTimeout(animateOnScroll, 300);

    // ===== RESTORE PREVIOUS FORM DATA (OPTIONAL) =====
    function restoreFormData() {
        const savedData = localStorage.getItem('lastFormSubmission');

        if (savedData && hasilPesan) {
            const data = JSON.parse(savedData);

            // Menampilkan hasil dari data sebelumnya
            document.getElementById('waktuSekarang').textContent = data.waktuSubmit;
            document.getElementById('hasilNama').textContent = data.nama;
            document.getElementById('hasilTanggal').textContent = data.tanggal;
            document.getElementById('hasilGender').textContent = data.gender;
            document.getElementById('hasilPesanText').textContent = data.pesan;

            // Tampilkan hasil
            hasilPesan.style.display = 'block';
        }
    }

    // Jalankan restorasi data jika ada
    if (hasilPesan) {
        restoreFormData();
    }
});

// ===== PRELOADER =====
window.addEventListener('load', function () {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(preloader);

    // Hilangkan preloader setelah konten dimuat
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.removeChild(preloader);
        }, 500);
    }, 800);
});

// ===== PARALLAX EFFECT =====
document.addEventListener('mousemove', function (e) {
    const parallaxElements = document.querySelectorAll('.hero, .banner');

    parallaxElements.forEach(element => {
        const movementX = (e.clientX / window.innerWidth - 0.5) * 20;
        const movementY = (e.clientY / window.innerHeight - 0.5) * 20;

        element.style.backgroundPosition = `calc(50% + ${movementX}px) calc(50% + ${movementY}px)`;
    });
});