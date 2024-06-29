import { Mot } from "./Mot.model";
import { Palabra } from "./Palabra.model";

export interface MotPalabra {
         id: number;
       mot: Mot;
        palabra: Palabra;
         attempts: number;
         successes: number;
        phrase;}