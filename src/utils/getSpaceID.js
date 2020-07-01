/**
 * get id space from url
 */
const spaceId = window.location.href
  .split('/')[4]
  .substring(window.location.href.split('/')[4].lastIndexOf('-') + 1);
export default spaceId;
