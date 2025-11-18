import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import cfonts from 'cfonts';
import readline from 'readline';
import yargs from 'yargs';
import chalk from 'chalk'; 
import fs from 'fs'; 
import './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { say } = cfonts;
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let isRunning = false;
let childProcess = null;

const question = (texto) => new Promise((resolver) => rl.question(texto, resolver));

console.log(chalk.yellow.bold('*🜃  INICIANDO SISTEMA NEXUS...*'));

function verificarOCrearCarpetaAuth() {
  const authPath = join(__dirname, global.authFile);
  if (!fs.existsSync(authPath)) {
    fs.mkdirSync(authPath, { recursive: true });
  }
}

function verificarCredsJson() {
  const credsPath = join(__dirname, global.authFile, 'creds.json');
  return fs.existsSync(credsPath);
}

function formatearNumeroTelefono(numero) {
  let formattedNumber = numero.replace(/[^\d+]/g, '');
  if (formattedNumber.startsWith('+52') && !formattedNumber.startsWith('+521')) {
    formattedNumber = formattedNumber.replace('+52', '+521');
  } else if (formattedNumber.startsWith('52') && !formattedNumber.startsWith('521')) {
    formattedNumber = `+521${formattedNumber.slice(2)}`;
  } else if (formattedNumber.startsWith('52') && formattedNumber.length >= 12) {
    formattedNumber = `+${formattedNumber}`;
  } else if (!formattedNumber.startsWith('+')) {
    formattedNumber = `+${formattedNumber}`;
  }
  return formattedNumber;
}

function esNumeroValido(numeroTelefono) {
  const regex = /^\+\d{7,15}$/;
  return regex.test(numeroTelefono);
}

async function start(file) {
  if (isRunning) return;
  isRunning = true;

  say('🕸️  N E X U S', {
    font: 'chrome',
    align: 'center',
    gradient: ['red', 'magenta'],
  });

  say(`*Núcleo desarrollado por Hernandez*`, {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta'],
  });

  verificarOCrearCarpetaAuth();

  if (verificarCredsJson()) {
    const args = [join(__dirname, file), ...process.argv.slice(2)];
    setupMaster({ exec: args[0], args: args.slice(1) });
    forkProcess(file);
    return;
  }

  const opcion = await question(chalk.yellowBright.bold('*🜃  SELECCIONE MÉTODO DE CONEXIÓN:*\n') + chalk.white.bold('*1.* Con código QR\n*2.* Con código de texto de 8 dígitos\n*⚡ →* '));

  if (opcion === '2') {
    const phoneNumber = await question(chalk.yellowBright.bold('\n*📡  INGRESE SU NÚMERO DE WHATSAPP:*\n') + chalk.white.bold('*🜂  Ejemplo: +5219992095479*\n*⚡ →* '));
    const numeroTelefono = formatearNumeroTelefono(phoneNumber);

    if (!esNumeroValido(numeroTelefono)) {
      console.log(chalk.bgRed(chalk.white.bold('*❌ ERROR: NÚMERO INVÁLIDO*\n*🜂  Asegúrese de usar formato internacional*\n*📋 Ejemplo válido:*\n*• +5219992095479*\n')));
      process.exit(0);
    }

    process.argv.push('--phone=' + numeroTelefono);
    process.argv.push('--method=code');
  } else if (opcion === '1') {
    process.argv.push('--method=qr');
  }

  const args = [join(__dirname, file), ...process.argv.slice(2)];
  setupMaster({ exec: args[0], args: args.slice(1) });
  forkProcess(file);
}

function forkProcess(file) {
  childProcess = fork();

  childProcess.on('message', (data) => {
    console.log(chalk.green.bold('*📨  MENSAJE DEL NÚCLEO:*'), data);
    switch (data) {
      case 'reset':
        console.log(chalk.yellow.bold('*🔄  SOLICITUD DE REINICIO DETECTADA*'));
        childProcess.removeAllListeners();
        childProcess.kill('SIGTERM');
        isRunning = false;
        setTimeout(() => start(file), 1000);
        break;
      case 'uptime':
        childProcess.send(process.uptime());
        break;
    }
  });

  childProcess.on('exit', (code, signal) => {
    console.log(chalk.yellow.bold(`*⚠️  PROCESO SECUNDARIO FINALIZADO* (${code || signal})`));
    isRunning = false;
    childProcess = null;

    if (code !== 0 || signal === 'SIGTERM') {
      console.log(chalk.yellow.bold('*🔄  REINICIANDO NÚCLEO...*'));
      setTimeout(() => start(file), 1000);
    }
  });

  const opts = yargs(process.argv.slice(2)).argv;
  if (!opts.test) {
    rl.on('line', (line) => {
      childProcess.emit('message', line.trim());
    });
  }
}

try {
  start('main.js');
} catch (error) {
  console.error(chalk.red.bold('*💥  ERROR CRÍTICO EN EL NÚCLEO:*'), error);
  process.exit(1);
}
