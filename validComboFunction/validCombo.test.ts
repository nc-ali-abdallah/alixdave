import { testCombos } from "../src/data/test-data/research-combos";
import { returnValidCombo } from "../src/gameLogic/researchFunctions";

describe("Research Combos", () => {
  test("should return an object if the inputted items match a combination and that combination isn't already assigned to the player", async () => {
    const input = [
      { name: "Wood", active: true },
      { name: "Stone", active: true },
    ];

    const player = {
      playerName: "Ali",
      villagerCount: 0,
      woodcuttingSpeed: 1,
      miningSpeed: 1,
      resources: {
        gold: 0,
        wood: 0,
        stone: 0,
      },
      research: {
        researchLevel: 1,
        researchPoints: 50,
        discoveredResearch: [
          { name: "Wood", active: true },
          { name: "Stone", active: false },
        ],
      },
    };

    const output = await returnValidCombo(input, player);

    expect(output).toEqual({ name: "Tools", active: true });
  });

describe('Mutation Testing', () => {
  test('should not mutate the inputted array', async() => {
    const input = [
      { name: "Wood", active: true },
      { name: "Stone", active: true },
    ];

    const player = {
      playerName: "Ali",
      villagerCount: 0,
      woodcuttingSpeed: 1,
      miningSpeed: 1,
      resources: {
        gold: 0,
        wood: 0,
        stone: 0,
      },
      research: {
        researchLevel: 1,
        researchPoints: 50,
        discoveredResearch: [
          { name: "Wood", active: true },
          { name: "Stone", active: false },
        ],
      },
    };

    await returnValidCombo(input, player);

    expect(input).toEqual([
      { name: "Wood", active: true },
      { name: "Stone", active: true },
    ]);
  });
  test('should not mutate the inputted player', async () => {
    const input = [
      { name: "Wood", active: true },
      { name: "Stone", active: true },
    ];

    const player = {
      playerName: "Ali",
      villagerCount: 0,
      woodcuttingSpeed: 1,
      miningSpeed: 1,
      resources: {
        gold: 0,
        wood: 0,
        stone: 0,
      },
      research: {
        researchLevel: 1,
        researchPoints: 50,
        discoveredResearch: [
          { name: "Wood", active: true },
          { name: "Stone", active: false },
        ],
      },
    };

    await returnValidCombo(input, player);

    expect(player).toEqual({
      playerName: "Ali",
      villagerCount: 0,
      woodcuttingSpeed: 1,
      miningSpeed: 1,
      resources: {
        gold: 0,
        wood: 0,
        stone: 0,
      },
      research: {
        researchLevel: 1,
        researchPoints: 50,
        discoveredResearch: [
          { name: "Wood", active: true },
          { name: "Stone", active: false },
        ],
      },
    });
  });
  });
  
  describe("Error Handling", () => {
    test("If there is no valid combinations return a status 404 and a Combination Not Found Message", async () => {
      const input = [];
      
      const player = {
        playerName: "Ali",
        villagerCount: 0,
        woodcuttingSpeed: 1,
        miningSpeed: 1,
        resources: {
          gold: 0,
          wood: 0,
          stone: 0,
        },
        research: {
          researchLevel: 1,
          researchPoints: 50,
          discoveredResearch: [
            { name: "Wood", active: true },
            { name: "Stone", active: false },
          ],
        },
      };

      try {
        await returnValidCombo(input, player);
      } catch (error) {
        expect(error.code).toBe(404);
        expect(error.msg).toBe("Combination Not Found");
      }
    });
    test("If the player already has the combination in their discovered research array error error code 400 and message Comination Already Unlocked ", async () => {
      const input = [
        { name: "Wood", active: true },
        { name: "Stone", active: false },
      ];

      const player = {
        playerName: "Ali",
        villagerCount: 0,
        woodcuttingSpeed: 1,
        miningSpeed: 1,
        resources: {
          gold: 0,
          wood: 0,
          stone: 0,
        },
        research: {
          researchLevel: 1,
          researchPoints: 50,
          discoveredResearch: [
            { name: "Wood", active: true },
            { name: "Stone", active: false },
            { name: "Tools", active: false },
          ],
        },
      };

      try {
        await returnValidCombo(input, player);
      } catch (error) {
        expect(error.code).toBe(400);
        expect(error.msg).toBe("Combination Already Unlocked");
      }
    });
  });
});
