"use strict"

class SignupValidation {
    
    constructor(userName, password) {
        this.name = userName;
        this.pass = password;
    }

    checkUsername() {

        const nameToCheck = this.name;
        let errorListU = errorListUsername(nameToCheck);

        if (errorListU !== '') {
            errorListU = 'The User Name should contian ' + errorListU;
            document.getElementById('notCorrectU').innerHTML = errorListU;
            this.errorStatusUser = false;
        }
    }
    
    checkPassword() {

        const passToCheck = this.pass;
        const nameToSplit = this.name;
        let errorListP = errorListPassword(passToCheck, nameToSplit);

        if (errorListP !== '') {
            errorListP = 'The password should contain' + errorListP;
            document.getElementById('notCorrectP').innerHTML = errorListP;
            this.errorStatusPass = false;
        }
    }
    
    main() {
        
        this.checkUsername();
        this.checkPassword();

        if (this.errorStatusUser === true && this.errorStatusPass === true) {
            window.open('success.html');
        }
    }
}

function inputInit() {
    document.getElementById('notCorrectU').innerHTML = '';
    document.getElementById('notCorrectP').innerHTML = '';
}

const getSubmit = document.getElementById('submit');
getSubmit.addEventListener('click', function() {

    inputInit();
    const userName = (document.getElementById('userName').value).toLowerCase();
    const password = document.getElementById('userPassword').value;
    
    if (!userName || !password) {
        document.getElementById('notCorrectP').innerHTML = 'Please fill out both input fields';
        throw new Error('Input fileds cannot be empty');
    }
    
    const signup = new SignupValidation(userName, password);
    
    signup.main();
})

const getRefresh = document.getElementById('refresh');
getRefresh.addEventListener('click', function() {
    window.location.reload();
})

const errorUserLen = ' - min 3 and max 20 characters';
const errorUserChar = ' - latin letters and numbers';

const errorPwordLen = ' - min 8 and max 16 characters';
const errorPwordLowercase = ' - at least one lowercase letter';
const errorPwordUppercase = ' - at least one uppercase letter';
const errorPwordNumber = ' - at least one number';
const errorPwordSymbol = ' - at least one symbol';
const errorPwordSpace = ' - not contian space character';
const errorPwordUnicode = ' - be in Latin/Armenian/Russian letters only';
const errorPwordKayword = ' - not contian username';


function errorListUsername(username) {
    
    let errorListUser = '';
    
    if (!username.match(/^.{3,20}$/)) {
        errorListUser += '\n' + errorUserLen;
    }
    if (!username.match(/^([a-zA-Z1-9])*$/)) {
        errorListUser += '\n' + errorUserChar;
    }
    return errorListUser;
}

function errorListPassword(password, username) {
    
    let errorListPassword = '';
   
    if (!password.match(/^.{8,16}$/)) {
        errorListPassword += '\n' + errorPwordLen;
    }
    if (!password.match(/^(?=.*[a-zа-яա-ֆ]).*$/)) {
        errorListPassword += '\n' + errorPwordLowercase;
    }
    if (!password.match(/^(?=.*[A-ZА-ЯԱ-Ֆ]).*$/)) {
        errorListPassword += '\n' + errorPwordUppercase;
    }
    if (!password.match(/^(?=.*[0-9]).*$/)) { // 
        errorListPassword +=  '\n' + errorPwordNumber;
    }
    if (!password.match(/^(?=.*[(~`!@#$%^&*()-_+={}]|;:"<>,.\/?).*$/)) {
        errorListPassword += '\n' + errorPwordSymbol;
    }
    if (password.match(/^(?=.*[ ]).*$/)) {
        errorListPassword += '\n' + errorPwordSpace;
    }
    if (!password.match(/^([1-9a-zA-Zа-яА-Яա-ֆԱ-Ֆ[(~`!@#$%^&*()-_+={}]|;:"<>,.\/?])*$/)) {
        errorListPassword += '\n' + errorPwordUnicode;
    }
    if (password.includes(username)) {
        return errorListPassword += '\n' + errorPwordKayword;
    }
    return errorListPassword;
}