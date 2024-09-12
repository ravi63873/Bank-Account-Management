// Define a BankAccount class
class BankAccount {
  constructor(accountHolderName, accountType, initialBalance) {
    this.accountHolderName = accountHolderName.trim();
    this.accountType = accountType.trim();
    this.balance = initialBalance;
  }
}

// Initialize variables
let account = null;

// Add event listener for form submission to create an account
document.getElementById('account-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting and refreshing the page
  createAccount();
});

// Function to create a bank account
function createAccount() {
  const accountHolderName = document.getElementById('accountHolderName').value.trim();
  const accountType = document.getElementById('accountType').value.trim();
  const initialBalance = parseFloat(document.getElementById('initialBalance').value);

  // Validate initial balance
  if (isNaN(initialBalance) || initialBalance < 0) {
    displayError('Invalid initial balance. Please enter a valid amount.');
    return;
  }

  // Validate account holder name and type
  if (!accountHolderName || !accountType) {
    displayError('Account holder name and account type cannot be empty.');
    return;
  }

  // Create a new bank account
  account = new BankAccount(accountHolderName, accountType, initialBalance);

  // Display account information and clear form inputs
  displayAccountInfo();
  clearFormInputs();
}

// Function to check the account balance
document.getElementById('checkBalance').addEventListener('click', function() {
  if (account) {
    displayAccountInfo();
  } else {
    displayError('No account found. Please create an account first.');
  }
});

// Function to deposit money
document.getElementById('deposit').addEventListener('click', function() {
  if (account) {
    const depositAmount = parseFloat(prompt('Enter the deposit amount:'));
    clearError();
    if (!isNaN(depositAmount) && depositAmount > 0) {
      account.balance += depositAmount;
      displayAccountInfo();
    } else {
      displayError('Invalid deposit amount. Please enter a valid amount.');
    }
  } else {
    displayError('No account found. Please create an account first.');
  }
});

// Function to withdraw money
document.getElementById('withdraw').addEventListener('click', function() {
  if (account) {
    const withdrawAmount = parseFloat(prompt('Enter the withdrawal amount:'));
    clearError();
    if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
      if (withdrawAmount <= account.balance) {
        account.balance -= withdrawAmount;
        displayAccountInfo();
      } else {
        displayError('Insufficient funds. Cannot withdraw more than the account balance.');
      }
    } else {
      displayError('Invalid withdrawal amount. Please enter a valid amount.');
    }
  } else {
    displayError('No account found. Please create an account first.');
  }
});

// Function to display account information
function displayAccountInfo() {
  document.getElementById('displayAccountHolder').textContent = account.accountHolderName;
  document.getElementById('displayAccountType').textContent = account.accountType;
  document.getElementById('displayBalance').textContent = account.balance.toFixed(2);
  clearError();
}

// Function to display error messages
function displayError(message) {
  document.getElementById('errorMessage').textContent = message;
}

// Function to clear error messages
function clearError() {
  document.getElementById('errorMessage').textContent = '';
}

// Function to clear form inputs after creating an account
function clearFormInputs() {
  document.getElementById('accountHolderName').value = '';
  document.getElementById('accountType').value = '';
  document.getElementById('initialBalance').value = '';
}
