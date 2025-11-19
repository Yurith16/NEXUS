import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import moment from 'moment-timezone';

global.botnumber = ""
global.confirmCode = ""
global.authFile = `NexusSession`;

global.isBaileysFail = false;
global.defaultLenguaje = 'es';

global.owner = [
  ['50496926150', '🜃 NÚCLEO PRINCIPAL 🜃', true]
];

global.suittag = [];
global.prems = [];

global.BASE_API_DELIRIUS = "https://delirius-apiofc.vercel.app";

global.packname = 'Nexus';
global.author = 'Hernandez';
global.wm = '🕸️ NEXUS';
global.titulowm = 'Nexus';
global.titulowm2 = `🕸️ NEXUS`;
global.igfg = 'Nexus';
global.wait = '*[ ⚡ ] Procesando en el núcleo...*';

// ELIMINADAS todas las referencias a imágenes
global.mods = [];

//* *******Tiempo***************
global.d = new Date(new Date + 3600000);
global.locale = 'es';
global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('es', {month: 'long'});
global.año = d.toLocaleDateString('es', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
//* ****************************
global.wm2 = `*${dia} ${fecha}*\n*🕸️ NEXUS*`;
global.gt = '🕸️ NEXUS';
global.mysticbot = '🕸️ NEXUS';
global.channel = '';
global.md = '';
global.mysticbot = '';
global.waitt = '*[ ⚡ ] Inicializando sistema...*';
global.waittt = '*[ 📡 ] Conectando al núcleo...*';
global.waitttt = '*[ 🜃 ] Procesando datos...*';
global.nomorown = '50496926150';
global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf'];

// Diseños Nexus - Solo texto
global.cmenut = '⛓️––––––『';
global.cmenub = '┊⚡ ';
global.cmenuf = '╰━═┅═━––––––๑\n';
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ';
global.dmenut = '*⛓️─┅──┅〈*';
global.dmenub = '*┊»*';
global.dmenub2 = '*┊*';
global.dmenuf = '*╰┅────────┅✦*';
global.htjava = '⫹⫺';
global.htki = '*🜂•̩̩͙⊱•••• ☪*';
global.htka = '*☪ ••••̩̩͙⊰•🜂*';
global.comienzo = '• • ◕◕════';
global.fin = '════◕◕ • •';
global.botdate = `*[ 📅 ] Fecha del sistema:*  ${moment.tz('America/Mexico_City').format('DD/MM/YY')}`;
global.bottime = `*[ ⏱️ ] Hora del núcleo:* ${moment.tz('America/Mexico_City').format('HH:mm:ss')}`;

// ELIMINADO fgif con imagen
global.multiplier = 99;

// ELIMINADAS todas las URLs de imágenes flaaa
global.flaaa = [];

const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('*🔄 Actualizando config.js*'));
  import(`${file}?update=${Date.now()}`);
});