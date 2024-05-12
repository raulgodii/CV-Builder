import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
    data: {
        type: Object,
        required: false
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
}, {
    timestamps: true
});

export default mongoose.model('Cv', cvSchema);