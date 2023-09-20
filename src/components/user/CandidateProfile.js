import React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Avatar, Card, Divider} from 'react-native-elements';

import TextWithLabel from '../common/TextWithLabel';
import globalStyles from '../../utils/styles/globalstyles';

const CandidateProfile = () => {
  const candidate = useSelector(state => state.candidate);

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.cardView, globalStyles.boxShadow()]}>
        <Avatar
          rounded
          size="xlarge"
          source={{uri: candidate.partySymbol}}
          containerStyle={styles.avatarContainer}
        />

        <Divider style={styles.divider} />

        <TextWithLabel
          label={'Party Name'}
          text={candidate.partyName}
          textAlign="left"
        />

        <TextWithLabel
          label={'Approved'}
          text={candidate.approved ? 'Yes' : 'Not'}
          textAlign="left"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  avatarContainer: {
    alignSelf: 'center',
  },
  divider: {
    marginVertical: 10,
  },
});

export default CandidateProfile;
