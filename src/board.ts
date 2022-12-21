import { isMoveLegal } from "./isMoveLegal";

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

    const { col: colFirst, row: rowFirst } = first;
    const { col: colSecond, row: rowSecond } = second;
    const temp = boardCopy.boardPositions[colFirst][rowFirst];

    boardCopy.boardPositions[colFirst][rowFirst] =
        boardCopy.boardPositions[colSecond][rowSecond];
    boardCopy.boardPositions[colSecond][rowSecond] = temp;
    return boardCopy;
}

export function removeMatchesFromBoard<T>(board: Board<T>, matchesArray: Match<T>[]): Board<T> {
    const boardResult = copyBoard(board);

    return matchesArray.reduce((acc, match) => {
        match.positions.forEach(pos => {
            acc[pos.row][pos.col] = null;
        });
        return acc;
    }, boardResult);
}

function rearrangeArray(arr: (string)[]): (string)[] {

    const filledPositions = arr.filter(val => val !== null);

    const emptyPositions = new Array(arr.length - filledPositions.length).fill(null);

    return emptyPositions.concat(filledPositions);
}

export function fillBoardAfterRemoval<T>(board: Board<T>) {

    for (let x = 0; x < board.width; x++) {
        let columnToReorganize = []
        for(let y = 0; y < board.height; y++) {
                columnToReorganize.push(board[x][y])
            }
        columnToReorganize = rearrangeArray(columnToReorganize);
        for(let i = 0; i < board.height; i++) {
            board.boardPositions[x][i] = columnToReorganize[i];
        }
    }
    return board;
}

function getMatches<T>(board: Board<T>, minLength: number): Match<T>[] {
    const matches: Match<T>[] = [];

    board.boardPositions.forEach((row, rowIndex) => {
        row.forEach((current, colIndex) => {
            if (current === "") {
                return;
            }

            if (colIndex < row.length - minLength + 1) {
                const horizontalMatch = row.slice(colIndex, colIndex + minLength);
                if (horizontalMatch.every((val) => val === current)) {
                    matches.push({
                        matched: current,
                        positions: horizontalMatch.map((_, i) => ({
                            row: rowIndex,
                            col: colIndex + i,
                        })),
                    });
                }
            }

            if (rowIndex < board.boardPositions.length - minLength + 1) {
                const verticalMatch = board.boardPositions
                    .slice(rowIndex, rowIndex + minLength)
                    .map((row) => row[colIndex]);
                if (verticalMatch.every((val) => val === current)) {
                    matches.push({
                        matched: current,
                        positions: verticalMatch.map((_, i) => ({
                            row: rowIndex + i,
                            col: colIndex,
                        })),
                    });
                }
            }
        });
    });

    return matches;
}

const implementacjaGeneratorka = () => getRandomValue(["A", "A", "C"]);

const generatorek = {
    next: implementacjaGeneratorka,
};

function getRandomValue<T>(values: T[]): T {
    const index = Math.floor(Math.random() * values.length);
    return values[index];
}

const boardzik = create(generatorek, 4, 4);
console.log("before move", boardzik.boardPositions);
const matches = getMatches(boardzik, 3)
console.dir(matches, {depth: null})



const bartekCode  = <T>(board: Board<T>, first: Position, second: Position): boolean => {
    const poss = [first, second];
    poss.map(pos => {

        const counts = board[pos.col]
            .reduce((accu, next) =>
                    (accu.break ?
                        (next == board[pos.col][pos.col] ?
                            {count: accu.count++, break: false}
                            : {count: accu.count, break: true})
                        : {count: accu.count, break: accu.break}),
                ({count: 0, break: false} as { count: number, break: boolean }))
    })
    return true
}