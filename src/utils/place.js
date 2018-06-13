export function getLocationLabel(province, region, subregion) {
  return `${subregion === region ? province : region}, ${subregion}`;
}
