const { MessageEmbed, MessageActionRow, MessageButton } = require(`discord.js`)

const set2string = (n) => {
    if(!n) return "00"; // Returning so it doesn't crash

    return (n < 10 ? '0' : '') + n;
}
const formatMS = (n) => {
    if(!n) return "000"; // Returning so it doesn't crash
    return n + (Number(n) < 100 ? '0' : ''); 
}

const getDateTimeString = (timestamp = Date.now()) => {
    const date = new Date(timestamp);
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const DD = set2string(date.getDate()); //The Day
    const MM = set2string(date.getMonth() + 1); //The Month
    const YYYY = date.getFullYear(); //The Year
    const HH = set2string(date.getHours()); //Hours
    const mm = set2string(date.getMinutes()); //Minutes
    const ss = set2string(date.getSeconds()); //Seconds
    const SSSS = formatMS(date.getMilliseconds()); //Milliseconds
    const ddd = days[ date.getDay() ]; //get the day of the week
    //ddd DD-MM-YYYY HH:mm:ss.SSSS
    return `${ddd} ${DD}-${MM}-${YYYY} ${HH}:${mm}:${ss}.${SSSS}`
}

module.exports = {
  getDateTimeString
};
  