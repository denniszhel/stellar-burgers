import reducer, { getAllFeeds, initialState as feedsInitialState } from '../feed';

const feedsMockData = {
  orders: [],
  total: 1,
  totalToday: 1,
  success: true,
};

describe('Тестирование feedsReducer', () => {
  describe('Асинхронная функция для получения ленты заказов: fetchFeeds', () => {
    test('Начало запроса: fetchFeeds.pending', () => {
      const state = reducer(feedsInitialState, getAllFeeds.pending('pending'));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBe(undefined);
    });

    test('Результат запроса: fetchFeeds.fulfilled', () => {
      const state = reducer(
        feedsInitialState,
        getAllFeeds.fulfilled(feedsMockData, 'fulfilled')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBe(undefined);
      expect(state.orders).toEqual(feedsMockData.orders);
      expect(state.total).toEqual(1);
      expect(state.totalToday).toEqual(1);
    });

    test('Ошибка запроса: fetchFeeds.rejected', () => {
      const error = 'fetchFeeds.rejected';

      const state = reducer(
        feedsInitialState,
        getAllFeeds.rejected(new Error(error), 'rejected')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toEqual(error);
    });
  });
});
