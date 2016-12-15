/**
 * selectableTextInput
 * <div class="selectableTextInput close">
 * <div><input type="text" tabIndex="-1" /></div>
 * <div><select size="7" tabIndex="-1"><option></option></select></div>
 * </div>
 * @param source <button>
 * @param items <option>
 * @return
 *   list: <select>
 *   search: <input>
 *   component: <div>
 */
var selectableTextInput = (function(source, items) {
  // div
  var component = document.createElement("div");
  component.classList.add("selectableTextInput");
  component.classList.add("close");

  // div div input[type=text]
  var textComponent = document.createElement("div");
  var search = document.createElement("input");
  search.type = "text";
  search.tabIndex = -1;
  textComponent.appendChild(search);
  component.appendChild(textComponent);

  // div div select
  var selectComponent = document.createElement("div");
  var list = document.createElement("select");
  list.size = 7;
  list.tabIndex = -1;
  selectComponent.appendChild(list);
  component.appendChild(selectComponent);

  // div div select option
  var options = [];
  for (var index in items) {
    var option = document.createElement("option");
    option.innerHTML = items[index];
    list.appendChild(option);
  }
  source.parentNode.insertBefore(component, source.nextSibling);

  /* states */
  var active = false;
  function activate() {
    active = true;
  }
  function deactivate() {
    active = false;
  }
  function open() {
    if (active && component.classList.contains("close")) {
      search.focus();
      component.classList.remove("close");
    }
  }
  function close() {
    if (!active && !component.classList.contains("close")) {
      component.classList.add("close");
    }
  }
  function visible() {
    activate();
    open();
  }
  function invisible() {
    deactivate();
    setTimeout(close, 100);
  }

  /* EventListener */
  function selectEventListener() {
    source.value = source.innerHTML = list.value;
    invisible();
  }
  function keyEventListener(event) {
    switch(event.keyCode) {
      case 27: // Escape
        invisible();
        break;
      case 13: // Enter
        selectEventListener();
        break;
    }
  }

  /* focus, blur */
  search.addEventListener("focus", activate);
  list.addEventListener("focus", activate);
  search.addEventListener("blur", invisible);
  list.addEventListener("blur", invisible);
  list.addEventListener("mouseup", function() {
    search.focus();
  });

  /* key event on text field */
  search.addEventListener("keypress", keyEventListener);
  search.addEventListener("keypress", function(event) {
    switch(event.keyCode) {
      case 40: // ArrowDown
        if (list.selectedIndex < (list.length - 1)) {
          list.selectedIndex++;
        }
        break;
      case 38: // ArrowUp
        if (list.selectedIndex > 0) {
          list.selectedIndex--;
        }
        break;
    }
  });

  /* key event on select */
  list.addEventListener("click", selectEventListener);
  list.addEventListener("keypress", keyEventListener);

  /* event on source */
  source.addEventListener("click", function() {
    if (component.classList.contains("close")) {
      visible();
    } else {
      invisible();
    }
  });

  return {
    list: list,
    search: search,
    component: component
  };
});
