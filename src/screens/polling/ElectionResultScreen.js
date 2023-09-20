import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getAllCastedVotes} from '../../actions/asyncActions';
import {getVoteCount} from '../../utils/helpers';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import TextWithLabel from '../../components/common/TextWithLabel';
import globalStyles from '../../utils/styles/globalstyles';
import Heading from '../../components/common/Heading';

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
  if (Object.values(result).length == 0)
    return <Heading text={'Nothing to show here at the moment ..'} />;

  return (
    <ScrollView>
      <Text style={[globalStyles.label, globalStyles.boldText]}>
        Polling Result
      </Text>
      <View style={[globalStyles.container, globalStyles.flexGap(10)]}>
        {Object.values(result).map(item => {
          return (
            <View key={item.id} style={styles.resultBox}>
              <TextWithLabel label={item.user} text={item.count} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultBox: {
    width: '80%',
    elevation: 5,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 15,
  },
});

export default ElectionResultScreen;
