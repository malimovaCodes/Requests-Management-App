import { TDepartment, TRequest } from '@/types';

export const INITIAL_REQUESTS_MOCK: TRequest[] = [
    {
        id: '1',
        number: 1,
        creatorName: 'Иванов Иван Иванович',
        department: {
            id: '1',
            name: 'Отдел продаж',
        },
        isApproved: false,
        status: 'ON_APPROVAL',
        items: [
            {
                id: '1',
                name: 'Товар 1',
                link: 'https://www.dns-shop.ru/product/199d4c94709c880f/mikrovolnovaa-pec-haier-hmb-mm207wa-belyj/',
                unit: 'шт.',
                quantity: 10,
                price: 100,
                totalPrice: 1000,
            },
            {
                id: '2',
                name: 'Товар 2',
                unit: 'кг.',
                quantity: 5,
                price: 500,
                totalPrice: 2500,
            },
        ],
        totalPrice: 3500,
        createdAt: '2022-01-01T00:00:00.000Z',
        updatedAt: '2022-01-01T00:00:00.000Z',
    },
    {
        id: '2',
        number: 2,
        creatorName: 'Петров Петр Петрович',
        department: {
            id: '2',
            name: 'Отдел маркетинга',
        },
        isApproved: true,
        status: 'APPROVED',
        items: [
            {
                id: '1',
                name: 'Товар 1',
                link: 'https://www.dns-shop.ru/product/199d4c94709c880f/mikrovolnovaa-pec-haier-hmb-mm207wa-belyj/',
                unit: 'шт.',
                quantity: 5,
                price: 100,
                totalPrice: 500,
            },
        ],
        totalPrice: 500,
        createdAt: '2022-02-01T00:00:00.000Z',
        updatedAt: '2022-02-01T00:00:00.000Z',
    },
    {
        id: '3',
        number: 3,
        creatorName: 'Михаилов Михаил Михайлович',
        department: {
            id: '2',
            name: 'Бухгалтерия',
        },
        isApproved: true,
        status: 'ISSUED',
        items: [
            {
                id: '3',
                name: 'Товар 3',
                link: 'https://www.dns-shop.ru/product/049f89f224aad9cb/32-80-sm-televizor-haier-32-smart-tv-s2-pro-cernyj/',
                unit: 'кг.',
                quantity: 5,
                price: 100,
                totalPrice: 500,
            },
            {
                id: '4',
                name: 'Товар 4',
                link: 'https://www.dns-shop.ru/product/fde1ca257e399007/holodilnik-s-morozilnikom-haier-cef538cwg-belyj/',
                unit: 'кг.',
                quantity: 1,
                price: 760,
                totalPrice: 760,
            },
            {
                id: '7',
                name: 'Товар 7',
                unit: 'л.',
                quantity: 6,
                price: 500,
                totalPrice: 3000,
            },
        ],
        totalPrice: 4260,
        createdAt: '2022-02-01T00:00:00.000Z',
        updatedAt: '2022-02-01T00:00:00.000Z',
    },
];

export const INITIAL_DEPARTMENTS_MOCK: TDepartment[] = [
    {
        id: '1',
        name: 'Отдел продаж',
    },
    {
        id: '2',
        name: 'Отдел маркетинга',
    },
    {
        id: '3',
        name: 'Бухгалтерия',
    },
    {
        id: '4',
        name: 'Отдел разработки',
    },
];
