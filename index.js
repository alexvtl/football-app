

function apitest(league){ 
 
    function createTr(el){
      let a = document.createElement('tr')
      
    function createform(form){ 
     let x = ""
      for(let b of form){
       const table = { "W":"V","L":"D","D":"N",} 
       Object.keys(table).map((key)=>
         (b == key ? x += table[key] : null)
        )
      }
     return x
    }
      
      a.innerHTML=`
      <td class="td_rank">${el.rank}</td>
      <td class="td_logo">
        <img class="clubs-logo" src=${el.team.logo} alt="logo" />
        </td>
        <td class="td_name">
       <a class="link_name" href="">${el.team.name}</a></td>
       <td>${el.all.played}</td>
       <td>${el.all.win}</td>
     <td>${el.all.draw}</td>
      <td>${el.all.lose}</td>
      <td>${el.all.goals.for}</td>
       <td>${el.all.goals.against}</td>
       <td>${el.goalsDiff}</td>
       <td class="td_points">${el.points}</td>
       <td class="td_form">${createform(el.form)}</td>
      `
      return a
    }
    
   const options = {
       method: 'GET',
       headers: {
           'X-RapidAPI-Key': 'ac2b0692c4msh9f9e2aec4d08a25p1e41d7jsn91be42e498ea',
           'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
       }
   };
     
   fetch(`https://api-football-beta.p.rapidapi.com/standings?season=2022&league=${league}`, options)
       .then(response => response.json())
       .then(response => {
     document.getElementById('texte').innerHTML = `<img class="league_logo"src="${response.response[0].league.logo}"/><h1>${response.response[0].league.name}, ${response.response[0].league.country}</h1><img  class="league_flag"src="${response.response[0].league.flag}"/>`
     
     const clubs = response.response[0].league.standings[0];
    document.getElementById('table').innerHTML=""
       for(let elemnt of clubs){
     document.getElementById('table').append(createTr(elemnt))
     }
     
     })
       .catch(err => console.error(err));
   } 
   
   const leagues = document.querySelector('#league')
   
   apitest(leagues.value)
   
   leagues.addEventListener("change", (event) => {apitest(parseInt(event.target.value))} )