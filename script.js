let input = document.getElementById("search-input");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-button").click();
  }
});

async function searchP(){
     ponerBlanco();
     let flag = false;     
     let pokemon = document.getElementById('search-input').value;  
     if  (!isNaN(pokemon) ){ 
          if ( ((Number(pokemon) >= 1) && (Number(pokemon) <=1025)) || ((Number(pokemon >= 10001)) && (Number(pokemon) <= 10277)))
               { ponerInfo(pokemon);}
          else 
               { document.getElementById('warn').innerHTML = "Invalid Pokémon id";}
          }
     else {           
          const response = await fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/')
          const myObject = await response.json();
          const poke = pokemon.toLowerCase();           
          for (let i=0; i< myObject.results.length; i++){
               if (myObject.results[i].name == poke){
                    ponerInfo(poke);
                    flag = true;
                    break; }
               }
          if (!flag)
               {    document.getElementById('warn').innerHTML = "Invalid Pokémon name";
                    alert("Pokémon not found");
               }            
          }
}

function ponerInfo( pname1){     
     fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/'+ pname1)
          .then((res) => {
               if (!res.ok) {
                    throw new Error (`HTTP error! Status: ${res.status}`); }
               return res.json();
               })   
          .then((data) => {
               document.getElementById('warn').innerHTML = '';
               document.getElementById('pokemon-name').innerHTML = data['name'].toUpperCase();
               document.getElementById('pokemon-id').innerHTML = '#'+ data['id'];
               document.getElementById('weight').innerHTML = data ['weight'];
               document.getElementById('height').innerHTML = data ['height'];
               document.getElementById('sprite').setAttribute('src', data['sprites']['front_default']) ;
               for (let j = 0; j< data['types'].length; j++){                    
                    //crear botones dinamicamente
                    const boton = document.createElement("div");
                    boton.innerHTML = data['types'][j]['type']['name'].toUpperCase();
                    boton.setAttribute('class', 'botones');
                    const randomColor = getRandomColor();
                    boton.style.background = randomColor;
                    boton.style.border = randomColor;
                    const element = document.getElementById("types");
                    element.appendChild(boton);
               }
               for (let i=0; i<6; i++){
                    switch(data['stats'][i]['stat']['name']) {
                         case 'hp':
                              document.getElementById('hp').innerHTML = data['stats'][i]['base_stat'];
                           break;
                         case 'attack':
                           document.getElementById('attack').innerHTML = data['stats'][i]['base_stat'];
                           break;
                         case 'defense':
                              document.getElementById('defense').innerHTML = data['stats'][i]['base_stat'];
                              break;                              
                         case 'special-attack':
                              document.getElementById('special-attack').innerHTML = data['stats'][i]['base_stat'];
                              break;                                  
                         case 'special-defense':
                              document.getElementById('special-defense').innerHTML = data['stats'][i]['base_stat'];
                              break;
                         case 'speed':
                              document.getElementById('speed').innerHTML = data['stats'][i]['base_stat'];
                              break;
                       }
               }
               
               })
          .catch((error) => 
               console.error("Unable to fetch data:", error));
}


const getRandomNumber = (maxNum) => {
     return Math.floor(Math.random() * maxNum);
   }

const getRandomColor = () => {
     const h = getRandomNumber(360);
     const s = getRandomNumber(100);
     const l = getRandomNumber(100);
     return `hsl(${h}deg, ${s}%, ${l}%)`;
   }

function ponerBlanco (){
               document.getElementById('warn').innerHTML = '';
               document.getElementById('pokemon-name').innerHTML = '';
               document.getElementById('pokemon-id').innerHTML = '';
               document.getElementById('weight').innerHTML = '';
               document.getElementById('height').innerHTML = '';
               document.getElementById('sprite').setAttribute('src', '') ;
               let botones = document.getElementsByClassName('botones');
               const cant = botones.length;
               if (cant > 0){
               for (let i = cant-1; i>= 0; i--){
                    botones[i].remove();
               }}
               let tdelemt = document.getElementsByTagName('td');
               
               for(let j = 1; j< 12; j+=2) {
                    tdelemt[j].innerHTML= "";
               }           
}







