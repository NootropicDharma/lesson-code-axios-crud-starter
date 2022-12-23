const router = require("express").Router();
const ApiService = require("./../services/api.service")
const apiService = new ApiService();


// List all the characters from the API.
router.get('/movie-characters/list', (req, res) => {
    apiService
    .getAllCharacters()
    .then((response)=>{
       console.log('aqui esta',response)
        res.render('pages/characters-list',{response});
    })
    .catch(err=>{console.log(err)})
});


// Render a form to create a new character.
router.get('/movie-characters/create', (req, res) => {
    res.render("pages/new-character-form")
});


 
// Submit info to create a new character.
router.post('/movie-characters/create', (req, res) => {
    apiService
    .createCharacter(req.body)
    .then(() => {
        res.redirect("/")
    })
    .catch( err =>{console.log(err)})

});
 
// Render a form to edit a character.
router.get('/movie-characters/edit/:id', (req, res) => {
    const {id} = req.params
    apiService
    .getOneCharacter(id)
    .then(data=>{
        res.render("pages/edit-character-form", data)
    })
    .catch(err=>console.log(err))
});
 
// Submit info to edit a character with a matching id.
router.post('/movie-characters/edit/:id', (req, res) => {
    const {id} = req.params
    apiService
    .editCharacter(id,req.body)
    .then(()=>{
        res.redirect("/movie-characters/list")
    })
    .catch(err=>{console.log(err)})
  
});
 
// Delete a character with a matching id.
router.get('/movie-characters/delete/:id', (req, res) => {
  const {id} = req.params
  apiService
  .deleteCharacter(id)
  .then(()=>{
    res.redirect("/movie-characters/list")
  })
  .catch(err=>{console.log(err)})
});
 
module.exports = router; 