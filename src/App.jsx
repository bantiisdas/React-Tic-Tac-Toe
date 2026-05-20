import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [entries, setEntries] = useState(Array(9).fill(""));
  const [currentEntry, setCurrentEntry] = useState("X");
  const [winner, setWinner] = useState("");
  const [isDraw, setIsDraw] = useState(false);

  const updateBoard = (index) => {
    const updateEntries = [...entries];
    updateEntries[index] = currentEntry;
    setEntries(updateEntries);
    setCurrentEntry((prev) => (prev === "X" ? "O" : "X"));
  };

  const indexChecker = (array) => {
    if (array.includes(1) && array.includes(2) && array.includes(3)) {
      return 1;
    }
    if (array.includes(4) && array.includes(5) && array.includes(6)) {
      return 1;
    }
    if (array.includes(7) && array.includes(8) && array.includes(9)) {
      return 1;
    }
    if (array.includes(1) && array.includes(4) && array.includes(7)) {
      return 1;
    }
    if (array.includes(2) && array.includes(5) && array.includes(8)) {
      return 1;
    }
    if (array.includes(3) && array.includes(6) && array.includes(9)) {
      return 1;
    }
    if (array.includes(1) && array.includes(5) && array.includes(9)) {
      return 1;
    }
    if (array.includes(3) && array.includes(5) && array.includes(7)) {
      return 1;
    }
  };

  const winChecker = () => {
    const xIndexes = entries
      .map((e, i) => (e === "X" ? i + 1 : null))
      .filter((i) => i !== null);

    const oIndexes = entries
      .map((e, i) => (e === "O" ? i + 1 : null))
      .filter((i) => i !== null);

    const xIndexChecker = indexChecker(xIndexes);
    if (xIndexChecker) setWinner("X");

    const oIndexChecker = indexChecker(oIndexes);
    if (oIndexChecker) setWinner("O");

    if (!entries.includes("")) {
      setIsDraw(true);
    }
  };

  console.log(isDraw);

  const restartGame = () => {
    setEntries(Array(9).fill(""));
    setCurrentEntry("X");
    setWinner("");
  };

  useEffect(() => {
    winChecker();
  }, [entries]);

  return (
    <div className="min-h-screen flex bg-zinc-950 justify-center items-center px-4">
      <div
        className="
        bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Tic Tac Toe
          </h1>

          {winner ? (
            <p className="text-green-400 mt-3 text-xl font-semibold">
              🎉 {winner} Wins!
            </p>
          ) : isDraw ? (
            <p className="text-orange-400 mt-3 text-xl font-semibold">
              Match is Draw
            </p>
          ) : (
            <p className="text-zinc-400 mt-3 text-lg">
              Current Turn:
              <span
                className={
                  currentEntry === "X"
                    ? "text-cyan-400 ml-2 font-semibold"
                    : "text-pink-400 ml-2 font-semibold"
                }
              >
                {currentEntry}
              </span>
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {entries.map((e, index) => (
            <Box
              entry={e}
              key={index}
              index={index}
              updateBoard={updateBoard}
              winner={winner}
            />
          ))}
        </div>
        <button
          onClick={restartGame}
          className="mt-8 w-full py-4 rounded-2xl bg-white text-black font-semibold text-lg hover:bg-zinc-200 transition-all duration-200 active:scale-95"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default App;

const Box = ({ entry, index, updateBoard, winner }) => {
  return (
    <div onClick={() => updateBoard(index)}>
      <button
        disabled={entry !== "" || winner !== ""}
        className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-4xl font-bold w-24 h-24 rounded-2xl transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {entry === "X" ? "X" : entry === "O" ? "O" : ""}
      </button>
    </div>
  );
};
