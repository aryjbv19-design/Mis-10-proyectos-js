// Navegación entre pestañas de proyectos
function mostrarSeccion(idSeccion) {
    const secciones = document.querySelectorAll('.project-section');
    secciones.forEach(sec => sec.classList.remove('active'));

    const botones = document.querySelectorAll('.nav-btn');
    botones.forEach(btn => btn.classList.remove('active'));

    document.getElementById(idSeccion).classList.add('active');
    event.target.classList.add('active');
}

// --- PROYECTO 1: Contador Inteligente ---
let cuenta = localStorage.getItem('contador') ? parseInt(localStorage.getItem('contador')) : 0;
const spanContador = document.getElementById('valorContador');

function actualizarVistaContador() {
    spanContador.textContent = cuenta;
    if (cuenta > 0) {
        spanContador.className = 'text-green';
    } else if (cuenta < 0) {
        spanContador.className = 'text-red';
    } else {
        spanContador.className = 'text-gray';
    }
    localStorage.setItem('contador', cuenta);
}

function cambiarContador(num) {
    cuenta += num;
    actualizarVistaContador();
}

function reiniciarContador() {
    cuenta = 0;
    actualizarVistaContador();
}
actualizarVistaContador();

// --- PROYECTO 2: Lista de Tareas ---
let tareas = JSON.parse(localStorage.getItem('misTareas')) || [];

function renderizarTareas() {
    const lista = document.getElementById('listaDeTareas');
    lista.innerHTML = '';
    tareas.forEach((t, index) => {
        const li = document.createElement('li');
        li.style.margin = "5px 0";
        li.innerHTML = `
            <span style="text-decoration: ${t.completada ? 'line-through' : 'none'}; cursor:pointer;" onclick="toggleTarea(${index})">${t.texto}</span>
            <button onclick="eliminarTarea(${index})" style="background: #e74c3c; padding: 2px 6px; margin-left: 10px;">X</button>
        `;
        lista.appendChild(li);
    });
    localStorage.setItem('misTareas', JSON.stringify(tareas));
}

function agregarTarea() {
    const input = document.getElementById('nuevaTareaInput');
    if (input.value.trim() === '') return;
    tareas.push({ texto: input.value, completada: false });
    input.value = '';
    renderizarTareas();
}

function toggleTarea(index) {
    tareas[index].completada = !tareas[index].completada;
    renderizarTareas();
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    renderizarTareas();
}
renderizarTareas();

// --- PROYECTO 3: Adivina el Número ---
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;

function verificarAdivinanza() {
    const val = parseInt(document.getElementById('intentoInput').value);
    const msg = document.getElementById('mensajeAdivina');
    intentos++;
    document.getElementById('contadorIntentos').textContent = intentos;

    if (val === numeroSecreto) {
        msg.textContent = "¡Correcto! Has ganado.";
        msg.style.color = "green";
    } else if (val > numeroSecreto) {
        msg.textContent = "Muy alto...";
        msg.style.color = "orange";
    } else {
        msg.textContent = "Muy bajo...";
        msg.style.color = "blue";
    }
}

function reiniciarAdivina() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    document.getElementById('contadorIntentos').textContent = intentos;
    document.getElementById('mensajeAdivina').textContent = "";
    document.getElementById('intentoInput').value = "";
}

// --- PROYECTO 4: Calculadora Básica ---
function agregarCalc(val) {
    document.getElementById('pantallaCalc').value += val;
}

function limpiarCalc() {
    document.getElementById('pantallaCalc').value = '';
}

function calcularResultado() {
    try {
        let res = eval(document.getElementById('pantallaCalc').value);
        document.getElementById('pantallaCalc').value = res;
    } catch (e) {
        document.getElementById('pantallaCalc').value = 'Error';
    }
}

// --- PROYECTO 5: Cambiador de Colores ---
function cambiarFondoAleatorio() {
    const letras = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    document.body.style.backgroundColor = color;
    document.getElementById('codigoHex').textContent = color;
}

function copiarColorHex() {
    const codigo = document.getElementById('codigoHex').textContent;
    navigator.clipboard.writeText(codigo);
    alert('Color copiado: ' + codigo);
}

// --- PROYECTO 6: Temporizador ---
let intervaloTiempo;
function iniciarTemporizador() {
    let min = parseInt(document.getElementById('minutosInput').value) || 0;
    let seg = parseInt(document.getElementById('segundosInput').value) || 0;
    let totalSegundos = (min * 60) + seg;

    clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(() => {
        if (totalSegundos <= 0) {
            clearInterval(intervaloTiempo);
            document.getElementById('displayTemporizador').textContent = "¡Tiempo terminado!";
            return;
        }
        totalSegundos--;
        let m = Math.floor(totalSegundos / 60);
        let s = totalSegundos % 60;
        document.getElementById('displayTemporizador').textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    }, 1000);
}

function pausarTemporizador() {
    clearInterval(intervaloTiempo);
}

function reiniciarTemporizador() {
    clearInterval(intervaloTiempo);
    document.getElementById('displayTemporizador').textContent = "00:00";
}

// --- PROYECTO 7: Generador de Contraseñas ---
function actualizarRango(val) {
    document.getElementById('longitudValor').textContent = val;
}

function generarPassword() {
    const len = document.getElementById('rangoLongitud').value;
    const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minus = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const simbs = "!@#$%^&*()_+";

    let chars = "";
    if(document.getElementById('mayusCheck').checked) chars += mayus;
    if(document.getElementById('minusCheck').checked) chars += minus;
    if(document.getElementById('numCheck').checked) chars += nums;
    if(document.getElementById('simbCheck').checked) chars += simbs;

    let pass = "";
    for(let i=0; i<len; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('resultadoPass').value = pass;
}

function copiarPassword() {
    const passInput = document.getElementById('resultadoPass');
    navigator.clipboard.writeText(passInput.value);
    alert("Contraseña copiada al portapapeles");
}

// --- PROYECTO 8: Modo Oscuro / Claro ---
function alternarModoOscuro() {
    document.body.classList.toggle('dark-mode');
    const esOscuro = document.body.classList.contains('dark-mode');
    localStorage.setItem('modoOscuro', esOscuro);
    document.getElementById('btnModo').textContent = esOscuro ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro";
}

if(localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
}

// --- PROYECTO 9: Piedra, Papel o Tijera ---
let ptsU = 0, ptsC = 0;
function jugarPPT(eleccionUsuario) {
    const opciones = ['Piedra', 'Papel', 'Tijera'];
    const eleccionComp = opciones[Math.floor(Math.random() * 3)];
    let resultado = "";

    if (eleccionUsuario === eleccionComp) {
        resultado = `Empate. Ambos eligieron ${eleccionUsuario}`;
    } else if (
        (eleccionUsuario === 'Piedra' && eleccionComp === 'Tijera') ||
        (eleccionUsuario === 'Papel' && eleccionComp === 'Piedra') ||
        (eleccionUsuario === 'Tijera' && eleccionComp === 'Papel')
    ) {
        resultado = `¡Ganaste! ${eleccionUsuario} vence a ${eleccionComp}`;
        ptsU++;
    } else {
        resultado = `Perdiste. ${eleccionComp} vence a ${eleccionUsuario}`;
        ptsC++;
    }

    document.getElementById('resultadoPPT').textContent = resultado;
    document.getElementById('ptsUsuario').textContent = ptsU;
    document.getElementById('ptsComp').textContent = ptsC;
}

function reiniciarPPT() {
    ptsU = 0; ptsC = 0;
    document.getElementById('ptsUsuario').textContent = ptsU;
    document.getElementById('ptsComp').textContent = ptsC;
    document.getElementById('resultadoPPT').textContent = "Marcador reiniciado";
}

// --- PROYECTO 10: Galería ---
function filtrarCat(cat) {
    const items = document.querySelectorAll('.galeria-item');
    items.forEach(item => {
        if(cat === 'todas' || item.getAttribute('data-cat') === cat) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function filtrarImagenes() {
    const query = document.getElementById('buscadorGaleria').value.toLowerCase();
    const items = document.querySelectorAll('.galeria-item');
    items.forEach(item => {
        const nombre = item.getAttribute('data-nombre');
        if(nombre.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function abrirModal(src) {
    const modal = document.getElementById('modalGaleria');
    const imgModal = document.getElementById('imgModal');
    modal.style.display = 'flex';
    imgModal.src = src;
}

function cerrarModal() {
    document.getElementById('modalGaleria').style.display = 'none';
}
