var treatments = treatment_list;
var diseases = disease_list;

var currentNames = [];
var currentDoses = [];
var currentFreqs = [];

var existingNames = sessionStorage.getItem("currNam");
var existingDoses = sessionStorage.getItem("currDos");
var existingFreqs = sessionStorage.getItem("currFre");

function genInformation() {
  var splitnam = existingNames.split(",");
  var splitdos = existingDoses.split(",");
  var splitfreq = existingFreqs.split(",");

  for(i = 0; i < splitnam.length; i++) {
    currentNames[i] = splitnam[i];
    currentDoses[i] = splitdos[i];
    currentFreqs[i] = splitfreq[i];
  }
}

function addMedication() {
  var med_name = document.getElementById("med-name").value;
  var dosage = document.getElementById("dosage").value;
  var selected = document.getElementById("timeframe");
  var frequency = selected.options[selected.selectedIndex].text;
  var delay = selected.options[selected.selectedIndex].value.split(",")[1];

  var newmed = document.createElement("DIV");
  newmed.setAttribute("class", "medication-box");
  newmed.setAttribute("style", "width: 31%; height: 220px; float: left; background-color: #e2e2e2; padding: 5px; margin-left: 10px; margin-bottom: 20px");

  var title = "<h1 id="+med_name.toUpperCase()+" style='text-align: center; padding-top: 10px; color: #1987c1'>" + med_name.toUpperCase() + "</h1>"
  newmed.innerHTML += title;

  if(!isLetter(dosage.charAt(dosage.length - 1))) {
    dosage += " mg";
  }

  var dose = "<h3 style='text-align: center'>" + dosage + "</h4>"
  newmed.innerHTML += dose;

  var freq = "<h4 style='text-align: center; color: #f93e3e'>" + frequency.toUpperCase() + "</h4>"
  newmed.innerHTML += freq;

  var button = "<input type='button' id = 'submit' value='Delete' style='position: relative; right: 0; bottom: 0' onclick='removeMedication(this)'></input>"
  newmed.innerHTML += button;

  currentNames.push(med_name.toUpperCase());
  currentDoses.push(dosage);
  currentFreqs.push(frequency);

  sessionStorage.setItem("currNam", currentNames);
  sessionStorage.setItem("currDos", currentDoses);
  sessionStorage.setItem("currFre", currentFreqs);

  document.body.append(newmed);
}

function loadExisting() {
  genInformation();

  for(i = 0; i < currentNames.length; i++) {
    var med_name = currentNames[i];
    var dosage = currentDoses[i];
    var frequency = currentFreqs[i];

    var newmed = document.createElement("DIV");
    newmed.setAttribute("class", "medication-box");
    newmed.setAttribute("style", "width: 31%; height: 220px; float: left; background-color: #e2e2e2; padding: 5px; margin-left: 10px; margin-bottom: 20px");

    var title = "<h1 id="+med_name.toUpperCase()+" style='text-align: center; padding-top: 10px; color: #1987c1'>" + med_name.toUpperCase() + "</h1>"
    newmed.innerHTML += title;

    if(!isLetter(dosage.charAt(dosage.length - 1))) {
      dosage += " mg";
    }

    var dose = "<h3 style='text-align: center'>" + dosage + "</h4>"
    newmed.innerHTML += dose;

    var freq = "<h4 style='text-align: center; color: #f93e3e'>" + frequency.toUpperCase() + "</h4>"
    newmed.innerHTML += freq;

    var button = "<input type='button' id = 'submit' value='Delete' style='position: relative; right: 0; bottom: 0' onclick='removeMedication(this)'></input>"
    newmed.innerHTML += button;

    document.body.append(newmed);
  }
}

function removeMedication(element) {
  var div = element.parentElement;
  var name = div.getElementsByTagName('h1')[0].id;

  var index = currentNames.indexOf(name);
  currentNames.splice(index, 1);
  currentDoses.splice(index, 1);
  currentFreqs.splice(index, 1);

  if(currentNames.length <= 0) {
    sessionStorage.removeItem("currNam");
    sessionStorage.removeItem("currDos");
    sessionStorage.removeItem("currFre");
  }else {
    sessionStorage.setItem("currNam", currentNames);
    sessionStorage.setItem("currDos", currentDoses);
    sessionStorage.setItem("currFre", currentFreqs);
  }

  document.body.removeChild(div);
}

function removeAll() {
  sessionStorage.removeItem("currNam");
  sessionStorage.removeItem("currDos");
  sessionStorage.removeItem("currFre");
}

function isLetter(str) {
  return str.length == 1 && str.match(/[a-z]/i);
}
