var diseases = disease_list;

var allSymptoms = ["fatigue", "aches", "cough", "sore_throat", "fever", "headache", "vomiting", "runny_nose", "congestion", "sneezing",
 "swollen_tonsils", "chest_pain", "nausea",  "rash",  "chills",  "diarrhea"];
var userSymptoms = [];
var sickness = "";

function checkSymptoms() {
  userSymptoms = [];
  for(i = 0; i < allSymptoms.length; i++) {
    var option = document.getElementById(allSymptoms[i]);
    if(option.checked != null && option.checked) {
      userSymptoms.push(allSymptoms[i]);
    }
  }
}


function calculateChances() {
  var potentials = new Map();
  for(illness in diseases) {
    var counter = 0;
    for(j = 0; j < userSymptoms.length; j++) {
      if(diseases[illness].symptoms.includes(userSymptoms[j])) {
        counter++;
      }
    }
    potentials.set(illness, counter);
  }

  potentials[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
  }

  for (let [key, value] of potentials) {
    console.log(key + ' ' + value);
  }

  sickness = Array.from(potentials)[0][0];
  sessionStorage.setItem("potential_illnesses", Array.from(potentials));
  console.log(sickness);
}
