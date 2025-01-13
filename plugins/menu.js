const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "menu",
    alias: "getmenu",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(robin, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`;
 }
}

let madeMenu = `👋 *Hello  ${pushname}*


| *MAIN COMMANDS* |
    ▫️.alive
    ▫️.menu
    ▫️
    ▫️
    ▫️
| *DOWNLOAD COMMANDS* |
    ▫️.
    ▫️.
    ▫️.
| *GROUP COMMANDS* |

| *OWNER COMMANDS* |
    ▫️.restart
    ▫️.update
| *CONVERT COMMANDS* |
    ▫️
    ▫️
    ▫️
    ▫️
| *SEARCH COMMANDS* |



🥶𝐌𝐚𝐝𝐞 𝐛𝐲 ROBIN MAX🥶

> ROBIN MENU MSG
`
await robin.sendMessage(from,{image:{url: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20menu.jpg"},caption:madeMenu},{quoted:mek})

  
}catch(e){
console.log(e)
reply(`${e}`)
}
})

