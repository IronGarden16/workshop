function isAtleastOneValid(obj, properties) {
  for (property in properties) {
    if (obj[property] !== undefined)
      return true;
  }

  return false;
}

module.exports = {
  isAtleastOneValid,
}
