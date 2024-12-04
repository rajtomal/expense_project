// login & register
const api = "http://localhost:3000";
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
        userEmail: event.target.username.value,
        userPassword: event.target.password.value
    }
    loginApi(loginData)
}
// login API
const loginApi = async (inputData) => {
    try {
        const response = await fetch(`${api}/userLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                inputData
            ),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const LoginData = await response.json();
        console.log(LoginData);
        localStorage.setItem("user", JSON.stringify(LoginData));
        window.location.href = "main.html";
    } catch (err) {
        alert(`Error Login API: ${err}`);
        console.log(err.message)
    }
};

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
        userName: event.target.username.value,
        userImg: event.target.userimg.value,
        userEmail: event.target.email.value,
        userPassword: event.target.password.value
    }
    registerApi(registerData, event)
}
// Register API
const registerApi = async (inputData, event) => {
    try {
        const response = await fetch(`${api}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                inputData
            ),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const registerData = await response.json(); // Parse the JSON response
        alert("Register Successfully");
        event.target.reset();
        document.querySelector(".register-page").classList.add("d-none");
        document.querySelector(".login-page").classList.remove("d-none");
    } catch (err) {
        alert(`Error Register API: ${err}`);
        console.log(err.message)
    }
}




