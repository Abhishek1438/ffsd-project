// const basicAutocomplete = document.querySelector('#search-autocomplete');
// const data = ['One', 'Two', 'Three', 'Four', 'Five'];
// const dataFilter = (value) => {
//   return data.filter((item) => {
//     return item.toLowerCase().startsWith(value.toLowerCase());
//   });
// };

// new mdb.Autocomplete(basicAutocomplete, {
//   filter: dataFilter,
// });

const searchProperties = () => {
  const type = window.location.pathname.split('/')[2];
  const location = document.getElementById('searchLocation').value;
  window.location.replace(`/show-properties/${type}/${location}`);
};
