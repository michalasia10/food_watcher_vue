import {MyDay} from "@/feature/myday/domain/entities/MyDay";
import {Meal} from "@/feature/myday/domain/entities/Meal";
import {type IMyDayRepository} from "@/feature/myday/domain/repo/IMyDayRepository";


export class MyDayService {
    constructor(private myDayRepository: IMyDayRepository) {
        this.myDayRepository = myDayRepository;
    }

    async findByDateTime(date: Date): Promise<MyDay | null> {
        return this.myDayRepository.findByDateTime(date)
    }

    async findAllByMe(page: number = 0, limit: number = 20): Promise<MyDay[]> {
        return this.myDayRepository.findAllByMe(page, limit);
    }

    async addMeal(meal: Meal): Promise<void> {
        return this.myDayRepository.addMeal(meal);
    }
}