"use strict";

class Burger {

  constructor(size, topping, spice, mayo) {
    this.size = size;
    this.topping = topping;
    this.spice = spice;
    this.mayo = mayo;
    this.info();
  }

  countPrice() {
    let result = 0;
    if (this.size === 'small') {
      result += 50;
    } else {
      result += 100;
    }

    switch (this.topping) {
      case 'cheese':
        result += 10;
        break;
      case 'salad':
        result += 20;
        break;
      case 'potatoes':
        result += 15;
        break;
    }

    if (this.spice) {
      result += 15;
    }

    if (this.mayo) {
      result += 20;
    }

    return result;
  }

  countCalories() {
    let result = 0;

    if (this.size === 'small') {
      result += 20;
    } else {
      result += 40;
    }

    switch (this.topping) {
      case 'cheese':
        result += 20;
        break;
      case 'salad':
        result += 5;
        break;
      case 'potatoes':
        result += 10;
        break;
    }

    if (this.mayo) {
      result += 5;
    }

    return result;
  }

  info() {
    let info = document.querySelector('.info > div');
    info.remove();
    let message = `<div><p>Your choice -  ${this.size} burger 
        <p>Topping -${this.topping}</p>
        <p>Additions - ${this.spice ? "spice": ""} ${this.mayo ? "mayo": ""}</p>
        <p>Total Price - ${this.countPrice()}$</p>
        <p>Nutrition- ${this.countCalories()} ccal</p>
        </div>`
    document.querySelector(".info").insertAdjacentHTML('beforeend', message);
  }
}

class CreateBurger {
  constructor() {
    this.create();

  }
  render() {

    let size = "";
    let sizeArr = document.querySelectorAll(".burger input");
    for (let item of sizeArr) {
      if (item.checked) {
        size = item.value;
      }
    }
    let topping = "";
    let topArr = document.querySelectorAll(".topping input");
    for (let item of topArr) {
      if (item.checked) {
        topping = item.value;
      }
    }
    let mayo = false;
    let spice = false;
    if (document.querySelector(".additions input[name = mayo]").checked) {
      mayo = true;
    };
    if (document.querySelector(".additions input[name = spice]").checked) {
      spice = true;
    };

    const burger = new Burger(size, topping, spice, mayo);
  }

  create() {
    document.querySelector('.btn').addEventListener('click', this.render);
  }
}
const bur = new CreateBurger();
