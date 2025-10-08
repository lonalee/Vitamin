import { useEffect, useRef } from 'react';

/**
 * componentWillUnmount 훅
 * @param {function} callback 컴포넌트가 언마운트 되기 직전에 실행할 함수
 */
const useComponentWillUnmount = (callback) => {
  const callbackRef = useRef();
  callbackRef.current = callback;

  useEffect(
    () => () => {
      callbackRef.current();
    },
    []
  );
};

export default useComponentWillUnmount;
