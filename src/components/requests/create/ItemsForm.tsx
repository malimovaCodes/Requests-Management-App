import { Form, Input, Select, Button, Space, Card, FormInstance } from 'antd';
import { PlusOutlined, SaveOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TOrderItem } from '@/types';

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
    setEditingIndex,
    handleAddItem,
    handleEditItem,
    handleCancelEdit,
    grandTotal,
    items,
}: ItemsFormProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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

            {items.length > 0 && (
                <ItemsTotal grandTotal={grandTotal} />
            )}
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
    return (
        <Card>
            <h3
                style={{
                    margin: '0 0 16px 0',
                    color: editingIndex !== null ? '#fa8c16' : 'inherit',
                }}
            >
                {editingIndex !== null ? 'Редактирование позиции' : 'Добавление новой позиции'}
            </h3>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    marginBottom: 16,
                }}
            >
                <Form.Item label={<span style={{ fontWeight: 600 }}>* Наименование</span>}>
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

                <Form.Item label={<span style={{ fontWeight: 600 }}>Единицы измерения</span>}>
                    <Select
                        style={{ width: 100 }}
                        options={[
                            { value: 'шт.', label: 'шт.' },
                            { value: 'кг.', label: 'кг.' },
                            { value: 'уп.', label: 'уп.' },
                        ]}
                        value={newItem.unit}
                        onChange={(value) => setNewItem({ ...newItem, unit: value })}
                    />
                </Form.Item>

                <Form.Item label={<span style={{ fontWeight: 600 }}>Количество</span>}>
                    <Input
                        type="number"
                        placeholder="0"
                        value={newItem.quantity}
                        onChange={(e) =>
                            setNewItem({ ...newItem, quantity: Number(e.target.value) })
                        }
                    />
                </Form.Item>

                <Form.Item label={<span style={{ fontWeight: 600 }}>Цена (за 1 шт.)</span>}>
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
                        style={{ backgroundColor: '#fff' }}
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
    item: any;
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
        <div
            style={{
                padding: 16,
                backgroundColor: isEditing ? '#fff7e6' : '#fff',
                border: isEditing ? '2px solid #faad14' : '1px solid #e8e8e8',
                borderRadius: 8,
                marginBottom: 12,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                }}
            >
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                    <span style={{ color: '#1890ff', marginRight: 8 }}>{index + 1}</span>
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

            <div
                style={{
                    display: 'flex',
                    gap: 24,
                    fontSize: 12,
                    color: '#666',
                    marginTop: 8,
                }}
            >
                <div>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 4 }}>ЕД. ИЗМ.</div>
                    <div>{item?.unit || '-'}</div>
                </div>
                <div>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 4 }}>КОЛ-ВО</div>
                    <div>{quantity}</div>
                </div>
                <div>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 4 }}>ЦЕНА</div>
                    <div>{price} ₽</div>
                </div>
                <div>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 4 }}>СТОИМОСТЬ</div>
                    <div style={{ color: '#1890ff', fontWeight: 600 }}>{total.toFixed(2)} ₽</div>
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
        <div
            style={{
                padding: 16,
                backgroundColor: '#e6f7ff',
                borderRadius: 8,
                textAlign: 'right',
                fontSize: 16,
            }}
        >
            <span style={{ color: '#666', marginRight: 16 }}>Итоговая сумма:</span>
            <span style={{ color: '#1890ff', fontWeight: 700, fontSize: 20 }}>
                {grandTotal.toFixed(2)} руб.
            </span>
        </div>
    );
}