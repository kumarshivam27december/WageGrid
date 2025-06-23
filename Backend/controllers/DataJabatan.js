import DataJabatan from "../models/DataJabatanModel.js";
import DataPegawai from "../models/DataPegawaiModel.js";

// menampilkan semua data jabatan
export const getDataJabatan = async (req, res) => {
    try {
        let response;
        if (req.hak_akses === "admin") {
            response = await DataJabatan.find().select('id_jabatan nama_jabatan gaji_pokok tj_transport uang_makan userId');
        } else {
            return res.status(403).json({ msg: "Akses terlarang" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk menampilkan data jabatan by ID
export const getDataJabatanByID = async (req, res) => {
    try {
        const response = await DataJabatan.findById(req.params.id).select('id_jabatan nama_jabatan gaji_pokok tj_transport uang_makan userId');
        if(response){
            res.status(200).json(response);
        }else{
            res.status(404).json({msg: 'Data jabatan dengan ID tersebut tidak ditemukan'});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// method untuk tambah data jabatan
export const createDataJabatan = async (req, res) => {
    const {
        id_jabatan, nama_jabatan, gaji_pokok, tj_transport, uang_makan
    } = req.body;
    try {
        if (req.hak_akses === "admin") {
            await DataJabatan.create({
                id_jabatan: id_jabatan,
                nama_jabatan: nama_jabatan,
                gaji_pokok: gaji_pokok,
                tj_transport: tj_transport,
                uang_makan: uang_makan,
                userId: req.userId
            });
        } else {
            return res.status(403).json({ msg: "Akses terlarang" });
        }
        res.status(201).json({ success: true, message: "Data Jabatan Berhasil di Simpan" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// method untuk update data jabatan
export const updateDataJabatan = async (req, res) => {
    try {
        const jabatan = await DataJabatan.findById(req.params.id);
        if (!jabatan) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { nama_jabatan, gaji_pokok, tj_transport, uang_makan } = req.body;
        if (req.hak_akses === "admin") {
            await DataJabatan.findByIdAndUpdate(jabatan._id, {
                nama_jabatan, gaji_pokok, tj_transport, uang_makan
            });
        } else {
            return res.status(403).json({ msg: "Akses terlarang" });
        }
        res.status(200).json({ msg: "Data Jabatan Berhasil di Pebarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk delete data jabatan
export const deleteDataJabatan = async (req, res) => {
    try {
        const jabatan = await DataJabatan.findById(req.params.id);
        if (!jabatan) return res.status(404).json({ msg: "Data tidak ditemukan" });
        if (req.hak_akses === "admin") {
            await DataJabatan.findByIdAndDelete(jabatan._id);
        } else {
            return res.status(403).json({ msg: "Akses terlarang" });
        }
        res.status(200).json({ msg: "Data Jabatan Berhasil di Hapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}