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
    const filePath = path.join('/tmp', 'searchHistory.json'); // Use /tmp directory

    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const searchHistory = JSON.parse(data) || [];
                res.render('search-history.ejs', { searchHistory, pageTitle: 'Hello there' });
            }
        });
    } else {
        const initialData = [];
        fs.writeFile(filePath, JSON.stringify(initialData), (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Created /tmp/searchHistory.json');
            }
        });
        res.render('search-history.ejs', { searchHistory: initialData, pageTitle: 'Hello there' });
    }
};



    const path = require('path');
    
    exports.getFav = (req, res) => {
        const tmpDir = process.env.TEMP || process.env.TMP || '/tmp'; // Use the appropriate environment variable for Windows
        const filePath = path.join(tmpDir, 'favorites.json');
    
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
                    console.log(`Created ${filePath}`);
                    res.render('fav.ejs', { favorites: initialData, pageTitle: 'My Favorites' });
                }
            });
        }
    };