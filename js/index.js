const words = ["economiza", "cria memórias", "gera sustentabilidade"];
const spanWord = document.getElementById("wordToChange");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentWord = "";
let waitAfterWord = false;

function typeEffect() {
    const fullWord = words[wordIndex];

    if (!isDeleting && charIndex <= fullWord.length) {
        currentWord = fullWord.substring(0, charIndex++);
        spanWord.textContent = currentWord;
    }

    if (isDeleting && charIndex >= 0) {
        currentWord = fullWord.substring(0, charIndex--);
        spanWord.textContent = currentWord;
    }

    let typingSpeed = 10;

    if (!isDeleting && charIndex > fullWord.length) {
        isDeleting = true;
        typingSpeed = 1000;
    }

    if (isDeleting && charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 200;
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();


const bttnDarCarona = document.getElementById("bttnDarCarona");
const bttnEncontrarCarona = document.getElementById("bttnEncontrarCarona");
const bttnReservas = document.getElementById("bttnReservas");
const bttnMensagens = document.getElementById("bttnMensagens");
const spanAboutUs = document.getElementById("spanAboutUs");
const popupAboutUs = document.getElementById("popupAboutUs");
const popupHowItWorks = document.getElementById("popupHowItWorks");
const iconClosePopupAboutUs = document.getElementById("iconClosePopupAboutUs");
const iconClosePopupHIW = document.getElementById("iconClosePopupHIW");
const spanHowItWorks = document.getElementById("spanHowItWorks");
const bttnClosePopup = document.getElementById("bttnClosePopup");
const bttnClosePopupHIW = document.getElementById("bttnClosePopupHIW");

const popupSecurity = document.getElementById("popupSecurity");
const bttnClosePopupSecurity = document.getElementById("bttnClosePopupSecurity");
const spanSecurity = document.getElementById("spanSecurity");
const iconClosePopupSecurity = document.getElementById("iconClosePopupsecurity");
const bttnshowPopupSignup = document.getElementById("bttnshowPopupSignup");
const popupSignUp = document.getElementById("popupSignUp");

const iconClosePopupSignup = document.getElementById("iconClosePopupSignup");

const userRole = document.getElementById("role");
const divDataCar = document.getElementById("vehicleData");


iconClosePopupSignup.addEventListener("click",function(){
    hideSomething(popupSignUp);
})


bttnshowPopupSignup.addEventListener("click",function(){
    showSomething(popupSignUp);
    document.getElementById("fullName").focus()

    
})

bttnDarCarona.addEventListener("click",function(){
    window.location.href = 'oferecer_carona.html';
})

bttnEncontrarCarona.addEventListener("click",function(){
    window.location.href = 'buscar_carona.html';
})

bttnReservas.addEventListener("click",function(){
    window.location.href = 'reservas.html';
})

bttnMensagens.addEventListener("click",function(){
    window.location.href = 'mensagens.html';
})


spanAboutUs.addEventListener("click",function(){
    showSomething(popupAboutUs)
})

spanHowItWorks.addEventListener("click",function(){
    showSomething(popupHowItWorks)
})

spanSecurity.addEventListener("click",function(){
    showSomething(popupSecurity)
})


bttnClosePopupSecurity.addEventListener("click", function(){
    hideSomething(popupSecurity);
})

bttnClosePopup.addEventListener("click", function(){
    hideSomething(popupAboutUs);
})

bttnClosePopupHIW.addEventListener("click", function(){
    hideSomething(popupHowItWorks);
})

iconClosePopupAboutUs.addEventListener("click", function(){
    hideSomething(popupAboutUs);
})

iconClosePopupSecurity.addEventListener("click", function(){
    hideSomething(popupSecurity);
})

iconClosePopupHIW.addEventListener("click", function(){
    hideSomething(popupHowItWorks);
})

function hideSomething(PopupId) {
    PopupId.style.display = "none";
}

function showSomething(PopupId) {
    PopupId.style.display = "flex";
    PopupId.style.flexDirection = "column"

}

userRole.addEventListener("change",function(){
    if (userRole.value == "Motorista"){
        showSomething(divDataCar)
    }
    else {
        hideSomething(divDataCar)
    }
})


const cpfInput = document.getElementById('userDocument');

  cpfInput.addEventListener('input', function(e) {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    // Aplica a máscara: XXX.XXX.XXX-XX
    if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d)/, '$1.$2');
    }
    if (value.length > 6) {
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (value.length > 9) {
      value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    // Limita a 14 caracteres
    value = value.slice(0, 14);

    e.target.value = value;
    if (cpfInput.value.length == 14){
        iconSucess = document.getElementById("iconSucess");
        iconWrong = document.getElementById("iconWrong");
        if (validarCPF(cpfInput.value) === true){
        document.getElementById('userPhone').focus()
        showSomething(iconSucess);
        hideSomething(iconWrong);
        } 
        else{
            showSomething(iconWrong);
            hideSomething(iconSucess);
        }
    }
    else if (cpfInput.value.length < 14){
        hideSomething(iconSucess);
        hideSomething(iconWrong);
    }
  }
);



  const phoneInput = document.getElementById('userPhone');

  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    // Aplica a máscara (00) 00000-0000
    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    }
    if (value.length > 7) {
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }

    // Limita a 15 caracteres (incluindo parênteses, espaço e hífen)
    value = value.slice(0, 15);

    e.target.value = value;
  });

  const vehicleModel = document.getElementById("vehicleModel");
  const vehicleYear = document.getElementById("vehicleYear");
  const vehiclePlate = document.getElementById("vehiclePlate");


  vehicleModel.addEventListener("change",function(){
    vehicleYear.focus()
  })

  vehicleYear.addEventListener("change",function(){
    if (vehicleYear.value.length === 4){
        vehiclePlate.focus();
    }
  })

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove tudo que não for número
  
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
  
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
  
    if (digito1 !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
  
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
  
    if (digito2 !== parseInt(cpf.charAt(10))) return false;
  
    return true;
  }
  