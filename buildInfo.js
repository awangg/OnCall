var body = document.body;
var diseases = disease_list;
var treatments = treatment_list;
var potentials = sessionStorage.getItem("potential_illnesses");

var illness = [];
var num_symptoms = [];

function genInformation() {
  var raw = potentials.split(",");
  for(i = 0; i < raw.length; i++) {
    if(i % 2 == 0) {
      illness.push(raw[i]);
    }else {
      num_symptoms.push(raw[i]);
    }
  }
}

function buildSymptoms() {
  genInformation();

  for(i = 0; i < illness.length; i++) {
    var sickness = illness[i];
    var num = num_symptoms[i];

    var newdiv = document.createElement("DIV");
    newdiv.setAttribute("class", "infobox");
    newdiv.setAttribute("style", "background-color: #e2e2e2; padding: 10px; margin: 2%; height: 225px");

    let newimg = document.createElement("IMG");
    newimg.setAttribute("id", "diseaseimage");
    newimg.setAttribute("src", diseases[sickness].image);
    newimg.setAttribute("style", "float:left; width:275px; height:225px; vertical-align:center");
    newdiv.append(newimg);

    let description = "<h1 style='text-align:center; color: #1987c1'>" + "#" + (i + 1) + " " + diseases[sickness].name + "</h1>";
    description += "<br> <p style='text-align: center'>" + diseases[sickness].description;
    description += "<br><br> <strong> Approximate Death Chance: </strong> " + diseases[sickness].death + "% </p>";
    newdiv.innerHTML += description;

    let match = "<p style='text-align: center'> <em> <strong>" + num + "</strong> out of " + diseases[sickness].symptoms.length + " symptoms matched </em> </p>"
    newdiv.innerHTML += match;

    if(i <= 1 && diseases[sickness].doctor == true) {
      let warning = document.createElement("INPUT");
      warning.setAttribute("type", "button");
      warning.setAttribute("value", "Contact a medical professional immediately")
      warning.setAttribute("style", "display: block; margin: 0 auto; text-align: center; background-color: #ff0000; color: #eee; border: none; padding: 10px 24px");
      warning.innerHTML += "Contact a doctor as soon as possible";
      newdiv.append(warning);
    }

    document.getElementById("container").append(newdiv);
  }

  var button = document.createElement("INPUT");
  button.setAttribute("id", 'submit');
  button.setAttribute("value", 'Treat');
  button.setAttribute("style", "display: block; margin: 0 auto; text-align: center");
  button.setAttribute("onclick", "window.location.href='treatment.html'");
  document.getElementById("container").append(button);
}

function buildTreatments() {
  genInformation();
  var first_place = illness[0];

  var h1 = "<h1 style='text-align: center; padding-top: 10px'> Over-The-Counter Treatments for the <u>" + diseases[first_place].name + "</u></h1>";
  document.getElementById("heading").innerHTML += h1;

  for(i = 0; i < diseases[first_place].treatments.length; i++) {
    var medicine = diseases[first_place].treatments[i];
    console.log(medicine);
    var newdiv = document.createElement("DIV");
    newdiv.setAttribute("class", "infobox");
    newdiv.setAttribute("style", "background-color: #e2e2e2; padding: 10px; margin: 2%; height: 225px");

    let newimg = document.createElement("IMG");
    newimg.setAttribute("id", "treatmentimage");
    newimg.setAttribute("src", treatments[medicine].link);
    newimg.setAttribute("style", "float:left; width:275px; height:225px; vertical-align:center");
    newdiv.append(newimg);

    let description = "<h1 style='text-align:center; color: #1987c1'>" + "#" + (i + 1) + " " + treatments[medicine].name + "</h1>";
    description += "<br> <p style='text-align: center; font-size: 18px'>" + treatments[medicine].description + "</p>";
    newdiv.innerHTML += description;

    document.body.append(newdiv);
  }

  var button = document.createElement("INPUT");
  button.setAttribute("id", 'submit');
  button.setAttribute("value", 'Return Home');
  button.setAttribute("style", "display: block; margin: 0 auto; text-align: center");
  button.setAttribute("onclick", "window.location.href='index.html'");
  document.body.append(button);
}
