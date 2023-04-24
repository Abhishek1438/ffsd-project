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

let applyFilters= () => {
  let type = window.location.pathname.split('/')[2];
  let location = document.getElementById('searchLocation').value;
  let bedsNum = document.getElementById('beds').value;
  let propertyType = document.getElementById('propertyType').value;
  let price = document.getElementById('price').value;
  // window.location.href = `/show-properties/${type}/${location}/${bedsNum}/${propertyType}/${price}`
  let params = "";
  if(bedsNum && bedsNum.length) {
    params += "bedsNum="+bedsNum
  }
  if(propertyType && propertyType.length) {
    params += (params.length?"&":"")+"propertyType="+propertyType
  }
  if(price && price.length) {
    params += (params.length?"&":"")+"price="+price
  }
  window.location.href = `/show-properties/${type}/${location}?${params}`
};

let applyFilters1= () => {
  let type = window.location.pathname.split('/')[2];
  let location = document.getElementById('searchLocation1').value;
  let bedsNum = document.getElementById('beds1').value;
  let propertyType = document.getElementById('propertyType1').value;
  let price = document.getElementById('price1').value;
  // window.location.href = `/show-properties/${type}/${location}/${bedsNum}/${propertyType}/${price}`
  let params = "";
  if(bedsNum && bedsNum.length) {
    params += "bedsNum="+bedsNum
  }
  if(propertyType && propertyType.length) {
    params += (params.length?"&":"")+"propertyType="+propertyType
  }
  if(price && price.length) {
    params += (params.length?"&":"")+"price="+price
  }
  window.location.href = `/show-properties/${type}/${location}?${params}`
};

let searchProperties = () => {
  console.log("working");
  let type = window.location.pathname.split('/')[2];
  let location = document.getElementById('searchLocation').value;
  window.location.href = `/show-properties/${type}/${location}`;

};

let searchPropertiesA = () => {
  console.log("working");
  let type = window.location.pathname.split('/')[2];
  let location = document.getElementById('searchLocation1').value;
  window.location.href = `/show-properties/${type}/${location}`;

};
