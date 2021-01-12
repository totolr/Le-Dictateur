module.exports = client => {
  console.log(`${client.user.tag} observe les ${client.users.cache.size} utilisateurs du serveur!`);
  client.channels.cache.get("773329816434376724").send("Le bot est opérationnel!");

  const guild = [];
  client.guilds.cache.map(e => guild.push(e));
  guild.forEach(async g => {
    const data = await client.getGuild(g);
    if (!data) client.createGuild({ guildID: g.id});
  });

  let activities = [`ld!help | ${client.users.cache.size} membres !`, 'ld!help | analyse vos adresses IP🔍', `ld!help | ${client.guilds.cache.size} serveurs !`], i = 0;

  setInterval(() => client.user.setPresence({ activity: { name: `${activities[i++ % activities.length]}`, type: 'PLAYING' }, status: 'dnd' }), 30000);

  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
}