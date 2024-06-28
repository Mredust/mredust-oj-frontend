import {Color} from "@/utils/colorUtils";

interface DifficultyLevel {
    color: string;
    text: string;
}

class DifficultyUtils {
    static difficultyMap: { [key: number]: DifficultyLevel } = {
        0: {
            color: Color.EASY,
            text: '简单',
        },
        1: {
            color: Color.MEDIUM,
            text: '中等',
        },
        2: {
            color: Color.HARD,
            text: '困难',
        }
    };

    static getColor(difficultyLevel: number): string | undefined {
        const difficulty = this.difficultyMap[difficultyLevel];
        return difficulty ? difficulty.color : undefined;
    }

    static getText(difficultyLevel: number): string | undefined {
        const difficulty = this.difficultyMap[difficultyLevel];
        return difficulty ? difficulty.text : undefined;
    }
}

export {DifficultyUtils};
