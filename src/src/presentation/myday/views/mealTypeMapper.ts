enum MealTypeMapper {
    BREAKFAST = 'breakfast',
    LUNCH = 'lunch',
    DINNER = 'dinner',
}

namespace MealTypeMapper {
    export function fromString(mealType: string): MealTypeMapper {
        switch (mealType) {
            case MealTypeMapper.BREAKFAST:
                return "Śniadanie";
            case MealTypeMapper.LUNCH:
                return "Obiad";
            case MealTypeMapper.DINNER:
                return "Kolacja";
            default:
                throw new Error('Unknown meal type');
        }
    }
}
export default MealTypeMapper;
