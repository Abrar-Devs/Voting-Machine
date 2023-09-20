import {View, Text, LogBox, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-native-elements';
import globalStyles from '../../utils/styles/globalstyles';
import {castVote} from '../../actions/asyncActions';
import {confirmationBox} from '../../utils/helpers';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const CastVoteScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const candidates = useSelector(state => state.constitutionCandidates);

  const selectedElection = route.params.election;

  const handleCastVote = async cid => {
    const userConfirmed = await confirmationBox();
    if (!userConfirmed) return;

    dispatch(castVote({cid, eid: selectedElection.id}));
    navigation.navigate('ActivePolScreen');
  };

  return (
    <ScrollView>
      <Text style={[globalStyles.label, globalStyles.boldText]}>
        Candidates
      </Text>
      <View style={globalStyles.spacings({pdngVrtcl: 20})}>
        {candidates.map(item => (
          <CandidateCard key={item.id} {...item} castVote={handleCastVote} />
        ))}
      </View>
    </ScrollView>
  );
};

const CandidateCard = ({id, partyName, partySymbol, user, castVote}) => {
  return (
    <Card>
      <Card.Title style={globalStyles.boldText}>{user}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={{
          uri: partySymbol,
        }}
      />
      <Text style={globalStyles.boldText}>Party: {partyName}</Text>
      <TouchableOpacity style={globalStyles.btn} onPress={() => castVote(id)}>
        <Text style={globalStyles.text()}>Vote</Text>
      </TouchableOpacity>
    </Card>
  );
};
export default CastVoteScreen;
