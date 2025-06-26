import mongoose from 'mongoose';

const DataJabatanSchema = new mongoose.Schema({
    id_jabatan: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
        required: true
    },
    nama_jabatan: {
        type: String,
        required: true,
        maxlength: 120
    },
    gaji_pokok: {
        type: Number,
        required: true
    },
    tj_transport: {
        type: Number,
        required: true
    },
    uang_makan: {
        type: Number
    },
    userId: {
        type: String,
        required: true
    }
}, { collection: 'data_jabatan' });

export default mongoose.model('DataJabatan', DataJabatanSchema);