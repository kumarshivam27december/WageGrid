import DataPegawai from "../models/employeemodel.js";
import argon2 from "argon2";
import path from "path";

// menampilkan semua data Pegawai
export const getDataPegawai = async (req, res) => {
    try {
        const response = await DataPegawai.find().select('id_pegawai nik nama_pegawai jenis_kelamin jabatan tanggal_masuk status photo hak_akses');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk mencari data Pegawai berdasarkan ID
export const getDataPegawaiByID = async (req, res) => {
    try {
        const response = await DataPegawai.findById(req.params.id).select('id_pegawai nik nama_pegawai jenis_kelamin jabatan username tanggal_masuk status photo hak_akses');
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Data pegawai dengan ID tersebut tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk mencari data pegawai berdasarkan NIK
export const getDataPegawaiByNik = async (req, res) => {
    try {
        const response = await DataPegawai.findOne({ nik: req.params.nik }).select('id_pegawai nik nama_pegawai jenis_kelamin jabatan tanggal_masuk status photo hak_akses');
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Data pegawai dengan NIK tersebut tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk mencari data pegawai berdasarkan Nama
export const getDataPegawaiByName = async (req, res) => {
    try {
        const response = await DataPegawai.findOne({ nama_pegawai: req.params.name }).select('id_pegawai nik nama_pegawai jenis_kelamin jabatan tanggal_masuk status photo hak_akses');
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Data pegawai dengan Nama tersebut tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//  method untuk tambah data Pegawai
export const createDataPegawai = async (req, res) => {
    const {
        nik, nama_pegawai,
        username, password, confPassword, jenis_kelamin,
        jabatan, tanggal_masuk,
        status, hak_akses
    } = req.body;

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Konfirmasi Password Tidak Cocok" });
    }

    if (!req.files || !req.files.photo) {
        return res.status(400).json({ msg: "Upload Foto Gagal Silahkan Upload Foto Ulang" });
    }

    const file = req.files.photo;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (!allowedTypes.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "File Foto Tidak Sesuai Dengan Format" });
    }

    if (fileSize > 2000000) {
        return res.status(422).json({ msg: "Ukuran Gambar Harus Kurang Dari 2 MB" });
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) {
            return res.status(500).json({ msg: err.message });
        }

        const hashPassword = await argon2.hash(password);

        try {
            await DataPegawai.create({
                nik: nik,
                nama_pegawai: nama_pegawai,
                username: username,
                password: hashPassword,
                jenis_kelamin: jenis_kelamin,
                jabatan: jabatan,
                tanggal_masuk: tanggal_masuk,
                status: status,
                photo: fileName,
                url: url,
                hak_akses: hak_akses
            });

            res.status(201).json({ success: true, message: "Registrasi Berhasil" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    });
};

// method untuk update data Pegawai
export const updateDataPegawai = async (req, res) => {
    const pegawai = await DataPegawai.findById(req.params.id);

    if (!pegawai) return res.status(404).json({ msg: "Data pegawai tidak ditemukan" });
    const {
        nik, nama_pegawai,
        username, jenis_kelamin,
        jabatan, tanggal_masuk,
        status, hak_akses
    } = req.body;

    try {
        await DataPegawai.findByIdAndUpdate(pegawai._id, {
            nik: nik,
            nama_pegawai: nama_pegawai,
            username: username,
            jenis_kelamin: jenis_kelamin,
            jabatan: jabatan,
            tanggal_masuk: tanggal_masuk,
            status: status,
            hak_akses: hak_akses
        });
        res.status(200).json({ msg: "Data Pegawai Berhasil di Perbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Method untuk update password Pegawai
export const changePasswordAdmin = async (req, res) => {
    const pegawai = await DataPegawai.findById(req.params.id);

    if (!pegawai) return res.status(404).json({ msg: "Data pegawai tidak ditemukan" });

    const { password, confPassword } = req.body;

    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Konfirmasi Password Tidak Cocok" });

    try {
        const hashPassword = await argon2.hash(password);
        await DataPegawai.findByIdAndUpdate(pegawai._id, {
            password: hashPassword
        });
        res.status(200).json({ msg: "Password Berhasil di Perbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// method untuk delete data Pegawai
export const deleteDataPegawai = async (req, res) => {
    try {
        const pegawai = await DataPegawai.findById(req.params.id);
        if (!pegawai) return res.status(404).json({ msg: "Data pegawai tidak ditemukan" });
        await DataPegawai.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Data Pegawai Berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}