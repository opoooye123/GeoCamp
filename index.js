const express = require('express');
const app = express();
const path = require('path')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
const methodoverride = require('method-override')
const Campground = require('./models/campground')
const serverless = require('serverless-http')


require('dotenv').config({ path: path.join(__dirname, '.env') })
mongoose.connect(process.env.MONGODB_URI)
    .then(res => {
        console.log('connected')
    })
    .catch(err => {
        console.log(err)
    })
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodoverride('_method'))
app.get('/home', (req, res) => {
    res.render('home')
})
app.get('/campgrounds', async (req, res) => {
    const campground = await Campground.find({})
    res.render('campground/index', { campground })
})
app.get('/campgrounds/new', (req, res) => {

    res.render('campground/new',)
})
app.post('/campgrounds', async (req, res) => {
    const newcamp = new Campground(req.body);
    await newcamp.save();
    res.redirect(`/campgrounds/${newcamp._id}`)
})
app.get('/campgrounds/:id', async (req, res) => {
    const campShow = await Campground.findById(req.params.id);
    console.log(campShow)
    res.render('campground/show', { campShow, backGroundImage: campShow.image })
})
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campground/edit', { campground })
})
app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, { ...req.body })
    res.redirect('/campgrounds')
})
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})
app.get('/', (req, res) => {
    res.render('campground/home')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



module.exports = app
module.exports.handler = serverless(app)