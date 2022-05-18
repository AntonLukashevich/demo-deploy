import {LyricsLine} from "./lyrics-line";

export interface LyricsItem {
  name: string;
  iText?: string;
  lines: LyricsLine[];
}
