import { Position } from "./board";

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

export const isMoveLegal = (pos1: Position, pos2: Position) =>
    validators
        .map((validator) => validator.apply(null, [pos1, pos2]))
        .every((val) => val === true);
