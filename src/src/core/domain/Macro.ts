import Entity from "@/core/domain/Entity";
import {isNil} from "lodash";

export class Macro extends Entity<Macro> {
    constructor(
        id: string | undefined,
        public kcal: number,
        public protein: number | undefined,
        public carbs: number | undefined,
        public fat: number | undefined,
    ) {
        super(id);
        this.kcal = Macro.toFixedValue(kcal);
        this.protein = Macro.toFixedValue(protein);
        this.carbs = Macro.toFixedValue(carbs);
        this.fat = Macro.toFixedValue(fat);
    }

    static toFixedValue(value: number | undefined | null): number {
        const val = isNil(value) ? 0.0 : value;
        return parseFloat(val?.toPrecision(3));
    }

    static fromJSON(): Macro {
        throw new Error('missing impl')
    }
}