// login & register
registerPage = () => {
    console.log("click register");
    document.querySelector(".register-page").classList.remove("d-none");
    document.querySelector(".login-page").classList.add("d-none");
}
loginPage = () => {
    document.querySelector(".register-page").classList.add("d-none");
    document.querySelector(".login-page").classList.remove("d-none");
}
loginForm = (event) => {
    event.preventDefault();
    if (event.target.username.value == "") {
        document.querySelector(".login-name-Error").innerHTML = "Email is Required";
    } else {
        document.querySelector(".login-name-Error").innerHTML = "";
    }
    if (event.target.password.value == "") {
        document.querySelector(".login-pass-Error").innerHTML = "Password is Required";
    } else {
        document.querySelector(".login-pass-Error").innerHTML = "";
    }
    let loginData = {
        username: event.target.username.value,
        password: event.target.password.value
    }
    console.log(loginData)
}
registerForm = (event) => {
    event.preventDefault();
    if (event.target.username.value == "") {
        document.querySelector(".name-Error").innerHTML = "Name is Required";
    } else {
        document.querySelector(".name-Error").innerHTML = "";
    }
    if (event.target.email.value == "") {
        document.querySelector(".email-Error").innerHTML = "Email is Required";
    } else {
        document.querySelector(".email-Error").innerHTML = "";
    }
    if (event.target.password.value == "") {
        document.querySelector(".pass-Error").innerHTML = "Password is Required";
    } else {
        document.querySelector(".pass-Error").innerHTML = "";
    }
    let registerData = {
        username: event.target.username.value,
        userimg: event.target.userimg.value,
        email: event.target.email.value,
        password: event.target.password.value
    }
    console.log(registerData)
}

const user = () => {
    fetch('http://localhost:3000')
        .then(response => response.text())
        .then(data => {
            let userdata = JSON.parse(data);
            console.log(userdata)
        })
        .catch(error => console.error('Error:', error));
}
user();

// expense Add 
addExpense = (event) => {
    event.preventDefault();
    if (event.target.expenseName.value == "") {
        document.querySelector(".add-name-Error").innerHTML = "Required";
    } else {
        document.querySelector(".add-name-Error").innerHTML = "";
    }
    if (event.target.expenseDate.value == "") {
        document.querySelector(".add-date-Error").innerHTML = "Required";
    } else {
        document.querySelector(".add-date-Error").innerHTML = "";
    }
    if (event.target.expenseAmount.value == "") {
        document.querySelector(".add-amount-Error").innerHTML = "Required";
    } else {
        document.querySelector(".add-amount-Error").innerHTML = "";
    }
    let expenseData = {
        expenseName: event.target.expenseName.value,
        expenseDate: event.target.expenseDate.value,
        expenseAmount: event.target.expenseAmount.value
    }
    console.log(expenseData)
}