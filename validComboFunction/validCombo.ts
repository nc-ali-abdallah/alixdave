type researchItem = {
    name: string;
    active: boolean;
};

type PlayerStats = {
    playerName: string;
    villagerCount: number;
    woodcuttingSpeed: number;
    miningSpeed: number;
    resources: {
        gold: number;
        wood: number;
        stone: number;
    };
    research: {
        researchLevel: number;
        researchPoints: number,
        discoveredResearch: {
            name: string;
            active: boolean;
        }[];
    };
};

export const returnValidCombo = (
    researchArray: researchItem[],
    player: PlayerStats
): Promise<researchItem> => {
    return new Promise((resolve, reject) => {
        const potentialMatches = combos.filter(
            (combo) => combo.madeWith.length === researchArray.length
        );

        for (let i = 0; i < potentialMatches.length; i++) {
            let comboFound = false;
            for (let j = 0; j < researchArray.length; j++) {
                if (potentialMatches[i].madeWith.includes(researchArray[j].name)) {
                    comboFound = true;
                } else {
                    comboFound = false;
                    break;
                }
            }

            if (comboFound) {
                const researchedItem = researchData.filter(
                    (item) => item.name === potentialMatches[i].name
                );

                if (
                    !player.research.discoveredResearch.filter(
                        (research) => research.name === researchedItem[0].name
                    ).length
                ) {
                    resolve(researchedItem[0]);
                } else {
                    reject({ code: 400, msg: "Combination Already Unlocked" });
                }
            } else {
                reject({ code: 404, msg: "Combination Not Found" });
            }
        }
    });
};