const { cmd, commands } = require('../command');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const { PassThrough } = require('stream');
const { Readable } = require('stream');
const streamToBuffer = require('stream-to-buffer'); // npm install stream-to-buffer

cmd({
    pattern: "song",
    desc: "Download Song",
    category: "download",
    filename: __filename
}, async (robin, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender }) => {
    try {
        if (!q) return robin.sendMessage(from, { text: "*Please provide a song title or link* 🌚❤️" }, { quoted: mek });

        const isReact = m.message.reactionMessage ? true : false;
        if (isReact) return;

        m.react("🎵");

        // Search for song
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
        *❤️ YouTube Song Downloader ❤️*

        👻 *Title* : ${data.title}
        👻 *Description* : ${data.description}
        👻 *Time* : ${data.timestamp}
        👻 *Ago* : ${data.ago}
        👻 *Views* : ${data.views}

        ✅ Powered by: YourBotName
        `;
        
        await robin.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download song audio using ytdl-core
        const audioStream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });

        // Convert the stream to a Buffer
        streamToBuffer(audioStream, async (err, buffer) => {
            if (err) {
                return robin.sendMessage(from, { text: "*An error occurred while processing your request.* 🌚❤️" }, { quoted: mek });
            }

            // Send audio using buffer
            await robin.sendMessage(from, {
                audio: buffer,
                mimetype: 'audio/mp4',
                ptt: true // Use ptt (push-to-talk) if it's required
            }, { quoted: mek });

            return robin.sendMessage(from, { text: "*Thanks for using the bot* 🌚❤️" }, { quoted: mek });
        });

    } catch (error) {
        console.error(error);

        // Handle the 410 error (content not found)
        if (error.response && error.response.statusCode === 410) {
            return robin.sendMessage(from, { text: "*Sorry, this content is no longer available.* 🌚❤️" }, { quoted: mek });
        }

        // Generic error message
        return robin.sendMessage(from, { text: "*An error occurred while processing your request.* 🌚❤️" }, { quoted: mek });
    }
});
