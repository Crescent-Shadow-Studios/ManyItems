export declare class Random {
    bubble: RandomBubble | null;
    complex: RandomComplex | null;
    simple: number | null;
    calcType: "int" | "bubble" | "complex";
    constructor(calcType: "int" | "bubble" | "complex", simple?: number | null, bubble?: RandomBubble | null, complex?: RandomComplex | null);
    private static err_calcType;
    calc_int(): number;
    calc_bubble(): number;
    calc_complex(): number;
    calc(type?: "int" | "bubble" | "complex"): number;
    static from(random: Random_Obj): Random;
    roll(): number;
    get rand(): number;
    get calc_simple(): number;
    get int(): number;
}
interface RandomBubble {
    min: number;
    max: number;
}
interface RandomComplex {
    force: number;
    random: RandomBubble;
}
declare type Random_Obj = number | RandomBubble | RandomComplex;
export {};
