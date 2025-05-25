const mongoose = require('mongoose');
const Campground = require('./models/campground');
const { places, descriptors } = require('./seeds/seedHelper')
const cities = require('./seeds/cities')
mongoose.connect('mongodb://127.0.0.1:27017/Yelpcamp')
    .then(res => {
        console.log('connected')
    })
    .catch(err => {
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)]
const price = Math.floor(Math.random() * 10) + 5
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 3; i++) {
        const rand3 = Math.floor(Math.random() * 3);
        const camp = new Campground({
            location: `${cities[rand3].city}, ${cities[rand3].state}`,
            title: `${sample(places)}, ${sample(descriptors)}`,
            image: 'https://picsum.photos/seed/picsum/200/300',
            description: 'Lorem ipsum dolor etsum perish labasco',
            price
        })
        await camp.save();
    }
}
seedDB();