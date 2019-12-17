export const _parseJSON = response => {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {};
  });
};
