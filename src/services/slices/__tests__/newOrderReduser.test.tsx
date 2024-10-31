import reducer, {
  createOrder,
  initialState as newOrderInitialState
} from '../newOrder';

const ordersMockData = [
  {
    _id: '6622337897ede0001d0666b5',
    status: 'done',
    name: 'EXAMPLE_NAME',
    createdAt: '2024-10-29T09:03:52.748Z',
    updatedAt: '2024-10-29T09:03:58.057Z',
    number: 40000,
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ]
  }
];

describe('Асинхронная функция для создания заказа: createOrder', () => {
  test('Начало запроса: createOrder.pending', () => {
    const state = reducer(
      newOrderInitialState,
      createOrder.pending('pending', ordersMockData[0].ingredients)
    );

    expect(state.orderRequest).toBeTruthy();
  });

  test('Результат запроса: createOrder.fulfilled', () => {
    const newOrderResponce = {
      order: ordersMockData[0], 
      name: 'EXAMPLE_NAME', 
      success: true 
    };
    const state = reducer(
      newOrderInitialState,
      createOrder.fulfilled(
        newOrderResponce,
        'fulfilled',
        ordersMockData[0].ingredients
      )
    );

    expect(state.orderRequest).toBeFalsy();
    expect(state.orderModalData).toEqual(ordersMockData[0]);
  });

  test('Ошибка запроса: createOrder.rejected', () => {
    const error = 'createOrder.rejected';

    const state = reducer(
      newOrderInitialState,
      createOrder.rejected(new Error(error), 'rejected', [])
    );

    expect(state.orderRequest).toBeFalsy();
  });
});
