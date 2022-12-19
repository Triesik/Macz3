export type Generator<T> = { next: () => T };

export type Position = {
    row: number;
    col: number;
};

export type Match<T> = {
    matched: T;
    positions: Position[];
};

export type Board<T> = {
    width: number;
    height: number;
    boardPositions: T[][];
};


type MatchEffect<T> = {
    kind: "Match",
    match : {
        matched: T,
        positions: Position[];
    }
}

type RefillEffect = {
    kind: "Refill"
}

export type Effect<T> = MatchEffect<T> | RefillEffect

export type MoveResult<T> = {
    board: Board<T>;
    effects: Effect<T>[];
};

const copyBoard = <T>(board: Board<T>): Board<T> => {
    const boardCopy = board.boardPositions.map((row) => [...row]);
    return {
        width: board.width,
        height: board.height,
        boardPositions: boardCopy,
    };
};

export function create<T>(
    generator: Generator<T>,
    width: number,
    height: number
): Board<T> {
    const board = Array.from(Array(width), () =>
        Array.from({ length: height }).map(generator.next)
    );

    return {
        width,
        height,
        boardPositions: board,
    };
}

export function piece<T>(
    board: Board<T>,
    { col, row }: Position
): T | undefined {
    return board[col][row];
}

const isSwapLegal = (pos1: number, pos2: number) => {
    if (pos1 === pos2) return true;
    if (pos1 === pos2 + 1) return true;
    return pos2 > 0 && pos1 === pos2 - 1;
};

const isRowSwapLegal = (pos1: Position, pos2: Position) =>
    isSwapLegal(pos1.row, pos2.row);
const isColSwapLegal = (pos1: Position, pos2: Position) =>
    isSwapLegal(pos1.col, pos2.col);

const isNotSamePosition = (first: Position, second: Position) =>
    !(first.col === second.col && second.row === first.row);
const isRowAndColumnInVicinity = (
    first: Position,
    second: Position
): boolean => {
    return (
        (first.row === second.row && first.col !== second.col) ||
        (first.row !== second.row && first.col === second.col)
    );
};
const validators = [
    isRowSwapLegal,
    isColSwapLegal,
    isNotSamePosition,
    isRowAndColumnInVicinity,
];

const isMoveLegal = (pos1: Position, pos2: Position) =>
    validators
        .map((validator) => validator.apply(null, [pos1, pos2]))
        .every((val) => val === true);

export function canMove<T>(
    board: Board<T>,
    first: Position,
    second: Position
): boolean {
    if (isMoveLegal(first, second)) {
        console.log("lol");
        const swapCopy = swapPieces(board, first, second)
        // return isMatch(board, first, second)
        return true;
    }
    return false;
}


export function move<T>(
    generator: Generator<T>,
    board: Board<T>,
    first: Position,
    second: Position
): MoveResult<T> {
    if (!canMove(board, first, second)) return { board, effects: [] };

    board = swapPieces(board, first, second);
}

export function swapPieces<T>(
    board: Board<T>,
    first: Position,
    second: Position
): Board<T> {
    if (!canMove(board, first, second)) return board;
    const boardCopy = copyBoard(board)

    const { col: colFrist, row: rowFirst } = first;
    const { col: colSecond, row: rowSecond } = second;
    const temp = boardCopy.boardPositions[colFrist][rowFirst];

    boardCopy.boardPositions[colFrist][rowFirst] =
        boardCopy.boardPositions[colSecond][rowSecond];
    boardCopy.boardPositions[colSecond][rowSecond] = temp;
    return boardCopy;
}

export function getAllMatches<T>(board: Board<T>): Match<T>[] {



}

const implementacjaGeneratorka = () => getRandomValue(["A", "B", "C"]);

const generatorek = {
    next: implementacjaGeneratorka,
};

function getRandomValue<T>(values: T[]): T {
    const index = Math.floor(Math.random() * values.length);
    return values[index];
}

const boardzik = create(generatorek, 4, 4);
console.log("before move", boardzik.boardPositions);

const pos1: Position = {
    row: 1,
    col: 0,
};

const pos2: Position = {
    row: 2,
    col: 0,
};

swapPieces(boardzik, pos1, pos2);
console.log("after move", boardzik.boardPositions);

// const bartekCode  = <T>(board: Board<T>, first: Position, second: Position): boolean => {
//     const poss = [first, second];
//     poss.map(pos => {
//
//         const counts = board[pos.col]
//             .reduce((accu, next) =>
//                     (accu.break ?
//                         (next == board[pos.col][pos.col] ?
//                             {count: accu.count++, break: false}
//                             : {count: accu.count, break: true})
//                         : {count: accu.count, break: accu.break}),
//                 ({count: 0, break: false} as { count: number, break: boolean }))
//     })
//     return true
// }
