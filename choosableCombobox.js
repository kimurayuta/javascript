/**
 * choosableCombobox
 * @param text <input>
 * @param select <select>
 */
var choosableCombobox = (function(text, select) {
  var options = [];
  for (var index = 0, l = select.children.length; index < l; ++index) {
    options[index] = select.children[index].cloneNode(1);
  }
  function update(options) {
    var frag = document.createDocumentFragment();
    for (var index in options) {
      frag.appendChild(options[index]);
    }
    select.length = 0;
    select.appendChild(frag);
  }
  function inputEventListener() {
    if (text.value.trim() == "") {
      if (select.children.length != options.length) {
        update(options);
      }
      return;
    }
    var query = text.value.split(/ /);
    var buf = [];
    for (var o in options) {
      var option = options[o];
      for (var index in query) {
        var q = query[index];
        if (q != "") {
          if (option.innerHTML.indexOf(q) != -1) {
            buf[buf.length] = options[o];
            break;
          }
        }
      }
    }
    update(buf);
  }
  var inputTimer = null;
  text.addEventListener("keyup", inputEventListener);
});
