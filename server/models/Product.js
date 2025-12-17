import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Shirts', 'Shoes', 'Accessories']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    hoverImage: {
        type: String
    },
    images: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    badge: {
        type: String,
        enum: ['New', 'Hot', 'Sale', 'Top Item', 'Popular', null]
    },
    sizes: [{
        type: String
    }],
    colors: [{
        name: String,
        hex: String
    }],
    details: {
        materials: String,
        care: String,
        fit: String,
        origin: String
    }
}, {
    timestamps: true
});

// Index for faster queries
productSchema.index({ category: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);
