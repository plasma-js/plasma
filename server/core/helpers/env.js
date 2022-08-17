module.exports = (v) => {
  let envVar = process.env[v];

  if (envVar) envVar;

  return undefined;
}