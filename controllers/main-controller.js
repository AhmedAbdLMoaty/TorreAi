exports.getLanding  = (req , res , next) => {

    res.render('landing', { 
        pageTitle: 'Hello there'
    } )
    
    };

exports.getSearch = ( req, res , next) => {
    res.render('search', {pageTitle: "Search page"});
}

exports.postReq = async (req, res , next) => {
    const searchTerm = req.body.term;

    try {

        const response = await axios.post('https://torre.ai/api/entities/_searchStream', {
            term: searchTerm,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const results = response.data;
        res.json(results);
    } catch (error) {
        console.error("Error:", error.response.data); // Log the detailed error message
        res.status(500).json({ error: 'An error occurred while searching.' });
    }
};