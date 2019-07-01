function sendMail() {
  var data = {
    name: document.getElementById('name').value,
    number: document.getElementById('number').value,
    email: document.getElementById('email').value,
    dateOfTravel: document.getElementById('dateOfTravel').value,
    time: document.getElementById('time').value,
    pickupLoc: document.getElementById('pickupLoc').value,
    destLoc: document.getElementById('destLoc').value,
    numberOfPassenger: document.getElementById('numberOfPassenger').value,
    vehicle: document.getElementById('vehicle').value
  };
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/sendmail", true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.send(JSON.stringify(data));
}