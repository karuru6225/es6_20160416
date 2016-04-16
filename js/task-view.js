export default class {
  constructor(){
    this.selector = '';
    this.template = '';
    this.model = null;
  }
  render(){
    if(!this.selector || this.selector == '' || !this.tag || this.tag ==''){
      console.log('return');
      return;
    }

    let elem = document.querySelector(this.selector);
    elem.innerHTML = elem.innerHTML + eval(this.template);
  }
}
