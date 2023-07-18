function Fortran2Julia(input) {
  let output = input
  // ========== Please rewrite following ==========

  // ABC...Z to abc...z
  output = output.toLowerCase();

  // ** to ^
  for (const match of output.matchAll(/\*\*/mg)) {
    let before = match[0];
    let after  = "^";
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // ' to ""
  for (const match of output.matchAll(/\'/mg)) {
    let before = match[0];
    let after  = "\"";
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // ! to #
  for (const match of output.matchAll(/!(?<str>.)/mg)) {
    let before = match[0];
    let after = `#${match.groups.str}`;
    // != to !=
    if (`${match.groups.str}` == "=") {
      after = match[0];
    }
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // remove implicit none
  for (const match of output.matchAll(/implicit\s*none/mg)) {
    let before = match[0];
    let after  = "";
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // remove types
  for (const type of ['integer', 'real', 'double precision', 'complex', 'logical', 'character']) {
    for (const match of output.matchAll(new RegExp(`${type}.*::\s*(?<text>.*)`, "mg"))) {
      let before = match[0];
      let after  = `${match.groups.text}`;
      if (after.includes('=')) {
        if (after.includes(',')) {
          let variables = match.groups.text.split(',');
          variables = variables.filter(function(elem){return elem.includes('=');});
          variables = variables.map(function(elem){return elem.trim();});
          after = variables.join('; ');
        }
      } else {
        after = "";
      }
      console.log(before, "to", after);
      output = output.replace(before, after);
    }
  }

  // 1d0 to 1e0
  for (const match of output.matchAll(/(?<mantissa>[+-]?\d+(?:\.\d+)?)[EDed]+(?<exponent>[+-]?\d+)/mg)) {
    let before = match[0];
    let after  = `${match.groups.mantissa}e${match.groups.exponent}`;
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // program xxx to function xxx()
  for (const match of output.matchAll(/program\s*(?<name>.*)/mg)) {
    let before = match[0];
    let after  = `function ${match.groups.name}\(\)`;
    console.log(before, "to", after);
    output = output.replace(before, after);
    // end program xxx to end; xxx()
    for (const mmatch of output.matchAll(new RegExp(`end.*${match.groups.name}`, "mg"))) {
      let before = mmatch[0];
      let after  = `end\n\n${match.groups.name}\(\)`;
      output = output.replace(before, after);
    }
  }

  // if xxx then to if xxx
  for (const match of output.matchAll(/if(?<text>.*)then/mg)) {
    let before = match[0];
    let after  = `if ${match.groups.text}`;
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // end xxx to end
  for (const match of output.matchAll(/end.*[!\n]?/mg)) {
    let before = match[0];
    let after  = "end\n";
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // print *,xxx to println(xxx)
  for (const match of output.matchAll(/print\s*\*\s*\,\s*(?<text>.*)/mg)) {
    let before = match[0];
    let after  = `println(${match.groups.text})`;
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // do to for
  for (const match of output.matchAll(/do\s*(?<counter>[a-zA-Z]?[a-zA-Z]?)\s*=\s*(?<range>[\d,]+)/mg)) {
    let before = match[0];
    let after  = `for ${match.groups.counter} in ${match.groups.range.replace(',',':')}`;
    // x,y,z to x:z:y
    // if () {}
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // ========== Please rewrite above ==========
  return output;
}
