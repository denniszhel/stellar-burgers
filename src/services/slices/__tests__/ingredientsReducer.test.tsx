import reducer, {
  getIngredientsList,
  initialState as ingredientsInitialState
} from '../ingredients';

const ingredientsMockData = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  }
];

describe('Тестирование ingredientsReducer', () => {
  describe('Асинхронная функция для получения ингридиентов: fetchIngredients', () => {
    test('Начало запроса: fetchIngredients.pending', () => {
      const state = reducer(
        ingredientsInitialState,
        getIngredientsList.pending('pending')
      );

      expect(state.loading).toBeTruthy();
      expect(state.error).toBe("");
    });

    test('Результат запроса: fetchIngredients.fulfilled', () => {
      const state = reducer(
        ingredientsInitialState,
        getIngredientsList.fulfilled(ingredientsMockData, 'fulfilled')
      );

      expect(state.loading).toBeFalsy();
      expect(state.error).toBe("");
      expect(state.ingredients).toEqual(ingredientsMockData);
    });

    test('Ошибка запроса: fetchIngredients.rejected', () => {
      const error = 'fetchIngredients.rejected';

      const state = reducer(
        ingredientsInitialState,
        getIngredientsList.rejected(new Error(error), 'rejected')
      );

      expect(state.loading).toBeFalsy();
      expect(state.error).toEqual(error);
    });
  });
});
