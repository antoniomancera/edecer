import { BasicEntity } from './basic-entity.interface';

export interface Person extends BasicEntity {
  globalIndex?: number;
}
export interface Gender extends BasicEntity {
  globalIndex?: number;
}
export interface Number extends BasicEntity {
  globalIndex?: number;
}
