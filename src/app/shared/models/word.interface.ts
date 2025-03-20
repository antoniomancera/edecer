//Reusable interface for WordFr and WordSp
export interface Word {
  id: number;
  name: string;
}

//Reusable interface for WordSenseFr and WordSenseSp
export interface WordSense {
  id: number;
  wordFr?: Word;
  wordSp?: Word;
  definition: string;
}
