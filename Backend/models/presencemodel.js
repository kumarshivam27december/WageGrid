import mongoose from 'mongoose';

const DataKehadiranSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    bulan: {
        type: String,
        required: true,
        maxlength: 15
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
    jenis_kelamin: {
        type: String,
        maxlength: 20
    },
    nama_jabatan: {
        type: String,
        maxlength: 50
    },
    hadir: {
        type: Number
    },
    sakit: {
        type: Number
    },
    alpha: {
        type: Number
    }
}, { collection: 'data_kehadiran' });

export default mongoose.model('DataKehadiran', DataKehadiranSchema);