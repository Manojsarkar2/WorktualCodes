// Dummy database for medicines
const medicines = [
    { id: 1, name: 'Paracetamol', category: 'Pain Relief', price: 5.99 },
    { id: 2, name: 'Ibuprofen', category: 'Pain Relief', price: 7.49 },
    { id: 3, name: 'Loratadine', category: 'Allergy', price: 9.99 },
    { id: 4, name: 'Vitamin C', category: 'Vitamins & Supplements', price: 12.50 },
    { id: 5, name: 'Band-Aids', category: 'First Aid', price: 3.75 }
];

// Function to display medicines
function displayMedicines(medicines) {
    const medicineList = document.getElementById('medicineList');
    medicineList.innerHTML = ''; // Clear existing list

    medicines.forEach(medicine => {
        const medicineDiv = document.createElement('div');
        medicineDiv.className = 'bg-white shadow-md rounded p-4 hover-effect';
        medicineDiv.innerHTML = `
            <h3 class="text-md font-semibold">${medicine.name}</h3>
            <p class="text-gray-600">Category: ${medicine.category}</p>
            <p class="text-green-500 font-bold">$${medicine.price.toFixed(2)}</p>
            <button class="bg-blue-500 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700">Add to Cart</button>
        `;
        medicineList.appendChild(medicineDiv);
    });
}

// Authentication
let isLoggedIn = false;
let userEmail = null;

// Function to update UI based on login status
function updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userEmailSpan = document.getElementById('userEmail');

    if (isLoggedIn) {
        loginBtn.classList.add('hidden');
        signupBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        userEmailSpan.textContent = `Logged in as: ${userEmail}`;
    } else {
        loginBtn.classList.remove('hidden');
        signupBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        userEmailSpan.textContent = '';
    }
}

// Login functionality
document.getElementById('loginBtn').addEventListener('click', () => {
    document.getElementById('loginModal').classList.remove('hidden');
});

document.getElementById('loginCancel').addEventListener('click', () => {
    document.getElementById('loginModal').classList.add('hidden');
});

document.getElementById('loginSubmit').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Dummy authentication logic
    if (email === 'test@example.com' && password === 'password') {
        isLoggedIn = true;
        userEmail = email;
        updateUI();
        document.getElementById('loginModal').classList.add('hidden');
    } else {
        alert('Invalid credentials');
    }
});

// Signup functionality
document.getElementById('signupBtn').addEventListener('click', () => {
    document.getElementById('signupModal').classList.remove('hidden');
});

document.getElementById('signupCancel').addEventListener('click', () => {
    document.getElementById('signupModal').classList.add('hidden');
});

document.getElementById('signupSubmit').addEventListener('click', () => {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Dummy signup logic
    isLoggedIn = true;
    userEmail = email;
    updateUI();
    document.getElementById('signupModal').classList.add('hidden');
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    isLoggedIn = false;
    userEmail = null;
    updateUI();
});

// Initial UI update and medicine display
updateUI();
displayMedicines(medicines);
