import { EActionType, ISetVersion } from './types';

export function getVersion(version: string): ISetVersion {
  return {
    type: EActionType.SET_VERSION,
    payload: version,
  }
}
