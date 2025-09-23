document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value;

    // LUDS validation: Lowercase, Uppercase, Digit, Special character
    const ludsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!emailInput || !passwordInput) {
      alert('Please fill in all fields.');
    } else if (!ludsRegex.test(passwordInput)) {
      alert('Password must include uppercase, lowercase, number, special character, and be at least 8 characters.');
    } else {
      alert('Login successful! (Demo)');
      // You can redirect here if needed:
      // window.location.href = 'dashboard.html';
    }
  });
});

// Add loading state to button
const loginBtn = document.querySelector('.login-btn');
const form = document.getElementById('loginForm');

form.addEventListener('submit', function() {
    loginBtn.textContent = 'Loging In...';
    loginBtn.disabled = true;
    
    setTimeout(() => {
        loginBtn.textContent = 'Login';
        loginBtn.disabled = false;
    }, 2000);
});