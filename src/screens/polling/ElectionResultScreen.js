import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getAllCastedVotes} from '../../actions/asyncActions';
import {getVoteCount} from '../../utils/helpers';
import LoadingIndicator from '../../components/common/LoadingIndicator';

const ElectionResultScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {loading, message} = useSelector(state => state.model);
  const candidates = useSelector(state => state.constitutionCandidates);
  const allCastedVotes = useSelector(state => state.allCastedVotes);

  const result = getVoteCount(
    allCastedVotes,
    route.params.election.id,
    candidates,
  );

  useEffect(() => {
    dispatch(getAllCastedVotes());
  }, []);

  if (loading) return <LoadingIndicator message={message} />;

  return (
    <View>
      {Object.values(result).map(item => {
        return (
          <Text key={item.id}>
            {item.user}: {item.count}
          </Text>
        );
      })}
    </View>
  );
};

export default ElectionResultScreen;
