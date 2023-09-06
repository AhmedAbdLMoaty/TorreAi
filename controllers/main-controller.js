const fs = require('fs');
const filePath = 'searchHistory.json';


exports.getLanding  = (req , res , next) => {

res.render('landing', { 
    pageTitle: 'Welcome | Torre'
})

};

exports.getSearch = ( req , res , next ) => {
res.render('search', {
pageTitle: 'Search | Torre '
})
};

exports.getSearchHistory = (req, res) => {
    const filePath = path.join(__dirname ,'/tmp', 'searchHistory.json'); // Use /tmp directory
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const searchHistory = JSON.parse(data) || [];
                res.render('search-history.ejs', { searchHistory, pageTitle: 'Search History | Torre' });
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
        res.render('search-history.ejs', { searchHistory: initialData, pageTitle: 'Search History | Torre' });
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
                    res.render('fav.ejs', { favorites, pageTitle: 'Favorites' });
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
                    res.render('fav.ejs', { favorites: initialData, pageTitle: 'Favorites' });
                }
            });
        }
    };