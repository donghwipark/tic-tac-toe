module.exports.printBoard = (board) => {
  console.log(`
    ${board.X1} | ${board.Y1} | ${board.Z1}
    ___|____|___
       |    |  
    ${board.X2} | ${board.Y2} | ${board.Z2}
    ___|____|___
       |    |  
    ${board.X3} | ${board.Y3} | ${board.Z3}
  `);
};
