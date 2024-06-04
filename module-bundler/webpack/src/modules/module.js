import * as _ from "lodash";
let cnt = 0;

(() => {
  console.log("Call from module.js");
})();
console.log(cnt);

export default {
  cnt,
};
