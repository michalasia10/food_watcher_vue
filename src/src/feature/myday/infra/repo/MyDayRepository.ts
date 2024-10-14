import {MyDay} from "@/feature/myday/domain/entities/MyDay";
import {Meal} from "@/feature/myday/domain/entities/Meal";
import {type IMyDayRepository} from "@/feature/myday/domain/repo/IMyDayRepository";
import {Axios, HttpStatusCode} from 'axios';
import {format} from 'date-fns';

export class MyDayRepository implements IMyDayRepository {
    private endpoint = 'consumption/'

    constructor(public axiosObject: Axios) {
    }

    async findByDateTime(date: Date): Promise<MyDay | null> {
        const response = await this.axiosObject
            .get(`${this.endpoint}by_datetime_for_user/${format(date, 'yyyy-MM-dd')}/`);

        if (response.status !== HttpStatusCode.Ok.valueOf()) {
            return null;
        }
        return MyDay.fromJSON(response.data);
    }

    async findAllByMe(page: number = 0, limit: number = 20): Promise<MyDay[]> {
        const response = (await this.axiosObject
            .get(`${this.endpoint}by_user_id`
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
        const response = await this.axiosObject.post(`${this.endpoint}add_meal/`, meal);
        if (response.status !== HttpStatusCode.Ok) {
            console.error('Error adding meal');
        }

    }

}