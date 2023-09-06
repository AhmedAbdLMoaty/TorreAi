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