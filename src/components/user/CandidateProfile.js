import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Avatar, Card} from 'react-native-elements';
import {useSelector} from 'react-redux';
import globalStyles from '../../utils/styles/globalstyles';

const CandidateProfile = () => {
  const candidate = useSelector(state => state.candidate);
  console.log('in candidateProfile', candidate);
  return (
    <View style={globalStyles.container}>
      <Card>
        <Avatar
          rounded
          size="xlarge"
          source={{uri: candidate.partySymbol}}
          containerStyle={styles.avatarContainer}
        />
        <Text style={styles.username}>Party Name: {candidate.partyName}</Text>
        <Text style={styles.username}>
          Approved: {candidate.approved ? 'Yes' : 'Not'}
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // padding: 20,
  },
  avatarContainer: {
    alignSelf: 'center',
  },
  img: {
    width: 200,
    height: 200,
  },
  username: {
    fontSize: 24,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  divider: {
    marginVertical: 10,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  profilePic: {
    width: 200, // Adjust the width and height as needed
    height: 200,
    borderRadius: 100, // For a circular profile picture
  },
});

export default CandidateProfile;
