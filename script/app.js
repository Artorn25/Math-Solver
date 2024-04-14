// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


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

const Alert = document.getElementById('Alert');

$(document).ready(function () {
  $("#output, #input-a, #input-b, #input-c, #list, #formula, #submit, #picture-1, #picture-2, #picture-3, #select_poly, #select_pytha, #select_name").hide()
  $("#Polynomial").click(function () {
    document.getElementById("result").innerHTML = ""
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
    document.getElementById("result").innerHTML = ""
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
    document.getElementById("result").innerHTML = ""
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

// function Select_Poly() {
//   const select_poly = document.querySelector('input[name="poly"]:checked').value;
//   $("#list, #list-poly, #output, #input-a, #input-b, #input-c, #formula, #submit, #select_poly").show()
//   $("#list-loga, #click-1, #click-2, #click-3").hide()
//   document.getElementById("for").placeholder = " Example ax+b=y";
//   switch (select_poly) {
//     case 'a':
//       document.getElementById("input-de-1").innerHTML = "Input x : "
//       document.getElementById("input-de-2").innerHTML = "Input b : "
//       document.getElementById("input-de-3").innerHTML = "Input y : "
//       document.getElementById("out").placeholder = " Example a";
//       break;
//     case 'x':
//       document.getElementById("input-de-1").innerHTML = "Input a : "
//       document.getElementById("input-de-2").innerHTML = "Input b : "
//       document.getElementById("input-de-3").innerHTML = "Input y : "
//       document.getElementById("out").placeholder = " Example x";
//       break;
//     case 'b':
//       document.getElementById("input-de-1").innerHTML = "Input a : "
//       document.getElementById("input-de-2").innerHTML = "Input x : "
//       document.getElementById("input-de-3").innerHTML = "Input y : "
//       document.getElementById("out").placeholder = " Example b";
//       break;
//     case 'y':
//       document.getElementById("input-de-1").innerHTML = "Input a : "
//       document.getElementById("input-de-2").innerHTML = "Input x : "
//       document.getElementById("input-de-3").innerHTML = "Input b : "
//       document.getElementById("out").placeholder = " Example y";
//       break;
//   }
// }
function Select_Poly() {
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
  document.getElementById("result").innerHTML = ""
  var choice = document.getElementById("list-poly").value;
  $("#output, #input-a, #input-b, #input-c, #formula, #submit").show()
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
  $("#result").empty();
  const select_pytha = $('input[name="pytha"]:checked').val();
  $("#output, #input-a, #input-b, #formula, #submit, #select_pytha").show();
  $("#list, #list-poly, #input-c, #list-loga, #click-1, #click-2, #click-3, #select_poly").hide();
  $('#for').attr('placeholder', ' Example a^2+b^2=c^2');
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
// function Change_Loga() {
//   document.getElementById("result").innerHTML = ""
//   var choice = document.getElementById("list-loga").value;
//   $("#output, #input-a, #input-b, #submit").show()
//   if (choice === "General Logarithm") {
//     document.getElementById("input-de-1").innerHTML = " Input Base : ";
//     document.getElementById("input-de-2").innerHTML = " Input Number : ";
//     document.getElementById("submit").onclick = function () { Logarithm() }
//   } else if (choice === "Logarithm of Product") {
//     // $("#output, #input-b, #submit").show()
//     $("#input-a").hide()
//     document.getElementById("input-de-2").innerHTML = " Input Number : ";
//     document.getElementById("submit").onclick = function () { Logarithm() }
//   } else if (choice === "Logarithm of Division") {
//     // $("#output, #input-b, #submit").show()
//     $("#input-a").hide()
//     document.getElementById("input-de-2").innerHTML = " Input Number : ";
//     document.getElementById("submit").onclick = function () { Logarithm() }
//   } else if (choice === "Logarithm of Power") {
//     // $("#output, #input-b, #submit").show()
//     $("#input-a").hide()
//     document.getElementById("input-de-2").innerHTML = " Input Number : ";
//     document.getElementById("submit").onclick = function () { Logarithm() }
//   } else if (choice === "Logarithm of Square Root") {
//     // $("#output, #input-b, #submit").show()
//     $("#input-a").hide()
//     document.getElementById("input-de-2").innerHTML = " Input Number : ";
//     document.getElementById("submit").onclick = function () { Logarithm() }
//   } else if (choice === "Natural Logarithm") {
//     // $("#output, #input-b, #submit").show()
//     $("#input-a").hide()
//     document.getElementById("input-de-2").innerHTML = " Input Number : ";
//     document.getElementById("submit").onclick = function () { Logarithm() }
//   } else if (choice === "Base 10 Logarithm") {
//     // $("#output, #input-b, #submit").show()
//     $("#input-a").hide()
//     document.getElementById("input-de-2").innerHTML = " Input Number : ";
//     document.getElementById("submit").onclick = function () { Logarithm() }
//   }
// }

function Change_Loga() {
  $("#result").empty();
  var choice = $("#list-loga").val();
  $("#output, #input-a, #input-b, #submit").show();
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
  // $("#submit").click(Logarithm);
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
    for_pytha = document.getElementById('for').value;
  if (choice === "Linear") {
    switch (select_poly) {
      case 'a':
        if (o.length < 2 && o.length > 0) {
          var out_a = o[0], input_x = a[0], input_b = b[0], input_y = c[0];
          const x_numbers = check_input(a), b_numbers = check_input(b), y_numbers = check_input(c);
          if (typeof x_numbers === "number" && typeof b_numbers === "number" && typeof y_numbers == "number") {
            let for_poly = replacedspace(for_pytha), // ax+b=y
              for_in = out_a + input_x + "+" + input_b + "=" + input_y; // ax+b=y
            if (for_poly === for_in) {
              input_x = x_numbers, input_b = b_numbers, input_y = y_numbers;
              let result = (input_y - input_b) / input_x; // (y-b)/x
              const noti = new bootstrap.Toast(Alert);
              noti.show();
              document.getElementById('result').innerHTML = for_in + " = (" + input_y + "-" + input_b + ") / " + input_x
                + "<br>" + out_a + " = " + result;
            }
          }
        }
        break;
      case 'x':
        if (o.length < 2 && o.length > 0) {
          var out_x = o[0], input_a = a[0], input_b = b[0], input_y = c[0];
          const a_numbers = check_input(a), b_numbers = check_input(b), y_numbers = check_input(c);
          if (typeof a_numbers === "number" && typeof b_numbers === "number" && typeof y_numbers == "number") {
            let for_poly = replacedspace(for_pytha), // ax+b=y
              for_in = input_a + out_x + "+" + input_b + "=" + input_y; // ax+b=y
            if (for_poly === for_in) {
              input_a = a_numbers, input_b = b_numbers, input_y = y_numbers;
              let result = (input_y - input_b) / input_a; // (y-b)/x
              const noti = new bootstrap.Toast(Alert);
              noti.show();
              document.getElementById('result').innerHTML = for_in + " = (" + input_y + "-" + input_b + ") / " + input_a
                + "<br>" + out_x + " = " + result;
            }
          }
        }
        break;
      case 'b':
        if (o.length < 2 && o.length > 0) {
          var out_b = o[0], input_a = a[0], input_x = b[0], input_y = c[0];
          const a_numbers = check_input(a), x_numbers = check_input(b), y_numbers = check_input(c);
          if (typeof a_numbers === "number" && typeof x_numbers === "number" && typeof y_numbers == "number") {
            let for_poly = replacedspace(for_pytha), // ax+b=y
              for_in = input_a + input_x + "+" + out_b + "=" + input_y; // ax+b=y
            if (for_poly === for_in) {
              input_a = a_numbers, input_x = x_numbers, input_y = y_numbers;
              let result = input_y / (input_a * input_x); // b/ax
              const noti = new bootstrap.Toast(Alert);
              noti.show();
              document.getElementById('result').innerHTML = for_in + " = " + input_y + " / " + input_a + " * " + input_x
                + "<br>" + out_b + " = " + result;
            }
          }
        }
        break;
      case 'y':
        if (o.length < 2 && o.length > 0) {
          var out_y = o[0], input_a = a[0], input_x = b[0], input_b = c[0];
          const a_numbers = check_input(a), x_numbers = check_input(b), b_numbers = check_input(c);
          if (typeof a_numbers === "number" && typeof x_numbers === "number" && typeof b_numbers == "number") {
            let for_poly = replacedspace(for_pytha), // ax+b=y
              for_in = input_a + input_x + "+" + input_b + "=" + out_y; // ax+b=y
            if (for_poly === for_in) {
              input_a = a_numbers, input_x = x_numbers, input_b = b_numbers;
              let result = (input_a * input_x) + input_b; // b/ax
              const noti = new bootstrap.Toast(Alert);
              noti.show();
              document.getElementById('result').innerHTML = for_in + " = " + input_a + " * " + input_x + " + " + input_b
                + "<br>" + out_y + " = " + result;
            }
          }
        }
        break;
    }
  } else if (choice === "Quadratic") { // ต้องปรับ
    if (o.length < 2 && o.length > 0) { // Quadratic formula
      var out = o[0], i_a = a[0], i_b = b[0], i_c = c[0]; // x , a , b , c
      const a_numbers = check_input(a), b_numbers = check_input(b), c_numbers = check_input(c);
      if (typeof a_numbers === "number" && typeof b_numbers === "number" && typeof c_numbers === "number") {
        let for_poly = replacedspace(for_pytha),
          for_in = i_a + out + "^2+" + i_b + out + "+" + i_c + "=0";
        if (for_poly === for_in) {
          let result = -i_b + Math.sqrt(Math.pow(i_b, 2) - (4 * i_a * i_c)) / 2 * i_a
          let result2 = -i_b - Math.sqrt(Math.pow(i_b, 2) - (4 * i_a * i_c)) / 2 * i_a
          if (isNaN(result)) {
            result = "Can't define value";
            if (isNaN(result2)) result2 = "Can't define value";
          } else if (isNaN(result2)) { result2 = "Can't define value"; }
          const noti = new bootstrap.Toast(Alert);
          noti.show();
          document.getElementById('result').innerHTML = out + " = " + result + " , " + result2;
        }
        // find = for_poly.indexOf("+"),
        // equal = for_poly.indexOf("=") + 1; // 0
        // if (find === for_poly.indexOf("+") && equal === for_poly.indexOf("=") + 1) {
        //   let front = for_poly.substring(0, for_poly.indexOf("+")),
        //     back = for_poly.substring(for_poly.indexOf("+") + 1, for_poly.indexOf("=")),
        //     backer = back.indexOf("+"),
        //     after_front = front[front.indexOf("^") + 1];
        //   after_front = parseInt(after_front); // 2 ที่ fixed
        //   let pre_front = front.substring(0, front.indexOf('^') - 1); // ตัวเลขตัวเเรก _x^2
        //   pre_front = parseFloat(pre_front);
        //   if (pre_front === a_numbers) {
        //     i_a = a_numbers; // a
        //     if (after_front === 2) {
        //       if (backer === back.indexOf("+")) {
        //         let pre_back = back.substring(0, back.indexOf("+") - 1), // ตัวเลขตัวกลาง _x
        //           cen_back = back.substring(back.indexOf("+") - 1, back.indexOf("+")), // ตัวแปรตัวเลข _^2
        //           cen2_back = back.substring(back.indexOf("+") - 1, back.indexOf("+")); // ตัวแปรหลังตัวเลขที่ 2 
        //         pre_back = parseFloat(pre_back);
        //         if (pre_back === b_numbers) {
        //           i_b = b_numbers // b
        //           if (cen_back === out && cen2_back === out) {
        //             varia = out // output ที่ใส่
        //             let after_back = back.substring(back.indexOf("+") + 1, back.length); // ตัวเลขตัวท้าย + _
        //             after_back = parseFloat(after_back);
        //             if (after_back === c_numbers) {
        //               i_c = c_numbers // c
        //               let result = (-i_b + Math.sqrt((i_b ** 2) - 4 * i_a * i_c)) / (2 * i_a),
        //                 result2 = (-i_b - Math.sqrt((i_b ** 2) - 4 * i_a * i_c)) / (2 * i_a);
        //               if (isNaN(result)) {
        //                 result = "Can't define value";
        //                 if (isNaN(result2)) result2 = "Can't define value";
        //               } else if (isNaN(result2)) { result2 = "Can't define value"; }
        //               document.getElementById('result').innerHTML = varia + " = " + result + " , " + result2;
        //             } else { alert("ค่าที่ใส่ไม่ถูกต้อง c") }
        //           } else { alert("ตัวแปรที่ใส่ผิดไม่ตรงกับ output") }
        //         } else { alert("ค่าที่ใส่ไม่ถูกต้อง b") }
        //       }
        //     } else { alert("เลขยกกำลังที่กำหนดผิด ต้องเป็น 2") }
        //   } else { alert("ค่าที่ใส่ไม่ถูกต้อง a") }
        // } else { alert("Formula not correct") }
      } else { alert("ค่าของตัวแปรไม่ใช้ตัวเลข") }
    } else { alert("Error length of output > 1") }
  }
  ['out', 'input-define-a', 'input-define-b', 'input-define-c', 'for'].forEach(id => document.getElementById(id).value = '');
}

function Pythagorean() {
  let select_pytha = document.querySelector('input[name="pytha"]:checked').value,
    o = document.getElementById('out').value,
    i = document.getElementById('input-define-a').value,
    i_2 = document.getElementById('input-define-b').value,
    f = document.getElementById('for').value;

  switch (select_pytha) {
    case 'a':
      if (o.length < 2 && o.length > 0) {
        var out_a = o[0], b = i[0], c = i_2[0] // a , b , c
        const base_number = check_input(i), // b
          number = check_input(i_2); // c
        if (typeof base_number === "number" && typeof number === "number") {
          let for_pytha = replacedspace(f),
            for_pre = out_a + "^2+" + b + "^2=" + c + "^2";
          for_after = c + "^2=" + out_a + "^2+" + b + "^2";
          let result = Math.pow(number, 2) - Math.pow(base_number, 2);
          if (for_pytha === for_pre) {
            const noti = new bootstrap.Toast(Alert);
            noti.show();
            document.getElementById('result').innerHTML = out_a + "^2 = " + result + "," + out_a + " = " + Math.sqrt(result).toFixed(4);
            // ติดปัญหา ในกรณีที่ค่า ติดลบ เเล้วหารากที่ 2 จะเป็น NaN
          }
          else if (for_pytha === for_after) {
            const noti = new bootstrap.Toast(Alert);
            noti.show();
            document.getElementById('result').innerHTML = out_a + "^2 = " + result + "," + out_a + " = " + Math.sqrt(result).toFixed(4);
            // ติดปัญหา ในกรณีที่ค่า ติดลบ เเล้วหารากที่ 2 จะเป็น NaN
          }
        }
      }
      break;
    case 'b':
      if (o.length < 2 && o.length > 0) {
        var out_b = o[0], a = i[0], c = i_2[0]  // b , a , c
        const base_number = check_input(i), // a
          number = check_input(i_2); // c
        if (typeof base_number === "number" && typeof number === "number") {
          let for_pytha = replacedspace(f),
            for_pre = a + "^2+" + out_b + "^2=" + c + "^2";
          for_after = c + "^2=" + a + "^2+" + out_b + "^2";
          let result = Math.pow(number, 2) - Math.pow(base_number, 2);
          if (for_pytha === for_pre) {
            const noti = new bootstrap.Toast(Alert);
            noti.show();
            document.getElementById('result').innerHTML = out_b + "^2 = " + result + "," + out_b + " = " + Math.sqrt(result).toFixed(4);
            // ติดปัญหา ในกรณีที่ค่า ติดลบ เเล้วหารากที่ 2 จะเป็น NaN
          }
          else if (for_pytha === for_after) {
            const noti = new bootstrap.Toast(Alert);
            noti.show();
            document.getElementById('result').innerHTML = out_b + "^2 = " + result + "," + out_b + " = " + Math.sqrt(result).toFixed(4);
            // ติดปัญหา ในกรณีที่ค่า ติดลบ เเล้วหารากที่ 2 จะเป็น NaN
          }
        }
      }
      break;
    case 'c':
      if (o.length < 2 && o.length > 0) {
        var out_c = o[0], a = i[0], b = i_2[0]  // c , a , b
        const base_number = check_input(i), // a
          number = check_input(i_2); // c
        if (typeof base_number === "number" && typeof number === "number") {
          let for_pytha = replacedspace(f),
            for_pre = a + "^2+" + b + "^2=" + out_c + "^2";
          for_after = out_c + "^2=" + a + "^2+" + b + "^2";
          let result = Math.pow(base_number, 2) + Math.pow(number, 2);
          if (for_pytha === for_pre) {
            const noti = new bootstrap.Toast(Alert);
            noti.show();
            document.getElementById('result').innerHTML = out_c + "^2 = " + result + "," + out_c + " = " + Math.sqrt(result).toFixed(4);
            // ติดปัญหา ในกรณีที่ค่า ติดลบ เเล้วหารากที่ 2 จะเป็น NaN
          }
          else if (for_pytha === for_after) {
            const noti = new bootstrap.Toast(Alert);
            noti.show();
            document.getElementById('result').innerHTML = out_c + "^2 = " + result + "," + out_c + " = " + Math.sqrt(result).toFixed(4);
            // ติดปัญหา ในกรณีที่ค่า ติดลบ เเล้วหารากที่ 2 จะเป็น NaN
          }
        } else { alert("Value not correct, Try again") }
      } else { alert("NULL") }
      // if (o.length < 2 && o.length > 0) {
      //   var out = o[0], a = i[0], b = i_2[0]
      //   const base_number = check_input(i),
      //     number = check_input(i_2);
      //   if (typeof base_number === "number" && typeof number === "number") {
      //     let for_pytha = replacedspace(f);
      //     const index_plus = for_pytha.indexOf('+'),
      //       index_equal = for_pytha.indexOf('=');
      //     if (index_equal > index_plus) {
      //       let front = for_pytha.substring(0, for_pytha.indexOf("+")),
      //         back = for_pytha.substring(for_pytha.indexOf("+") + 1, for_pytha.indexOf("=")),
      //         result = for_pytha.substring(for_pytha.indexOf("=") + 1, for_pytha.length),
      //         replacefront = front[2],
      //         replaceback = back[2],
      //         replaceresult = result[2];
      //       if (replacefront == 2 && replaceback == 2 && replaceresult == 2) {
      //         if (out == result[0] && a == front[0] && b == back[0]) {
      //           let result2 = Math.pow(base_number, replacefront) + Math.pow(number, replaceback)
      //           document.getElementById('result').innerHTML = out + "^2 = " + result2 + " , " + out + " = " + Math.sqrt(result2).toFixed(4);
      //         }
      //       } else {
      //         alert("เลขยกกำลังผิด ต้องเป็น 2")
      //       }
      //     } else if (index_equal < index_plus) {
      //       let result = for_pytha.substring(0, for_pytha.indexOf("=")),
      //         front = for_pytha.substring(for_pytha.indexOf("=") + 1, for_pytha.indexOf("+")),
      //         back = for_pytha.substring(for_pytha.indexOf("+") + 1, for_pytha.length),
      //         replacefront = front[2],
      //         replaceback = back[2],
      //         replaceresult = result[2];
      //       if (replacefront == 2 && replaceback == 2 && replaceresult == 2) {
      //         if (out == result[0] && a == front[0] && b == back[0]) {
      //           let result2 = Math.pow(base_number, replacefront) + Math.pow(number, replaceback)
      //           document.getElementById('result').innerHTML = out + "^2 = " + result2 + " , " + out + " = " + Math.sqrt(result2).toFixed(4);
      //         }
      //       }
      //     } else {// สมการไม่ถูกต้อง
      //     }
      //   } else {
      //     // ค่าของตัวแปรไม่ใช่ตัวเลข
      //   }
      // } else {
      //   alert("Error length of output > 1")
      // }
      break;
  }
  ['out', 'input-define-a', 'input-define-b', 'for'].forEach(id => document.getElementById(id).value = '');
}

function Logarithm() {
  let choice = document.getElementById("list-loga").value,
    o = document.getElementById('out').value,
    b = document.getElementById('input-define-a').value,
    n = document.getElementById('input-define-b').value;
  if (choice === "General Logarithm") {
    if (o.length < 2 && o.length > 0) {
      var out = o[0], base = b[0], num = n[0];
      const base_number = check_input(b),
        number = check_input(n);
      if (typeof base_number === "number" && typeof number === "number") {
        let result = Math.log(number) / Math.log(base_number)
        if (isNaN(result)) {
          result = "Can't define value";
          document.getElementById('result').innerHTML = "log<sub>" + base + "</sub>(" + num + ") = log<sub>" + base_number + "</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
        } else {
          document.getElementById('result').innerHTML = "log<sub>" + base + "</sub>(" + num + ") = log<sub>" + base_number + "</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
        } const noti = new bootstrap.Toast(Alert);
        noti.show();
      }
    }
  } else if (choice === "Logarithm of Product") {
    if (o.length < 2 && o.length > 0) {
      var out = o[0], num = n[0];
      const number = check_input(n);
      if (typeof number === "number") {
        let result = Math.log(number * number);
        if (isNaN(result)) {
          result = "Can't define value";
          document.getElementById('result').innerHTML = "log(" + num + "*" + num + ") = log(" + number + "*" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
        } else {
          document.getElementById('result').innerHTML = "log(" + num + "*" + num + ") = log(" + number + "*" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
        }
        const noti = new bootstrap.Toast(Alert);
        noti.show();
      }
    }
  } else if (choice === "Logarithm of Division") {
    if (o.length < 2 && o.length > 0) {
      var out = o[0], num = n[0];
      const number = check_input(n);
      if (typeof number === "number") {
        let result = Math.log(number / number);
        if (isNaN(result)) {
          result = "Can't define value";
          document.getElementById('result').innerHTML = "log(" + num + "/" + num + ") = log(" + number + "/" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
        } else {
          document.getElementById('result').innerHTML = "log(" + num + "/" + num + ") = log(" + number + "/" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
        }
        const noti = new bootstrap.Toast(Alert);
        noti.show();
      }
    } else if (choice === "Logarithm of Power") {
      if (o.length < 2 && o.length > 0) {
        var out = o[0], num = n[0];
        const number = check_input(n);
        if (typeof number === "number") {
          let result = number * Math.log(number);
          if (isNaN(result)) {
            result = "Can't define value";
            document.getElementById('result').innerHTML = "log(" + num + "^" + num + ") = log(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
          } else {
            document.getElementById('result').innerHTML = "log(" + num + "^" + num + ") = log(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
          }
          const noti = new bootstrap.Toast(Alert);
          noti.show();
        }
      }
    } else if (choice === "Logarithm of Square Root") {
      if (o.length < 2 && o.length > 0) {
        var out = o[0], num = n[0];
        const number = check_input(n);
        if (typeof number === "number") {
          let result = 0.5 * Math.log(number);
          if (isNaN(result)) {
            result = "Can't define value";
            document.getElementById('result').innerHTML = "log(√" + num + ") = log(√" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
          } else {
            document.getElementById('result').innerHTML = "log(√" + num + ") = log(√" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
          } const noti = new bootstrap.Toast(Alert);
          noti.show();
        }
      }
    } else if (choice === "Natural Logarithm") {
      if (o.length < 2 && o.length > 0) {
        var out = o[0], num = n[0];
        const number = check_input(n);
        if (typeof number === "number") {
          let result = Math.log(number);
          if (isNaN(result)) {
            result = "Can't define value";
            document.getElementById('result').innerHTML = "ln(" + num + "^" + num + ") = ln(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
          }
          else {
            document.getElementById('result').innerHTML = "ln(" + num + "^" + num + ") = ln(" + number + "^" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
          } const noti = new bootstrap.Toast(Alert);
          noti.show();
        }
      }
    }
    else if (choice === "Base 10 Logarithm") {
      if (o.length < 2 && o.length > 0) {
        var out = o[0], num = n[0];
        const number = check_input(n);
        if (typeof number === "number") {
          let result = Math.log10(number);
          if (isNaN(result)) {result = "Can't define value";
          document.getElementById('result').innerHTML = "log<sub>10</sub>(" + num + ") = log<sub>10</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result;
        }else{
          document.getElementById('result').innerHTML = "log<sub>10</sub>(" + num + ") = log<sub>10</sub>(" + number + ") = " + out + "<br>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; = " + result.toFixed(4);
        }
        const noti = new bootstrap.Toast(Alert);
          noti.show();
        }
      }
    }
  }
  ['out', 'input-define-a', 'input-define-b'].forEach(id => document.getElementById(id).value = '');
}