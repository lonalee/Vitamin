import { useEffect, useRef } from 'react';

/**
 * componentDidMount 훅
 * @param {function} callback 컴포넌트가 마운트 된 직후에 실행할 함수
 */
const useComponentDidMount = (callback) => {
  const callbackRef = useRef();
  callbackRef.current = callback;
	// TODO: ref변수에 할당하지 않고 사용할 때의 차이점은?
	/** 
	 * 인수로 전달된 callback의 참조(reference) current에 저장해둠. effect가 있을 때 current변수에 있는 참조를 통해 함수를 실행
	 */

  useEffect(() => {
    callbackRef.current();
  }, []);
};

export default useComponentDidMount;
