
export interface IGameState {
  gamePhases: Map<GamePhaseStatus, IGamePhase>;
  activePhase: GamePhaseStatus;
  rotation: {
    leadPlayer: string;
    leadPlayerIndex: number;
    isMemberLeadPlayer: boolean;
  };
  participants: IGamePartipant[];
  chosenWord: string;
  similarWords: ISimilarWord[];
}

export interface IGamePhase {
  id: GamePhaseStatus;
  label: string;
  active: boolean;
}

export interface IGamePartipant {
  userId: string;
  username: string;
}

export interface ISimilarWord {
  userId: string;
  userName: string;
  value: string;
}

export enum GamePhaseStatus {
  NOT_STARTED = 'NOT_STARTED',
  CHOOSING_THE_WORD = 'CHOOSING_THE_WORD',
  WRITING_SIMILAR_WORDS = 'WRITING_THE_WORD',
  GUESSING_THE_WORD = 'GUESSING_THE_WORD',
  REMOVING_SIMILAR_WORDS = 'REMOVING_SIMILAR_WORDS',
  RESULTS = 'RESULTS',
}
  