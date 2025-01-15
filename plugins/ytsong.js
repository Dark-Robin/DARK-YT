const express = require('express');
const { cmd, commands } = require('../command');  // Make sure this is correctly set up in your environment
const ytdl = require('ytdl-core');
const yts = require('yt-search');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Handle the .song command
cmd({
    pattern: "song", 
    desc: "Download Song",
    category: "download", 
    filename: __filename
}, async (robin, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender}) => {
    try {
        // If no query is given, prompt the user
        if (!q) return robin.sendMessage(from, "*Please provide a song title or link* 🌚❤️", {quoted: mek});
        
        // If the message is reacting, prevent further action
        const isReact = m.message.reactionMessage ? true : false;
        if (isReact) return;
        
        // React with a song emoji
        m.react("🎵");

        // Search for the song on YouTube
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        // Send video metadata
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

        // Download the audio from the YouTube video using ytdl-core
        const audioStream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
        
        // Send audio to user
        await robin.sendMessage(from, { audio: { url: audioStream }, mimetype: 'audio/mp4' }, { quoted: mek });
        
        return robin.sendMessage(from, "*Thanks for using the bot* 🌚❤️", {quoted: mek});

    } catch (error) {
        console.log(error);
        return robin.sendMessage(from, "*An error occurred while processing your request.* 🌚❤️", {quoted: mek});
    }
});

// Server to handle API requests (not needed for bot)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
