import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '@store/slice';
import * as selectors from '@store/selector';
import amplitude from '@app/amplitude';

import useCookie from './useCookie';

/**
 * a/b 테스트용 훅\
 * 응답에 문제가 있으면 무조건 A를 반환
 * @param {number} experimentId Experiment Id
 * @param {string} triggeringEvent Triggering Event
 * @param {object} options name 키로 identity 임의 설정 가능
 * @returns 'A'/'B' 같은 플래그값
 */
const useABFlag = (experimentId, triggeringEvent, options = {}) => {
  const experiment = useSelector(selectors.experimentSelector);
  const dispatch = useDispatch();
  const [authorization] = useCookie('authorization');
  const isLogined = !!authorization;

  // 테스트용 히든 기능. sessionStorage.setItem('secret_${experimentId}', 'A')
  const secret = sessionStorage.getItem(`secret_${experimentId}`);

  const identity =
    options.name ??
    (isLogined ? experiment.accountId : amplitude.getDeviceId()); // 로그인했으면 암호화된 accountId, 비로그인은 deviceId

  const flag = useMemo(() => {
    if (secret) {
      return secret;
    }
    return experiment.experiment[experimentId];
  }, [experimentId, experiment.experiment, secret]);

  useEffect(() => {
    if (!secret) {
      dispatch(
        actions.postExperiment({
          name: identity,
          exp_key: experimentId,
          event_name: triggeringEvent,
        })
      );
    }
  }, [experimentId, triggeringEvent, identity, secret, dispatch]);

  return flag;
};

export default useABFlag;
