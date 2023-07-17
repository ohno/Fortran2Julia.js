function copy() {
  // copy
  let copyText = document.querySelector('#output')
  copyText.select()
  document.execCommand('copy');
  // popup
  const p = document.createElement("div");
  p.innerHTML = "copied!";
  p.id = "popup-temporary";
  p.style.color = "#00C8C8";
  p.style.fontSize = "0.88em";
  p.style.position = "absolute";
  p.style.right = "15px";
  p.style.bottom = "48px";
  // p.style.padding = "3px 8px";
  // p.style.border = "1px solid #c6cdd5";
  // p.style.borderRadius = "5px";
  document.getElementById('right').appendChild(p);
  document.getElementById('copybutton').style.fill = "#00C8C8";
  setTimeout(function(){
    window.getSelection().removeAllRanges();
    p.remove();
    document.getElementById('copybutton').style.fill = "#24292F";
  }, 1200);
}
