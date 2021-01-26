module.exports = async (client, hook) => {
  console.log(`Webhook opérationnel sur http://${hook.hostname}:${hook.port}${hook.path}`);
}