const { cmd, commands } = require('../command');
const ytdlp = require('yt-dlp-exec');
const yts = require('yt-search');

cmd(
    {
        pattern: 'song',
        desc: 'Download Song',
        category: 'download',
        filename: __filename,
    },
    async (robin, mek, m, { from, q, reply }) => {
        try {
            if (!q) return reply('*Please provide a song name or YouTube link* 🌚❤️');
            
            // React to the message
            const isReact = m.message.reactionMessage ? true : false;
            if (isReact) return;
            m.react('🎵');

            // Search for the song on YouTube
            const search = await yts(q);
            if (!search.videos || search.videos.length === 0) {
                return reply('*No results found for your query* 🌚❤️');
            }
            const data = search.videos[0];
            const url = data.url;

            // Build description message
            const desc = `
*❤️ROBIN SONG DOWNLOADER❤️*

👻 *Title* : ${data.title}
👻 *Description* : ${data.description}
👻 *Duration* : ${data.timestamp}
👻 *Uploaded* : ${data.ago}
👻 *Views* : ${data.views}

𝐌𝐚𝐝𝐞 𝐛𝐲 𝐒_𝐈_𝐇_𝐈_𝐋_𝐄_𝐋
`;
            await robin.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

            // Download the song using yt-dlp
            const output = `./downloads/${data.title}.mp3`;
            await ytdlp(url, {
                extractAudio: true,
                audioFormat: 'mp3',
                output: output,
            });

            // Send the downloaded song
            await robin.sendMessage(from, { audio: { url: output }, mimetype: 'audio/mpeg' }, { quoted: mek });
            return reply('*Thanks for using my bot* 🌚❤️');
        } catch (e) {
            console.error(e);
            reply(`*An error occurred:* ${e.message}`);
        }
    }
);
