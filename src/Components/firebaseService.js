import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getApp } from "firebase/app";

const db = getFirestore(getApp());

export const saveTeamToFirestore = async (userId, matchId, teamData) => {
  try {
    await addDoc(collection(db, "fantasyTeams"), {
      userId,
      matchId,
      team: teamData,
      timestamp: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error saving team:", error);
    return false;
  }
};
