// const playerFactory = (name, symbol) => ({ name, symbol });

const playerFactory = (name, symbol) => {
  const getSymbol = () => symbol;
  const getName = () => name;


  const setSymbol = (playerOne) => {
    if (playerOne.getSymbol()) {
      console.log(`${playerOne.getSymbol()}`);
    } else {
      console.log(`${playerTwo.getSymbol()}`);
    }
  };

  return {
    getName, getSymbol,
  };
};
