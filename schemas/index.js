const mongoose = require('mongoose');

module.exports = () => {
    const DB_URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/admin`;
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        mongoose.connect(DB_URL, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true
        }, (error) => {
            if (error) {
                console.log('(', new Date(), ') ', 'Mongodb Connection Failed', error);
            } else {
                console.log('(', new Date(), ') ', 'Mongodb Connection Successful');
            }
        });
    };
    connect();
    mongoose.connection.on('error', (error) => {
        console.error('Mongodb Connection Failed', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('Mongodb disconnected. try reconnect...');
        connect();
    });
};