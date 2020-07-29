const employeesUrl = 'https://randomuser.me/api/?results=12&nat=us';
const employeeDetails = document.querySelector('#modal');
const employeeList = document.querySelectorAll('.card');
const html = document.querySelector('html');
let results = [];



// Handle all Fetch Requests

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(response => {
        generateEmployee(response.results);
        results = response.results;
    });

// Event Listener
for (let i = 0; i < employeeList.length; i += 1) {
    employeeList[i].addEventListener('click', (event) => {
      let id = event.target.id;
      if (id == null || id == '') {
        id = event.target.parentNode.id;
        if (id == null || id == '') {
          id = event.target.parentNode.parentNode.id;
        }
      }
      
      employeeDetails.style.display = 'flex';
      html.classList.add('overlay');
      createModal(results, id);
    });
  }
// Functions //
 
  

function generateEmployee(results) {
    for (let i = 0; i < results.length; i += 1) {
      let employeeCard = '';
      employeeCard += `
      <img alt="${results[i].name.first}'s profile picture" src="${results[i].picture.large}">
      <div>
        <h4>${results[i].name.first} ${results[i].name.last}</h4>
        <p>${results[i].email}</p>
        <p>${results[i].location.city}</p>
      </div>
    `;
    employeeList[i].innerHTML = employeeCard;
    }
     };


function createModal(results, id) {
  let index = parseInt(id.slice(4, id.length)) - 1;
  let state = results[index].location.state;
  let abbreviation = convertStateToAbbr(state);
  let dob = results[index].dob.date;
  let birthday = convertBDay(dob);
  let details = `
    <button class="close">&times;</button>
    <img alt="${results[index].name.first}'s profile picture" src="${results[index].picture.large}">
    <h4>${results[index].name.first} ${results[index].name.last}</h4>
    <p>${results[index].email}</p>
    <p class="city">${results[index].location.city}</p>
    <hr>
    <p class="phone">${results[index].cell.replace(')-', ') ')}</p>
    <p class="address">
      ${results[index].location.street}, ${abbreviation} ${results[index].location.postcode}</p>
    <p class="birthday">Birthday: ${birthday}</p>
  `;
  employeeDetails.innerHTML = details;
  let x = document.querySelector('.close');
  x.addEventListener('click', () => {
    employeeDetails.style.display = 'none';
    html.classList.remove("overlay");
  });
}


// Birthday conversion
function convertBDay(dob) {
  let year = dob.slice(0,4);
  let month = dob.slice(5,7);
  let day = dob.slice(8,10);
  let converted = month + '/' + day + '/' + year;
  return converted;
}

// Search Function
function search() {
  var input = document.getElementById("Search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('card');

  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = "flex";
    } else {
      nodes[i].style.display = "none";
    }
  }
}

// State full to abbreviation
const _MapFullNameAbbr = {"arizona":"AZ","alabama":"AL","alaska":"AK","arkansas":"AR","california":"CA","colorado":"CO","connecticut":"CT","districtofcolumbia":"DC","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA","michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV","newhampshire":"NH","newjersey":"NJ","newmexico":"NM","newyork":"NY","northcarolina":"NC","northdakota":"ND","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhodeisland":"RI","southcarolina":"SC","southdakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA","westvirginia":"WV","wisconsin":"WI","wyoming":"WY","alberta":"AB","britishcolumbia":"BC","manitoba":"MB","newbrunswick":"NB","newfoundland":"NF","northwestterritory":"NT","novascotia":"NS","nunavut":"NU","ontario":"ON","princeedwardisland":"PE","quebec":"QC","saskatchewan":"SK","yukon":"YT"}

function convertStateToAbbr(input) {
  if(input === undefined) return input;
  var strInput = input.trim();
  if(strInput.length === 2) {
    // already abbr, check if it's valid
    var upStrInput = strInput.toUpperCase();
    return _MapAbbrFullName[upStrInput]?upStrInput :undefined;
  }
  var strStateToFind = strInput.toLowerCase().replace(/\ /g, '');
  var foundAbbr = _MapFullNameAbbr[strStateToFind];
  return foundAbbr;
}



