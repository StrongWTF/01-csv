const express = require('express');
const htmlParser = express.urlencoded({extended: false});
const fs = require('fs');
const { md_feed } = require('../models/model-feed');
const router = express.Router();

// добавим данные в файл
const get_record = (nameUser, feed) => {
    let nodeDate = require('date-and-time');
	let date_time = nodeDate.format(new Date(), 'DD.MM.YYYY HH:mm');
	feed = feed.replace(/(\r\n|\n|\r)/gm, ' ');
    return `${date_time}|${nameUser}|${feed}\n`;
};


router.get('/', (req, res, next) => {
    res.render('feed', md_feed); // render view
});

router.post('/', htmlParser, (req, res) => {
    let record = get_record(req.body.name, req.body.feed); // находим по имени в шаблоне
    fs.appendFileSync('./private/feeds.csv', record);
    res.redirect("/"); // возвращаемся на главную
});

module.exports = router;
