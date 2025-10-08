import { useCallback, useReducer } from 'react';
import Cookies from 'js-cookie';

/**
 * 쿠키를 다루는 훅
 * @param {string} key 쿠키에 저장할 키
 * @param {*} defaultValue 값이 없을 때 사용할 기본값
 * @returns {array} [저장된 값, 변경 함수, 삭제 함수]
 */
const useCookie = (key, defaultValue = null) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const storedValue = (() => {
    const value = Cookies.get(key);
    if (value) {
      return value;
    }
    return defaultValue;
  })();

  const setValue = useCallback(
    (newValue, expires) => {
      Cookies.set(key, newValue, {
        expires,
        SameSite: 'Lax',
      });
      forceUpdate();
    },
    [key]
  );

  const delValue = useCallback(() => {
    Cookies.remove(key, { SameSite: 'Lax' });
    forceUpdate();
  }, [key]);

  return [storedValue, setValue, delValue];
};

export default useCookie;
