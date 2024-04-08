function loadingscreen() {
  const loader = document.querySelector(".spinner-box");
  loader.classList.add("spinner--hidden");
  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
}
window.addEventListener("load", () => {
  loadingscreen();
});
function Function() {
  location.reload();
}


// เช็คค่าตัวเลขที่กำหนดในตัวแปร
function check_input(str) {
  const matches = str.match(/\d+(\.\d+)?/);
  if (matches) {
    return parseFloat(matches[0]);
  } else {
    return null;
  }
}

// ลบช่องว่างและทำให้ติดกัน
function replacedspace(text) {
  var space = text.split(" "),
    replacedspace = space.map(word => word.replace(",", " "));
  return replacedspace.join("")
}

$(document).ready(function () {
  $("#output").hide()
  $("#input-a").hide()
  $("#input-b").hide()
  $("#input-c").hide()
  $("#input-pe1").hide()
  $("#input-pe2").hide()
  $("#list").hide()
  $("#formula").hide()
  $("#submit").hide()
  $("#Polynomial").click(function () {
    document.getElementById("result").innerHTML = ""
    document.getElementById("Function").innerHTML = "Function Polynomial";
    $("#list").show()
    document.getElementById("list-name").innerHTML = "Type Polynomial :"
    $("#list-loga").hide()
    $("#list-poly").show()
    $("#output").show()
    $("#input-a").show()
    $("#input-c").hide()
    $("#input-b").hide()
    $("#formula").show()
    document.getElementById("for").placeholder = " Example 6x^2=0";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Polynomial() }
    document.getElementById("list-poly").onclick = function () { Change_Poly() }
  });
  $("#Pythagorean").click(function () {
    document.getElementById("result").innerHTML = ""
    document.getElementById("Function").innerHTML = "Function Pythagorean"
    $("#output").show()
    $("#input-a").show()
    document.getElementById("input-de-1").innerHTML = "Input a : "
    $("#input-b").show()
    document.getElementById("input-de-2").innerHTML = "Input b : "
    $("#input-c").hide()
    $("#list").hide()
    $("#formula").show()
    document.getElementById("for").placeholder = " Example a^2+b^2=c^2";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Pythagorean() }
  });
  $("#Logarithm").click(function () {
    document.getElementById("Function").innerHTML = "Function Logarithm"
    document.getElementById("list-name").innerHTML = "Type Logarithm :"
    $("#list").show()
    $("#list-poly").hide()
    $("#list-loga").show()
    $("#output").show()
    $("#input-a").show()
    document.getElementById("input-de-1").innerHTML = "Input Base : ";
    $("#input-b").show()
    document.getElementById("input-de-2").innerHTML = "Input Number : ";
    $("#input-c").hide()
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Logarithm() }
    document.getElementById("list-loga").onclick = function () { Change_Loga() }
  })
  $("#Equation").click(function () {
    document.getElementById("reuslt").innerHTML = ""
    $("#list").hide()
    document.getElementById("Function").innerHTML = "Function Equation of Indices"
    $("#output").show()
    $("#input-a").show()
    $("#formula").show()
    document.getElementById("for").placeholder = " Example ";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Equation() }
  })
});

function Change_Poly() {
  document.getElementById("result").innerHTML = ""
  var choice = document.getElementById("list-poly").value;
  if (choice === "Monomial") {
    $("#output").show()
    $("#input-a").show()
    $("#formula").show()
    document.getElementById("for").placeholder = " Example 6x^2=0";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Polynomial() }
  } else if (choice === "Binomial") {
    $("#output").show()
    $("#input-a").show()
    $("#input-b").show()
    $("#input-c").show()
    $("#formula").show()
    document.getElementById("for").placeholder = " Example 6x^2+3x+4=0";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Polynomial() }
  } else if (choice === "Quadratic") {
    $("#output").show()
    $("#input-a").show()
    document.getElementById("input-de-1").innerHTML = "Input a :";
    $("#input-b").show()
    document.getElementById("input-de-2").innerHTML = "Input b :";
    $("#input-c").show()
    document.getElementById("input-de-3").innerHTML = "Input c :";
    $("#formula").show()
    document.getElementById("for").placeholder = " Example 6x^2+3x+4=0";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Polynomial() }
    $("#input-pe1").hide()
    $("#input-pe2").hide()
  } else if (choice === "Cubic") {
    $("#output").show()
    $("#formula").show()
    document.getElementById("for").placeholder = " Example 6x^2+3x+4=0";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Polynomial() }
  }
}

function Change_Loga() {
  document.getElementById("result").innerHTML = ""
  var choice = document.getElementById("list-loga").value;
  if (choice === "General Logarithm") {
    $("#output").show()
    $("#input-a").show()
    document.getElementById("input-de-1").innerHTML = " Input Base : ";
    $("#input-b").show()
    document.getElementById("input-de-2").innerHTML = " Input Number : ";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Logarithm() }
  } else if (choice === "Logarithm of Product") {
    $("#output").show()
    $("#input-a").hide()
    $("#input-b").show()
    document.getElementById("input-de-2").innerHTML = " Input Number : ";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Logarithm() }
  } else if (choice === "Logarithm of Division") {
    $("#output").show()
    $("#input-a").hide()
    $("#input-b").show()
    document.getElementById("input-de-2").innerHTML = " Input Number : ";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Logarithm() }
  } else if (choice === "Logarithm of Power") {
    $("#output").show()
    $("#input-a").hide()
    $("#input-b").show()
    document.getElementById("input-de-2").innerHTML = " Input Number : ";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Logarithm() }
  } else if (choice === "Logarithm of Square Root") {
    $("#output").show()
    $("#input-a").hide()
    $("#input-b").show()
    document.getElementById("input-de-2").innerHTML = " Input Number : ";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Logarithm() }
  } else if (choice === "Natural Logarithm") {
    $("#output").show()
    $("#input-a").hide()
    $("#input-b").show()
    document.getElementById("input-de-2").innerHTML = " Input Number : ";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Logarithm() }
  } else if (choice === "Base 10 Logarithm") {
    $("#output").show()
    $("#input-a").hide()
    $("#input-b").show()
    document.getElementById("input-de-2").innerHTML = " Input Number : ";
    $("#submit").show()
    document.getElementById("submit").onclick = function () { Logarithm() }
  }
}
function Polynomial() {
  let o = document.getElementById('out').value,
    a = document.getElementById('input-define-a').value,
    b = document.getElementById('input-define-b').value,
    c = document.getElementById('input-define-c').value,
    for_pytha = document.getElementById('for').value;
  const notification = document.getElementById('submit'),
    Alert = document.getElementById('Alert');
  if (o.length < 2 && o.length > 0) { // Quadratic formula
    var out = o[0], i_a = a[0], i_b = b[0], i_c = c[0];
    const a_numbers = check_input(a), b_numbers = check_input(b), c_numbers = check_input(c);
    if (typeof a_numbers === "number" && typeof b_numbers === "number" && typeof c_numbers === "number") {
      let for_poly = replacedspace(for_pytha),
        find = for_poly.indexOf("+"),
        equal = for_poly.indexOf("=") + 1; // 0
      if (find === for_poly.indexOf("+") && equal === for_poly.indexOf("=") + 1) {
        let front = for_poly.substring(0, for_poly.indexOf("+")),
          back = for_poly.substring(for_poly.indexOf("+") + 1, for_poly.indexOf("=")),
          backer = back.indexOf("+"),
          after_front = front[front.indexOf("^") + 1];
        after_front = parseInt(after_front); // 2 ที่ fixed
        let pre_front = front.substring(0, front.indexOf('^') - 1); // ตัวเลขตัวเเรก _x^2
        pre_front = parseFloat(pre_front);
        if (pre_front === a_numbers) {
          i_a = a_numbers; // a
          if (after_front === 2) {
            if (backer === back.indexOf("+")) {
              let pre_back = back.substring(0, back.indexOf("+") - 1), // ตัวเลขตัวกลาง _x
                cen_back = back.substring(back.indexOf("+") - 1, back.indexOf("+")), // ตัวแปรตัวเลข _^2
                cen2_back = back.substring(back.indexOf("+") - 1, back.indexOf("+")); // ตัวแปรหลังตัวเลขที่ 2 
              pre_back = parseFloat(pre_back);
              if (pre_back === b_numbers) {
                i_b = b_numbers // b
                if (cen_back === out && cen2_back === out) {
                  varia = out // output ที่ใส่
                  let after_back = back.substring(back.indexOf("+") + 1, back.length); // ตัวเลขตัวท้าย + _
                  after_back = parseFloat(after_back);
                  if (after_back === c_numbers) {
                    i_c = c_numbers // c
                    let result = (-i_b + Math.sqrt((i_b ** 2) - 4 * i_a * i_c)) / (2 * i_a),
                      result2 = (-i_b - Math.sqrt((i_b ** 2) - 4 * i_a * i_c)) / (2 * i_a);
                    if (isNaN(result)) {
                      result = "Can't define value";
                      if (isNaN(result2)) {
                        result2 = "Can't define value";
                      }
                    }
                    else if (isNaN(result2)) result2 = "Can't define value";
                    notification.addEventListener('click', () => {
                      const noti = new bootstrap.Toast(Alert);
                      noti.show();
                    });
                    document.getElementById('result').innerHTML = varia + " = " + result + " , " + result2;
                  } else { alert("ค่าที่ใส่ไม่ถูกต้อง c") }
                } else { alert("ตัวแปรที่ใส่ผิดไม่ตรงกับ output") }
              } else { alert("ค่าที่ใส่ไม่ถูกต้อง b") }
            }
          } else { alert("เลขยกกำลังที่กำหนดผิด ต้องเป็น 2") }
        } else { alert("ค่าที่ใส่ไม่ถูกต้อง a") }
      } else { alert("Formula not correct") }
    } else { alert("ค่าของตัวแปรไม่ใช้ตัวเลข") }
  } else { alert("Error length of output > 1") }
}

function Pythagorean() {
  let o = document.getElementById('out').value,
    i = document.getElementById('input-define-a').value,
    i_2 = document.getElementById('input-define-b').value,
    f = document.getElementById('for').value;
  const notification = document.getElementById('submit'),
    Alert = document.getElementById('Alert');
  if (o.length < 2 && o.length > 0) {
    var out = o[0], a = i[0], b = i_2[0]
    const base_number = check_input(i),
      number = check_input(i_2);
    if (typeof base_number === "number" && typeof number === "number") {
      let for_pytha = replacedspace(f);
      const index_plus = for_pytha.indexOf('+'),
        index_equal = for_pytha.indexOf('=');
      if (index_equal > index_plus) {
        let front = for_pytha.substring(0, for_pytha.indexOf("+")),
          back = for_pytha.substring(for_pytha.indexOf("+") + 1, for_pytha.indexOf("=")),
          result = for_pytha.substring(for_pytha.indexOf("=") + 1, for_pytha.length),
          replacefront = front[2],
          replaceback = back[2],
          replaceresult = result[2];
        if (replacefront == 2 && replaceback == 2 && replaceresult == 2) {
          if (out == result[0] && a == front[0] && b == back[0]) {
            let result2 = Math.pow(base_number, replacefront) + Math.pow(number, replaceback)
            notification.addEventListener('click', () => {
              noti = new bootstrap.Toast(Alert);
              noti.show();
            });
            document.getElementById('result').innerHTML = out + "^2 = " + result2 + " , " + out + " = " + Math.sqrt(result2).toFixed(4);
          }
        } else {
          alert("เลขยกกำลังผิด ต้องเป็น 2")
        }
      } else if (index_equal < index_plus) {
        let result = for_pytha.substring(0, for_pytha.indexOf("=")),
          front = for_pytha.substring(for_pytha.indexOf("=") + 1, for_pytha.indexOf("+")),
          back = for_pytha.substring(for_pytha.indexOf("+") + 1, for_pytha.length),
          replacefront = front[2],
          replaceback = back[2],
          replaceresult = result[2];
        if (replacefront == 2 && replaceback == 2 && replaceresult == 2) {
          if (out == result[0] && a == front[0] && b == back[0]) {
            let result2 = Math.pow(base_number, replacefront) + Math.pow(number, replaceback)
            notification.addEventListener('click', () => {
              noti = new bootstrap.Toast(Alert);
              noti.show();
            });
            document.getElementById('result').innerHTML = out + "^2 = " + result2 + " , " + out + " = " + Math.sqrt(result2).toFixed(4);
          }
        }
      } else {// สมการไม่ถูกต้อง
      }
    } else {
      // ค่าของตัวแปรไม่ใช่ตัวเลข
    }
  } else {
    alert("Error length of output > 1")
  }
  o = document.getElementById('out').value = '',
  i = document.getElementById('input-define-a').value = '',
  i_2 = document.getElementById('input-define-b').value = '',
  f = document.getElementById('for').value = '';
}

function Logarithm() {
  let choice = document.getElementById("list-loga").value,
    o = document.getElementById('out').value,
    b = document.getElementById('input-define-a').value,
    n = document.getElementById('input-define-b').value;
  const notification = document.getElementById('submit'),
    Alert = document.getElementById('Alert');
  if (choice === "General Logarithm") {
    if (o.length < 2 && o.length > 0) {
      var out = o[0], base = b[0], num = n[0];
      const base_number = check_input(b),
        number = check_input(n);
      if (typeof base_number === "number" && typeof number === "number") {
        let result = Math.log(number) / Math.log(base_number)
        document.getElementById('result').innerHTML = "log<sub>" + base + "</sub>(" + num + ") = log<sub>" + base_number + "</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4)
      }
    }
  } else if (choice === "Logarithm of Product") {
    if (o.length < 2 && o.length > 0) {
      var out = o[0], num = n[0];
      const number = check_input(n);
      if (typeof number === "number") {
        let result = Math.log(number * number);
        document.getElementById('result').innerHTML = "log(" + num + "*" + num + ") = log(" + number + "*" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4)
      }
    }
  } else if (choice === "Logarithm of Division") {
    if (o.length < 2 && o.length > 0) {
      var out = o[0], num = n[0];
      const number = check_input(n);
      if (typeof number === "number") {
        let result = Math.log(number / number);
        document.getElementById('result').innerHTML = "log(" + num + "/" + num + ") = log(" + number + "/" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4)
      }
    }
  }else if (choice === "Logarithm of Power") {
    if (o.length < 2 && o.length > 0) {
      var out = o[0], num = n[0];
      const number = check_input(n);
      if (typeof number === "number") {
        let result = number * Math.log(number);
        document.getElementById('result').innerHTML = "log(" + num + "^" + num + ") = log(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4)
      }
    }
  }else if (choice === "Logarithm of Square Root") {
    if (o.length < 2 && o.length > 0) {
      var out = o[0], num = n[0];
      const number = check_input(n);
      if (typeof number === "number") {
        let result = 0.5 * Math.log(number);
        document.getElementById('result').innerHTML = "log(√" + num + ") = log(√" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4)
      }
    }
  }else if (choice === "Natural Logarithm") {
    if (o.length < 2 && o.length > 0) {
      var out = o[0], num = n[0];
      const number = check_input(n);
      if (typeof number === "number") {
        let result = Math.log(number);
        document.getElementById('result').innerHTML = "ln(" + num + "^" + num + ") = ln(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4)
      }
    }
  }
  else if (choice === "Base 10 Logarithm") {
    if (o.length < 2 && o.length > 0) {
      var out = o[0], num = n[0];
      const number = check_input(n);
      if (typeof number === "number") {
        let result = Math.log10(number);
        document.getElementById('result').innerHTML = "log<sub>10</sub>(" + num + ") = log<sub>10</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4)
      }
    }
  }
  document.getElementById('out').value = '',
  document.getElementById('input-define-a').value = '',
  document.getElementById('input-define-b').value = '';
  notification.addEventListener('click', () => {
    noti = new bootstrap.Toast(Alert);
    noti.show();
  });
}