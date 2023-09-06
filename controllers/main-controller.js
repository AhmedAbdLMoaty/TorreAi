const fs = require('fs');
const filePath = 'searchHistory.json';


exports.getLanding  = (req , res , next) => {

res.render('landing', { 
    pageTitle: 'Hello there'
})

};

exports.getSearch = ( req , res , next ) => {
res.render('search', {
pageTitle: 'hello there'
})
};

exports.getSearchHistory = (req, res) => {

if (fs.existsSync(filePath)) {

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        const searchHistory = JSON.parse(data) || [];


        fs.readFile('searchHistory.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);  
        res.status(500).send('Error reading search history data');
        return;
        
    }

    const searchHistory = JSON.parse(data) || [];

    res.render('search-history.ejs', { searchHistory , pageTitle: 'Hello there' });
});
};

    }
);
} else {

const initialData = [];
fs.writeFile(filePath, JSON.stringify(initialData), (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Created searchHistory.json');

        }
    })}}


    const path = require('path');
    
    exports.getFav = (req, res) => {
        const filePath = path.join(__dirname, 'favorites.json'); 
    
        if (fs.existsSync(filePath)) {

        fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error reading favorites data');
                } else {
                    const favorites = JSON.parse(data) || [];

                    res.render('fav.ejs', { favorites, pageTitle: 'My Favorites' });
                }
            });
        } else {

        const initialData = [];
            fs.writeFile(filePath, JSON.stringify(initialData), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error creating favorites data');
                } else {
                    console.log('Created favorites.json');

                    res.render('favorites.ejs', { favorites: [], pageTitle: 'My Favorites' });
                }
            });
        }
    };
    
