function getRandomValue<T>(values: T[]): T {
    const index = Math.floor(Math.random() * values.length);
    return values[index];
}

const implementacjaGeneratorka = () => getRandomValue(["A", "A", "C"]);

export const generatorek = {
    next: implementacjaGeneratorka,
};