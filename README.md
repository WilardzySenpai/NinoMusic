<h1 align="center">
  <a href="#"><img src="https://i1.sndcdn.com/visuals-Ow0VgMEySp2z76WJ-StC4Pw-t1240x260.jpg" alt="NinoMusic"></a>
  NinoMusic ❤
</h1>

# 💌 Remember
Nino is a simple music bot on discord that can support Spotify, SoundCloud and YouTube also Nino can play a direct music link, don't you know that? pretty cool isn't. We hope that Nino can bring happiness to your server's and play Music whenever you all in vc, Thank you!

## 💻 Requirements
1. Nodejs 16 or higher: **[Link](https://nodejs.org)**
2. Git: **[Link](https://git-scm.com)**
3. Discord Bot Token: **[Link](https://discord.com/developers/applications)**

## Getting Started
Before you start editing or forking this code you should have a basic knowledge of JavaScript and Discord.js v12. Having a basic knowledge will help you to not get a error by running or let's say you won't get confused. Basic Knowledge means you should know the basic functions and Syntax's.

## Create Discord Application
Go to [Discord Developer Portal](https://discord.com/developers/applications) and click "New Application" then name your application then click "Create". Now head over to Bot. Click Add Bot, then you customize the name and avatar(If youd like). Now lets get coding.

## Supported sources and formats
- YouTube
- SoundCloud
- Spotify
- HTTP URLs

## Formats
- MP3
- FLAC
- WAV
- Matroska/WebM (AAC, Opus or Vorbis codecs)
- MP4/M4A (AAC codec)
- OGG streams (Opus, Vorbis and FLAC codecs)
- AAC streams
- Stream playlists (M3U and PLS)

# Commands

A full list of commands for use with NinoMusic

## Music

| Command               | Description                                                                                                               | Usage                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| /play                 | Play any song or playlist from youtube, you can do it by searching for a song by name or song url or playlist url         | /play darude sandstorm                                |
| /pause                | Pause the current playing song                                                                                            | /pause                                                |
| /resume               | Resume the current paused song                                                                                            | /resume                                               |
| /leave                | Leaves voice channel if in one                                                                                            | /leave                                                |
| /remove               | Remove a specific song from queue by its number in queue                                                                  | /remove 4                                             |
| /queue                | Display the song queue                                                                                                    | /queue                                                |
| /shuffle              | Shuffle the song queue                                                                                                    | /shuffle                                              |
| /skip                 | Skip the current playing song                                                                                             | /skip                                                 |
| /skipall              | Skip all songs in queue                                                                                                   | /skipall                                              |
| /skipto               | Skip to a specific song in the queue, provide the song number as an argument                                              | /skipto 5                                             |
| /volume               | Adjust song volume                                                                                                        | /volume 80                                            |
| /music-trivia         | Engage in a music trivia with your friends. You can add more songs to the trivia pool in resources/music/musictrivia.json | /music-trivia                                         |
| /loop                 | Loop the currently playing song or queue                                                                                  | /loop                                                 |
| /lyrics               | Get lyrics of any song or the lyrics of the currently playing song                                                        | /lyrics song-name                                     |
| /now-playing          | Display the current playing song with a playback bar                                                                      | /now-playing                                          |
| /move                 | Move song to a desired position in queue                                                                                  | /move 8 1                                             |
| /queue-history        | Display the queue history                                                                                                 | /queue-history                                        |
| /create-playlist      | Create a custom playlist                                                                                                  | /create-playlist 'playlistname'                       |
| /save-to-playlist     | Add a song or playlist to a custom playlist                                                                               | /save-to-playlist 'playlistname' 'yt or spotify url'  |
| /remove-from-playlist | Remove a track from a custom playlist                                                                                     | /remove-from-playlist 'playlistname' 'track location' |
| /my-playlists         | Display your custom playlists                                                                                             | /my-playlists                                         |
| /display-playlist     | Display a custom playlist                                                                                                 | /display-playlist 'playlistname'                      |
| /delete-playlist      | remove a custom playlist                                                                                                  | /delete-playlist 'playlistname'                       |
