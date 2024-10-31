import reducer, {
  getUserData,
  updateUser,
  registerUser,
  loginUser,
  logoutUser,
  initialState as userInitialState
} from '../user';

const userMockData = {
  success: true,
  refreshToken: '',
  accessToken: '',
  user: {
    email: 'example@example.mail',
    name: 'Example'
  }
};

const registerMockData = {
  email: 'example@example.mail',
  name: 'Example',
  password: 'Example'
};

const loginMockData = {
  email: 'example@example.mail',
  password: 'Example'
};

describe('Тестирование userReducer', () => {
  // Регистрация
  describe('Асинхронная функция для регистрации: registerUser', () => {
    test('Начало запроса: registerUser.pending', () => {
      const state = reducer(
        userInitialState,
        registerUser.pending('pending', registerMockData)
      );

      expect(state.error).toBe('');
    });

    test('Результат запроса: registerUser.fulfilled', () => {
      const state = reducer(
        userInitialState,
        registerUser.fulfilled(userMockData, 'fulfilled', registerMockData)
      );

      expect(state.isAuchChecked).toBeTruthy();
      expect(state.error).toBe('');
      expect(state.user).toEqual(userMockData.user);
    });

    test('Ошибка запроса: registerUser.rejected', () => {
      const error = 'registerUser.rejected';

      const state = reducer(
        userInitialState,
        registerUser.rejected(new Error(error), 'rejected', registerMockData)
      );

      expect(state.error).toEqual(error);
    });
  });

  // Логин
  describe('Асинхронная функция для входа в аккаунт: loginUser', () => {
    test('Начало запроса: loginUser.pending', () => {
      const state = reducer(
        userInitialState,
        loginUser.pending('pending', loginMockData)
      );

      expect(state.error).toBe('');
    });

    test('Результат запроса: loginUser.fulfilled', () => {
      const state = reducer(
        userInitialState,
        loginUser.fulfilled(userMockData, 'fulfilled', loginMockData)
      );

      expect(state.isAuchChecked).toBeTruthy();
      expect(state.error).toBe('');
      expect(state.user).toEqual(userMockData.user);
    });

    test('Ошибка запроса: loginUser.rejected', () => {
      const error = 'loginUser.rejected';

      const state = reducer(
        userInitialState,
        loginUser.rejected(new Error(error), 'rejected', loginMockData)
      );

      expect(state.error).toEqual(error);
    });
  });

  // Выход
  describe('Асинхронная функция выхода из аккаунта: logoutUser', () => {
    test('Начало запроса: logoutUser.pending', () => {
      const state = reducer(userInitialState, logoutUser.pending('pending'));

      expect(state.error).toBe('');
    });

    test('Результат запроса: logoutUser.fulfilled', () => {
      const state = reducer(
        userInitialState,
        logoutUser.fulfilled({ success: true }, 'fulfilled')
      );

      expect(state.isAuchChecked).toBeFalsy();
      expect(state.user).toEqual({
        email: '',
        name: ''
      });
    });

    test('Ошибка запроса: logoutUser.rejected', () => {
      const error = 'logoutUser.rejected';

      const state = reducer(
        userInitialState,
        loginUser.rejected(new Error(error), 'rejected', loginMockData)
      );

      expect(state.error).toEqual(error);
    });
  });

  // Проверка авторизации
  describe('Асинхронная функция проверки авторизации: getUserData', () => {
    test('Начало запроса: getUserData.pending', () => {
      const state = reducer(userInitialState, getUserData.pending('pending'));

      expect(state.error).toBe('');
    });

    test('Результат запроса: getUserData.fulfilled', () => {
      const state = reducer(
        userInitialState,
        getUserData.fulfilled(userMockData, 'fulfilled')
      );

      expect(state.isAuchChecked).toBeTruthy();
      expect(state.user).toEqual(userMockData.user);
    });

    test('Ошибка запроса: getUserData.rejected', () => {
      const error = 'getUserData.rejected';

      const state = reducer(
        userInitialState,
        getUserData.rejected(new Error(error), 'rejected')
      );

      expect(state.isAuchChecked).toBeFalsy();
    });
  });

  // Обновление информации о пользователе
  describe('Асинхронная функция редактирования информации пользователя: updateUser', () => {
    test('Начало запроса: updateUser.pending', () => {
      const state = reducer(
        userInitialState,
        updateUser.pending('pending', userMockData.user)
      );

      expect(state.error).toBe('');
    });

    test('Результат запроса: updateUser.fulfilled', () => {
      const state = reducer(
        userInitialState,
        updateUser.fulfilled(userMockData, 'fulfilled', userMockData.user)
      );

      expect(state.user).toEqual(userMockData.user);
    });

    test('Ошибка запроса: updateUser.rejected', () => {
      const error = 'updateUser.rejected';

      const state = reducer(
        userInitialState,
        updateUser.rejected(new Error(error), 'rejected', userMockData.user)
      );

      expect(state.isAuchChecked).toBeFalsy();
    });
  });
});
