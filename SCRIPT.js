const usuarios = {
    "mali": { contrasena: "mali200", saldo: 200 },
    "gera": { contrasena: "gera290", saldo: 290 },
    "maui": { contrasena: "maui67", saldo: 67 }
};

const saldoActualElement = document.getElementById('saldoActual');
const cantidadInput = document.getElementById('cantidad');
const loginForm = document.getElementById('loginForm');
const saldoSection = document.getElementById('saldo');
const depositarButton = document.getElementById('depositarButton');
const retirarButton = document.getElementById('retirarButton');

let usuarioActual = null;

function iniciarSesion() {
    const usuarioInput = document.getElementById('usuario').value;
    const contrasenaInput = document.getElementById('contrasena').value;

    if (usuarios[usuarioInput] && usuarios[usuarioInput].contrasena === contrasenaInput) {
        usuarioActual = usuarioInput;
        actualizarSaldoDisplay();
        mostrarOperaciones();
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

function cambiarUsuario() {
    usuarioActual = null;
    ocultarOperaciones();
}

function mostrarOperaciones() {
    loginForm.style.display = 'none';
    saldoSection.style.display = 'block';
    cantidadInput.removeAttribute('disabled');
    depositarButton.removeAttribute('disabled');
    retirarButton.removeAttribute('disabled');
}

function ocultarOperaciones() {
    loginForm.style.display = 'block';
    saldoSection.style.display = 'none';
    cantidadInput.value = '';
    document.getElementById('usuario').value = ''; 
    document.getElementById('contrasena').value = '';
    cantidadInput.setAttribute('disabled', 'true');
    depositarButton.setAttribute('disabled', 'true');
    retirarButton.setAttribute('disabled', 'true');
}

function depositar() {
    const cantidad = parseFloat(cantidadInput.value);
    if (!isNaN(cantidad) && cantidad > 0) {
        actualizarSaldo(cantidad);
    } else {
        alert('Ingresa cuanto deseas depositar.');
    }
}

function retirar() {
    const cantidad = parseFloat(cantidadInput.value);
    if (!isNaN(cantidad) && cantidad > 0) {
        actualizarSaldo(-cantidad);
    } else {
        alert('Ingresa cuanto deseas retirar.');
    }
}

function actualizarSaldo(cantidad) {
    const saldoActual = usuarios[usuarioActual].saldo;
    const nuevoSaldo = saldoActual + cantidad;

    if (nuevoSaldo >= 10) {
        if (nuevoSaldo <= 990) {
            usuarios[usuarioActual].saldo = nuevoSaldo;
            actualizarSaldoDisplay();
        } else {
            alert('¡Lo sentimos! Eres demasiado rico para nuestro banco.');
        }
    } else {
        alert('¿Estás seguro? Piensa en tus ahorros.');
    }
}


function actualizarSaldoDisplay() {
    saldoActualElement.innerText = usuarios[usuarioActual].saldo.toFixed(2);
}
