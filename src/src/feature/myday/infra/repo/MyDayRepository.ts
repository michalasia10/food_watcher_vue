import {MyDay} from "@/feature/myday/domain/entities/MyDay";
import {Meal} from "@/feature/myday/domain/entities/Meal";
import {type IMyDayRepository} from "@/feature/myday/domain/repo/IMyDayRepository";
import {Axios, HttpStatusCode} from 'axios';

export class MyDayRepository implements IMyDayRepository {
    private endpoint = 'consumption/'

    constructor(public axiosObject: Axios) {
    }

    async findByDateTime(date: Date): Promise<MyDay | null> {
        const response = (await this.axiosObject
            .get(`this.endpoint/by_datetime_for_user/${date.toISOString()}`))
            .data;

        if (!response) {
            return null;
        }

        return MyDay.fromJSON(response);
    }

    async findAllByMe(page: number = 0, limit: number = 20): Promise<MyDay[]> {
        const response = (await this.axiosObject
            .get(`${this.endpoint}/by_user_id`
                , {
                    params: {
                        skip: page,
                        limit: limit,
                    }
                }))
            .data;

        return response.map((day: any) => MyDay.fromJSON(day));
    }

    async addMeal(meal: Meal): Promise<void> {
        const response = await this.axiosObject.post(`${this.endpoint}/add_meal`, meal.toJSON());
        if (response.status !== HttpStatusCode.Ok) {
            console.error('Error adding meal');
        }

    }

}