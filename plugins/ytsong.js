const { cmd, commands } = require('../command');
const ytdl = require('ytdl-core'); // Import ytdl-core to handle YouTube downloads
const yts = require('yt-search'); // Search YouTube videos
const fs = require('fs-extra'); // File system to save the stream as a file

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
        
        // Search YouTube
        const search = await yts(q);
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
        
        // Send the video thumbnail and details
        await robin.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio using ytdl-core
        let audioStream = ytdl(url, { filter: 'audioonly' });

        // Handle 410 error from ytdl-core
        audioStream.on('response', (res) => {
            if (res.statusCode === 410) {
                reply("This video is no longer available.");
                return;
            }
        });

        // Save the audio stream as a temporary file
        const fileName = data.title + '.mp3';
        const tempFilePath = `./${fileName}`;

        // Pipe the audio stream to a file
        audioStream.pipe(fs.createWriteStream(tempFilePath));

        audioStream.on('end', async () => {
            // After the stream ends, send the audio file
            await robin.sendMessage(from, {
                audio: fs.createReadStream(tempFilePath), // Use the file path or buffer
                mimetype: 'audio/mpeg',
            }, { quoted: mek });

            // Send the file as a document
            await robin.sendMessage(from, { 
                document: { url: tempFilePath },
                mimetype: 'audio/mpeg',
                fileName: fileName,
                caption: "𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋"
            }, { quoted: mek });

            // Optionally, delete the temporary file after sending
            fs.unlinkSync(tempFilePath);
        });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
