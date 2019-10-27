var newPassword;
var newPasswordLength;
var newSpecialChars;
var blnCharSpecial;
var blnCharNumeric;
var blnCharLcase;
var blnCharUcase;
//todo: refactor? better to have simple comma-delimited strings that i split into an arrays?, or as below
//todo: add back into array "single quote" and "backslash"
var specialCharacters = [' ','!','"','#','$','%','&','(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[',']','^','_','`','{','|','}','~']; // [ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]
var numbers = ['0','1','2','3','4','5','6','7','8','9'];
var lowerCaseLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
var upperCaseLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//todo: collapse above arrays into this one? ragged array?
var passwordCharTypes = [specialCharacters, numbers, lowerCaseLetters, upperCaseLetters];

//todo: add eventlistener instead of using onclick
function generatePassword() {

    newPassword = "";
    newPasswordLength = getPasswordLength();
    // console.log("newPasswordLength: " + newPasswordLength);
    newSpecialChars = getSpecialChars();

    //todo: only add password char types the user wants
    // loop through newPasswordLength
    for (var i = 0; i < newPasswordLength; i++) {
        // select randomly one of the four password char TYPES (special | numbers | lower | upper)
        var nextCharType = Math.floor(Math.random() * passwordCharTypes.length);
        // select randomly one CHAR from that TYPE
        var nextChar = Math.floor(Math.random() * (passwordCharTypes[nextCharType]).length);
        // console.log(i+1 + ": next char type: " + nextCharType + ", next char: " + passwordCharTypes[nextCharType][nextChar]);
        newPassword += (passwordCharTypes[nextCharType])[nextChar];
    }

    //todo: replace alert with populating page content
    // console.log(newPassword);
    // alert("Your password is " + newPassword);
    var securePassword = document.querySelector("#securePassword");
    securePassword.textContent = newPassword;
    //todo: change copy button state; toggle not working correctly, should reset when clicking 'generate' button
    btnCopyPassword.classList.remove("btn-secondary");
    btnCopyPassword.classList.add("btn-danger");
}

function getPasswordLength() {
    pwdLength = prompt("How long should your password be? (8-128)");
    // console.log("before length test (pwdLength: " + pwdLength + ")");
    //must be >=8 and <=128
    if (pwdLength >=8 && pwdLength <=128) {
        // console.log("passed length test (pwdLength: " + pwdLength + ")");
        return parseInt(pwdLength);
    } else {
        //todo fix bug: if out of bounds, function returns NAN
        // console.log("password out of bounds (pwdLength: " + pwdLength + ")");
        getPasswordLength();
    }
}

function getSpecialChars() {
    blnCharSpecial = confirm("Would you like special characters in your password?");
    blnCharNumeric = confirm("Would you like numeric characters in your password?");
    blnCharLcase = confirm("Would you like lower case characters in your password?");
    blnCharUcase = confirm("Would you like upper case characters in your password?");

    if (blnCharSpecial || blnCharNumeric || blnCharLcase || blnCharUcase) {
        return blnCharSpecial, blnCharNumeric, blnCharLcase, blnCharUcase;
    } else {
        //at least one of the blns must be true
        alert("Must use at least one of special|numeric|lower case|upper case.")
        getSpecialChars();
    }
}

function copyPassword() {
    var copyTextarea = document.querySelector('#securePassword');

    var textarea = document.createElement("textarea");
    textarea.textContent = copyTextarea.innerText;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
        return document.execCommand("copy");
    } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
    } finally {
        document.body.removeChild(textarea);
    }

    
}
