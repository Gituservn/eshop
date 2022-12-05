export const categories = [
    {id: 1, name: 'Постільна білизна'},
    {id: 2, name: 'Подушки'},
    {id: 3, name: 'Ковдри'},
    {id: 4, name: 'Наматрацники'}
];
export const brands = [
    {id: 1, name: "Комфорт-текстиль"},
    {id: 2, name: "Idea"},
    {id: 3, name: 'Billerbeck'}
];

export const material = [
    {id: 1, name: "Сатин однотонний премім"},
    {id: 2, name: "Сатин однотонний люкс"},
    {id: 3, name: 'Страйп сатин преміум'},
    {id: 4, name: 'Страйп сатин люкс'},
    {id: 5, name: 'Страйп сатин еліт'},
    {id: 6, name: 'Multi stripe'},
];

export const statusSizes =[
    {id:1, name:"В наявності", status:1},
    {id:2,  name:"Відсутній",status:0},
]


export const initialState ={
    name: '',
    imageURL: '',
    price: 0,
    category: '',
    brand: '',
    pillowSize40:'',
    pillowSize50:'',
    pillowSize70:'',
    pillowSize50plus:'',
    pillowSize40plus:'',
    sizeOne:0,
    sizeTwo:0,
    sizeEuro:0,
    material: '',
    desc: '',
}