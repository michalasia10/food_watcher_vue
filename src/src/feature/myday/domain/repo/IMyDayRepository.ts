import {MyDay} from '@/feature/myday/domain/entities/MyDay';
import {Meal} from "@/feature/myday/domain/entities/Meal";

export interface IMyDayRepository {


    findByDateTime(date: Date): Promise<MyDay | null>;

    findAllByMe(page: number, limit: number): Promise<MyDay[]>;

    addMeal(meal: Meal): Promise<void>;

}

