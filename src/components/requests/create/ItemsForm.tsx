 'use client';
import { Form, Input, Select, Button, Space, Card, FormInstance } from 'antd';
import { PlusOutlined, SaveOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TOrderItem } from '@/types';
import styles from './ItemsForm.module.scss';

interface ItemsFormProps {
    form: FormInstance;
    newItem: {
        name: string;
        link: string;
        unit: string;
        quantity: number;
        price: number;
    };
    setNewItem: (item: ItemsFormProps['newItem']) => void;
    editingIndex: number | null;
    setEditingIndex: (index: number | null) => void;
    handleAddItem: () => void;
    handleEditItem: (index: number) => void;
    handleCancelEdit: () => void;
    grandTotal: number;
    items: TOrderItem[];
}

export function ItemsForm({
    form,
    newItem,
    setNewItem,
    editingIndex,
    handleAddItem,
    handleEditItem,
    handleCancelEdit,
    grandTotal,
    items,
}: ItemsFormProps) {
    return (
        <div className="flex flex-col gap-6">
            <AddPositionForm
                newItem={newItem}
                setNewItem={setNewItem}
                editingIndex={editingIndex}
                handleAddItem={handleAddItem}
                handleCancelEdit={handleCancelEdit}
            />

            <Form.List name="items">
                {(fields, { remove }) => (
                    <>
                        {fields.length > 0 &&
                            fields.map(({ key, name }, index) => {
                                const item = form.getFieldValue(['items', name]);
                                const quantity = item?.quantity || 0;
                                const price = item?.price || 0;
                                const total = quantity * price;

                                return (
                                    <PositionCard
                                        key={key}
                                        index={index}
                                        item={item}
                                        quantity={quantity}
                                        price={price}
                                        total={total}
                                        isEditing={editingIndex === index}
                                        onEdit={() => handleEditItem(index)}
                                        onDelete={() => remove(name)}
                                        editDisabled={editingIndex !== null}
                                        deleteDisabled={editingIndex === index}
                                    />
                                );
                            })}
                    </>
                )}
            </Form.List>

            {items.length > 0 && <ItemsTotal grandTotal={grandTotal} />}
        </div>
    );
}

interface AddPositionFormProps {
    newItem: ItemsFormProps['newItem'];
    setNewItem: ItemsFormProps['setNewItem'];
    editingIndex: number | null;
    handleAddItem: () => void;
    handleCancelEdit: () => void;
}

function AddPositionForm({
    newItem,
    setNewItem,
    editingIndex,
    handleAddItem,
    handleCancelEdit,
}: AddPositionFormProps) {
    const isEditing = editingIndex !== null;

    return (
        <Card>
            <h3 className={isEditing ? styles.formTitle_editing : styles.formTitle}>
                {isEditing ? 'Редактирование позиции' : 'Добавление новой позиции'}
            </h3>

            <div className="grid grid-cols-1 mb-4">
                <Form.Item label={<span className="font-semibold">* Наименование</span>}>
                    <Input
                        placeholder="Наименование позиции"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                </Form.Item>

                <Form.Item label="Ссылка">
                    <Input
                        placeholder="Ссылка на товар"
                        value={newItem.link}
                        onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                    />
                </Form.Item>

                <Form.Item label={<span className="font-semibold">Единицы измерения</span>}>
                    <Select
                        className="w-[100px]"
                        options={[
                            { value: 'шт.', label: 'шт.' },
                            { value: 'кг.', label: 'кг.' },
                            { value: 'уп.', label: 'уп.' },
                        ]}
                        value={newItem.unit}
                        onChange={(value) => setNewItem({ ...newItem, unit: value })}
                    />
                </Form.Item>

                <Form.Item label={<span className="font-semibold">Количество</span>}>
                    <Input
                        type="number"
                        placeholder="0"
                        value={newItem.quantity}
                        onChange={(e) =>
                            setNewItem({ ...newItem, quantity: Number(e.target.value) })
                        }
                    />
                </Form.Item>

                <Form.Item label={<span className="font-semibold">Цена (за 1 шт.)</span>}>
                    <Space.Compact>
                        <Input
                            type="number"
                            placeholder="0"
                            value={newItem.price}
                            onChange={(e) =>
                                setNewItem({ ...newItem, price: Number(e.target.value) })
                            }
                        />
                        <span className="ant-input-group-addon">руб.</span>
                    </Space.Compact>
                </Form.Item>

                <Form.Item label="Общая стоимость">
                    <Input
                        disabled
                        value={`${(newItem.quantity * newItem.price).toFixed(2)} руб.`}
                        className="bg-white"
                    />
                </Form.Item>
            </div>

            <Space>
                <Button
                    type="primary"
                    onClick={handleAddItem}
                    icon={editingIndex !== null ? <SaveOutlined /> : <PlusOutlined />}
                    disabled={!newItem.name || newItem.quantity <= 0}
                >
                    {editingIndex !== null ? 'Сохранить изменения' : 'Добавить позицию'}
                </Button>

                {editingIndex !== null && <Button onClick={handleCancelEdit}>Отмена</Button>}
            </Space>
        </Card>
    );
}

interface PositionCardProps {
    index: number;
    item: Partial<import('@/types').TOrderItem> | undefined;
    quantity: number;
    price: number;
    total: number;
    isEditing: boolean;
    onEdit: () => void;
    onDelete: () => void;
    editDisabled: boolean;
    deleteDisabled: boolean;
}

function PositionCard({
    index,
    item,
    quantity,
    price,
    total,
    isEditing,
    onEdit,
    onDelete,
    editDisabled,
    deleteDisabled,
}: PositionCardProps) {
    return (
        <div className={`${styles.positionCard} ${isEditing ? styles.positionCard_editing : ''}`}>
            <div className={styles.cardHeader}>
                <div className={styles.itemName}>
                    <span className={styles.itemIndex}>{index + 1}</span>
                    {item?.name || `Позиция ${index + 1}`}
                </div>
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={onEdit}
                        disabled={editDisabled}
                    >
                        Редактировать
                    </Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        onClick={onDelete}
                        disabled={deleteDisabled}
                    >
                        Удалить
                    </Button>
                </Space>
            </div>

            <div className={styles.detailsContainer}>
                <div>
                    <div className={styles.detailLabel}>Ед. изм.</div>
                    <div>{item?.unit || '-'}</div>
                </div>
                <div>
                    <div className={styles.detailLabel}>Кол-во</div>
                    <div>{quantity}</div>
                </div>
                <div>
                    <div className={styles.detailLabel}>Цена</div>
                    <div>{price} ₽</div>
                </div>
                <div>
                    <div className={styles.detailLabel}>Стоимость</div>
                    <div className={styles.totalValue}>{total.toFixed(2)} ₽</div>
                </div>
            </div>
        </div>
    );
}

interface ItemsTotalProps {
    grandTotal: number;
}

function ItemsTotal({ grandTotal }: ItemsTotalProps) {
    return (
        <div className={styles.totalContainer}>
            <span className={styles.totalLabel}>Итоговая сумма:</span>
            <span className={styles.totalValue}>{grandTotal.toFixed(2)} руб.</span>
        </div>
    );
}
