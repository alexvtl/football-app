

function apitest(league){ 
 
  function createTr(el){
    let a = document.createElement('tr')
    a.classList.add("line")
    function createform(form){ 
    let x = ""
    for(let b of form){
       const table = { "W":"<i class='fa-solid fa-check'></i>","L":"<i class='fa fa-xmark'></i>","D":"<i class='fa fa-minus'></i>",} 
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
     
     function createTrscorer(player){
      let scorerline = document.createElement('tr');
      scorerline.classList.add("line")
      scorerline.innerHTML=`
      <td class="scorer_data_box" >
          <img class='scorer_photo' src=${player.player.photo} alt='player_picture'/>
          <div class='scorer_data2_box'>
            <div><span class="scorer_name">${player.player.firstname} ${player.player.lastname}, ${player.player.age}ans</span></div>
            <div>Moyenne <span class="rate_scorer">${parseFloat(player.statistics[0].games.rating).toFixed(2)}</span></div>
          </div>
      </td>
      <td class="td_goals">
      ${player.statistics[0].goals.total}
      <i class="fa fa-futbol">
      </i>
      </td>
      <td class="td_shot">
      ${player.statistics[0].shots.on}
      </td>
       <td>${player.statistics[0].penalty.scored}</td>
       <td>${player.statistics[0].goals.assists}</td>
      <td>
      <div class="td_scorer_card">
      <div class="yellow_card"></div><span class="span_card">${player.statistics[0].cards.yellow}</span>
      <div class="red_card"></div><span class="span_card">${player.statistics[0].cards.red}</span>
      </div>
      </td>
      <td class="td_games">${player.statistics[0].games.appearences}</td>
      <td><img class="club_scorer_photo" src=${player.statistics[0].team.logo} alt='logo_club'/></td>
      `
      return scorerline
     }
    
    fetch(`https://api-football-beta.p.rapidapi.com/players/topscorers?season=2022&league=${league}`, options)
      .then(response => response.json())
      .then(response => {
        const players = response.response;
        let i = 0
        const tablescorer = document.querySelector('#tbody_scorer')
        tablescorer.innerHTML=""
        for(let player of players){
        if(i<5){
          tablescorer.append(createTrscorer(player))
          i++
        }
        }
        const lines = document.querySelectorAll('.line')

        let option =  {
         // root:null,
         rootMargin: "-10% 0px",
         threshold: 0
        }
     
        function intersect(entries){
         console.log(entries);
         entries.forEach(entry => {
           if(entry.isIntersecting){
             entry.target.style.opacity = 1;
           }
         })
        }
     
        const observer = new IntersectionObserver(intersect, option)
     
        lines.forEach(line => {
         observer.observe(line)
        })
      })
      .catch(err => console.error(err));


     })
       .catch(err => console.error(err));
   } 
   
   const leagues = document.querySelector('#league')
   
   apitest(leagues.value)
   
   leagues.addEventListener("change", (event) => {apitest(parseInt(event.target.value))} )

   