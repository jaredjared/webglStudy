import { arrMap, DiffForInAndOf,extendsTypes } from "./webBase";

const readline=(str)=>{
  return str;
}

export default class Main {
    constructor() {
      // new DiffForInAndOf();
      // arrMap();
      extendsTypes();
    }
}
window.onload = () => {
    new Main();
}