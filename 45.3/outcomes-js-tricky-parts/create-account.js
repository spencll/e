// **Bank Account**

// Write a function called ***createAccount*** which creates a bank account given a PIN number and an initial deposit amount. The return value should be an object with four methods on it:

function createAccount(pin, amount) {
    // closure variables, secret 
    let accPIN = pin
    let accAMT;
    !amount? accAMT = 0  : accAMT = amount

    return {
        // - ***checkBalance***: Given the correct PIN, return the current balance. (If the PIN is invalid, return “Invalid PIN.”)
        checkBalance(pin) {
            if (accPIN===pin) return `$${accAMT}`
            else return "Invalid PIN."
        },
        // - ***deposit***: Given the correct PIN and a deposit amount, increment the account balance by the amount. (If the PIN is invalid, return “Invalid PIN.”)
        deposit(pin, deposit) {
            if (accPIN!==pin) return "Invalid PIN."
            if (accPIN===pin && deposit) {
                accAMT+=deposit
                return `Succesfully deposited $${deposit}. Current balance: $${accAMT}.`
            }
        },
        // - ***withdraw***: Given the correct PIN and a withdrawal amount, decrement the account balance by the amount. You also shouldn’t be able to withdraw more than you have. (If the PIN is invalid, return “Invalid PIN.”)
        withdraw(pin, withdraw){
            if (accPIN!==pin) return "Invalid PIN."
            if (accPIN===pin && withdraw<accAMT) {
                accAMT-=withdraw
                return `Succesfully withdrew $${withdraw}. Current balance: $${accAMT}.`
            }
            else return `Withdrawal amount exceeds account balance. Transaction cancelled.`
        },
        // changePin: Given the old PIN and a new PIN, change the PIN number to the new PIN. (If the old PIN is invalid, return “Invalid PIN.”)
        changePin(pin, newpin){
            if (accPIN!==pin) return "Invalid PIN."
            else {
                accPIN = newpin
                return "PIN successfully changed!"
            }
        }

    }



}

module.exports = { createAccount };
