import reducer, {
  getUserOrders,
  getUserOrderByNumber,
  initialState as ordersInitialState
} from '../userOrders';

const ordersMockData = {
  success: true,
  orders: [
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
      ],
    }
  ]
};

describe('Тестирование userOrdersReducer', () => {
  describe('Асинхронная функция для получения ленты заказов: getUserOrders', () => {
    test('Начало запроса: getUserOrders.pending', () => {
      const state = reducer(ordersInitialState, getUserOrders.pending('pending'));

      expect(state.isLoading).toBeTruthy();
    });

    test('Результат запроса: getUserOrders.fulfilled', () => {
      const state = reducer(
        ordersInitialState,
        getUserOrders.fulfilled(ordersMockData.orders, 'fulfilled')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.orders).toEqual(ordersMockData.orders);
    });

    test('Ошибка запроса: getUserOrders.rejected', () => {
      const error = 'getUserOrders.rejected';

      const state = reducer(
        ordersInitialState,
        getUserOrders.rejected(new Error(error), 'rejected')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.orders.length).toEqual(0);
    });
  });
  describe('Асинхронная функция для получения заказа по номеру: getUserOrderByNumber', () => {
    test('Начало запроса: getUserOrderByNumber.pending', () => {
      const state = reducer(ordersInitialState, getUserOrderByNumber.pending('pending', 40000));

      expect(state.isLoading).toBeTruthy();
    });

    test('Результат запроса: getUserOrderByNumber.fulfilled', () => {
      const state = reducer(
        ordersInitialState,
        getUserOrderByNumber.fulfilled(ordersMockData, 'fulfilled', 40000)
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.orders).toEqual(ordersMockData.orders);
    });

    test('Ошибка запроса: getUserOrderByNumber.rejected', () => {
      const error = 'getUserOrderByNumber.rejected';

      const state = reducer(
        ordersInitialState,
        getUserOrderByNumber.rejected(new Error(error), 'rejected', 40000)
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.orders.length).toEqual(0);
    });
  });
});

