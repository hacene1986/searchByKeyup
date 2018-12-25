//Ciblage du DOM 
const destination = document.getElementById('destination');
const suggestionListt = document.getElementById('suggestionList');
const otherCities = document.getElementById('otherCities');

//source de données 
const cities = [
    {id:1, name: 'Turin', country:'Italie'},
    {id:2, name: 'Paris', country:'France'},
    {id:3, name: 'Milan', country:'Italie'},
    {id:4, name: 'Arcueil', country:'France'},
    {id:5, name: 'New-york', country:'Etats-Unis'},
    {id:6, name: 'Cluj', country:'Roumanie'},
    {id:7, name: 'Tanger', country:'Maroc'},
    {id:8, name: 'Madrid', country:'Espagne'},
    {id:9, name: 'Palerme', country:'Italie'},
    {id:10, name: 'New-Delhi', country:'Inde'},
    {id:11, name: 'Bergame', country:'Italie'},
    {id:12, name: 'Tunis', country:'Tunisie'},
    {id:13, name: 'Oran', country:'Algerie'},
    {id:13, name: 'Alger', country:'Algerie'},
]


//paramétre
const config = {
    minLengtn: 2
}

//Tableau des suggestions liées à la recherche
let suggestions = [];


//function

function addEvents(){
  destination.addEventListener('keyup', e => {
    clearSuggestions();//purge des suggestions précédentes
    if(destination.value.length >= config.minLengtn){
        
        getSuggestions(destination.value);
        displaySuggestions();
    }
  })
    
    
}

function getSuggestions(str){
    //parcours des villes
    cities.forEach(city => {
        if(city.name.toLowerCase().indexOf(str.toLowerCase()) != -1){
            suggestions.push(city);
        }
    })
}

function displaySuggestions(){
    //affiche dans le DOM les suggestions trouvées dans le 
    //tableau suggestions
    let html = '';
    suggestions.forEach(suggestion => {
        html += '<li>'+ suggestion.name +'</li>';
        
    })
    //affichage dans le DOM
    suggestionList.innerHTML = html;

    //ajout d'ecouteur sur suggestions (li)
    let lis = suggestionList.querySelectorAll('li');
    for(let i = 0; i<lis.length; i++){
       lis[i].addEventListener('click', e => {
           
           destination.value = e.target.textContent;
           clearSuggestions();//nettoyage

           let country = getCountry(e.target.textContent);
           //console.log(country);
           let foundCities = getCities(country, e.target.textContent);
          // console.log(foundCities);
          displayOtherCities(foundCities, country);
          
       })
    }
}


function clearSuggestions(){
    suggestions = [];//purge
    suggestionList.innerHTML = '';
    otherCities.innerHTML = '';
}

function getCountry(cityName){
    //retourne le nom du pays par rapport a un 
    //nom de ville fourni en entrée
    let country = null;
        for(let i = 0; i<cities.length; i++){
           if(cities[i].name == cityName) {
               country = cities[i].country;
               break;
           }
        }
    return country
}

function getCities(countryName, excludeCity){
    //retourne une collection de villes 
    //par rapport au nom de pays fourni en entrée
    let foundCities = [];
    cities.forEach(city => {
        
        if(city.country == countryName && city.name != excludeCity){
            foundCities.push(city);
        }
    })
    return foundCities;
}

function displayOtherCities(others, country){
    //affiche les autres villes pour le pays concerné
    //les autres villes et le pays sont fournis en entrée
    let info = 'Autres villes pour' + country + ': ';

    others.forEach((city, index) => {
        info += city.name; 
        //so in parvient au dernier élément du tableau
        info += (index == others.length -1) ? '.' : ', ';  
        
    })

    //autre possibilité pour remplacé la virgule finale
    //par un point
    //let indice = info.length -1;
    //let info2 = info subsr(0, indice) + '. ';
    // info = info2;
    //affichage de la chaine de info dans le DOM
    otherCities.innerText = info;
}

function init(){
  addEvents();  
}

init();