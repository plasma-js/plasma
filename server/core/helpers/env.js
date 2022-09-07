module.exports = (v) => {
  let envVar = process.env[v];

  if (envVar) {
    return envVar;
  } else {
    return undefined;
  }
}