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

    get getKcal(): number {
        return Macro.toFixedValue(this.kcal);
    }

    get getProtein(): number {
        return Macro.toFixedValue(this.protein);
    }

    get getCarbs(): number {
        return Macro.toFixedValue(this.carbs);
    }

    get getFat(): number {
        return Macro.toFixedValue(this.fat);
    }

    get strRepresentation(): string {
        return `${this.getKcal.toFixed(2)} kcal |
         ${this.getProtein.toFixed(2)} g | 
         ${this.getCarbs.toFixed(2)} g |
         ${this.getFat.toFixed(2)} g `;
    }

    static toFixedValue(value: number | undefined | null): number {
        const val = isNil(value) ? 0.0 : value;
        return parseFloat(val?.toPrecision(3));
    }

    static fromJSON(): Macro {
        throw new Error('missing impl')
    }
}