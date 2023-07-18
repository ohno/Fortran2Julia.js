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
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // ! to #
  for (const match of output.matchAll(/\/\=/mg)) {
    let before = match[0];
    let after = `!=`;
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
    for (const mmatch of output.matchAll(new RegExp(`end.*function.*${match.groups.name}[\(\)]*`, "mg"))) {
      let before = mmatch[0];
      let after  = `end; ${match.groups.name}\(\)`;
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

  // else if to elseif
  for (const match of output.matchAll(/else\s*if/mg)) {
    let before = match[0];
    let after  = "elseif";
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // end xxx to end
  for (const statement of ['do', 'if', 'program', 'subroutin', 'function']) {
    for (const match of output.matchAll(new RegExp(`end.*${statement}`, "mg"))) {
      let before = match[0];
      let after  = "end";
      console.log(before, "to", after);
      output = output.replace(before, after);
    }
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
    let after  = `for ${match.groups.counter} = ${match.groups.range.replace(',',':')}`;
    // x,y,z to x:z:y
    for (const mmatch of match.groups.range.matchAll(/(?<x>\d+),(?<y>\d+),(?<z>\d+)/mg)) {
      after = `for ${match.groups.counter} = ${mmatch.groups.x}:${mmatch.groups.z}:${mmatch.groups.y}`;
    }
    console.log(before, "to", after);
    output = output.replace(before, after);
  }

  // ========== Please rewrite above ==========
  return output;
}
