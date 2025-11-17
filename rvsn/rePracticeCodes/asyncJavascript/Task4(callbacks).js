//Task 4

const student = [{Name: "Ritikesh", Age: 23},{Name : "Rishikesh",Age:25}];


function getStudent(){
    // event.preventdefault();
    setTimeout(() => {
        student.forEach(temp =>{
            console.log(temp.Name);
            // output += `<li>${temp.Name}</li>`
        })
        // document.body.innerHTML=output;
    },1000);
}

function addStudent(callback){
    setTimeout(() => {
        student.push({Name: "Ritik" , Age: 24});
        callback();
    },2000);
}

// getStudent();

addStudent(getStudent);



