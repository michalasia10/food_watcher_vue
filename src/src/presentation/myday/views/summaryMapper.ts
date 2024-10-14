interface SummaryMapperI {
    key: string;
    color: string;
    icon: string;
    unit: string;
    text: string;
    cssClass: string;
}

const commonCssClass = 'pr-2'

export const summaryMapper: SummaryMapperI[] = [
    {
        key: 'kcal',
        color: '#F44336',
        icon: 'mdi-fire',
        unit: 'kcal',
        text: 'Kalorie',
        cssClass: commonCssClass
    },
    {
        key: 'protein',
        color: '#4CAF50',
        icon: 'mdi-food-drumstick',
        unit: 'g',
        text: 'Białko',
        cssClass: 'px-4'
    },
    {
        key: 'fat',
        color: '#FFC107',
        icon: 'mdi-cheese',
        unit: 'g',
        text: 'Tłuszcze',
        cssClass: commonCssClass
    },
    {
        key: 'carbs',
        color: '#2196F3',
        icon: 'mdi-barley',
        unit: 'g',
        text: 'Węglowodany',
        cssClass: commonCssClass
    },
]