'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {Form, Input, Button, Select, Checkbox, Tabs, Space, Card, message, Divider} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { Request, Department } from '@/app/types';
import { addRequest } from '@/store/requestSlice';
import { AppDispatch } from '@/store/store';

const MOCK_DEPARTMENTS: Department[] = [
    { id: '1', name: 'Отдел продаж' },
    { id: '2', name: 'Отдел маркетинга' },
    { id: '3', name: 'Бухгалтерия' },
];

export default function CreateNewRequestPage() {
    const [form] = Form.useForm();
    const [isNewDepartment, setIsNewDepartment] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const items = Form.useWatch('items', form) || [];
    const grandTotal = items.reduce((sum: number, item: any) => {
        return sum + (Number(item.quantity) * Number(item.price) || 0);
    }, 0);

    const onFinish = async (values: any) => {
        if (!values.items || values.items.length === 0) {
            message.error('Нельзя создать заявку без позиций.');
            return;
        }

        const department: Department = isNewDepartment
            ? { id: crypto.randomUUID(), name: values.newDepartmentName }
            : MOCK_DEPARTMENTS.find(d => d.id === values.departmentId) || { id: '0', name: 'Неизвестно' };

        const initialStatus = values.isApproved ? 'APPROVED' : 'ON_APPROVAL';

        const newRequest: Request = {
            id: crypto.randomUUID(),
            number: Date.now(),
            creatorName: values.creatorName,
            department: department,
            isApproved: values.isApproved || false,
            status: initialStatus,
            items: values.items.map((item: any) => ({
                id: crypto.randomUUID(),
                name: item.name,
                link: item.link,
                unit: item.unit,
                quantity: Number(item.quantity),
                price: Number(item.price),
                totalPrice: Number(item.quantity) * Number(item.price)
            })),
            totalPrice: grandTotal,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        dispatch(addRequest(newRequest));
        message.success('Заявка создана!');
        router.push('/requests');
    };

    const mainContent = (
        <div style={{ maxWidth: 600, marginTop: 20 }}>
            <Form.Item
                name="creatorName"
                label="ФИО создающего"
                rules={[{ required: true, message: 'Введите ФИО' }]}
            >
                <Input placeholder="Фамилия Имя Отчество" />
            </Form.Item>

            <Form.Item label="Отдел">
                <Space orientation="vertical" style={{ width: '100%' }}>
                    {!isNewDepartment && (
                        <Form.Item
                            name="departmentId"
                            noStyle
                            rules={[{ required: true, message: 'Выберите отдел' }]}
                        >
                            <Select
                                placeholder="Выберите отдел из списка"
                                options={MOCK_DEPARTMENTS.map(d => ({ value: d.id, label: d.name }))}
                            />
                        </Form.Item>
                    )}

                    <Checkbox
                        checked={isNewDepartment}
                        onChange={(e) => {
                            setIsNewDepartment(e.target.checked);
                            if (e.target.checked) {
                                form.setFieldValue('departmentId', undefined);
                            } else {
                                form.setFieldValue('newDepartmentName', undefined);
                            }
                        }}
                    >
                        Создать новый отдел
                    </Checkbox>

                    {isNewDepartment && (
                        <Form.Item
                            name="newDepartmentName"
                            noStyle
                            rules={[{ required: true, message: 'Введите название нового отдела' }]}
                        >
                            <Input placeholder="Название нового отдела" />
                        </Form.Item>
                    )}
                </Space>
            </Form.Item>

            <Form.Item name="isApproved" valuePropName="checked">
                <Checkbox>Заявка согласована</Checkbox>
            </Form.Item>
        </div>
    );

    const itemsContent = (
        <div>
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Card
                                key={key}
                                size="small"
                                title={`Позиция ${name + 1}`}
                                style={{ marginBottom: 16 }}
                                extra={
                                    <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                        style={{ color: 'red', cursor: 'pointer' }}
                                    />
                                }
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        label="Наименование"
                                        rules={[{ required: true, message: 'Обязательное поле' }]}
                                    >
                                        <Input placeholder="Наименование товара" />
                                    </Form.Item>

                                    <Form.Item {...restField} name={[name, 'link']} label="Ссылка">
                                        <Input placeholder="Ссылка на товар" />
                                    </Form.Item>

                                    <Space align="baseline" wrap>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'unit']}
                                            label="Ед. изм."
                                            rules={[{ required: true, message: 'Выберите ед. изм.' }]}
                                        >
                                            <Select
                                                style={{ width: 100 }}
                                                options={[{ value: 'шт.', label: 'шт.' }, { value: 'кг.', label: 'кг.' }, { value: 'уп.', label: 'уп.' }]}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity']}
                                            label="Количество"
                                            rules={[
                                                { required: true, message: 'Обязательное поле' },
                                                {
                                                    validator: (_, value) => {
                                                        if (!value || value <= 0) {
                                                            return Promise.reject(new Error('Должно быть > 0'));
                                                        }
                                                        return Promise.resolve();
                                                    }
                                                }
                                            ]}
                                        >
                                            <Input type="number" style={{ width: 100 }} />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'price']}
                                            label="Цена"
                                            rules={[
                                                { required: true, message: 'Обязательное поле' },
                                                {
                                                    validator: (_, value) => {
                                                        if (value < 0) {
                                                            return Promise.reject(new Error('Не может быть < 0'));
                                                        }
                                                        return Promise.resolve();
                                                    }
                                                }
                                            ]}
                                        >
                                            <Input type="number" style={{ width: 120 }} />
                                        </Form.Item>

                                        <Form.Item
                                            shouldUpdate={(prevValues, currentValues) =>
                                                prevValues.items?.[name]?.quantity !== currentValues.items?.[name]?.quantity ||
                                                prevValues.items?.[name]?.price !== currentValues.items?.[name]?.price
                                            }
                                        >
                                            {() => {
                                                const quantity = form.getFieldValue(['items', name, 'quantity']) || 0;
                                                const price = form.getFieldValue(['items', name, 'price']) || 0;
                                                return <span style={{ marginLeft: 16, fontWeight: 'bold' }}>Итого: {quantity * price} руб.</span>;
                                            }}
                                        </Form.Item>
                                    </Space>
                                </div>
                            </Card>
                        ))}

                        <Button
                            type="dashed"
                            onClick={() => add({
                                name: '',
                                unit: 'шт.',
                                quantity: 1,
                                price: 0
                            })}
                            block
                            icon={<PlusOutlined />}
                            style={{ marginBottom: 16 }}
                        >
                            Добавить позицию
                        </Button>
                    </>
                )}
            </Form.List>

            <Divider />
            <div style={{ textAlign: 'right', fontSize: 18, fontWeight: 'bold' }}>
                Итого по заявке: {grandTotal} руб.
            </div>
        </div>
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Создание новой заявки</h1>

            <Form form={form} onFinish={onFinish} layout="vertical">
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        { key: '1', label: 'Основные данные', children: mainContent },
                        { key: '2', label: 'Состав заказа', children: itemsContent },
                    ]}
                />

                <Divider />
                <Space>
                    <Button onClick={() => router.back()}>Отменить</Button>
                    <Button type="primary" htmlType="submit">Готово</Button>
                </Space>
            </Form>
        </div>
    );
}