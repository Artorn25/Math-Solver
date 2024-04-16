
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
const scrollHandler = new ScrollHandler("myBtn");
const loader = new Loader(".spinner-box");

function Function() {
  location.reload();
}

// เช็คค่าตัวเลขที่กำหนดในตัวแปร
function check_input(str) {
  const matches = str.match(/-?\d+(\.\d+)?/);
  if (matches) {
    return parseFloat(matches[0]);
  } else { return null; }
}

// ลบช่องว่างและทำให้ติดกัน
function replacedspace(text) {
  var space = text.split(" "),
    replacedspace = space.map(word => word.replace(",", " "));
  return replacedspace.join("")
}

function alert(status, text) {
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


$(document).ready(function () {
  $("#output, #input-a, #input-b, #input-c, #list, #formula, #submit, #picture-1, #picture-2, #picture-3, #select_poly, #select_pytha, #select_name").hide()
  $("#Polynomial").click(function () {
    $("#result").empty();
    document.getElementById("Function").innerHTML = "Function Polynomial";
    document.getElementById("list-name").innerHTML = "Type Polynomial :"
    $("#list, #list-poly, #output, #input-a, #input-b, #input-c, #formula, #submit, #picture-1, #select_poly, #select_name").show()
    $("#list-loga, #click-1, #click-2, #click-3, #picture-2, #picture-3, #select_pytha, #comment").hide()
    document.getElementById("input-de-1").innerHTML = "Input x : "
    document.getElementById("input-de-2").innerHTML = "Input b : "
    document.getElementById("input-de-3").innerHTML = "Input y : "
    document.getElementById("out").placeholder = " Example a";
    document.getElementById("for").placeholder = " Example ax+b=y";
    document.getElementById("select_poly").onclick = function () { Select_Poly() }
    document.getElementById("list-poly").onclick = function () { Change_Poly() }
    document.getElementById("submit").onclick = function () { Polynomial() }
  });
  $("#Pythagorean").click(function () {
    $("#result").empty();
    document.getElementById("Function").innerHTML = "Function Pythagorean"
    $("#output, #input-a, #input-b, #formula, #submit, #picture-3, #select_name, #select_pytha").show()
    document.getElementById("input-de-1").innerHTML = "Input b : "
    document.getElementById("input-de-2").innerHTML = "Input c : "
    $("#input-c, #list, #click-1, #click-2, #click-3, #select_poly, #picture-1, #picture-2, #comment").hide()
    document.getElementById("for").placeholder = " Example a^2+b^2=c^2";
    document.getElementById("select_pytha").onclick = function () { Select_Pytha() }
    document.getElementById("submit").onclick = function () { Pythagorean() }
  });
  $("#Logarithm").click(function () {
    $("#result").empty();
    document.getElementById("Function").innerHTML = "Function Logarithm"
    document.getElementById("list-name").innerHTML = "Type Logarithm :"
    $("#list, #list-loga, #output, #input-a, #input-b, #submit").show();
    $("#list-poly, #input-c, #click-1, #click-2, #click-3, #select_poly, #select_pytha, #select_name, #picture-1, #picture-2, #picture-3, #formula, #comment").hide();
    document.getElementById("input-de-1").innerHTML = "Input Base : ";
    document.getElementById("input-de-2").innerHTML = "Input Number : ";
    document.getElementById("list-loga").onclick = function () { Change_Loga() }
    document.getElementById("submit").onclick = function () { Logarithm() }
  })
});

function Select_Poly() {
  $("#result").empty();
  const select_poly = $('input[name="poly"]:checked').val();
  $("#list, #list-poly, #output, #input-a, #input-b, #input-c, #formula, #submit, #select_poly").show();
  $("#list-loga, #click-1, #click-2, #click-3, #select_pytha").hide();
  $('#for').attr('placeholder', ' Example ax+b=y');
  switch (select_poly) {
    case 'a':
      Update("Input x : ", "Input b : ", "Input y : ", " Example a");
      break;
    case 'x':
      Update("Input a : ", "Input b : ", "Input y : ", " Example x");
      break;
    case 'b':
      Update("Input a : ", "Input x : ", "Input y : ", " Example b");
      break;
    case 'y':
      Update("Input a : ", "Input x : ", "Input b : ", " Example y");
      break;
  }
}

function Update(text1, text2, text3, placeholder) {
  $('#input-de-1').text(text1);
  $('#input-de-2').text(text2);
  $('#input-de-3').text(text3);
  $('#out').attr('placeholder', placeholder);
}


function Change_Poly() {
  var choice = document.getElementById("list-poly").value;
  $("#output, #input-a, #input-b, #input-c, #formula, #submit").show()
  $("#result").empty();
  if (choice === "Linear") {
    $("#picture-1, #select_poly").show()
    $("#picture-2, #picture-3").hide()
    document.getElementById("for").placeholder = " Example ax+b=0";
    document.getElementById("submit").onclick = function () { Polynomial() }
  } else if (choice === "Quadratic") {
    $("#picture-2").show()
    $("#select_poly, #select_name,#picture-1, #picture-3").hide()
    document.getElementById("input-de-1").innerHTML = "Input a :";
    document.getElementById("input-de-2").innerHTML = "Input b :";
    document.getElementById("input-de-3").innerHTML = "Input c :";
    document.getElementById("for").placeholder = " Example ax^2+bx+c=0";
    document.getElementById("submit").onclick = function () { Polynomial() }
  }

}

function Select_Pytha() {
  const select_pytha = $('input[name="pytha"]:checked').val();
  $("#output, #input-a, #input-b, #formula, #submit, #select_pytha").show();
  $("#list, #list-poly, #input-c, #list-loga, #click-1, #click-2, #click-3, #select_poly").hide();
  $('#for').attr('placeholder', ' Example a^2+b^2=c^2');
  $("#result").empty();
  switch (select_pytha) {
    case 'a':
      $('#out').attr('placeholder', ' Example a');
      setInputs("Input b : ", "Input c : ")
      $('#input-define-a').attr('placeholder', ' Example b=2');
      $('#input-define-b').attr('placeholder', ' Example c=4');
      break;
    case 'b':
      $('#out').attr('placeholder', ' Example b');
      setInputs("Input a : ", "Input c : ")
      $('#input-define-a').attr('placeholder', ' Example a=2');
      $('#input-define-b').attr('placeholder', ' Example c=4');
      break;
    case 'c':
      $('#out').attr('placeholder', ' Example c');
      setInputs("Input a : ", "Input b : ")
      $('#input-define-a').attr('placeholder', ' Example a=2');
      $('#input-define-b').attr('placeholder', ' Example b=4');
      break;
  }
}

function Change_Loga() {
  var choice = $("#list-loga").val();
  $("#output, #input-a, #input-b, #submit").show();
  $("#result").empty();
  switch (choice) {
    case "General Logarithm":
      setInputs(" Input Base : ", " Input Number : ");
      break;
    case "Logarithm of Product":
    case "Logarithm of Division":
    case "Logarithm of Power":
    case "Logarithm of Square Root":
    case "Natural Logarithm":
    case "Base 10 Logarithm":
      $("#input-a").hide();
      setInputs(null, " Input Number : ");
      break;
  }
}

function setInputs(input1, input2) {
  $("#input-de-1").html(input1);
  $("#input-de-2").html(input2);
}

function Polynomial() {
  let choice = document.getElementById("list-poly").value,
    select_poly = document.querySelector('input[name="poly"]:checked').value,
    o = document.getElementById('out').value,
    a = document.getElementById('input-define-a').value,
    b = document.getElementById('input-define-b').value,
    c = document.getElementById('input-define-c').value,
    for_pytha = document.getElementById('for').value,
    new_a = replacedspace(a), new_b = replacedspace(b), new_c = replacedspace(c); // ทำให้ค่าชิดกัน
  if (choice === "Linear") {
    switch (select_poly) {
      case 'a':
        if (o.length < 2 && o.length > 0 && isNaN(o)) {
          var out_a = o[0], input_x = a[0], input_b = b[0], input_y = c[0];
          if (isNaN(a) && isNaN(b) && isNaN(c)) {
            const in_x = a + "=", in_b = b + "=", in_y = c + "=",
              value_x = new_a.substring(new_a.indexOf("=") + 1, new_a.length),
              value_b = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
              value_y = new_c.substring(new_c.indexOf("=") + 1, new_c.length),
              new_value_x = check_input(value_x), new_value_b = check_input(value_b), new_value_y = check_input(value_y);
            if (in_x === a + "=" && in_b === b + "=" && in_y === c + "=") {
              if (typeof new_value_x === "number" && typeof new_value_b === "number" && typeof new_value_y == "number") {
                let for_poly = replacedspace(for_pytha), // ax+b=y
                  for_in = out_a + input_x + "+" + input_b + "=" + input_y; // ax+b=y
                if (for_poly === for_in) {
                  input_x = new_value_x, input_b = new_value_b, input_y = new_value_y;
                  let result = (input_y - input_b) / input_x; // (y-b)/x
                  const noti = new bootstrap.Toast(success);
                  noti.show();
                  document.getElementById('result').innerHTML = for_in + " = (" + input_y + "-" + input_b + ") / " + input_x
                    + "<br>" + out_a + " = " + result;
                } else {
                  alert('fail', 'Failed because formula is null or formula is not correct')
                }
              } else {
                alert('fail', 'Failed because define value in variable is not correct')
              }
            } else {
              alert('fail', 'Failed because define variable is related')
            }
          } else {
            alert('fail', 'Failed because variable input isn\'t charecter or null')
          }
        } else {
          alert('fail', 'Failed because variable output than 2 charecter or null')
        }
        break;
      case 'x':
        if (o.length < 2 && o.length > 0) {
          var out_x = o[0], input_a = a[0], input_b = b[0], input_y = c[0];
          if (isNaN(a) && isNaN(b) && isNaN(c)) {
            const in_a = a + "=", in_b = b + "=", in_y = c + "=",
              value_a = new_a.substring(new_a.indexOf("=") + 1, new_a.length),
              value_b = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
              value_y = new_c.substring(new_c.indexOf("=") + 1, new_c.length),
              new_value_a = check_input(value_a), new_value_b = check_input(value_b), new_value_y = check_input(value_y);
            if (in_a === a + "=" && in_b === b + "=" && in_y === c + "=") {
              if (typeof new_value_a === "number" && typeof new_value_b === "number" && typeof new_value_y == "number") {
                let for_poly = replacedspace(for_pytha), // ax+b=y
                  for_in = input_a + out_x + "+" + input_b + "=" + input_y; // ax+b=y
                if (for_poly === for_in) {
                  input_a = new_value_a, input_b = new_value_b, input_y = new_value_y;
                  let result = (input_y - input_b) / input_a; // (y-b)/x
                  const noti = new bootstrap.Toast(success);
                  noti.show();
                  document.getElementById('result').innerHTML = for_in + " = (" + input_y + "-" + input_b + ") / " + input_a
                    + "<br>" + out_x + " = " + result;
                } else {
                  alert('fail', 'Failed because formula is null or formula is not correct')
                }
              } else {
                alert('fail', 'Failed because define value in variable is not correct')
              }
            } else {
              alert('fail', 'Failed because define variable is related')
            }
          } else {
            alert('fail', 'Failed because variable input isn\'t charecter or null')
          }
        } else {
          alert('fail', 'Failed because variable output than 2 charecter or null')
        }
        break;
      case 'b':
        if (o.length < 2 && o.length > 0) {
          var out_b = o[0], input_a = a[0], input_x = b[0], input_y = c[0];
          if (isNaN(a) && isNaN(b) && isNaN(c)) {
            const in_a = a + "=", in_x = b + "=", in_y = c + "=",
              value_a = new_a.substring(new_a.indexOf("=") + 1, new_a.length),
              value_b = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
              value_y = new_c.substring(new_c.indexOf("=") + 1, new_c.length),
              new_value_a = check_input(value_a), new_value_x = check_input(value_b), new_value_y = check_input(value_y);
            if (in_a === a + "=" && in_x === b + "=" && in_y === c + "=") {
              if (typeof new_value_a === "number" && typeof new_value_x === "number" && typeof new_value_y == "number") {
                let for_poly = replacedspace(for_pytha), // ax+b=y
                  for_in = input_a + input_x + "+" + out_b + "=" + input_y; // ax+b=y
                if (for_poly === for_in) {
                  input_a = new_value_a, input_x = new_value_x, input_y = new_value_y;
                  let result = input_y / (input_a * input_x); // b/ax
                  const noti = new bootstrap.Toast(success);
                  noti.show();
                  document.getElementById('result').innerHTML = for_in + " = " + input_y + " / " + input_a + " * " + input_x
                    + "<br>" + out_b + " = " + result;
                } else {
                  alert('fail', 'Failed because formula is null or formula is not correct')
                }
              } else {
                alert('fail', 'Failed because define value in variable is not correct')
              }
            } else {
              alert('fail', 'Failed because define variable is related')
            }
          } else {
            alert('fail', 'Failed because variable input isn\'t charecter or null')
          }
        } else {
          alert('fail', 'Failed because variable output than 2 charecter or null')
        }
        break;
      case 'y':
        if (o.length < 2 && o.length > 0) {
          var out_y = o[0], input_a = a[0], input_x = b[0], input_b = c[0];
          if (isNaN(a) && isNaN(b) && isNaN(c)) {
            const in_a = a + "=",
              in_x = b + "=",
              in_b = c + "=",
              value_a = new_a.substring(new_a.indexOf("=") + 1, new_a.length),
              value_x = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
              value_b = new_c.substring(new_c.indexOf("=") + 1, new_c.length),
              new_value_a = check_input(value_a), new_value_x = check_input(value_x), new_value_b = check_input(value_b);
            if (in_a === a + "=" && in_x === b + "=" && in_b === c + "=") {
              if (typeof new_value_a === "number" && typeof new_value_x === "number" && typeof new_value_b == "number") {
                let for_poly = replacedspace(for_pytha), // ax+b=y
                  for_in = input_a + input_x + "+" + input_b + "=" + out_y; // ax+b=y
                if (for_poly === for_in) {
                  input_a = new_value_a, input_x = new_value_x, input_b = new_value_b;
                  let result = (input_a * input_x) + input_b; // b/ax
                  const noti = new bootstrap.Toast(success);
                  noti.show();
                  document.getElementById('result').innerHTML = for_in + " = " + input_a + " * " + input_x + " + " + input_b
                    + "<br>" + out_y + " = " + result;
                } else {
                  alert('fail', 'Failed because formula is null or formula is not correct')
                }
              } else {
                alert('fail', 'Failed because define value in variable is not correct')
              }
            } else {
              alert('fail', 'Failed because define variable is related')
            }
          } else {
            alert('fail', 'Failed because variable input isn\'t charecter or null')
          }
        } else {
          alert('fail', 'Failed because variable output than 2 charecter or null')
        }
        break;
    }
  } else if (choice === "Quadratic") { // ต้องปรับ
    if (o.length < 2 && o.length > 0) { // Quadratic formula
      var out = o[0], input_a = a[0], input_b = b[0], input_c = c[0]; // x , a , b , c
      if (isNaN(a) && isNaN(b) && isNaN(c)) {
        const in_a = a + "=",
          in_b = b + "=",
          in_c = c + "=",
          value_a = new_a.substring(new_a.indexOf("=") + 1, new_a.length),
          value_b = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
          value_c = new_c.substring(new_c.indexOf("=") + 1, new_c.length),
          new_value_a = check_input(value_a), new_value_b = check_input(value_b), new_value_c = check_input(value_c);
        if (in_a === a + "=" && in_b === b + "=" && in_c === c + "=") {
          if (typeof new_value_a === "number" && typeof new_value_b === "number" && typeof new_value_c === "number") {
            let for_poly = replacedspace(for_pytha),
              for_in = input_a + out + "^2+" + input_b + out + "+" + input_c + "=0";
            if (for_poly === for_in) {
              let result = -input_b + Math.sqrt(Math.pow(input_b, 2) - (4 * input_a * input_c)) / 2 * input_a
              let result2 = -input_b - Math.sqrt(Math.pow(input_b, 2) - (4 * input_a * input_c)) / 2 * input_a
              if (isNaN(result)) {
                result = "Can't define value";
                if (isNaN(result2)) result2 = "Can't define value";
              } else if (isNaN(result2)) { result2 = "Can't define value"; }
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = out + " = " + result + " , " + result2;
            } else {
              alert('fail', 'Failed because formula is null or formula is not correct')
            }
          } else {
            alert('fail', 'Failed because define value in variable is not correct')
          }
        } else {
          alert('fail', 'Failed because define variable is related')
        }
      } else {
        alert('fail', 'Failed because variable input isn\'t charecter or null')
      }
    } else {
      alert('fail', 'Failed because variable output than 2 charecter or null')
    }
  }
  ['out', 'input-define-a', 'input-define-b', 'input-define-c', 'for'].forEach(id => document.getElementById(id).value = '');
}

function Pythagorean() {
  let select_pytha = document.querySelector('input[name="pytha"]:checked').value,
    o = document.getElementById('out').value,
    i = document.getElementById('input-define-a').value,
    j = document.getElementById('input-define-b').value,
    f = document.getElementById('for').value;
  new_i = replacedspace(i); // ทำให้ค่าชิดกัน 
  new_j = replacedspace(j); // ทำให้ค่าชิดกัน
  switch (select_pytha) {
    case 'a':
      if (o.length < 2 && o.length > 0 && isNaN(o)) {
        var out_a = o[0], b = i[0], c = j[0] // a , b , c
        if (isNaN(b) && isNaN(c)) {
          const in_b = b + "=",
            in_c = c + "=",
            front_i = new_i.substring(new_i.indexOf("=") + 1, new_i.length),
            front_j = new_j.substring(new_j.indexOf("=") + 1, new_j.length),
            new_front_i = check_input(front_i), // b
            new_front_j = check_input(front_j); // c
          if (in_b === b + "=" && in_c === c + "=") {
            if (typeof new_front_i === "number" && typeof new_front_j === "number") {
              let for_pytha = replacedspace(f),
                for_pre = out_a + "^2+" + b + "^2=" + c + "^2";
              for_after = c + "^2=" + out_a + "^2+" + b + "^2";
              let result = Math.pow(new_front_j, 2) - Math.pow(new_front_i, 2);
              result_after = Math.sqrt(result);
              if (for_pytha === for_pre) {
                const noti = new bootstrap.Toast(success);
                noti.show();
                if (isNaN(result_after)) {
                  result_after = "Can't define value";
                  document.getElementById('result').innerHTML = out_a + "^2 = " + result + " ," + out_a + " = " + result_after;
                } else {
                  document.getElementById('result').innerHTML = out_a + "^2 = " + result + " ," + out_a + " = " + result_after.toFixed(4);
                }
              }
              else if (for_pytha === for_after) {
                const noti = new bootstrap.Toast(success);
                noti.show();
                if (isNaN(result_after)) {
                  result = "Can't define value";
                  document.getElementById('result').innerHTML = out_a + "^2 = " + result + "," + out_a + " = " + result_after;
                } else {
                  document.getElementById('result').innerHTML = out_a + "^2 = " + result + "," + out_a + " = " + result_after.toFixed(4);
                }
              } else {
                alert('fail', 'Failed because formula is null or formula is not correct')
              }
            } else {
              alert('fail', 'Failed because define value in variable is not correct')
            }
          } else {
            alert('fail', 'Failed because define variable is related')
          }
        } else {
          alert('fail', 'Failed because variable input isn\'t charecter or null')
        }
      } else {
        alert('fail', 'Failed because variable output than 2 charecter or null')
      }
      break;
    case 'b':
      if (o.length < 2 && o.length > 0) {
        var out_b = o[0], a = i[0], c = j[0]  // b , a , c
        if (isNaN(a) && isNaN(c)) {
          const in_a = a + "=",
            in_c = c + "=",
            front_i = new_i.substring(new_i.indexOf("=") + 1, new_i.length),
            front_j = new_j.substring(new_j.indexOf("=") + 1, new_j.length),
            new_front_i = check_input(front_i), // a
            new_front_j = check_input(front_j); // c
          if (in_a === a + "=" && in_c === c + "=") {
            if (typeof new_front_i === "number" && typeof new_front_j === "number") {
              let for_pytha = replacedspace(f),
                for_pre = a + "^2+" + out_b + "^2=" + c + "^2";
              for_after = c + "^2=" + a + "^2+" + out_b + "^2";
              let result = Math.pow(new_front_j, 2) - Math.pow(new_front_i, 2);
              result_after = Math.sqrt(result);
              if (for_pytha === for_pre) {
                const noti = new bootstrap.Toast(success);
                noti.show();
                if (isNaN(result_after)) {
                  result_after = "Can't define value";
                  document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after;
                } else {
                  document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after.toFixed(4);
                }
              }
              else if (for_pytha === for_after) {
                const noti = new bootstrap.Toast(success);
                noti.show();
                if (isNaN(result_after)) {
                  result_after = "Can't define value";
                  document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after;
                } else {
                  document.getElementById('result').innerHTML = out_b + "^2 = " + result + " ," + out_b + " = " + result_after.toFixed(4);
                }
              } else {
                alert('fail', 'Failed because formula is null or formula is not correct')
              }
            } else {
              alert('fail', 'Failed because define value in variable is not correct')
            }
          } else {
            alert('fail', 'Failed because define variable is related')
          }
        } else {
          alert('fail', 'Failed because variable input isn\'t charecter or null')
        }
      } else {
        alert('fail', 'Failed because variable output than 2 charecter or null')
      }
      break;
    case 'c':
      if (o.length < 2 && o.length > 0) {
        var out_c = o[0], a = i[0], b = j[0]  // c , a , b
        if (isNaN(a) && isNaN(b)) {
          const in_a = a + "=",
            in_b = b + "=",
            front_i = new_i.substring(new_i.indexOf("=") + 1, new_i.length),
            front_j = new_j.substring(new_j.indexOf("=") + 1, new_j.length),
            new_front_i = check_input(front_i), // a
            new_front_j = check_input(front_j); // b
          if (in_a === a + "=" && in_b === b + "=") {
            if (typeof new_front_i === "number" && typeof new_front_j === "number") {
              let for_pytha = replacedspace(f),
                for_pre = a + "^2+" + b + "^2=" + out_c + "^2";
              for_after = out_c + "^2=" + a + "^2+" + b + "^2";
              let result = Math.pow(new_front_i, 2) + Math.pow(new_front_j, 2);
              result_after = Math.sqrt(result);
              if (for_pytha === for_pre) {
                const noti = new bootstrap.Toast(success);
                noti.show();
                if (isNaN(result_after)) {
                  result_after = "Can't define value";
                  document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after;
                } else {
                  document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after.toFixed(4);
                }
              }
              else if (for_pytha === for_after) {
                const noti = new bootstrap.Toast(success);
                noti.show();
                if (isNaN(result_after)) {
                  result_after = "Can't define value";
                  document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after;
                } else {
                  document.getElementById('result').innerHTML = out_c + "^2 = " + result + " ," + out_c + " = " + result_after.toFixed(4);
                }
              } else {
                alert('fail', 'Failed because formula is null or formula is not correct')
              }
            } else {
              alert('fail', 'Failed because define value in variable is not correct')
            }
          } else {
            alert('fail', 'Failed because define variable is related')
          }
        } else {
          alert('fail', 'Failed because variable input isn\'t charecter or null')
        }
      } else {
        alert('fail', 'Failed because variable output than 2 charecter or null')
      }
      break;
  }
  ['out', 'input-define-a', 'input-define-b', 'for'].forEach(id => document.getElementById(id).value = '');
}

function Logarithm() {
  let choice = document.getElementById("list-loga").value,
    o = document.getElementById('out').value,
    b = document.getElementById('input-define-a').value,
    n = document.getElementById('input-define-b').value;
  new_b = replacedspace(b); // ทำให้ค่าชิดกัน 
  new_n = replacedspace(n); // ทำให้ค่าชิดกัน
  if (choice === "General Logarithm") {
    if (o.length < 2 && o.length > 0 && isNaN(o)) {
      var out = o[0], base = new_b[0], num = new_n[0];
      if (isNaN(base) && isNaN(num)) {
        const in_b = base + "=",
          in_num = num + "=",
          last_in_b = new_b.substring(new_b.indexOf("=") + 1, new_b.length),
          front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
          base_number = check_input(last_in_b),
          number = check_input(front_i2);
        if (in_b === base + "=" && in_num === num + "=") {
          if (typeof base_number === "number" && typeof number === "number") {
            let result = Math.log(number) / Math.log(base_number)
            if (isNaN(result)) {
              result = "Can't define value";
              document.getElementById('result').innerHTML = "log<sub>" + base + "</sub>(" + num + ") = log<sub>" + base_number + "</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
            } else {
              document.getElementById('result').innerHTML = "log<sub>" + base + "</sub>(" + num + ") = log<sub>" + base_number + "</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
            }
            const noti = new bootstrap.Toast(success);
            noti.show();
          } else {
            alert('fail', 'Failed because define value in variable is not correct')
          }
        } else {
          alert('fail', 'Failed because define variable is related')
        }
      } else {
        alert('fail', 'Failed because variable input isn\'t charecter or null')
      }
    } else {
      alert('fail', 'Failed because variable output than 2 charecter or null')
    }
  } else if (choice === "Logarithm of Product") {
    if (o.length < 2 && o.length > 0 && isNaN(o)) {
      var out = o[0], num = n[0];
      if (isNaN(num)) {
        const in_num = num + "=";
        front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
          number = check_input(front_i2);
        if (in_num === num + "=") {
          if (typeof number === "number") {
            let result = Math.log(number * number);
            if (isNaN(result)) {
              result = "Can't define value";
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "log(" + num + "*" + num + ") = log(" + number + "*" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
            } else {
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "log(" + num + "*" + num + ") = log(" + number + "*" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
            }
          } else {
            alert('fail', 'Failed because define value in variable is not correct')
          }
        } else {
          alert('fail', 'Failed because define variable is related')
        }
      } else {
        alert('fail', 'Failed because variable input isn\'t charecter or null')
      }
    } else {
      alert('fail', 'Failed because variable output than 2 charecter or null')
    }
  } else if (choice === "Logarithm of Division") {
    if (o.length < 2 && o.length > 0 && isNaN(o)) {
      var out = o[0], num = n[0];
      if (isNaN(num)) {
        const in_num = num + "=";
        front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
          number = check_input(front_i2);
        if (in_num === num + "=") {
          if (typeof number === "number") {
            let result = Math.log(number / number);
            if (isNaN(result)) {
              result = "Can't define value";
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "log(" + num + "/" + num + ") = log(" + number + "/" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
            } else {
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "log(" + num + "/" + num + ") = log(" + number + "/" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
            }
          } else {
            alert('fail', 'Failed because define value in variable is not correct')
          }
        } else {
          alert('fail', 'Failed because define variable is related')
        }
      } else {
        alert('fail', 'Failed because variable input isn\'t charecter or null')
      }
    } else {
      alert('fail', 'Failed because variable output than 2 charecter or null')
    }
  } else if (choice === "Logarithm of Power") {
    if (o.length < 2 && o.length > 0 && isNaN(o)) {
      var out = o[0], num = n[0];
      if (isNaN(num)) {
        const in_num = num + "=";
        front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
          number = check_input(front_i2);
        if (in_num === num + "=") {
          if (typeof number === "number") {
            let result = number * Math.log(number);
            if (isNaN(result)) {
              result = "Can't define value";
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "log(" + num + "^" + num + ") = log(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
            } else {
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "log(" + num + "^" + num + ") = log(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
            }
          } else {
            alert('fail', 'Failed because define value in variable is not correct')
          }
        } else {
          alert('fail', 'Failed because define variable is related')
        }
      } else {
        alert('fail', 'Failed because variable input isn\'t charecter or null')
      }
    } else {
      alert('fail', 'Failed because variable output than 2 charecter or null')
    }
  } else if (choice === "Logarithm of Square Root") {
    if (o.length < 2 && o.length > 0 && isNaN(o)) {
      var out = o[0], num = n[0];
      if (isNaN(num)) {
        const in_num = num + "=";
        front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
          number = check_input(front_i2);
        if (in_num === num + "=") {
          if (typeof number === "number") {
            let result = 0.5 * Math.log(number);
            if (isNaN(result)) {
              result = "Can't define value";
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "log(√" + num + ") = log(√" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
            } else {
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "log(√" + num + ") = log(√" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
            }
          } else {
            alert('fail', 'Failed because define value in variable is not correct')
          }
        } else {
          alert('fail', 'Failed because define variable is related')
        }
      } else {
        alert('fail', 'Failed because variable input isn\'t charecter or null')
      }
    } else {
      alert('fail', 'Failed because variable output than 2 charecter or null')
    }
  } else if (choice === "Natural Logarithm") {
    if (o.length < 2 && o.length > 0 && isNaN(o)) {
      var out = o[0], num = n[0];
      if (isNaN(num)) {
        const in_num = num + "=";
        front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
          number = check_input(front_i2);
        if (in_num === num + "=") {
          if (typeof number === "number") {
            let result = Math.log(number);
            if (isNaN(result)) {
              result = "Can't define value";
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "ln(" + num + "^" + num + ") = ln(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
            } else {
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "ln(" + num + "^" + num + ") = ln(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
            }
          } else {
            alert('fail', 'Failed because define value in variable is not correct')
          }
        } else {
          alert('fail', 'Failed because define variable is related')
        }
      } else {
        alert('fail', 'Failed because variable input isn\'t charecter or null')
      }
    } else {
      alert('fail', 'Failed because variable output than 2 charecter or null')
    }
  } else if (choice === "Base 10 Logarithm") {
    if (o.length < 2 && o.length > 0 && isNaN(o)) {
      var out = o[0], num = n[0];
      if (isNaN(num)) {
        const in_num = num + "=";
        front_i2 = new_n.substring(new_n.indexOf("=") + 1, new_n.length),
          number = check_input(front_i2);
        if (in_num === num + "=") {
          if (typeof number === "number") {
            let result = Math.log10(number);
            if (isNaN(result)) {
              result = "Can't define value";
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "log<sub>10</sub>(" + num + ") = log<sub>10</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
            } else {
              const noti = new bootstrap.Toast(success);
              noti.show();
              document.getElementById('result').innerHTML = "log<sub>10</sub>(" + num + ") = log<sub>10</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
            }
          } else {
            alert('fail', 'Failed because define value in variable is not correct')
          }
        } else {
          alert('fail', 'Failed because define variable is related')
        }
      } else {
        alert('fail', 'Failed because variable input isn\'t charecter or null')
      }
    } else {
      alert('fail', 'Failed because variable output than 2 charecter or null')
    }
  }
  ['out', 'input-define-a', 'input-define-b'].forEach(id => document.getElementById(id).value = '');
}