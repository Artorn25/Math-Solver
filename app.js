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
  $("#formula").hide()
  $("#formula2").hide()
  $("#submit").hide()
  $("#submit2").hide()
  $("#Polynomial").click(function () {
    $("#output").show()
    $("#input-a").show()
    $("#input-b").show()
    $("#input-c").show()
    $("#formula").show()
    $("#submit").show()
    $("#input-pe1").hide()
    $("#input-pe2").hide()
    $("#formula2").hide()
    $("#submit2").hide()
  });
  $("#Pythagorean").click(function () {
    $("#output").show()
    $("#input-pe1").show()
    $("#input-pe2").show()
    $("#formula2").show()
    $("#submit2").show()
    $("#input-a").hide()
    $("#input-b").hide()
    $("#input-c").hide()
    $("#formula").hide()
    $("#submit").hide()
  });
});

function Polynomial() {
  let o = document.getElementById('out').value,
    a = document.getElementById('in-a').value,
    b = document.getElementById('in-b').value,
    c = document.getElementById('in-c').value,
    f = document.getElementById('for-poly').value;
  const notification = document.getElementById('submit'),
    Alert = document.getElementById('Alert');
  if (o.length < 2) { // Quadratic formula
    var out = o[0], i_a = a[0], i_b = b[0], i_c = c[0];
    const a_numbers = check_input(a), b_numbers = check_input(b), c_numbers = check_input(c);
    if (typeof a_numbers === "number" && typeof b_numbers === "number" && typeof c_numbers === "number") {
      let for_poly = replacedspace(f),
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
                    // alert(result)
                    // alert(result2)
                    notification.addEventListener('click', () => {
                      const noti = new bootstrap.Toast(Alert);
                      noti.show();
                    });
                    document.getElementById('result').innerHTML = varia + " = " + result + " , " + result2;
                  }
                }
              }
            }
          }
        } else { alert("Pow in formul not correct") }
      } else { alert("Formula not correct") }
    } else { alert("") }
  } else { alert("Error length of output > 1") }
}

function Pythagorean() {
  let o = document.getElementById('out').value,
    i = document.getElementById('in-py1').value,
    i2 = document.getElementById('in-py2').value,
    fo = document.getElementById('for-py').value;
  const notification = document.getElementById('submit2'),
      Alert = document.getElementById('Alert');
  if (o.length < 2) {
    const numbers = check_input(i),
      numbers2 = check_input(i2);
    if (typeof numbers === "number") {
      if (typeof numbers2 === "number") {
        let f = replacedspace(fo),
          find = f.indexOf("+");
        if (find == f.indexOf("+")) {
          let front = f.substring(0, f.indexOf("+")),
            back = f.substring(f.indexOf("+") + 1, f.indexOf("=")),
            result = f.substring(f.indexOf("=") + 1, f.length),
            replacefront = front[2],
            replaceback = back[2];
          if (replacefront == 2 && replaceback == 2) {
            let result2 = Math.pow(numbers, replacefront) + Math.pow(numbers2, replaceback)
            // alert(result + " = " + result2)
            notification.addEventListener('click', () => {
              noti = new bootstrap.Toast(Alert);
              noti.show();
            });
            document.getElementById('result').innerHTML = result + " = " + result2;
          }
          else {
            alert("error")
          }
        }
      }
    }

  } else {
    alert("Error length of output > 1")
  }
}
function Logarithm() { }
function Equation() { }
function GreatestandLeastest() { }