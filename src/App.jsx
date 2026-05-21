import { useEffect, useState } from "react";
import "./App.css";

const WIN_PATTERNS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],

  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],

  [1, 5, 9],
  [3, 5, 7],
];

function App() {
  const [entries, setEntries] = useState(Array(9).fill(""));
  const [currentEntry, setCurrentEntry] = useState("X");
  const [winner, setWinner] = useState("");
  const [isDraw, setIsDraw] = useState(false);
  const [winningLine, setWinningLine] = useState(null);

  const updateBoard = (index) => {
    if (entries[index] !== "" || winner || isDraw) return;
    const updatedEntries = [...entries];
    updatedEntries[index] = currentEntry;
    setEntries(updatedEntries);
    setCurrentEntry((prev) => (prev === "X" ? "O" : "X"));
  };

  const findWinningPattern = (indexes) => {
    for (const pattern of WIN_PATTERNS) {
      if (pattern.every((num) => indexes.includes(num))) {
        return pattern;
      }
    }

    return null;
  };

  const checkWinner = () => {
    const xIndexes = entries
      .map((e, i) => (e === "X" ? i + 1 : null))
      .filter(Boolean);

    const oIndexes = entries
      .map((e, i) => (e === "O" ? i + 1 : null))
      .filter(Boolean);

    const xWin = findWinningPattern(xIndexes);

    if (xWin) {
      setWinner("X");
      setWinningLine(xWin);
      return;
    }

    const oWin = findWinningPattern(oIndexes);

    if (oWin) {
      setWinner("O");
      setWinningLine(oWin);
      return;
    }

    if (entries.every((cell) => cell !== "")) {
      setIsDraw(true);
    }
  };

  useEffect(() => {
    checkWinner();
  }, [entries]);

  const restartGame = () => {
    setEntries(Array(9).fill(""));
    setCurrentEntry("X");
    setWinner("");
    setWinningLine(null);
    setIsDraw(false);
  };

  const movesPlayed = entries.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-900 flex items-center justify-center px-4">
      <div className="relative">
        <div className="absolute -inset-2 rounded-3xl bg-cyan-500/20 blur-3xl" />

        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black text-white">Tic Tac Toe</h1>

            <p className="text-zinc-500 mt-2 text-sm">
              Moves Played: {movesPlayed}
            </p>

            {winner ? (
              <p className="text-green-400 text-2xl font-bold mt-4 animate-pulse">
                🎉 {winner} Wins!
              </p>
            ) : isDraw ? (
              <p className="text-orange-400 text-2xl font-bold mt-4">
                🤝 Match Draw
              </p>
            ) : (
              <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentEntry === "X" ? "bg-cyan-400" : "bg-pink-400"
                  }`}
                />

                <span className="text-zinc-300">
                  Turn:
                  <span
                    className={`ml-2 font-semibold ${
                      currentEntry === "X" ? "text-cyan-400" : "text-pink-400"
                    }`}
                  >
                    {currentEntry}
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className="relative">
            {winningLine && <WinningLine pattern={winningLine} />}

            <div className="grid grid-cols-3 gap-4">
              {entries.map((entry, index) => (
                <Box
                  key={index}
                  entry={entry}
                  index={index}
                  updateBoard={updateBoard}
                  winner={winner}
                  isDraw={isDraw}
                  winningLine={winningLine}
                />
              ))}
            </div>
          </div>

          <button
            onClick={restartGame}
            className="
              mt-8 w-full py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
}

function WinningLine({ pattern }) {
  const key = pattern.join(",");

  const coordinates = {
    "1,2,3": {
      x1: 0,
      y1: 16.66,
      x2: 100,
      y2: 16.66,
    },

    "4,5,6": {
      x1: 0,
      y1: 50,
      x2: 100,
      y2: 50,
    },

    "7,8,9": {
      x1: 0,
      y1: 83.33,
      x2: 100,
      y2: 83.33,
    },

    "1,4,7": {
      x1: 16.66,
      y1: 0,
      x2: 16.66,
      y2: 100,
    },

    "2,5,8": {
      x1: 50,
      y1: 0,
      x2: 50,
      y2: 100,
    },

    "3,6,9": {
      x1: 83.33,
      y1: 0,
      x2: 83.33,
      y2: 100,
    },

    "1,5,9": {
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
    },

    "3,5,7": {
      x1: 100,
      y1: 0,
      x2: 0,
      y2: 100,
    },
  };

  const line = coordinates[key];

  if (!line) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <line
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        stroke="#4ade80"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          filter: "drop-shadow(0 0 8px rgba(74,222,128,0.9))",
        }}
      />
    </svg>
  );
}

function Box({ entry, index, updateBoard, winner, isDraw, winningLine }) {
  const isWinningCell = winningLine?.includes(index + 1);

  return (
    <button
      onClick={() => updateBoard(index)}
      disabled={entry !== "" || winner || isDraw}
      className={`w-28 h-28 rounded-3xl border text-5xl font-black transition-all duration-300 ${
        isWinningCell
          ? "bg-green-500/20 border-green-400"
          : "bg-zinc-800 border-zinc-700"
      }
    hover:bg-zinc-700 hover:scale-105 active:scale-95 isabled:cursor-not-allowed disabled:hover:scale-100 `}
    >
      <span className={entry === "X" ? "text-cyan-400" : "text-pink-400"}>
        {entry}
      </span>
    </button>
  );
}

export default App;
