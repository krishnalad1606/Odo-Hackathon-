<<<<<<< HEAD
// ================= HERO BUTTONS =================

function planTrip() {
=======
function toggleMore() {
    const options = document.getElementById("moreOptions");

    if (options.style.display === "block") {
        options.style.display = "none";
    } else {
        options.style.display = "block";
    }
}

// OPEN LOGIN

function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
}


// OPEN SIGNUP

function openSignup() {
    document.getElementById("signupModal").style.display = "flex";
}


// CLOSE BOTH

function closeModal() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("signupModal").style.display = "none";
}


// SWITCH TO SIGNUP

function switchToSignup() {
    closeModal();
>>>>>>> b353a38593b9895a40f33809d2430ab0d61b42e8
    openSignup();
}


<<<<<<< HEAD
function exploreDestinations() {
    document
        .getElementById("destinations")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function viewAll() {
    alert("Destination explorer coming soon!");
}


=======
// SWITCH TO LOGIN

function switchToLogin() {
    closeModal();
    openLogin();
}


// LOGIN

function login() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    alert("Login successful!");

    closeModal();
}


// SIGNUP

function signup() {

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    alert(`Welcome to GlobeTrotter, ${name}!`);

    closeModal();
}
>>>>>>> b353a38593b9895a40f33809d2430ab0d61b42e8
