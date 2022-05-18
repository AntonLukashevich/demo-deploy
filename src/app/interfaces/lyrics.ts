import {LyricsItem} from "./lyrics-item";

export interface Lyrics {
  id: number;
  name: string;
  tonality: string;
  comment?: string;
  order?: string[];
  tags?: string[];
  items?: LyricsItem[];
}
