import { VocabularyItem } from "./vocabulary";

export interface Note extends VocabularyItem {
  id: number;
}

export type NoteList = Note[];
