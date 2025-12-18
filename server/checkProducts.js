import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import connectDB from './config/database.js';

dotenv.config();

const checkProducts = async () => {
    try {
        await connectDB();

        const products = await Product.find();
        console.log('\n📦 Products in database:');
        console.log('═'.repeat(60));

        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name}`);
            console.log(`   _id: ${product._id}`);
            console.log(`   Price: $${product.price}`);
            console.log(`   Stock: ${product.stock}`);
            console.log('');
        });

        console.log(`Total: ${products.length} products\n`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkProducts();
