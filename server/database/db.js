import mongoose from 'mongoose';

// Updated MongoDB URL format
const username = 'mukeshyadavug20';
const password = 'yadav123';
const URL = `mongodb+srv://${username}:${password}@ecommerce-website.vgcur.mongodb.net/ECOMMERCE?retryWrites=true&w=majority`;

const Connection = async () => {
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('Error: ', error.message);
    }
};

export default Connection;
