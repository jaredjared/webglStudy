import { arrMap, DiffForInAndOf } from "./webBase";

const readline=(str)=>{
  return str;
}

export default class Main {
    constructor() {
      new DiffForInAndOf();
      arrMap();
    }
}
window.onload = () => {
    new Main();
}