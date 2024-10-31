import reducer, {
  addItem,
  deleteItem,
  clearAll,
  updateAll,
  initialState as constructorInitialState
} from '../constructor';

const bunMockData = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: '',
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
};

const ingredient1MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '1234567890',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
};

const ingredient2MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '0987654321',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
};

describe('Тестирование builderReducer', () => {
  describe('Работа с булками', () => {
    test('Установка булки', () => {
      const state = reducer(constructorInitialState, addItem(bunMockData));

      const updatedObject = { ...state.bun } as Record<string, any>;
      updatedObject.id = '';

      // Объект букли в сторе и установленный вручную совпадают
      expect(updatedObject).toEqual(bunMockData);
      // Остальные ингредиенты не изменились при добавлении только булки
      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('Работа с ингридиентами', () => {
    test('Добавление ингредиента', () => {
      const state = reducer(
        constructorInitialState,
        addItem(ingredient1MockData)
      );

      // У конструктора появился новый ингридиент
      expect(state.ingredients).toHaveLength(1);

      const updatedObject = { ...state.ingredients[0] } as Record<string, any>;
      delete updatedObject['id'];

      const initialObject = { ...ingredient1MockData } as Record<string, any>;
      delete initialObject['id'];

      expect(updatedObject).toEqual(initialObject);
      // Булка не изменилась
      expect(state.bun).toBeNull();
    });

    test('Удаление ингредиента', () => {
      const _initialState = {
        bun: null,
        ingredients: [ingredient1MockData, ingredient2MockData]
      };

      const state = reducer(
        _initialState,
        deleteItem(ingredient1MockData)
      );

      // У конструктора удалился 1 ингридиент
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(ingredient2MockData);
      // Булка не изменилась
      expect(state.bun).toBeNull();
    });

    test('Обновление списка ингредиентов', () => {
      const _initialState = {
        bun: null,
        ingredients: []
      };
      
      const state = reducer(
        _initialState,
        updateAll([ingredient1MockData, ingredient2MockData])
      );

      // У конструктора появилось два ингредиента
      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0]).toEqual(ingredient1MockData);
      // Булка не изменилась
      expect(state.bun).toBeNull();

    });

  });

  test('Очистка конструктора', () => {
    const _initialState = {
      bun: bunMockData,
      ingredients: [ingredient1MockData, ingredient2MockData]
    };

    const state = reducer(_initialState, clearAll());

    // Конструктор очистился
    expect(state.ingredients).toHaveLength(0);
    expect(state.bun).toBeNull();
  });
});
