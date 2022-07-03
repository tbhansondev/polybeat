import { Ball } from '../classes/ball/ball';
import { Polygon } from '../classes/polygon/polygon';

export interface ITrack {
  sides: number;
  polygon: Polygon;
  ball: Ball;
  color: string;
  colorSuppressed: string;
  isSuppressed: boolean;
}
