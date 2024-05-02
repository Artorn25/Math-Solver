
class ScrollHandler {
  constructor(buttonId) {
    this.button = document.getElementById(buttonId);
    window.onscroll = () => this.scrollFunction();
  }

  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.button.style.display = "block";
    } else {
      this.button.style.display = "none";
    }
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}

class Loader {
  constructor(spinnerSelector) {
    this.loader = document.querySelector(spinnerSelector);
    window.addEventListener("load", () => {
      this.loadingscreen();
    });
  }

  loadingscreen() {
    this.loader.classList.add("spinner--hidden");
    this.loader.addEventListener("transitionend", () => {
      document.body.removeChild(this.loader);
    });
  }
}

// ใช้งาน
const scroll = new ScrollHandler("myBtn");
const loader = new Loader(".spinner-box");

function Function() {
  location.reload();
}

// // เช็คค่าตัวเลขที่กำหนดในตัวแปร
// function check_input(str) {
//   const matches = str.match(/-?\d+(\.\d+)?/);
//   if (matches) {
//     return parseFloat(matches[0]);
//   } else { return null; }
// }

// // ลบช่องว่างและทำให้ติดกัน
// function replacedspace(text) {
//   var space = text.split(" "),
//     replacedspace = space.map(word => word.replace(",", " "));
//   return replacedspace.join("")
// }

// function alert(status, text) {
//   if (status === "success") {
//     const success = document.getElementById('alert-success'),
//       noti = new bootstrap.Toast(success);
//     document.getElementById('fail').innerHTML = text;
//     noti.show();
//   } else if (status === "fail") {
//     const fail = document.getElementById('alert-fail'),
//       noti = new bootstrap.Toast(fail);
//     document.getElementById('fail').innerHTML = text;
//     noti.show();
//   }
// }

class Selector {
  constructor() {
    this.result = $("#result");
    this.Elements_Show = ["#list", "#list-poly", "#output", "#input-a", "#input-b", "#input-c", "#formula", "#submit", "#select_poly"];
    this.Elements_Hide = ["#list-loga", "#click-1", "#click-2", "#click-3", "#select_pytha"];
  }

  updateInputs(input1, input2, input3) {
    $('#input-de-1').css('font-weight', 'bold').text(input1);
    $('#input-de-2').css('font-weight', 'bold').text(input2);
    $('#input-de-3').css('font-weight', 'bold').text(input3);
  }

  updatePlaceholder(place_out, place_in_1, place_in_2, place_in_3) {
    $('#out').attr('placeholder', place_out);
    $('#input-define-a').attr('placeholder', place_in_1);
    $('#input-define-b').attr('placeholder', place_in_2);
    $('#input-define-c').attr('placeholder', place_in_3);
  }

  showElements(elements) {
    elements.forEach(element => {
      $(element).show();
    });
  }

  hideElements(elements) {
    elements.forEach(element => {
      $(element).hide();
    });
  }
}

class Selector_poly extends Selector {
  constructor() {
    super();
  }
  selectPoly() {
    const select_poly = $('input[name="poly"]:checked').val();
    this.result.empty();
    this.showElements(this.Elements_Show);
    this.hideElements(this.Elements_Hide);
    switch (select_poly) {
      case 'a':
        $("#pic-poly-find-a").show()
        $("#pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y").hide()
        this.updateInputs("Input x : ", "Input b : ", "Input y : ");
        this.updatePlaceholder(" Example a", " Example x = 3", "Example b = 2", "Example y = 5")
        break;
      case 'x':
        $("#pic-poly-find-x").show()
        $("#pic-poly-find-a, #pic-poly-find-b, #pic-poly-find-y").hide()
        this.updateInputs("Input a : ", "Input b : ", "Input y : ", " Example x");
        this.updatePlaceholder(" Example x", " Example a = 3", "Example b = 2", "Example y = 5")
        break;
      case 'b':
        $("#pic-poly-find-b").show()
        $("#pic-poly-find-a, #pic-poly-find-x, #pic-poly-find-y").hide()
        this.updateInputs("Input a : ", "Input x : ", "Input y : ", " Example b");
        this.updatePlaceholder(" Example b", " Example a = 3", "Example x = 2", "Example y = 5")
        break;
      case 'y':
        $("#pic-poly-find-y").show()
        $("#pic-poly-find-a, #pic-poly-find-x, #pic-poly-find-b").hide()
        this.updateInputs("Input a : ", "Input x : ", "Input b : ", " Example y");
        this.updatePlaceholder(" Example y", " Example a = 3", "Example x = 2", "Example b = 5")
        break;
    }
  }
  changePoly() {
    const choice = document.getElementById("list-poly").value;
    $("#output, #input-a, #input-b, #input-c, #formula, #submit").show()
    $("#result").empty();
    if (choice === "Linear") {
      $("#pic-poly-find-a, #select_poly").show()
      $("#pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y, #pic-poly-qua, #pic-pytha-find-a, #pic-pytha-find-b, #pic-pytha-find-c").hide()
      $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10").hide()
      document.getElementById("for").placeholder = " Example ax+b=0";
    } else if (choice === "Quadratic") {
      $("#pic-poly-qua").show()
      $("#select_poly, #select_name, #pic-poly-find-a, #pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y, #picture-3").hide()
      // this.updateInputs("Input a :", "Input b :", "Input c :", " Example ax^2+bx+c=0")
      document.getElementById("input-de-1").innerHTML = "<b>Input a :</b>";
      document.getElementById("input-de-2").innerHTML = "<b>Input b :</b>";
      document.getElementById("input-de-3").innerHTML = "<b>Input c :</b>";
      document.getElementById("for").placeholder = " Example ax^2+bx+c=0";
    }
  }
}
class Selector_pytha extends Selector {
  constructor() {
    super();
  }
  selectPytha() {
    const select_pytha = $('input[name="pytha"]:checked').val();
    $("#output, #input-a, #input-b, #formula, #submit, #select_pytha").show();
    $("#list, #list-poly, #input-c, #list-loga, #click-1, #click-2, #click-3, #select_poly").hide();
    $('#for').attr('placeholder', ' Example a^2+b^2=c^2');
    $("#result").empty();
    switch (select_pytha) {
      case 'a':
        $("#pic-pytha-find-a").show()
        $("#pic-pytha-find-b, #pic-pytha-find-c").hide()
        this.updateInputs("Input b : ", "Input c : ", null, null)
        this.updatePlaceholder("Example a", "Example b=2", "Example c=4", "Example y = 5")
        break;
      case 'b':
        $("#pic-pytha-find-b").show()
        $("#pic-pytha-find-a, #pic-pytha-find-c").hide()
        this.updateInputs("Input a : ", "Input c : ", null, null)
        this.updatePlaceholder("Example b", "Example a=2", "Example c=4", "Example y = 5")
        break;
      case 'c':
        $("#pic-pytha-find-c").show()
        $("#pic-pytha-find-a, #pic-pytha-find-b").hide()
        this.updateInputs("Input a : ", "Input b : ", null, null)
        this.updatePlaceholder("Example c", "Example a=2", "Example b=4", "Example y = 5")
        break;
    }
  }
}
class Selector_loga extends Selector {
  constructor() {
    super();
  }
  changeLoga() {
    var choice = $("#list-loga").val();
    $("#output, #input-a, #input-b, #submit").show();
    $("#result").empty();
    switch (choice) {
      case "General Logarithm":
        $("#pic-loga-gene").show()
        $("#pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10").hide()
        this.updateInputs(" Input Base : ", " Input Number : ", null, null);
        break;
      case "Logarithm of Product":
        $("#pic-loga-pro").show()
        $("#pic-loga-gene, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10").hide()
        break;
      case "Logarithm of Division":
        $("#pic-loga-divi").show()
        $("#pic-loga-gene, #pic-loga-pro, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10").hide()
        break;
      case "Logarithm of Power":
        $("#pic-loga-power").show()
        $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10").hide()
        break;
      case "Logarithm of Square Root":
        $("#pic-loga-squ").show()
        $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-natural, #pic-loga-base10").hide()
        break;
      case "Natural Logarithm":
        $("#pic-loga-natural").show()
        $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-base10").hide()
        break;
      case "Base 10 Logarithm":
        $("#pic-loga-base10").show()
        $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural").hide()
        $("#input-a").hide();
        this.updateInputs(null, " Input Number : ", null, null);
        break;
    }
  }
}

// Usage
const S_poly = new Selector_poly(),
  S_pytha = new Selector_pytha(),
  S_loga = new Selector_loga();

$(document).ready(function () {
  $("#output, #input-a, #input-b, #input-c, #list, #formula, #submit, #pic-poly-find-a, #pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y, #pic-poly-qua, #pic-pytha-find-a, #pic-pytha-find-b, #pic-pytha-find-c, #select_poly, #select_pytha, #select_name").hide()
  $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10").hide()
  $("#Polynomial").click(function () {
    $("#result").empty();
    document.getElementById("Function").innerHTML = "Function Polynomial";
    document.getElementById("list-name").innerHTML = "Type Polynomial :"
    $("#list, #list-poly, #output, #input-a, #input-b, #input-c, #formula, #submit, #pic-poly-find-a, #select_poly, #select_name").show()
    $("#list-loga, #click-1, #click-2, #click-3, #pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y, #pic-poly-qua, #pic-pytha-find-a, #pic-pytha-find-b, #pic-pytha-find-c, #select_pytha, #comment").hide()
    $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10").hide()
    document.getElementById("input-de-1").innerHTML = "<b>Input x : </b>"
    document.getElementById("input-de-2").innerHTML = "<b>Input b : </b>"
    document.getElementById("input-de-3").innerHTML = "<b>Input y : </b>"
    // document.getElementById("out").oninput = getvalue();
    // document.getElementById("input-de-1").oninput = getvalue();
    // document.getElementById("input-de-2").oninput = getvalue();
    // document.getElementById("input-de-3").oninput = getvalue();
    document.getElementById("for").placeholder = " Example y=ax+b";
    document.getElementById("select_poly").onclick = function () { S_poly.selectPoly() };
    document.getElementById("list-poly").onclick = function () { S_poly.changePoly() }
    document.getElementById("submit").onclick = function () { ListPoly.ListPoly() };
  });
  $("#Pythagorean").click(function () {
    $("#result").empty();
    document.getElementById("Function").innerHTML = "Function Pythagorean"
    $("#output, #input-a, #input-b, #formula, #submit, #pic-pytha-find-a, #select_name, #select_pytha").show()
    document.getElementById("input-de-1").innerHTML = "<b>Input b : </b>"
    document.getElementById("input-de-2").innerHTML = "<b>Input c : </b>"
    $("#input-c, #list, #click-1, #click-2, #click-3, #select_poly, #pic-poly-find-a, #pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y, #pic-poly-qua, #pic-pytha-find-b, #pic-pytha-find-c, #comment").hide()
    $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10").hide()
    document.getElementById("for").placeholder = " Example a^2+b^2=c^2";
    document.getElementById("select_pytha").onclick = function () { S_pytha.selectPytha() }
    document.getElementById("submit").onclick = function () { ListPytha.ListPytha() }
  });
  $("#Logarithm").click(function () {
    $("#result").empty();
    document.getElementById("Function").innerHTML = "Function Logarithm"
    document.getElementById("list-name").innerHTML = "Type Logarithm :"
    $("#list, #list-loga, #output, #input-a, #input-b, #submit").show();
    $("#list-poly, #input-c, #click-1, #click-2, #click-3, #select_poly, #select_pytha, #select_name, #pic-poly-find-a, #pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y, #pic-poly-qua, #pic-pytha-find-a, #pic-pytha-find-b, #pic-pytha-find-c, #formula, #comment").hide();
    $("#pic-loga-gene").show()
    $("#pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10").hide()
    document.getElementById("input-de-1").innerHTML = "<b>Input Base : </b>";
    document.getElementById("input-de-2").innerHTML = "<b>Input Number : </b>";
    document.getElementById("list-loga").onclick = function () { S_loga.changeLoga() }
    document.getElementById("submit").onclick = function () { ListLoga.ListLoga() }
  })
});

class Functions {
  constructor() {
    this.o = document.getElementById('out');
    this.a = document.getElementById('input-define-a');
    this.b = document.getElementById('input-define-b');
    this.c = document.getElementById('input-define-c');
    this.for = document.getElementById('for');
  }
  replacedspace(input) {
    var space = input.split(" "),
      replacedspace = space.map(word => word.replace(",", " "));
    return replacedspace.join("")
  }
  check_input(str) {
    const matches = str.match(/-?\d+(\.\d+)?/);
    if (matches) {
      return parseFloat(matches[0]);
    } else { return null; }
  }
  alert(status, text) {
    if (status === "success") {
      const success = document.getElementById('alert-success'),
        noti = new bootstrap.Toast(success);
      document.getElementById('fail').innerHTML = text;
      noti.show();
    } else if (status === "fail") {
      const fail = document.getElementById('alert-fail'),
        noti = new bootstrap.Toast(fail);
      document.getElementById('fail').innerHTML = text;
      noti.show();
    }
  }
  SubString(input) {
    return input.substring(input.indexOf("=") + 1, input.length);
  }
}

class Polynomial extends Functions {
  constructor() {
    super();
  }
  // Updateformula(){
  //   let value_o = document.getElementById('out').value,
  //   value_a = document.getElementById('input-define-a').value,
  //   value_b = document.getElementById('input-define-b').value,
  //   value_c = document.getElementById('input-define-c').value;
  //   if (value_o != null ){
  //     let o = value_o[0];
  //     if(value_a != null){
  //         let a = value_a[0];
  //         if(value_b != null){
  //             let b = value_b[0];
  //             if(value_c != null){
  //               let c = value_c[0];
  //               document.getElementById('for').value = c + "=" + o + "" + a + "+" + b;
  //             }
  //         }
  //     }else{
  //     }
  // }else{
  //     txt = 'first value not define'
  //     let x = document.getElementById('result').value = txt;
  //     if (txt_2 != null){
  //         let y = document.getElementById('result').value = txt_2[0];
  //     }else{

  //     }
  // }
  // }
  ListPoly() {
    const choice = document.getElementById("list-poly").value,
      select_poly = document.querySelector('input[name="poly"]:checked').value;
    if (choice === "Linear") {
      switch (select_poly) {
        case 'a':
          if (this.o.value.length < 2 && this.o.value.length > 0 && isNaN(this.o.value)) {
            var out_a = this.o.value[0], input_x = this.a.value[0], input_b = this.b.value[0], input_y = this.c.value[0];
            if (isNaN(this.a.value) && isNaN(this.b.value) && isNaN(this.c.value)) {
              const in_x = this.a.value + "=", in_b = this.b.value + "=", in_y = this.c.value + "=",
                new_a = this.replacedspace(this.a.value), new_b = this.replacedspace(this.b.value), new_c = this.replacedspace(this.c.value),
                value_x = this.SubString(new_a), value_b = this.SubString(new_b), value_y = this.SubString(new_c),
                new_value_x = this.check_input(value_x), new_value_b = this.check_input(value_b), new_value_y = this.check_input(value_y);
              if (in_x === this.a.value + "=" && in_b === this.b.value + "=" && in_y === this.c.value + "=") {
                if (typeof new_value_x === "number" && typeof new_value_b === "number" && typeof new_value_y == "number") {
                  let for_poly = this.replacedspace(this.for.value), // ax+b=y || y=ax+b
                    // for_in = out_a + input_x + "+" + input_b + "=" + input_y,// ax+b=y
                    for_be = input_y + "=" + out_a + input_x + "+" + input_b; // y=ax+b
                  input_x = new_value_x, input_b = new_value_b, input_y = new_value_y;
                  let result = (input_y - input_b) / input_x; // (y-b)/x
                  // if (for_poly === for_in) {
                  //   this.alert('success', null);
                  //   document.getElementById('result').innerHTML = for_in + " = (" + input_y + "-" + input_b + ") / " + input_x
                  //     + "<br>" + out_a + " = " + result;
                  // } 
                  if (for_poly === for_be) {
                    this.alert('success', null);
                    document.getElementById('result').innerHTML = for_be + " = (" + input_y + "-" + input_b + ") / " + input_x
                      + "<br>" + out_a + " = " + result;
                  } else { this.alert('fail', 'Failed because formula is null or formula is not correct') }
                } else { this.alert('fail', 'Failed because define value in variable is not correct') }
              } else { this.alert('fail', 'Failed because define variable is related') }
            } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
          } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
          break;
        case 'x':
          if (this.o.value.length < 2 && this.o.value.length > 0) {
            var out_x = this.o.value[0], input_a = this.a.value[0], input_b = this.b.value[0], input_y = this.c.value[0];
            if (isNaN(this.a.value) && isNaN(this.b.value) && isNaN(this.c.value)) {
              const in_a = this.a.value + "=", in_b = this.b.value + "=", in_y = this.c.value + "=",
                new_a = this.replacedspace(this.a.value), new_b = this.replacedspace(this.b.value), new_c = this.replacedspace(this.c.value),
                value_a = this.SubString(new_a), value_b = this.SubString(new_b), value_y = this.SubString(new_c),
                new_value_a = this.check_input(value_a), new_value_b = this.check_input(value_b), new_value_y = this.check_input(value_y);
              if (in_a === this.a.value + "=" && in_b === this.b.value + "=" && in_y === this.c.value + "=") {
                if (typeof new_value_a === "number" && typeof new_value_b === "number" && typeof new_value_y == "number") {
                  let for_poly = this.replacedspace(this.for.value), // ax+b=y || y=ax+b
                    // for_in = input_a + out_x + "+" + input_b + "=" + input_y, // ax+b=y
                    for_be = input_y + "=" + input_a + out_x + "+" + input_b;
                  input_a = new_value_a, input_b = new_value_b, input_y = new_value_y;
                  let result = (input_y - input_b) / input_a; // (y-b)/x
                  // if (for_poly === for_in) {
                  //   this.alert('success', null);
                  //   document.getElementById('result').innerHTML = for_in + " = (" + input_y + "-" + input_b + ") / " + input_a
                  //     + "<br>" + out_x + " = " + result;
                  // } 
                  if (for_poly === for_be) {
                    this.alert('success', null);
                    document.getElementById('result').innerHTML = for_be + " = (" + input_y + "-" + input_b + ") / " + input_a
                      + "<br>" + out_x + " = " + result;
                  } else { this.alert('fail', 'Failed because formula is null or formula is not correct') }
                } else { this.alert('fail', 'Failed because define value in variable is not correct') }
              } else { this.alert('fail', 'Failed because define variable is related') }
            } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
          } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
          break;
        case 'b':
          if (this.o.value.length < 2 && this.o.value.length > 0) {
            var out_b = this.o.value[0], input_a = this.a.value[0], input_x = this.b.value[0], input_y = this.c.value[0];
            if (isNaN(this.a.value) && isNaN(this.b.value) && isNaN(this.c.value)) {
              const in_a = this.a.value + "=", in_x = this.b.value + "=", in_y = this.c.value + "=",
                new_a = this.replacedspace(this.a.value), new_b = this.replacedspace(this.b.value), new_c = this.replacedspace(this.c.value),
                value_a = this.SubString(new_a), value_b = this.SubString(new_b), value_y = this.SubString(new_c),
                new_value_a = this.check_input(value_a), new_value_x = this.check_input(value_b), new_value_y = this.check_input(value_y);
              if (in_a === this.a.value + "=" && in_x === this.b.value + "=" && in_y === this.c.value + "=") {
                if (typeof new_value_a === "number" && typeof new_value_x === "number" && typeof new_value_y == "number") {
                  let for_poly = this.replacedspace(this.for.value), // ax+b=y || y=ax+b
                    // for_in = input_a + input_x + "+" + out_b + "=" + input_y, // ax+b=y
                    for_be = input_y + "=" + input_a + input_x + "+" + out_b; // y=ax+b
                  input_a = new_value_a, input_x = new_value_x, input_y = new_value_y;
                  let result = input_y / (input_a * input_x); // b/ax
                  // if (for_poly === for_in) {
                  //   this.alert('success', null);
                  //   document.getElementById('result').innerHTML = for_in + " = " + input_y + " / " + input_a + " * " + input_x
                  //     + "<br>" + out_b + " = " + result;
                  // }
                   if (for_poly === for_be) {
                    this.alert('success', null);
                    document.getElementById('result').innerHTML = for_in + " = " + input_y + " / " + input_a + " * " + input_x
                      + "<br>" + out_b + " = " + result;
                  } else { this.alert('fail', 'Failed because formula is null or formula is not correct') }
                } else { this.alert('fail', 'Failed because define value in variable is not correct') }
              } else { this.alert('fail', 'Failed because define variable is related') }
            } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
          } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
          break;
        case 'y':
          if (this.o.value.length < 2 && this.o.value.length > 0) {
            var out_y = this.o.value[0], input_a = this.a.value[0], input_x = this.b.value[0], input_b = this.c.value[0];
            if (isNaN(this.a.value) && isNaN(this.b.value) && isNaN(this.c.value)) {
              const in_a = this.a.value + "=", in_x = this.b.value + "=", in_b = this.c.value + "=",
                new_a = this.replacedspace(this.a.value), new_b = this.replacedspace(this.b.value), new_c = this.replacedspace(this.c.value),
                value_a = this.SubString(new_a), value_x = this.SubString(new_b), value_b = this.SubString(new_c),
                new_value_a = this.check_input(value_a), new_value_x = this.check_input(value_x), new_value_b = this.check_input(value_b);
              if (in_a === this.a.value + "=" && in_x === this.b.value + "=" && in_b === this.c.value + "=") {
                if (typeof new_value_a === "number" && typeof new_value_x === "number" && typeof new_value_b == "number") {
                  let for_poly = this.replacedspace(this.for.value), // ax+b=y || y=ax+b
                    // for_in = input_a + input_x + "+" + input_b + "=" + out_y, // ax+b=y
                    for_be = out_y + "=" + input_a + input_x + "+" + input_b; // y=ax+b
                  input_a = new_value_a, input_x = new_value_x, input_b = new_value_b;
                  let result = (input_a * input_x) + input_b; // ax+b
                  console.log(for_be)
                  // if (for_poly === for_in) {
                  //   this.alert('success', null);
                  //   document.getElementById('result').innerHTML = for_in + " = " + input_a + " * " + input_x + " + " + input_b
                  //     + "<br>" + out_y + " = " + result;
                  // } 
                  if (for_poly === for_be) {
                    this.alert('success', null);
                    document.getElementById('result').innerHTML = for_be + " = " + input_a + " * " + input_x + " + " + input_b
                      + "<br>" + out_y + " = " + result;
                  } else { this.alert('fail', 'Failed because formula is null or formula is not correct') }
                } else { this.alert('fail', 'Failed because define value in variable is not correct') }
              } else { this.alert('fail', 'Failed because define variable is related') }
            } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
          } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
          break;
      }
    } else if (choice === "Quadratic") { // ต้องปรับ
      if (this.o.value.length < 2 && this.o.value.length > 0) { // Quadratic formula
        var out = this.o.value[0], input_a = this.a.value[0], input_b = this.b.value[0], input_c = this.c.value[0]; // x , a , b , c
        if (isNaN(this.a.value) && isNaN(this.b.value) && isNaN(this.c.value)) {
          const in_a = this.a.value + "=", in_b = this.b.value + "=", in_c = this.c.value + "=",
            new_a = this.replacedspace(this.a.value), new_b = this.replacedspace(this.b.value), new_c = this.replacedspace(this.c.value),
            value_a = this.SubString(new_a), value_b = this.SubString(new_b), value_c = this.SubString(new_c),
            new_value_a = this.check_input(value_a), new_value_b = this.check_input(value_b), new_value_c = this.check_input(value_c);
          if (in_a === this.a.value + "=" && in_b === this.b.value + "=" && in_c === this.c.value + "=") {
            if (typeof new_value_a === "number" && typeof new_value_b === "number" && typeof new_value_c === "number") {
              let for_poly = this.replacedspace(this.for.value),
                for_in = input_a + out + "^2+" + input_b + out + "+" + input_c + "=0";
              if (for_poly === for_in) {
                let result = -input_b + Math.sqrt(Math.pow(input_b, 2) - (4 * input_a * input_c)) / 2 * input_a
                let result2 = -input_b - Math.sqrt(Math.pow(input_b, 2) - (4 * input_a * input_c)) / 2 * input_a
                if (isNaN(result)) {
                  result = "Can't define value";
                  if (isNaN(result2)) result2 = "Can't define value";
                } else if (isNaN(result2)) { result2 = "Can't define value"; }
                this.alert('success', null);
                document.getElementById('result').innerHTML = out + " = " + result + " , " + result2;
              } else { this.alert('fail', 'Failed because formula is null or formula is not correct') }
            } else { this.alert('fail', 'Failed because define value in variable is not correct') }
          } else { this.alert('fail', 'Failed because define variable is related') }
        } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
      } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
    }
    ['out', 'input-define-a', 'input-define-b', 'input-define-c', 'for'].forEach(id => document.getElementById(id).value = '');
  }
}

class Pythagorean extends Functions {
  constructor() {
    super();
  }
  ListPytha() {
    let select_pytha = document.querySelector('input[name="pytha"]:checked').value,
      new_i = this.replacedspace(this.a.value), new_j = this.replacedspace(this.b.value); // ทำให้ค่าชิดกัน
    switch (select_pytha) {
      case 'a':
        if (this.o.value.length < 2 && this.o.value.length > 0 && isNaN(this.o.value)) {
          var out_a = this.o.value[0], b = this.a.value[0], c = this.b.value[0] // a , b , c
          if (isNaN(this.a.value) && isNaN(this.b.value)) {
            const in_b = this.a.value + "=", in_c = this.b.value + "=",
              front_i = this.SubString(new_i), front_j = this.SubString(new_j),
              new_front_i = this.check_input(front_i), new_front_j = this.check_input(front_j); // b c
            if (in_b === this.a.value + "=" && in_c === this.b.value + "=") {
              if (typeof new_front_i === "number" && typeof new_front_j === "number") {
                let for_pytha = this.replacedspace(this.for.value),
                  for_pre = out_a + "^2+" + b + "^2=" + c + "^2",
                  for_after = c + "^2=" + out_a + "^2+" + b + "^2",
                  result = Math.pow(new_front_j, 2) - Math.pow(new_front_i, 2),
                  result_after = Math.sqrt(result);
                if (for_pytha === for_pre) {
                  this.alert('success', null);
                  if (isNaN(result_after)) {
                    result_after = "Can't define value";
                    document.getElementById('result').innerHTML = out_a + "^2 = " + result + " , " + out_a + " = " + result_after;
                  } else {
                    document.getElementById('result').innerHTML = out_a + "^2 = " + result + " , " + out_a + " = " + result_after.toFixed(4);
                  }
                }
                else if (for_pytha === for_after) {
                  this.alert('success', null);
                  if (isNaN(result_after)) {
                    result_after = "Can't define value";
                    document.getElementById('result').innerHTML = out_a + "^2 = " + result + " , " + out_a + " = " + result_after;
                  } else {
                    document.getElementById('result').innerHTML = out_a + "^2 = " + result + " , " + out_a + " = " + result_after.toFixed(4);
                  }
                } else { this.alert('fail', 'Failed because formula is null or formula is not correct') }
              } else { this.alert('fail', 'Failed because define value in variable is not correct') }
            } else { this.alert('fail', 'Failed because define variable is related') }
          } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
        } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
        break;
      case 'b':
        if (this.o.value.length < 2 && this.o.value.length > 0) {
          var out_b = this.o.value[0], a = this.a.value[0], c = this.b.value[0]  // b , a , c
          if (isNaN(this.a.value) && isNaN(this.b.value)) {
            const in_a = this.a.value + "=", in_c = this.b.value + "=",
              front_i = this.SubString(new_i), front_j = this.SubString(new_j),
              new_front_i = this.check_input(front_i), new_front_j = this.check_input(front_j); // a c
            if (in_a === this.a.value + "=" && in_c === this.b.value + "=") {
              if (typeof new_front_i === "number" && typeof new_front_j === "number") {
                let for_pytha = this.replacedspace(this.for.value),
                  for_pre = a + "^2+" + out_b + "^2=" + c + "^2",
                  for_after = c + "^2=" + a + "^2+" + out_b + "^2",
                  result = Math.pow(new_front_j, 2) - Math.pow(new_front_i, 2),
                  result_after = Math.sqrt(result);
                if (for_pytha === for_pre) {
                  this.alert('success', null);
                  if (isNaN(result_after)) {
                    result_after = "Can't define value";
                    document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after;
                  } else {
                    document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after.toFixed(4);
                  }
                }
                else if (for_pytha === for_after) {
                  this.alert('success', null);
                  if (isNaN(result_after)) {
                    result_after = "Can't define value";
                    document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after;
                  } else {
                    document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after.toFixed(4);
                  }
                } else { this.alert('fail', 'Failed because formula is null or formula is not correct') }
              } else { this.alert('fail', 'Failed because define value in variable is not correct') }
            } else { this.alert('fail', 'Failed because define variable is related') }
          } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
        } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
        break;
      case 'c':
        if (this.o.value.length < 2 && this.o.value.length > 0) {
          var out_c = this.o.value[0], a = this.a.value[0], b = this.b.value[0]  // c , a , b
          if (isNaN(this.a.value) && isNaN(this.b.value)) {
            const in_a = this.a.value + "=", in_b = this.b.value + "=",
              front_i = this.SubString(new_i), front_j = this.SubString(new_j),
              new_front_i = this.check_input(front_i), new_front_j = this.check_input(front_j); // a b
            if (in_a === this.a.value + "=" && in_b === this.b.value + "=") {
              if (typeof new_front_i === "number" && typeof new_front_j === "number") {
                let for_pytha = this.replacedspace(this.for.value),
                  for_pre = a + "^2+" + b + "^2=" + out_c + "^2",
                  // for_after = out_c + "^2=" + a + "^2+" + b + "^2",
                  result = Math.pow(new_front_i, 2) + Math.pow(new_front_j, 2),
                  result_after = Math.sqrt(result);
                if (for_pytha === for_pre) {
                  this.alert('success', null);
                  if (isNaN(result_after)) {
                    result_after = "Can't define value";
                    document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after;
                  } else {
                    document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after.toFixed(4);
                  }
                }
                // else if (for_pytha === for_after) {
                //   this.alert('success', null);
                //   if (isNaN(result_after)) {
                //     result_after = "Can't define value";
                //     document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after;
                //   } else {
                //     document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after.toFixed(4);
                //   }
                // } else { this.alert('fail', 'Failed because formula is null or formula is not correct') }
              } else { this.alert('fail', 'Failed because define value in variable is not correct') }
            } else { this.alert('fail', 'Failed because define variable is related') }
          } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
        } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
        break;
    }
    ['out', 'input-define-a', 'input-define-b', 'for'].forEach(id => document.getElementById(id).value = '');
  }
}
class Logarithm extends Functions {
  constructor() {
    super();
  }
  ListLoga() {
    let choice = document.getElementById("list-loga").value,
      new_b = this.replacedspace(this.a.value), new_n = this.replacedspace(this.b.value); // ทำให้ค่าชิดกัน
    if (choice === "General Logarithm") {
      if (this.o.value.length < 2 && this.o.value.length > 0 && isNaN(this.o.value)) {
        var out = this.o.value[0], base = this.a.value[0], num = this.b.value[0];
        if (isNaN(base) && isNaN(num)) {
          const in_b = base + "=", in_num = num + "=",
            last_in_b = this.SubString(new_b), front_i2 = this.SubString(new_n),
            base_number = this.check_input(last_in_b),
            number = this.check_input(front_i2);
          if (in_b === base + "=" && in_num === num + "=") {
            if (typeof base_number === "number" && typeof number === "number") {
              let result = Math.log(number) / Math.log(base_number)
              this.alert('success', null);
              if (isNaN(result)) {
                result = "Can't define value";
                document.getElementById('result').innerHTML = "log<sub>" + base + "</sub>(" + num + ") = log<sub>" + base_number + "</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
              } else {
                document.getElementById('result').innerHTML = "log<sub>" + base + "</sub>(" + num + ") = log<sub>" + base_number + "</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
              }
            } else { this.alert('fail', 'Failed because define value in variable is not correct') }
          } else { this.alert('fail', 'Failed because define variable is related') }
        } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
      } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
    } else if (choice === "Logarithm of Product") {
      if (this.o.value.length < 2 && this.o.value.length > 0 && isNaN(this.o.value)) {
        var out = this.o.value[0], num = this.b.value[0];
        if (isNaN(num)) {
          const in_num = this.a.value + "=",
            front_i2 = this.SubString(new_n),
            number = this.check_input(front_i2);
          if (in_num === this.a.value + "=") {
            if (typeof number === "number") {
              let result = Math.log(number * number);
              this.alert('success', null);
              if (isNaN(result)) {
                result = "Can't define value";
                document.getElementById('result').innerHTML = "log(" + num + "*" + num + ") = log(" + number + "*" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
              } else {
                document.getElementById('result').innerHTML = "log(" + num + "*" + num + ") = log(" + number + "*" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
              }
            } else { this.alert('fail', 'Failed because define value in variable is not correct') }
          } else { this.alert('fail', 'Failed because define variable is related') }
        } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
      } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
    } else if (choice === "Logarithm of Division") {
      if (this.o.value.length < 2 && this.o.value.length > 0 && isNaN(this.o.value)) {
        var out = this.o.value[0], num = this.b.value[0];
        if (isNaN(num)) {
          const in_num = num + "=",
            front_i2 = this.SubString(new_n),
            number = this.check_input(front_i2);
          if (in_num === num + "=") {
            if (typeof number === "number") {
              let result = Math.log(number / number);
              this.alert('success', null);
              if (isNaN(result)) {
                result = "Can't define value";
                document.getElementById('result').innerHTML = "log(" + num + "/" + num + ") = log(" + number + "/" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
              } else {
                document.getElementById('result').innerHTML = "log(" + num + "/" + num + ") = log(" + number + "/" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
              }
            } else { this.alert('fail', 'Failed because define value in variable is not correct') }
          } else { this.alert('fail', 'Failed because define variable is related') }
        } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
      } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
    } else if (choice === "Logarithm of Power") {
      if (this.o.value.length < 2 && this.o.value.length > 0 && isNaN(this.o.value)) {
        var out = this.o.value[0], num = this.b.value[0];
        if (isNaN(num)) {
          const in_num = num + "=",
            front_i2 = this.SubString(new_n),
            number = this.check_input(front_i2);
          if (in_num === num + "=") {
            if (typeof number === "number") {
              let result = number * Math.log(number);
              this.alert('success', null);
              if (isNaN(result)) {
                result = "Can't define value";
                document.getElementById('result').innerHTML = "log(" + num + "^" + num + ") = log(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
              } else {
                document.getElementById('result').innerHTML = "log(" + num + "^" + num + ") = log(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
              }
            } else { this.alert('fail', 'Failed because define value in variable is not correct') }
          } else { this.alert('fail', 'Failed because define variable is related') }
        } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
      } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
    } else if (choice === "Logarithm of Square Root") {
      if (this.o.value.length < 2 && this.o.value.length > 0 && isNaN(this.o.value)) {
        var out = this.o.value[0], num = this.b.value[0];
        if (isNaN(num)) {
          const in_num = num + "=",
            front_i2 = this.SubString(new_n),
            number = this.check_input(front_i2);
          if (in_num === num + "=") {
            if (typeof number === "number") {
              let result = 0.5 * Math.log(number);
              this.alert('success', null);
              if (isNaN(result)) {
                result = "Can't define value";
                document.getElementById('result').innerHTML = "log(√" + num + ") = log(√" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
              } else {
                document.getElementById('result').innerHTML = "log(√" + num + ") = log(√" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
              }
            } else { this.alert('fail', 'Failed because define value in variable is not correct') }
          } else { this.alert('fail', 'Failed because define variable is related') }
        } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
      } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
    } else if (choice === "Natural Logarithm") {
      if (this.o.value.length < 2 && this.o.value.length > 0 && isNaN(this.o.value)) {
        var out = this.o.value[0], num = this.b.value[0];
        if (isNaN(num)) {
          const in_num = num + "=",
            front_i2 = this.SubString(new_n),
            number = this.check_input(front_i2);
          if (in_num === num + "=") {
            if (typeof number === "number") {
              let result = Math.log(number);
              this.alert('success', null);
              if (isNaN(result)) {
                result = "Can't define value";
                document.getElementById('result').innerHTML = "ln(" + num + "^" + num + ") = ln(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
              } else {
                document.getElementById('result').innerHTML = "ln(" + num + "^" + num + ") = ln(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
              }
            } else { this.alert('fail', 'Failed because define value in variable is not correct') }
          } else { this.alert('fail', 'Failed because define variable is related') }
        } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
      } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
    } else if (choice === "Base 10 Logarithm") {
      if (this.o.value.length < 2 && this.o.value.length > 0 && isNaN(this.o.value)) {
        var out = this.o.value[0], num = this.b.value[0];
        if (isNaN(num)) {
          const in_num = num + "=",
            front_i2 = this.SubString(new_n),
            number = this.check_input(front_i2);
          if (in_num === num + "=") {
            if (typeof number === "number") {
              let result = Math.log10(number);
              this.alert('success', null);
              if (isNaN(result)) {
                result = "Can't define value";
                document.getElementById('result').innerHTML = "log<sub>10</sub>(" + num + ") = log<sub>10</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
              } else {
                document.getElementById('result').innerHTML = "log<sub>10</sub>(" + num + ") = log<sub>10</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
              }
            } else { this.alert('fail', 'Failed because define value in variable is not correct') }
          } else { this.alert('fail', 'Failed because define variable is related') }
        } else { this.alert('fail', 'Failed because variable input isn\'t charecter or null') }
      } else { this.alert('fail', 'Failed because variable output than 2 charecter or null') }
    }
    ['out', 'input-define-a', 'input-define-b'].forEach(id => document.getElementById(id).value = '');
  }
}

function getvalue() {
  let value_o = document.getElementById('out').value,
    value_a = document.getElementById('input-define-a').value,
    value_b = document.getElementById('input-define-b').value,
    value_c = document.getElementById('input-define-c').value;
  const choice = document.getElementById("list-poly").value,
      select_poly = document.querySelector('input[name="poly"]:checked').value,
      select_pytha = document.querySelector('input[name="pytha"]:checked').value;
  if (choice === 'Linear'){
    switch (select_poly) {
      case 'a':
      if (value_o != null) {
        let o = value_o[0];
        if (value_a != null) {
          let a = value_a[0];
          if (value_b != null) {
            let b = value_b[0];
            if (value_c != null) {
              let c = value_c[0];
              document.getElementById('for').value = c + "=" + o + "" + a + "+" + b;
            }
          }
        } else {
        }
      }
      break;
      case 'x':
      if (value_o != null) {
        let o = value_o[0];
        if (value_a != null) {
          let a = value_a[0];
          if (value_b != null) {
            let b = value_b[0];
            if (value_c != null) {
              let c = value_c[0];
              document.getElementById('for').value = c + "=" + a + "" + o + "+" + b;
            }
          }
        } else { }
      }
      break;
      case 'b':
      if (value_o != null) {
        let o = value_o[0];
        if (value_a != null) {
          let a = value_a[0];
          if (value_b != null) {
            let b = value_b[0];
            if (value_c != null) {
              let c = value_c[0];
              document.getElementById('for').value = c + "=" + a + "" + b + "+" + o;
            }
          }
        } else { }
      }
      break;
    case 'y':
      if (value_o != null) {
        let o = value_o[0];
        if (value_a != null) {
          let a = value_a[0];
          if (value_b != null) {
            let b = value_b[0];
            if (value_c != null) {
              let c = value_c[0];
              document.getElementById('for').value = o + "=" + a + "" + b + "+" + c;
            }
          }
        } else { }
      }
      break;
    }
  }else if (choice === 'Quadratic'){
    if (value_o != null) {
      let o = value_o[0];
      if (value_a != null) {
        let a = value_a[0];
        if (value_b != null) {
          let b = value_b[0];
          if (value_c != null) {
            let c = value_c[0];
            document.getElementById('for').value = a + o + "^2+" + b + o + "+" + c + "=0";
          }
        }
      } else { }
    }
  }
    switch (select_pytha) {
      case 'a':
        if (value_o != null) {
          let o = value_o[0];
          if (value_a != null) {
            let a = value_a[0];
            if (value_b != null) {
              let b = value_b[0];
                document.getElementById('for').value = o + "^2+" + a + "^2=" + b + "^2";
            }
          } else { }
        }
        break;
      case 'b':
        if (value_o != null) {
          let o = value_o[0];
          if (value_a != null) {
            let a = value_a[0];
            if (value_b != null) {
              let b = value_b[0];
                document.getElementById('for').value = a + "^2+" + o + "^2=" + b + "^2";
            }
          } else { }
        }
        break;
      case 'c':
        if (value_o != null) {
          let o = value_o[0];
          if (value_a != null) {
            let a = value_a[0];
            if (value_b != null) {
              let b = value_b[0];
                document.getElementById('for').value = a + "^2+" + b + "^2=" + o + "^2";
            }
          } else { }
        }
        break;
    }
  }

  const ListPoly = new Polynomial(),
  ListPytha = new Pythagorean(),
  ListLoga = new Logarithm();
// function Test() {
//   alert('Test');
// }
// function Polynomial() {
//   let choice = document.getElementById("list-poly").value,
//     select_poly = document.querySelector('input[name="poly"]:checked').value,
//     o = document.getElementById('out').value,
//     a = document.getElementById('input-define-a').value,
//     b = document.getElementById('input-define-b').value,
//     c = document.getElementById('input-define-c').value,
//     for_pytha = document.getElementById('for').value,
//     new_a = replacedspace(a), new_b = replacedspace(b), new_c = replacedspace(c); // ทำให้ค่าชิดกัน
//   if (choice === "Linear") {
//     switch (select_poly) {
//       case 'a':
//         if (o.length < 2 && o.length > 0 && isNaN(o)) {
//           var out_a = o[0], input_x = a[0], input_b = b[0], input_y = c[0];
//           if (isNaN(a) && isNaN(b) && isNaN(c)) {
//             const in_x = a + "=", in_b = b + "=", in_y = c + "=",
//               value_x = new_a.substring(new_a.indexOf("=") + 1, new_a.length),
//               value_b = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
//               value_y = new_c.substring(new_c.indexOf("=") + 1, new_c.length),
//               new_value_x = check_input(value_x), new_value_b = check_input(value_b), new_value_y = check_input(value_y);
//             if (in_x === a + "=" && in_b === b + "=" && in_y === c + "=") {
//               if (typeof new_value_x === "number" && typeof new_value_b === "number" && typeof new_value_y == "number") {
//                 let for_poly = replacedspace(for_pytha), // ax+b=y
//                   for_in = out_a + input_x + "+" + input_b + "=" + input_y; // ax+b=y
//                 if (for_poly === for_in) {
//                   input_x = new_value_x, input_b = new_value_b, input_y = new_value_y;
//                   let result = (input_y - input_b) / input_x; // (y-b)/x
//                   alert('success', null);
//                   document.getElementById('result').innerHTML = for_in + " = (" + input_y + "-" + input_b + ") / " + input_x
//                     + "<br>" + out_a + " = " + result;
//                 } else {
//                   alert('fail', 'Failed because formula is null or formula is not correct')
//                 }
//               } else {
//                 alert('fail', 'Failed because define value in variable is not correct')
//               }
//             } else {
//               alert('fail', 'Failed because define variable is related')
//             }
//           } else {
//             alert('fail', 'Failed because variable input isn\'t charecter or null')
//           }
//         } else {
//           alert('fail', 'Failed because variable output than 2 charecter or null')
//         }
//         break;
//       case 'x':
//         if (o.length < 2 && o.length > 0) {
//           var out_x = o[0], input_a = a[0], input_b = b[0], input_y = c[0];
//           if (isNaN(a) && isNaN(b) && isNaN(c)) {
//             const in_a = a + "=", in_b = b + "=", in_y = c + "=",
//               value_a = new_a.substring(new_a.indexOf("=") + 1, new_a.length),
//               value_b = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
//               value_y = new_c.substring(new_c.indexOf("=") + 1, new_c.length),
//               new_value_a = check_input(value_a), new_value_b = check_input(value_b), new_value_y = check_input(value_y);
//             if (in_a === a + "=" && in_b === b + "=" && in_y === c + "=") {
//               if (typeof new_value_a === "number" && typeof new_value_b === "number" && typeof new_value_y == "number") {
//                 let for_poly = replacedspace(for_pytha), // ax+b=y
//                   for_in = input_a + out_x + "+" + input_b + "=" + input_y; // ax+b=y
//                 if (for_poly === for_in) {
//                   input_a = new_value_a, input_b = new_value_b, input_y = new_value_y;
//                   let result = (input_y - input_b) / input_a; // (y-b)/x
//                   alert('success', null);
//                   document.getElementById('result').innerHTML = for_in + " = (" + input_y + "-" + input_b + ") / " + input_a
//                     + "<br>" + out_x + " = " + result;
//                 } else {
//                   alert('fail', 'Failed because formula is null or formula is not correct')
//                 }
//               } else {
//                 alert('fail', 'Failed because define value in variable is not correct')
//               }
//             } else {
//               alert('fail', 'Failed because define variable is related')
//             }
//           } else {
//             alert('fail', 'Failed because variable input isn\'t charecter or null')
//           }
//         } else {
//           alert('fail', 'Failed because variable output than 2 charecter or null')
//         }
//         break;
//       case 'b':
//         if (o.length < 2 && o.length > 0) {
//           var out_b = o[0], input_a = a[0], input_x = b[0], input_y = c[0];
//           if (isNaN(a) && isNaN(b) && isNaN(c)) {
//             const in_a = a + "=", in_x = b + "=", in_y = c + "=",
//               value_a = new_a.substring(new_a.indexOf("=") + 1, new_a.length),
//               value_b = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
//               value_y = new_c.substring(new_c.indexOf("=") + 1, new_c.length),
//               new_value_a = check_input(value_a), new_value_x = check_input(value_b), new_value_y = check_input(value_y);
//             if (in_a === a + "=" && in_x === b + "=" && in_y === c + "=") {
//               if (typeof new_value_a === "number" && typeof new_value_x === "number" && typeof new_value_y == "number") {
//                 let for_poly = replacedspace(for_pytha), // ax+b=y
//                   for_in = input_a + input_x + "+" + out_b + "=" + input_y; // ax+b=y
//                 if (for_poly === for_in) {
//                   input_a = new_value_a, input_x = new_value_x, input_y = new_value_y;
//                   let result = input_y / (input_a * input_x); // b/ax
//                   alert('success', null);
//                   document.getElementById('result').innerHTML = for_in + " = " + input_y + " / " + input_a + " * " + input_x
//                     + "<br>" + out_b + " = " + result;
//                 } else {
//                   alert('fail', 'Failed because formula is null or formula is not correct')
//                 }
//               } else {
//                 alert('fail', 'Failed because define value in variable is not correct')
//               }
//             } else {
//               alert('fail', 'Failed because define variable is related')
//             }
//           } else {
//             alert('fail', 'Failed because variable input isn\'t charecter or null')
//           }
//         } else {
//           alert('fail', 'Failed because variable output than 2 charecter or null')
//         }
//         break;
//       case 'y':
//         if (o.length < 2 && o.length > 0) {
//           var out_y = o[0], input_a = a[0], input_x = b[0], input_b = c[0];
//           if (isNaN(a) && isNaN(b) && isNaN(c)) {
//             const in_a = a + "=",
//               in_x = b + "=",
//               in_b = c + "=",
//               value_a = new_a.substring(new_a.indexOf("=") + 1, new_a.length),
//               value_x = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
//               value_b = new_c.substring(new_c.indexOf("=") + 1, new_c.length),
//               new_value_a = check_input(value_a), new_value_x = check_input(value_x), new_value_b = check_input(value_b);
//             if (in_a === a + "=" && in_x === b + "=" && in_b === c + "=") {
//               if (typeof new_value_a === "number" && typeof new_value_x === "number" && typeof new_value_b == "number") {
//                 let for_poly = replacedspace(for_pytha), // ax+b=y
//                   for_in = input_a + input_x + "+" + input_b + "=" + out_y; // ax+b=y
//                 if (for_poly === for_in) {
//                   input_a = new_value_a, input_x = new_value_x, input_b = new_value_b;
//                   let result = (input_a * input_x) + input_b; // b/ax
//                   alert('success', null);
//                   document.getElementById('result').innerHTML = for_in + " = " + input_a + " * " + input_x + " + " + input_b
//                     + "<br>" + out_y + " = " + result;
//                 } else {
//                   alert('fail', 'Failed because formula is null or formula is not correct')
//                 }
//               } else {
//                 alert('fail', 'Failed because define value in variable is not correct')
//               }
//             } else {
//               alert('fail', 'Failed because define variable is related')
//             }
//           } else {
//             alert('fail', 'Failed because variable input isn\'t charecter or null')
//           }
//         } else {
//           alert('fail', 'Failed because variable output than 2 charecter or null')
//         }
//         break;
//     }
//   } else if (choice === "Quadratic") { // ต้องปรับ
//     if (o.length < 2 && o.length > 0) { // Quadratic formula
//       var out = o[0], input_a = a[0], input_b = b[0], input_c = c[0]; // x , a , b , c
//       if (isNaN(a) && isNaN(b) && isNaN(c)) {
//         const in_a = a + "=",
//           in_b = b + "=",
//           in_c = c + "=",
//           value_a = new_a.substring(new_a.indexOf("=") + 1, new_a.length),
//           value_b = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
//           value_c = new_c.substring(new_c.indexOf("=") + 1, new_c.length),
//           new_value_a = check_input(value_a), new_value_b = check_input(value_b), new_value_c = check_input(value_c);
//         if (in_a === a + "=" && in_b === b + "=" && in_c === c + "=") {
//           if (typeof new_value_a === "number" && typeof new_value_b === "number" && typeof new_value_c === "number") {
//             let for_poly = replacedspace(for_pytha),
//               for_in = input_a + out + "^2+" + input_b + out + "+" + input_c + "=0";
//             if (for_poly === for_in) {
//               let result = -input_b + Math.sqrt(Math.pow(input_b, 2) - (4 * input_a * input_c)) / 2 * input_a
//               let result2 = -input_b - Math.sqrt(Math.pow(input_b, 2) - (4 * input_a * input_c)) / 2 * input_a
//               if (isNaN(result)) {
//                 result = "Can't define value";
//                 if (isNaN(result2)) result2 = "Can't define value";
//               } else if (isNaN(result2)) { result2 = "Can't define value"; }
//               alert('success', null);
//               document.getElementById('result').innerHTML = out + " = " + result + " , " + result2;
//             } else {
//               alert('fail', 'Failed because formula is null or formula is not correct')
//             }
//           } else {
//             alert('fail', 'Failed because define value in variable is not correct')
//           }
//         } else {
//           alert('fail', 'Failed because define variable is related')
//         }
//       } else {
//         alert('fail', 'Failed because variable input isn\'t charecter or null')
//       }
//     } else {
//       alert('fail', 'Failed because variable output than 2 charecter or null')
//     }
//   }
//   ['out', 'input-define-a', 'input-define-b', 'input-define-c', 'for'].forEach(id => document.getElementById(id).value = '');
// }

// function Pythagorean() {
//   let select_pytha = document.querySelector('input[name="pytha"]:checked').value,
//     o = document.getElementById('out').value,
//     i = document.getElementById('input-define-a').value,
//     j = document.getElementById('input-define-b').value,
//     f = document.getElementById('for').value;
//   new_i = replacedspace(i); // ทำให้ค่าชิดกัน
//   new_j = replacedspace(j); // ทำให้ค่าชิดกัน
//   switch (select_pytha) {
//     case 'a':
//       if (o.length < 2 && o.length > 0 && isNaN(o)) {
//         var out_a = o[0], b = i[0], c = j[0] // a , b , c
//         if (isNaN(b) && isNaN(c)) {
//           const in_b = b + "=",
//             in_c = c + "=",
//             front_i = new_i.substring(new_i.indexOf("=") + 1, new_i.length),
//             front_j = new_j.substring(new_j.indexOf("=") + 1, new_j.length),
//             new_front_i = check_input(front_i), // b
//             new_front_j = check_input(front_j); // c
//           if (in_b === b + "=" && in_c === c + "=") {
//             if (typeof new_front_i === "number" && typeof new_front_j === "number") {
//               let for_pytha = replacedspace(f),
//                 for_pre = out_a + "^2+" + b + "^2=" + c + "^2";
//               for_after = c + "^2=" + out_a + "^2+" + b + "^2";
//               let result = Math.pow(new_front_j, 2) - Math.pow(new_front_i, 2);
//               result_after = Math.sqrt(result);
//               if (for_pytha === for_pre) {
//                 alert('success', null);
//                 if (isNaN(result_after)) {
//                   result_after = "Can't define value";
//                   document.getElementById('result').innerHTML = out_a + "^2 = " + result + " ," + out_a + " = " + result_after;
//                 } else {
//                   document.getElementById('result').innerHTML = out_a + "^2 = " + result + " ," + out_a + " = " + result_after.toFixed(4);
//                 }
//               }
//               else if (for_pytha === for_after) {
//                 alert('success', null);
//                 if (isNaN(result_after)) {
//                   result = "Can't define value";
//                   document.getElementById('result').innerHTML = out_a + "^2 = " + result + "," + out_a + " = " + result_after;
//                 } else {
//                   document.getElementById('result').innerHTML = out_a + "^2 = " + result + "," + out_a + " = " + result_after.toFixed(4);
//                 }
//               } else {
//                 alert('fail', 'Failed because formula is null or formula is not correct')
//               }
//             } else {
//               alert('fail', 'Failed because define value in variable is not correct')
//             }
//           } else {
//             alert('fail', 'Failed because define variable is related')
//           }
//         } else {
//           alert('fail', 'Failed because variable input isn\'t charecter or null')
//         }
//       } else {
//         alert('fail', 'Failed because variable output than 2 charecter or null')
//       }
//       break;
//     case 'b':
//       if (o.length < 2 && o.length > 0) {
//         var out_b = o[0], a = i[0], c = j[0]  // b , a , c
//         if (isNaN(a) && isNaN(c)) {
//           const in_a = a + "=",
//             in_c = c + "=",
//             front_i = new_i.substring(new_i.indexOf("=") + 1, new_i.length),
//             front_j = new_j.substring(new_j.indexOf("=") + 1, new_j.length),
//             new_front_i = check_input(front_i), // a
//             new_front_j = check_input(front_j); // c
//           if (in_a === a + "=" && in_c === c + "=") {
//             if (typeof new_front_i === "number" && typeof new_front_j === "number") {
//               let for_pytha = replacedspace(f),
//                 for_pre = a + "^2+" + out_b + "^2=" + c + "^2";
//               for_after = c + "^2=" + a + "^2+" + out_b + "^2";
//               let result = Math.pow(new_front_j, 2) - Math.pow(new_front_i, 2);
//               result_after = Math.sqrt(result);
//               if (for_pytha === for_pre) {
//                 alert('success', null);
//                 if (isNaN(result_after)) {
//                   result_after = "Can't define value";
//                   document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after;
//                 } else {
//                   document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after.toFixed(4);
//                 }
//               }
//               else if (for_pytha === for_after) {
//                 alert('success', null);
//                 if (isNaN(result_after)) {
//                   result_after = "Can't define value";
//                   document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after;
//                 } else {
//                   document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after.toFixed(4);
//                 }
//               } else {
//                 alert('fail', 'Failed because formula is null or formula is not correct')
//               }
//             } else {
//               alert('fail', 'Failed because define value in variable is not correct')
//             }
//           } else {
//             alert('fail', 'Failed because define variable is related')
//           }
//         } else {
//           alert('fail', 'Failed because variable input isn\'t charecter or null')
//         }
//       } else {
//         alert('fail', 'Failed because variable output than 2 charecter or null')
//       }
//       break;
//     case 'c':
//       if (o.length < 2 && o.length > 0) {
//         var out_c = o[0], a = i[0], b = j[0]  // c , a , b
//         if (isNaN(a) && isNaN(b)) {
//           const in_a = a + "=",
//             in_b = b + "=",
//             front_i = new_i.substring(new_i.indexOf("=") + 1, new_i.length),
//             front_j = new_j.substring(new_j.indexOf("=") + 1, new_j.length),
//             new_front_i = check_input(front_i), // a
//             new_front_j = check_input(front_j); // b
//           if (in_a === a + "=" && in_b === b + "=") {
//             if (typeof new_front_i === "number" && typeof new_front_j === "number") {
//               let for_pytha = replacedspace(f),
//                 for_pre = a + "^2+" + b + "^2=" + out_c + "^2";
//               for_after = out_c + "^2=" + a + "^2+" + b + "^2";
//               let result = Math.pow(new_front_i, 2) + Math.pow(new_front_j, 2);
//               result_after = Math.sqrt(result);
//               if (for_pytha === for_pre) {
//                 alert('success', null);
//                 if (isNaN(result_after)) {
//                   result_after = "Can't define value";
//                   document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after;
//                 } else {
//                   document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after.toFixed(4);
//                 }
//               }
//               else if (for_pytha === for_after) {
//                 alert('success', null);
//                 if (isNaN(result_after)) {
//                   result_after = "Can't define value";
//                   document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after;
//                 } else {
//                   document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after.toFixed(4);
//                 }
//               } else {
//                 alert('fail', 'Failed because formula is null or formula is not correct')
//               }
//             } else {
//               alert('fail', 'Failed because define value in variable is not correct')
//             }
//           } else {
//             alert('fail', 'Failed because define variable is related')
//           }
//         } else {
//           alert('fail', 'Failed because variable input isn\'t charecter or null')
//         }
//       } else {
//         alert('fail', 'Failed because variable output than 2 charecter or null')
//       }
//       break;
//   }
//   ['out', 'input-define-a', 'input-define-b', 'for'].forEach(id => document.getElementById(id).value = '');
// }

// function Logarithm() {
//   let choice = document.getElementById("list-loga").value,
//     o = document.getElementById('out').value,
//     b = document.getElementById('input-define-a').value,
//     n = document.getElementById('input-define-b').value;
//   new_b = replacedspace(b); // ทำให้ค่าชิดกัน
//   new_n = replacedspace(n); // ทำให้ค่าชิดกัน
//   if (choice === "General Logarithm") {
//     if (o.length < 2 && o.length > 0 && isNaN(o)) {
//       var out = o[0], base = new_b[0], num = new_n[0];
//       if (isNaN(base) && isNaN(num)) {
//         const in_b = base + "=",
//           in_num = num + "=",
//           last_in_b = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
//           front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
//           base_number = check_input(last_in_b),
//           number = check_input(front_i2);
//         if (in_b === base + "=" && in_num === num + "=") {
//           if (typeof base_number === "number" && typeof number === "number") {
//             let result = Math.log(number) / Math.log(base_number)
//             alert('success', null);
//             if (isNaN(result)) {
//               result = "Can't define value";
//               document.getElementById('result').innerHTML = "log<sub>" + base + "</sub>(" + num + ") = log<sub>" + base_number + "</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
//             } else {
//               document.getElementById('result').innerHTML = "log<sub>" + base + "</sub>(" + num + ") = log<sub>" + base_number + "</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
//             }
//           } else {
//             alert('fail', 'Failed because define value in variable is not correct')
//           }
//         } else {
//           alert('fail', 'Failed because define variable is related')
//         }
//       } else {
//         alert('fail', 'Failed because variable input isn\'t charecter or null')
//       }
//     } else {
//       alert('fail', 'Failed because variable output than 2 charecter or null')
//     }
//   } else if (choice === "Logarithm of Product") {
//     if (o.length < 2 && o.length > 0 && isNaN(o)) {
//       var out = o[0], num = n[0];
//       if (isNaN(num)) {
//         const in_num = num + "=";
//         front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
//           number = check_input(front_i2);
//         if (in_num === num + "=") {
//           if (typeof number === "number") {
//             let result = Math.log(number * number);
//             alert('success', null);
//             if (isNaN(result)) {
//               result = "Can't define value";
//               document.getElementById('result').innerHTML = "log(" + num + "*" + num + ") = log(" + number + "*" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
//             } else {
//               document.getElementById('result').innerHTML = "log(" + num + "*" + num + ") = log(" + number + "*" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
//             }
//           } else {
//             alert('fail', 'Failed because define value in variable is not correct')
//           }
//         } else {
//           alert('fail', 'Failed because define variable is related')
//         }
//       } else {
//         alert('fail', 'Failed because variable input isn\'t charecter or null')
//       }
//     } else {
//       alert('fail', 'Failed because variable output than 2 charecter or null')
//     }
//   } else if (choice === "Logarithm of Division") {
//     if (o.length < 2 && o.length > 0 && isNaN(o)) {
//       var out = o[0], num = n[0];
//       if (isNaN(num)) {
//         const in_num = num + "=";
//         front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
//           number = check_input(front_i2);
//         if (in_num === num + "=") {
//           if (typeof number === "number") {
//             let result = Math.log(number / number);
//             alert('success', null);
//             if (isNaN(result)) {
//               result = "Can't define value";
//               document.getElementById('result').innerHTML = "log(" + num + "/" + num + ") = log(" + number + "/" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
//             } else {
//               document.getElementById('result').innerHTML = "log(" + num + "/" + num + ") = log(" + number + "/" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
//             }
//           } else {
//             alert('fail', 'Failed because define value in variable is not correct')
//           }
//         } else {
//           alert('fail', 'Failed because define variable is related')
//         }
//       } else {
//         alert('fail', 'Failed because variable input isn\'t charecter or null')
//       }
//     } else {
//       alert('fail', 'Failed because variable output than 2 charecter or null')
//     }
//   } else if (choice === "Logarithm of Power") {
//     if (o.length < 2 && o.length > 0 && isNaN(o)) {
//       var out = o[0], num = n[0];
//       if (isNaN(num)) {
//         const in_num = num + "=";
//         front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
//           number = check_input(front_i2);
//         if (in_num === num + "=") {
//           if (typeof number === "number") {
//             let result = number * Math.log(number);
//             alert('success', null);
//             if (isNaN(result)) {
//               result = "Can't define value";
//               document.getElementById('result').innerHTML = "log(" + num + "^" + num + ") = log(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
//             } else {
//               document.getElementById('result').innerHTML = "log(" + num + "^" + num + ") = log(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
//             }
//           } else {
//             alert('fail', 'Failed because define value in variable is not correct')
//           }
//         } else {
//           alert('fail', 'Failed because define variable is related')
//         }
//       } else {
//         alert('fail', 'Failed because variable input isn\'t charecter or null')
//       }
//     } else {
//       alert('fail', 'Failed because variable output than 2 charecter or null')
//     }
//   } else if (choice === "Logarithm of Square Root") {
//     if (o.length < 2 && o.length > 0 && isNaN(o)) {
//       var out = o[0], num = n[0];
//       if (isNaN(num)) {
//         const in_num = num + "=";
//         front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
//           number = check_input(front_i2);
//         if (in_num === num + "=") {
//           if (typeof number === "number") {
//             let result = 0.5 * Math.log(number);
//             alert('success', null);
//             if (isNaN(result)) {
//               result = "Can't define value";
//               document.getElementById('result').innerHTML = "log(√" + num + ") = log(√" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
//             } else {
//               document.getElementById('result').innerHTML = "log(√" + num + ") = log(√" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
//             }
//           } else {
//             alert('fail', 'Failed because define value in variable is not correct')
//           }
//         } else {
//           alert('fail', 'Failed because define variable is related')
//         }
//       } else {
//         alert('fail', 'Failed because variable input isn\'t charecter or null')
//       }
//     } else {
//       alert('fail', 'Failed because variable output than 2 charecter or null')
//     }
//   } else if (choice === "Natural Logarithm") {
//     if (o.length < 2 && o.length > 0 && isNaN(o)) {
//       var out = o[0], num = n[0];
//       if (isNaN(num)) {
//         const in_num = num + "=";
//         front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
//           number = check_input(front_i2);
//         if (in_num === num + "=") {
//           if (typeof number === "number") {
//             let result = Math.log(number);
//             alert('success', null);
//             if (isNaN(result)) {
//               result = "Can't define value";
//               document.getElementById('result').innerHTML = "ln(" + num + "^" + num + ") = ln(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
//             } else {
//               document.getElementById('result').innerHTML = "ln(" + num + "^" + num + ") = ln(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
//             }
//           } else {
//             alert('fail', 'Failed because define value in variable is not correct')
//           }
//         } else {
//           alert('fail', 'Failed because define variable is related')
//         }
//       } else {
//         alert('fail', 'Failed because variable input isn\'t charecter or null')
//       }
//     } else {
//       alert('fail', 'Failed because variable output than 2 charecter or null')
//     }
//   } else if (choice === "Base 10 Logarithm") {
//     if (o.length < 2 && o.length > 0 && isNaN(o)) {
//       var out = o[0], num = n[0];
//       if (isNaN(num)) {
//         const in_num = num + "=";
//         front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
//           number = check_input(front_i2);
//         if (in_num === num + "=") {
//           if (typeof number === "number") {
//             let result = Math.log10(number);
//             alert('success', null);
//             if (isNaN(result)) {
//               result = "Can't define value";
//               document.getElementById('result').innerHTML = "log<sub>10</sub>(" + num + ") = log<sub>10</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
//             } else {
//               document.getElementById('result').innerHTML = "log<sub>10</sub>(" + num + ") = log<sub>10</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
//             }
//           } else {
//             alert('fail', 'Failed because define value in variable is not correct')
//           }
//         } else {
//           alert('fail', 'Failed because define variable is related')
//         }
//       } else {
//         alert('fail', 'Failed because variable input isn\'t charecter or null')
//       }
//     } else {
//       alert('fail', 'Failed because variable output than 2 charecter or null')
//     }
//   }
//   ['out', 'input-define-a', 'input-define-b'].forEach(id => document.getElementById(id).value = '');
// }