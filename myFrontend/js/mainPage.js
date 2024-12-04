const api = "http://localhost:3000";
// main js 

let currentUser = JSON.parse(localStorage.getItem("user"));
var userData;

const firstLoad = () => {
    document.querySelector(".user_name").innerHTML = currentUser.name;
    document.querySelector(".user_email").innerHTML = currentUser.email;
    loadUserData({
        userId: currentUser.id
    });
}


const loadUserData = async (userId) => {
    try {
        const response = await fetch(`${api}/getExpenseById`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                userId
            ),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        userData = await response.json();
        let expenseList = document.getElementById("expense-list");
        expenseList.innerHTML = "";
        userData.map(element => {
            expenseList.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12 py-3">
                <div class="card">
                    <h2>${element.expenseName}</h2>
                    <div class="card-text d-flex justify-content-between align-items-center">
                        <p>${element.date}</p>
                        <h4>$ <span>${element.amount}</span></h4>
                    </div>
                    <div class="card-action">
                        <button onClick="editExpenseModal(${element.id})" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" class="edit"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-width="1.5"
                                    d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8" />
                            </svg></button>
                        <button onClick="deleteExpenseModal(${element.id})" data-bs-toggle="modal" data-bs-target="#exampleModalDelete" class="delete"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-width="1.5"
                                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                            </svg></button>
                    </div>
                </div>
            </div>
        `
        });
    } catch (err) {
        console.log(err.message)
    }
};
firstLoad();

logout = () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

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
        userId: currentUser.id,
        expenseName: event.target.expenseName.value,
        date: event.target.expenseDate.value,
        amount: event.target.expenseAmount.value
    }
    addExpenseApi(expenseData, event);
    console.log(expenseData)
}

// expense add Api
const addExpenseApi = async (inputData, event) => {
    try {
        const response = await fetch(`${api}/postExpense`, {
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

        const addExpenseData = await response.json(); // Parse the JSON response
        loadUserData({
            userId: currentUser.id
        });
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        if (modal) modal.hide();
        // Clear the form
        event.target.reset();
    } catch (err) {
        console.log(err.message)
    }
}

// expense edit
var editExpenseId;
const editExpenseModal = (id) => {
    console.log('first', id)
    let editExpenseData = userData.find(element => element.id == id);
    console.log('second', editExpenseData)
    editExpenseId = editExpenseData.id;
    document.querySelector(".edit-expense-name").value = editExpenseData.expenseName;
    document.querySelector(".edit-expense-date").value = editExpenseData.date;
    document.querySelector(".edit-expense-amount").value = editExpenseData.amount;
}
// expense edit form
const editFormExpense = (event) => {
    event.preventDefault();
    if (event.target.expenseName.value == "") {
        document.querySelector(".edit-name-Error").innerHTML = "Required";
    } else {
        document.querySelector(".edit-name-Error").innerHTML = "";
    }
    if (event.target.expenseDate.value == "") {
        document.querySelector(".edit-date-Error").innerHTML = "Required";
    } else {
        document.querySelector(".edit-date-Error").innerHTML = "";
    }
    if (event.target.expenseAmount.value == "") {
        document.querySelector(".edit-amount-Error").innerHTML = "Required";
    } else {
        document.querySelector(".edit-amount-Error").innerHTML = "";
    }
    let expenseData = {
        userId: currentUser.id,
        expenseName: event.target.expenseName.value,
        date: event.target.expenseDate.value,
        amount: event.target.expenseAmount.value
    }
    editExpenseApi(expenseData, editExpenseId);
    console.log(expenseData)
}

// expense edit Api
const editExpenseApi = async (inputData, id) => {
    try {
        const response = await fetch(`${api}/putExpense/${id}`, {
            method: 'PUT',
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

        const editExpenseData = await response.json(); // Parse the JSON response
        loadUserData({
            userId: currentUser.id
        });
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModalEdit'));
        if (modal) modal.hide();
    } catch (err) {
        console.log(err.message)
    }
}


// expense delete
let deleteExpenseId;
deleteExpenseModal = (id) => {
    deleteExpenseId = id;
}
const deleteExpense = () => {
    deleteExpenseApi(deleteExpenseId);
}
// expense delete Api
const deleteExpenseApi = async (id) => {
    try {
        const response = await fetch(`${api}/deleteExpense/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const deleteExpenseData = await response.json();
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModalDelete'));
        if (modal) modal.hide();
        loadUserData({
            userId: currentUser.id
        });
    } catch (err) {
        alert(`Error Delete API: ${err}`);
        console.log(err.message)
    }
}