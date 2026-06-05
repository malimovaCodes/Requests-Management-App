# Requests Management App

### Requests Management App представляет собой приложение для создания и просмотра заявок.

## Основные функции

- Создание заявки с указанием состава (позиций)
- Просмотр списка всех заявок
- Смена статуса заявки
- Фильтрация заявок по статусу, отделу, дате
- Созданные заявки хранятся в localStorage
- Несколько заявок уже созданы для демонстрации и находятся в constants/mock.ts

## Используемые технологии

- React 19
- Next.js 16
- TypeScript 5
- Redux Toolkit
- React Redux
- Ant Design 6
- Tailwind CSS 4
- SCSS
- ESLint 9
- Prettier 3

## Инструкция по запуску приложения:

1. Перейти в папку requests-management-app и выполнить команду для установки зависимостей:

```bash
    npm install
```

2. В папке requests-management-app для запуска приложения в dev-режиме выполнить команду:

```bash
    npm run dev
```

3. В браузере открыть http://localhost:3000/ и начать пользоваться приложением.

## Запуск линтера

Для запуска линтера в папке soccer-stat нужно выполнить команду:

```bash
    npm run lint
```

## Структура проекта

````text
src/
├── app/             - Next.js App Router 
│   └── requests/    - Маршруты и страницы для работы с заявками (list, new, view)
├── components/      - Переиспользуемые React-компоненты
│   ├── common/      - Общие UI-компоненты 
│   └── requests/    - Компоненты, связанные с функционалом заявок (create/list/view)
├── constants/       - Константы приложения (mock, table columns, tabs)
├── hooks/           - Кастомные React-хуки 
├── pages/           - Страницы приложения
├── store/           - Redux Toolkit
├── styles/          - Стили
├── types/           - TypeScript-типы 
├── utils/           - Утилитарные функции (форматирование дат, мапперы данных)
└── public/          - Статические ресурсы (иконки, изображения)
````
