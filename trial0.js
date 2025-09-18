function greetText(event) {
  console.log("Hi there!!! This is the trial mode...");
  console.log(event);
  console.log(event.target);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const userName = document.getElementById("name").value;
  console.log("Name :-", userName);
  console.log("Name::--", event.target.name.value);
  console.log("email:-", event.target.email.value);
  console.log("Phone Number:-", event.target.phoneNumber.value);
  console.log("Appointment Date:-", event.target.a_date.value);
  console.log("Appointment Time:-", event.target.a_time.value);
}

let myName = "Ritikesh";
let age=23;
let address="Nanded, Maharashtra";

console.log(`My name is ${myName} , Age is ${age} and address is :- ${address}`)

String = "mango";
let str=""
for(let i=String.length-1;i>=0;i--){
  str+=String[i];
}
console.log(str)