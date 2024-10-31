import {rootReducer, store} from "../../store";

describe('Тестирование rootReducer', () => {
  test('Вызов rootReducer с UNKNOWN_ACTION и undefined возвращает предыдущее состояние хранилища', () => {
    const stateBefore = store.getState();
    const stateAfter = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(stateAfter).toEqual(stateBefore);
  });
});
