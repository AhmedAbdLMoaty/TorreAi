const fs = require('fs');
const filePath = 'searchHistory.json';


exports.getLanding  = (req , res , next) => {

    res.render('landing', { 
        pageTitle: 'Hello there'
    } )
    
    };

exports.getSearch = ( req , res , next ) => {
  res.render('search', {
    pageTitle: 'hello there'
  } )
};

exports.getSearchHistory = (req, res) => {
  
  if (fs.existsSync(filePath)) {
    // The file exists, read its content
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const searchHistory = JSON.parse(data) || [];
            // Continue with your code here
            // Read search history data from the JSON f
  fs.readFile('searchHistory.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err); // Log the error for debugging
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
    // The file doesn't exist, create it with an empty array
    const initialData = [];
    fs.writeFile(filePath, JSON.stringify(initialData), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Created searchHistory.json');
            // Continue with your code here
        }
      })}}


      const path = require('path');
      
      exports.getFav = (req, res) => {
          const filePath = path.join(__dirname, 'favorites.json'); // Change the file path to your favorites data
      
          if (fs.existsSync(filePath)) {
              // The file exists, read its content
              fs.readFile(filePath, 'utf8', (err, data) => {
                  if (err) {
                      console.error(err);
                      res.status(500).send('Error reading favorites data');
                  } else {
                      const favorites = JSON.parse(data) || [];
                      // Continue with your code here
                      res.render('fav.ejs', { favorites, pageTitle: 'My Favorites' });
                  }
              });
          } else {
              // The file doesn't exist, create it with an empty array
              const initialData = [];
              fs.writeFile(filePath, JSON.stringify(initialData), (err) => {
                  if (err) {
                      console.error(err);
                      res.status(500).send('Error creating favorites data');
                  } else {
                      console.log('Created favorites.json');
                      // Continue with your code here
                      res.render('favorites.ejs', { favorites: [], pageTitle: 'My Favorites' });
                  }
              });
          }
      };
      
