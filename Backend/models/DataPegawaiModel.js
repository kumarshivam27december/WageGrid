import mongoose from 'mongoose';

const DataPegawaiSchema = new mongoose.Schema({
    id_pegawai: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
        required: true
    },
    nik: {
        type: String,
        required: true,
        maxlength: 16
    },
    nama_pegawai: {
        type: String,
        required: true,
        maxlength: 100
    },
    username: {
        type: String,
        required: true,
        maxlength: 120
    },
    password: {
        type: String
    },
    jenis_kelamin: {
        type: String,
        required: true,
        maxlength: 15
    },
    jabatan: {
        type: String,
        required: true,
        maxlength: 50
    },
    tanggal_masuk: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        maxlength: 50
    },
    photo: {
        type: String,
        required: true,
        maxlength: 100
    },
    url: {
        type: String
    },
    hak_akses: {
        type: String,
        required: true
    }
}, { collection: 'data_pegawai' });

export default mongoose.model('DataPegawai', DataPegawaiSchema);