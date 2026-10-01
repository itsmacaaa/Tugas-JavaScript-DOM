// Aktivitas 1 : DOM SELECTION / Seleksi Elemen Yang Dibutuhkan
const Input_Catatan = document.getElementById('input-catatan');
const BTN_Tambah = document.getElementById('btn-tambah');
const Daftar_Catatan = document.getElementById('daftar-catatan');
const Pesan_Kosong = document.getElementById('pesan-kosong');
const Jumlah_Catatan = document.getElementById('jumlah-catatan');

// Mengambil elemen angka di 3 box statistik
const Stat_Total = document.getElementById('stat-total');
const Stat_Selesai = document.getElementById('stat-selesai');
const Stat_Belum = document.getElementById('stat-belum');

// Array kosong untuk menyimpan objek data semua tugas
let Data_Tugas = [];

// Aktivitas 2 : Fungsi Untuk Mengupdate Statistik
function Update_Stats() {
    const Total = Data_Tugas.length;
    const Selesai = Data_Tugas.filter(item => item.isSelesai).length;
    const Belum = Total - Selesai;

    // Tampilkan hasil hitungan ke layar HTML
    Stat_Total.textContent = Total;
    Stat_Selesai.textContent = Selesai;
    Stat_Belum.textContent = Belum;
    Jumlah_Catatan.textContent = Total;

    // Jika tidak ada tugas (0), tampilkan pesan kosong. Jika ada, sembunyikan.
    if (Total === 0) {
        Pesan_Kosong.style.display = 'block';
    } else {
        Pesan_Kosong.style.display = 'none';
    }
}

// Aktivitas 3 : Fungsi Untuk Merender / Tampilkan Daftar Tugas
function Render_List() {
    Daftar_Catatan.innerHTML = '';
    Data_Tugas.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `note-item ${item.isSelesai ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${item.isSelesai ? 'checked' : ''} data-index="${index}">
                <span>${item.teks}</span>
            </div>
            <button class="btn-hapus" data-index="${index}">Hapus</button>
        `;

        // Masukkan elemen <li> yang sudah dibuat ke dalam elemen <ul> (daftarCatatan)
        Daftar_Catatan.appendChild(li);
    });

    // Jalankan pembaruan angka statistik
    Update_Stats();
}

// Aktivitas 4 : Fungsi Untuk Menambah Tugas Baru
function Tambah_Tugas() {
    const teks = Input_Catatan.value.trim();
    if (teks === '') {
        alert('Yuk, tulis tugasnya dulu!');
        return;
    }
    Data_Tugas.push({
        teks: teks,
        isSelesai: false
    });
    Input_Catatan.value = '';
    Render_List();
}

// Aktivitas 5 : Event Listeners 
BTN_Tambah.addEventListener('click', Tambah_Tugas);
Input_Catatan.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        Tambah_Tugas();
    }
});

// Event Delegation: Mendengarkan klik pada area daftar catatan (untuk Checkbox & Hapus)
Daftar_Catatan.addEventListener('click', function (e) {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('task-checkbox')) {
        Data_Tugas[index].isSelesai = e.target.checked;
        Render_List();
    }
    if (e.target.classList.contains('btn-hapus')) {
        Data_Tugas.splice(index, 1);
        Render_List();
    }
});

// Aktivitas 6 : Inisialisasi Tampilan Kode
// Menjalankan hitungan awal saat halaman web pertama kali dimuat
Update_Stats();