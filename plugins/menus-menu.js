import { promises as fs } from 'fs';
import { join } from 'path';

const handler = async (m, { conn, usedPrefix, __dirname, isPrems }) => {
    const idioma = global.db.data.users[m.sender]?.language || global.defaultLenguaje || 'es';
    const _translate = JSON.parse(await fs.readFile(`./src/languages/${idioma}/${m.plugin}.json`));
    const tradutor = _translate.plugins.menu;

    try {
        const username = '@' + m.sender.split('@s.whatsapp.net')[0];
        if (usedPrefix == 'a' || usedPrefix == 'A') return;

        const d = new Date(new Date().getTime() + 3600000);

        const localeMap = {
            'es': 'es-ES',
            'en': 'en-US',
            'ar': 'ar-SA'
        };

        const locale = localeMap[idioma.toLowerCase()] || 'es-ES';

        let week, date;
        try {
            week = d.toLocaleDateString(locale, { weekday: 'long' });
            date = d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch (error) {
            week = d.toLocaleDateString('es-ES', { weekday: 'long' });
            date = d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }

        const _uptime = process.uptime() * 1000;
        const uptime = clockString(_uptime);
        const rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
        const rtotal = Object.keys(global.db.data.users).length || '0';

        let user = global.db.data.users[m.sender];
        let exp = user.exp ? user.exp : 0
        let limit = user.limit ? user.limit : 0;
        let level = user.level ? user.level : 0;
        let role = user.role ? user.role : 'Novato';
        let money = user.money ? user.money : 0;
        let joincount = user.joincount ? user.joincount : 0;

        // MENÚ NEXUS - Con TODOS los comandos
        const menuNexus = `
*🕸️  N E X U S  🜃*

*📡 INFORMACIÓN DEL NÚCLEO*
*🜂 Desarrollador:* Hernandez
*⚡ Versión:* Nexus v2.0
*📞 Soporte:* +504 9692-6150
*⏱️ Activo:* ${uptime}
*👥 Usuarios:* ${rtotal}

*👤 USUARIO:* ${username}
*⚡ ESTADO:* ${user.premiumTime > 0 ? '🜂 PREMIUM' : (isPrems ? '🜂 PREMIUM' : '⛓️ STANDARD')}

*📊 ESTADÍSTICAS:*
*🜂 Nivel:* ${level} | *⚡ EXP:* ${exp}
*⛓️ Límites:* ${limit} | *📈 Diamantes:* ${money}
*🔰 Rango:* ${role} | *🎯 Joins:* ${joincount}

*⛓️━━━━━━━━━━━━━━━━━━⛓️*

*🜂  HERRAMIENTAS PRINCIPALES*

*⚡ Descargas Multimedia*
• *${usedPrefix}play* - Audio YouTube
• *${usedPrefix}ytmp4* - Video YouTube  
• *${usedPrefix}spotify* - Audio Spotify
• *${usedPrefix}tiktok* - Video TikTok
• *${usedPrefix}facebook* - Video Facebook
• *${usedPrefix}instagram* - Descarga IG
• *${usedPrefix}mediafire* - MediaFire
• *${usedPrefix}gitclone* - Git Clone
• *${usedPrefix}gdrive* - Google Drive
• *${usedPrefix}twitter* - Video Twitter
• *${usedPrefix}ringtone* - Tonos llamada
• *${usedPrefix}soundcloud* - SoundCloud
• *${usedPrefix}stickerpack* - Pack stickers
• *${usedPrefix}dapk2* - Descarga APK

*📡 Búsquedas y Info*
• *${usedPrefix}modapk* - Buscar APKs
• *${usedPrefix}stickersearch* - Buscar stickers
• *${usedPrefix}stickersearch2* - Buscar stickers 2
• *${usedPrefix}animeinfo* - Info anime
• *${usedPrefix}cuevana* - Buscar películas
• *${usedPrefix}cuevanaInfo* - Info película

*🎨 Efectos y Logos*
• *${usedPrefix}logos* - Logos personalizados
• *${usedPrefix}logochristmas* - Logo navideño
• *${usedPrefix}logocorazon* - Logo corazón
• *${usedPrefix}pixelar* - Efecto pixelar

*⛓️━━━━━━━━━━━━━━━━━━⛓️*

*🜃  SISTEMA AVANZADO*

*🎮 Juegos y Entretenimiento*
• *${usedPrefix}mates* - Problemas matemáticos
• *${usedPrefix}ppt* - Piedra, papel, tijera
• *${usedPrefix}suitpvp* - Duelo PvP
• *${usedPrefix}ttt* - Tres en raya
• *${usedPrefix}delttt* - Eliminar TTT
• *${usedPrefix}akinator* - Juego adivinanza
• *${usedPrefix}wordfind* - Buscar palabras
• *${usedPrefix}cancion* - Adivinar canción
• *${usedPrefix}pista* - Pistas juego
• *${usedPrefix}glx* - RPG Mundo Galaxy
• *${usedPrefix}doxear* - Info usuario

*🔧 Utilidades y Herramientas*
• *${usedPrefix}ocr* - Leer texto imágenes
• *${usedPrefix}inspect* - Inspeccionar grupo
• *${usedPrefix}chatgpt* - IA conversacional
• *${usedPrefix}exploit* - Buscar exploits
• *${usedPrefix}dall-e* - Generar imágenes
• *${usedPrefix}spamwa* - Spam WhatsApp
• *${usedPrefix}readviewonce* - Ver viewonce
• *${usedPrefix}clima* - Clima actual
• *${usedPrefix}encuesta* - Crear encuesta
• *${usedPrefix}whatmusic* - Identificar música
• *${usedPrefix}readqr* - Leer QR
• *${usedPrefix}styletext* - Texto con estilo
• *${usedPrefix}nowa* - Número WhatsApp
• *${usedPrefix}covid* - Info COVID
• *${usedPrefix}horario* - Horario actual
• *${usedPrefix}igstalk* - Stalkear IG
• *${usedPrefix}del* - Eliminar mensaje

*📊 RPG Sistema*
• *${usedPrefix}cofre* - Reclamar cofre
• *${usedPrefix}balance* - Ver balance
• *${usedPrefix}claim* - Reclamar recompensa
• *${usedPrefix}lb* - Leaderboard
• *${usedPrefix}myns* - Mi nombre serial
• *${usedPrefix}perfil* - Ver perfil
• *${usedPrefix}crime* - Cometer crimen

*⛓️━━━━━━━━━━━━━━━━━━⛓️*

*⚡  ADMINISTRACIÓN*

*👥 Configuración de Grupo*
• *${usedPrefix}grouptime* - Tiempo grupo
• *${usedPrefix}enable welcome* - Bienvenidas
• *${usedPrefix}disable welcome* - Desactivar
• *${usedPrefix}enable modohorny* - Modo horny
• *${usedPrefix}enable antilink* - Anti-enlaces
• *${usedPrefix}enable antilink2* - Anti-enlaces 2
• *${usedPrefix}enable detect* - Detecciones
• *${usedPrefix}enable audios* - Audios
• *${usedPrefix}enable autosticker* - Auto-sticker
• *${usedPrefix}enable antiviewonce* - Anti-viewonce
• *${usedPrefix}enable antitoxic* - Anti-tóxico
• *${usedPrefix}enable antitraba* - Anti-traba
• *${usedPrefix}enable antiarabes* - Anti-árabes
• *${usedPrefix}enable modoadmin* - Modo admin
• *${usedPrefix}enable antidelete* - Anti-delete

*🛡️ Comandos de Propietario*
• *${usedPrefix}dsowner* - Dueño sub-bot
• *${usedPrefix}autoadmin* - Auto-admin
• *${usedPrefix}leavegc* - Salir grupo
• *${usedPrefix}addowner* - Agregar owner
• *${usedPrefix}delowner* - Eliminar owner
• *${usedPrefix}block* - Bloquear usuario
• *${usedPrefix}unblock* - Desbloquear
• *${usedPrefix}enable restrict* - Restricción
• *${usedPrefix}enable autoread* - Auto-leer
• *${usedPrefix}enable public* - Modo público
• *${usedPrefix}enable pconly* - Solo privado
• *${usedPrefix}enable gconly* - Solo grupos
• *${usedPrefix}enable anticall* - Anti-llamadas
• *${usedPrefix}enable antiprivado* - Anti-privado
• *${usedPrefix}enable modejadibot* - Modo jadibot
• *${usedPrefix}enable audios_bot* - Audios bot
• *${usedPrefix}enable antispam* - Anti-spam
• *${usedPrefix}resetuser* - Resetear usuario
• *${usedPrefix}banuser* - Banear usuario
• *${usedPrefix}dardiamantes* - Dar diamantes
• *${usedPrefix}añadirxp* - Agregar XP
• *${usedPrefix}bcbot* - Broadcast global
• *${usedPrefix}cleartpm* - Limpiar temporal
• *${usedPrefix}banlist* - Lista baneados
• *${usedPrefix}addprem2* - Agregar premium
• *${usedPrefix}addprem3* - Agregar premium 3
• *${usedPrefix}addprem4* - Agregar premium 4
• *${usedPrefix}listcmd* - Listar comandos
• *${usedPrefix}addcmd* - Agregar comando
• *${usedPrefix}delcmd* - Eliminar comando
• *${usedPrefix}msg* - Enviar mensaje
• *${usedPrefix}setppbot* - Cambiar pp bot

*⛓️━━━━━━━━━━━━━━━━━━⛓️*

*🎨 Stickers y Multimedia*

*🖼️ Creación de Stickers*
• *${usedPrefix}sticker* - Crear sticker
• *${usedPrefix}scircle* - Sticker circular
• *${usedPrefix}sremovebg* - Quitar fondo
• *${usedPrefix}semoji* - Sticker emoji
• *${usedPrefix}attp2* - Texto animado 2
• *${usedPrefix}attp3* - Texto animado 3
• *${usedPrefix}ttp2* - Texto a sticker 2
• *${usedPrefix}ttp3* - Texto a sticker 3
• *${usedPrefix}ttp4* - Texto a sticker 4
• *${usedPrefix}ttp5* - Texto a sticker 5
• *${usedPrefix}slap* - Sticker bofetada
• *${usedPrefix}pat* - Sticker palmada
• *${usedPrefix}kiss* - Sticker beso
• *${usedPrefix}dado* - Sticker dado
• *${usedPrefix}stickermarker* - Sticker marker
• *${usedPrefix}stickerfilter* - Sticker filter

*📱 Wallpapers e Imágenes*
• *${usedPrefix}wpmontaña* - WP montaña
• *${usedPrefix}pubg* - WP PUBG
• *${usedPrefix}wpgaming* - WP gaming
• *${usedPrefix}wpaesthetic* - WP aesthetic
• *${usedPrefix}wpaesthetic2* - WP aesthetic 2
• *${usedPrefix}wprandom* - WP random
• *${usedPrefix}wallhp* - WP HP
• *${usedPrefix}wpvehiculo* - WP vehículos
• *${usedPrefix}wpmoto* - WP motos
• *${usedPrefix}coffee* - Café
• *${usedPrefix}pentol* - Pentol
• *${usedPrefix}caricatura* - Caricatura
• *${usedPrefix}ciberespacio* - Ciberespacio
• *${usedPrefix}technology* - Tecnología
• *${usedPrefix}doraemon* - Doraemon
• *${usedPrefix}hacker* - Hacker
• *${usedPrefix}planeta* - Planeta
• *${usedPrefix}randomprofile* - Perfil random

*⛓️━━━━━━━━━━━━━━━━━━⛓️*

*🔰 COMANDOS ADICIONALES*

*ℹ️ Información y Utilidades*
• *${usedPrefix}menuaudios* - Menú audios
• *${usedPrefix}menuanimes* - Menú animes
• *${usedPrefix}labiblia* - La biblia
• *${usedPrefix}lang* - Cambiar idioma
• *${usedPrefix}infobot* - Info del bot
• *${usedPrefix}script* - Script del bot
• *${usedPrefix}estado* - Estado del bot
• *${usedPrefix}join* - Unirse a grupo
• *${usedPrefix}fixmsgespera* - Fix mensajes
• *bot* - Activar sin prefijo

*🤖 Sistema JadiBot*
• *${usedPrefix}serbot --code* - Crear sub-bot

*🔄 Conversores*
• *${usedPrefix}toptt* - A audio WhatsApp

*💡 Usa ${usedPrefix}comando para más info*
*🕸️ NEXUS - Sistema Privado de Herramientas*
`.trim();

        // Enviar menú como texto puro
        const sentMessage = await conn.sendMessage(m.chat, { 
            text: menuNexus, 
            mentions: [m.sender] 
        }, { quoted: m });

        // Reaccionar con telaraña al mensaje del menú
        try {
            await conn.sendMessage(m.chat, {
                react: {
                    text: '🕸️',
                    key: sentMessage.key
                }
            });
        } catch (reactError) {
            console.log('*❌ Error en reacción:*', reactError.message);
        }

    } catch (e) {
        await m.reply(`*❌ ERROR EN EL NÚCLEO*\n*⚡ ${e.message}*`);
    }
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = /^(menu|help|comandos|commands|cmd|cmds|nexus)$/i;
export default handler;

function clockString(ms) {
    const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}