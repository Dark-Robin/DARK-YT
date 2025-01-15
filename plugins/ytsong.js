const { cmd, commands } = require('../command');
const ytdl = require('ytdl-core'); // Import ytdl-core to handle YouTube downloads
const yts = require('yt-search'); // Search YouTube videos

cmd({
    pattern: "song",
    desc: "Download Song",
    category: "download",
    filename: __filename
},
async (robin, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("*Please provide a song name or a link* 🌚❤️");
        
        const isReact = m.message.reactionMessage ? true : false;
        if (isReact) return;
        
        m.react("🎵");
        
        const search = await yts(q); // Search for the video on YouTube
        const data = search.videos[0];
        const url = data.url;

        let desc = `
*❤️ROBIN SONG DOWNLOADER❤️*

👻 *title* : ${data.title}
👻 *description* : ${data.description}
👻 *time* : ${data.timestamp}
👻 *ago* : ${data.ago}
👻 *views* : ${data.views}

𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
`;
        
        await robin.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio using ytdl-core
        let audioStream = ytdl(url, { filter: 'audioonly' }); // Filter to get audio only
        let audioUrl = audioStream;

        // Send audio message
        await robin.sendMessage(from, { audio: { url: audioUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await robin.sendMessage(from, { document: { url: audioUrl }, mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: "𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋" }, { quoted: mek });
        
        return reply("*Thanks for using my bot* 🌚❤️");
    
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

