const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')


cmd({
    pattern: "song",
    desc: "Download Song",
    category: "download",
    filename: __filename
},
async(robin, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*නමක් හරි ලින්ක් එකක් හරි දෙන්න* 🌚❤️")
const isReact = m.message.reactionMessage ? true : false
if(isReact) return 
m.react("🎵")
const search = await yts(q)
const data = search.videos[0];
const url = data.url

let desc = `
*❤️ROBIN SONG DOWNLOADER❤️*

👻 *title* : ${data.title}
👻 *description* : ${data.description}
👻 *time* : ${data.timestamp}
👻 *ago* : ${data.ago}
👻 *views* : ${data.views}

𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
`
await robin.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio message
await robin.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await robin.sendMessage(from, {document: { url: downloadUrl },mimetype: "audio/mpeg",fileName: data.title + ".mp3",caption: "𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋"},{quoted:mek})
return reply("*Thanks for using my bot* 🌚❤️")
    
}catch(e){
  console.log(e)
  reply(`${e}`)
}
})

//video download

cmd({
    pattern: "video",
    desc: "Download Video",
    category: "download",
    filename: __filename
},
async(robin, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("නමක් හරි ලින්ක් එකක් හරි දෙන්න 🌚❤️")
const isReact = m.message.reactionMessage ? true : false
if(isReact) return 
m.react("📽️")
const search = await yts(q)
const data = search.videos[0];
const url = data.url

let desc = `
*❤️ROBIN VIDEO DOWNLOADER❤️*

👻 *title* : ${data.title}
👻 *description* : ${data.description}
👻 *time* : ${data.timestamp}
👻 *ago* : ${data.ago}
👻 *views* : ${data.views}

𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
`
await robin.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send audio message
await robin.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await robin.sendMessage(from, {document: { url: downloadUrl },mimetype: "video/mp4",fileName: data.title + ".mp4",caption: "𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋"},{quoted:mek})
return reply("*Thanks for using my bot* 🌚❤️")
    
}catch(e){
  console.log(e)
  reply(`${e}`)
}
})
