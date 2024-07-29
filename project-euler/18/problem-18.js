const problem18 = (input) => {
  let sum = 0;
  let indexofCurrentHighest = 0;

  for (let row = 0; row < input.length; row++) {
    if (row === 0) {
      sum += input[row][0];
    } else {
      if (indexofCurrentHighest === input[row].length - 1) {
        if (
          input[row][indexofCurrentHighest] >
          input[row][indexofCurrentHighest - 1]
        ) {
          sum += input[row][indexofCurrentHighest];
        } else {
          sum += input[row][indexofCurrentHighest - 1];
          indexofCurrentHighest -= 1;
        }
      } else {
        if (
          input[row][indexofCurrentHighest] >
          input[row][indexofCurrentHighest + 1]
        ) {
          sum += input[row][indexofCurrentHighest];
        } else {
          sum += input[row][indexofCurrentHighest + 1];
          indexofCurrentHighest += 1;
        }
      }
    }
    console.log(sum, indexofCurrentHighest);
  }

  return sum;
};

module.exports = problem18;
