//
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Function to display feedbacks
function displayFeedbacks() {
  var feedbacks = JSON.parse(localStorage.getItem('feedbacks'));
  var feedbackListDiv = document.getElementById('feedbackList');

  if (feedbacks !== null && feedbacks.length > 0) {
    var html = '<div class="list-group">';
    for (var i = 0; i < feedbacks.length; i++) {
      html += '<div class="list-group-item"><strong>Name: </strong>' + feedbacks[i].name + '<br><strong>Comment: </strong>' + feedbacks[i].comment + '</div>';
    }
    html += '</div>';
    feedbackListDiv.innerHTML = html;
  } else {
    feedbackListDiv.innerHTML = '<p class="text-center">No feedbacks yet.</p>';
  }
}

// Function to send message
function sendMessage() {
  var name = document.getElementById("recipient-name").value;
  var comment = document.getElementById("message-text").value;

  if (name.trim() !== '' && comment.trim() !== '') {
    var feedback = {
      name: name,
      comment: comment
    };

    if (localStorage.getItem('feedbacks') === null) {
      var feedbacks = [];
      feedbacks.push(feedback);
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    } else {
      var feedbacks = JSON.parse(localStorage.getItem('feedbacks'));
      feedbacks.push(feedback);
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }

    document.getElementById("recipient-name").value = '';
    document.getElementById("message-text").value = '';

    displayFeedbacks();
    $('#exampleModal').modal('hide');
  } else {
    alert("Please fill in all fields.");
  }
}

displayFeedbacks();

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
        $('#out').on('input', function () {
          var output = $("#out").val(); 
          $('#input-define-a').on('input', function () {
            var input_1 = $("#input-define-a").val();
            $('#input-define-b').on('input', function () {
              var input_2 = $("#input-define-b").val();
              $('#input-define-c').on('input', function () {
                var input_3 = $("#input-define-c").val();
                $("#for").val(input_3[0] +"=" + output[0] + "" + input_1[0] + "+" + input_2[0]);
              });
            });
          });
        });
        $("#pic-poly-find-a").show()
        $("#pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y").hide()
        this.updateInputs("Input x : ", "Input b : ", "Input y : ");
        this.updatePlaceholder(" Example a", " Example x = 3", "Example b = 2", "Example y = 5")
        break;
      case 'x':
        $('#out').on('input', function () {
          var output = $("#out").val(); 
          $('#input-define-a').on('input', function () {
            var input_1 = $("#input-define-a").val();
            $('#input-define-b').on('input', function () {
              var input_2 = $("#input-define-b").val();
              $('#input-define-c').on('input', function () {
                var input_3 = $("#input-define-c").val();
                $("#for").val(input_3[0] +"=" + input_1[0] + "" + output[0] + "+" + input_2[0]);
              });
            });
          });
        });
        $("#pic-poly-find-x").show()
        $("#pic-poly-find-a, #pic-poly-find-b, #pic-poly-find-y").hide()
        this.updateInputs("Input a : ", "Input b : ", "Input y : ", " Example x");
        this.updatePlaceholder(" Example x", " Example a = 3", "Example b = 2", "Example y = 5")
        break;
      case 'b':
        $('#out').on('input', function () {
          var output = $("#out").val(); 
          $('#input-define-a').on('input', function () {
            var input_1 = $("#input-define-a").val();
            $('#input-define-b').on('input', function () {
              var input_2 = $("#input-define-b").val();
              $('#input-define-c').on('input', function () {
                var input_3 = $("#input-define-c").val();
                $("#for").val(input_3[0] +"=" + input_1[0] + "" + input_2[0] + "+" + output[0]);
              });
            });
          });
        });
        $("#pic-poly-find-b").show()
        $("#pic-poly-find-a, #pic-poly-find-x, #pic-poly-find-y").hide()
        this.updateInputs("Input a : ", "Input x : ", "Input y : ", " Example b");
        this.updatePlaceholder(" Example b", " Example a = 3", "Example x = 2", "Example y = 5")
        break;
      case 'y':
        $('#out').on('input', function () {
          var output = $("#out").val(); 
          $('#input-define-a').on('input', function () {
            var input_1 = $("#input-define-a").val();
            $('#input-define-b').on('input', function () {
              var input_2 = $("#input-define-b").val();
              $('#input-define-c').on('input', function () {
                var input_3 = $("#input-define-c").val();
                $("#for").val(output[0] +"=" + input_1[0] + "" + input_2[0] + "+" + input_3[0]);
              });
            });
          });
        });
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
      $('#out').on('input', function () {
        var output = $("#out").val(); 
        $('#input-define-a').on('input', function () {
          var input_1 = $("#input-define-a").val();
          $('#input-define-b').on('input', function () {
            var input_2 = $("#input-define-b").val();
            $('#input-define-c').on('input', function () {
              var input_3 = $("#input-define-c").val();
              $("#for").val(input_3[0] +"=" + output[0] + "" + input_1[0] + "+" + input_2[0]);
            });
          });
        });
      });
      $("#pic-poly-find-a, #select_poly").show()
      $("#pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y, #pic-poly-qua, #pic-pytha-find-a, #pic-pytha-find-b, #pic-pytha-find-c").hide()
      $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10").hide()
      document.getElementById("for").placeholder = " Example ax+b=0";
    } else if (choice === "Quadratic") {
      $('#out').on('input', function () {
        var output = $("#out").val(); 
        $('#input-define-a').on('input', function () {
          var input_1 = $("#input-define-a").val();
          $('#input-define-b').on('input', function () {
            var input_2 = $("#input-define-b").val();
            $('#input-define-c').on('input', function () {
              var input_3 = $("#input-define-c").val();
              $("#for").val(input_1[0] + output[0] + "^2+" + input_2[0] + output[0] + "+" + input_3[0] + "=0");
            });
          });
        });
      });
      $("#pic-poly-qua").show()
      $("#select_poly, #select_name, #pic-poly-find-a, #pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y, #picture-3").hide()
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
        $('#out').on('input', function () {
          var output = $("#out").val(); 
          $('#input-define-a').on('input', function () {
            var input_1 = $("#input-define-a").val();
            $('#input-define-b').on('input', function () {
              var input_2 = $("#input-define-b").val();
                $("#for").val(output[0] + "^2+" + input_1[0] + "^2=" + input_2[0] + "^2");
            });
          });
        });
        $("#pic-pytha-find-a").show()
        $("#pic-pytha-find-b, #pic-pytha-find-c").hide()
        this.updateInputs("Input b : ", "Input c : ", null, null)
        this.updatePlaceholder("Example a", "Example b=2", "Example c=4", "Example y = 5")
        break;
      case 'b':
        $('#out').on('input', function () {
          var output = $("#out").val(); 
          $('#input-define-a').on('input', function () {
            var input_1 = $("#input-define-a").val();
            $('#input-define-b').on('input', function () {
              var input_2 = $("#input-define-b").val();
                $("#for").val(input_1[0] + "^2+" + output[0] + "^2=" + input_2[0] + "^2");
            });
          });
        });
        $("#pic-pytha-find-b").show()
        $("#pic-pytha-find-a, #pic-pytha-find-c").hide()
        this.updateInputs("Input a : ", "Input c : ", null, null)
        this.updatePlaceholder("Example b", "Example a=2", "Example c=4", "Example y = 5")
        break;
      case 'c':
        $('#out').on('input', function () {
          var output = $("#out").val(); 
          $('#input-define-a').on('input', function () {
            var input_1 = $("#input-define-a").val();
            $('#input-define-b').on('input', function () {
              var input_2 = $("#input-define-b").val();
                $("#for").val(input_1[0] + "^2+" + input_2[0] + "^2=" + output[0] + "^2");
            });
          });
        });
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
    document.getElementById("list-name").innerHTML = "Type Polynomial :";
    $('#out').on('input', function () {
      var output = $("#out").val(); 
      $('#input-define-a').on('input', function () {
        var input_1 = $("#input-define-a").val();
        $('#input-define-b').on('input', function () {
          var input_2 = $("#input-define-b").val();
          $('#input-define-c').on('input', function () {
            var input_3 = $("#input-define-c").val();
            $("#for").val(input_3[0] +"=" + output[0] + "" + input_1[0] + "+" + input_2[0]);
          });
        });
      });
    });
    $("#list, #list-poly, #output, #input-a, #input-b, #input-c, #formula, #submit, #pic-poly-find-a, #select_poly, #select_name").show()
    $("#list-loga, #click-1, #click-2, #click-3, #pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y, #pic-poly-qua, #pic-pytha-find-a, #pic-pytha-find-b, #pic-pytha-find-c, #select_pytha, #comment").hide()
    $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10, #showcomment").hide()
    document.getElementById("input-de-1").innerHTML = "<b>Input x : </b>"
    document.getElementById("input-de-2").innerHTML = "<b>Input b : </b>"
    document.getElementById("input-de-3").innerHTML = "<b>Input y : </b>"
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
    $('#out').on('input', function () {
      var output = $("#out").val(); 
      $('#input-define-a').on('input', function () {
        var input_1 = $("#input-define-a").val();
        $('#input-define-b').on('input', function () {
          var input_2 = $("#input-define-b").val();
            $("#for").val(output[0] + "^2+" + input_1[0] + "^2=" + input_2[0] + "^2");
        });
      });
    });
    $("#out").on("input", function () {
      var input = $(this).val();
      $("#input-define-a").on("input", function () {
        var input_1 = $(this).val();
        $("#for").val(input + input_1);
      });
    });

    $("#input-c, #list, #click-1, #click-2, #click-3, #select_poly, #pic-poly-find-a, #pic-poly-find-x, #pic-poly-find-b, #pic-poly-find-y, #pic-poly-qua, #pic-pytha-find-b, #pic-pytha-find-c, #comment").hide()
    $("#pic-loga-gene, #pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10, #showcomment").hide()
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
    $("#pic-loga-pro, #pic-loga-divi, #pic-loga-power, #pic-loga-squ, #pic-loga-natural, #pic-loga-base10, #showcomment").hide()
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
                    for_be = input_y + "=" + out_a + input_x + "+" + input_b; // y=ax+b
                  input_x = new_value_x, input_b = new_value_b, input_y = new_value_y;
                  let result = (input_y - input_b) / input_x; // (y-b)/x
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
                    for_be = input_y + "=" + input_a + input_x + "+" + out_b; // y=ax+b
                  input_a = new_value_a, input_x = new_value_x, input_y = new_value_y;
                  let result = input_y / (input_a * input_x); // b/ax
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
                    for_be = out_y + "=" + input_a + input_x + "+" + input_b; // y=ax+b
                  input_a = new_value_a, input_x = new_value_x, input_b = new_value_b;
                  let result = (input_a * input_x) + input_b; // ax+b
                  console.log(for_be)
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
    const select_pytha = document.querySelector('input[name="pytha"]:checked').value,
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
                } else { this.alert('fail', 'Failed because formula is null or formula is not correct') }
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

const ListPoly = new Polynomial(),
  ListPytha = new Pythagorean(),
  ListLoga = new Logarithm();