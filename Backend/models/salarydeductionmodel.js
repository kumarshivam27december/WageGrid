import mongoose from 'mongoose';

const PotonganGajiSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    potongan: {
        type: String,
        required: true,
        maxlength: 120
    },
    jml_potongan: {
        type: Number,
        required: true
    }
}, { collection: 'potongan_gaji' });

export default mongoose.model('PotonganGaji', PotonganGajiSchema);