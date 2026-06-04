import { TDepartment, TRequest } from "@/app/types"

export let initialRequests : TRequest[] = [
    {
        id: "1",
        number: 1,
        creatorName: "Иванов Иван Иванович",
        department: {
            id: "1",
            name: "Отдел продаж",
        },
        isApproved: false,
        status: "ON_APPROVAL",
        items: [
            {
                id:"1",
                name: "Товар 1",
                unit: "шт.",
                quantity: 10,
                price: 100,
                totalPrice: 1000,
            },
            {
                id:"2",
                name: "Товар 2",
                unit: "кг.",
                quantity: 5,
                price: 500,
                totalPrice: 2500,
            }
        ],
        totalPrice: 0,
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",
    },
    {
        id: "2",
        number: 2,
        creatorName: "Петров Петр Петрович",
        department: {
            id: "2",
            name: "Отдел маркетинга",
        },
        isApproved: true,
        status: "APPROVED",
        items: [
            {
                id:"1",
                name: "Товар 1",
                unit: "шт.",
                quantity: 5,
                price: 100,
                totalPrice: 500,
            }
        ],
        totalPrice: 555,
        createdAt: "2022-02-01T00:00:00.000Z",
        updatedAt: "2022-02-01T00:00:00.000Z",
    }
]

export let initialDepartments : TDepartment[] = [
    {
        id: "1",
        name: "Отдел продаж",
    },
    {
        id: "2",
        name: "Отдел маркетинга",
    },
    {
        id: "3",
        name: "Бухгалтерия",
    },
    {
        id: "4",
        name: "Отдел разработки",
    }
]