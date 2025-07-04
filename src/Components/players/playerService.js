// src/Components/players/playerService.js

import { CSK_PLAYERS } from './CSK_PLAYERS';
import { DC_PLAYERS } from './DC_PLAYERS';
import { GT_PLAYERS } from './GT_PLAYERS';
import { KKR_PLAYERS } from './KKR_PLAYERS';
import { LSG_PLAYERS } from './LSG_PLAYERS';
import { MI_PLAYERS } from './MI_PLAYERS';
import { PBKS_PLAYERS } from './PBKS_PLAYERS';
import { RCB_PLAYERS } from './RCB_PLAYERS';
import { RR_PLAYERS } from './RR_PLAYERS';
import { SRH_PLAYERS } from './SRH_PLAYERS';

const allTeams = [
  ...CSK_PLAYERS,
  ...DC_PLAYERS,
  ...GT_PLAYERS,
  ...KKR_PLAYERS,
  ...LSG_PLAYERS,
  ...MI_PLAYERS,
  ...PBKS_PLAYERS,
  ...RCB_PLAYERS,
  ...RR_PLAYERS,
  ...SRH_PLAYERS,
];

export const loadAllPlayers = async () => {
  return allTeams.map((player, index) => ({
    ...player,
    id: player.id || `${player.name}_${player.team}_${index}`,
  }));
};
