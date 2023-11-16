import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import globalStyles from '../utils/styles/globalstyles';
import {dateFormatter, timeFormatter} from '../utils/helpers';
import {deleteElection} from '../actions/asyncActions';
import LoadingIndicator from '../components/common/LoadingIndicator';

const ElectionsScreen = () => {
  const elections = useSelector(state => state.elections);
  const {loading, message} = useSelector(state => state.model);

  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteElection(id));
  };

  if (loading) {
    return <LoadingIndicator message={message} />;
  }

  if (elections.length == 0)
    return (
      <Text style={globalStyles.boldText}>No Elections at the moment</Text>
    );

  return (
    <ScrollView>
      <View style={[globalStyles.container, globalStyles.flexGap(10)]}>
        {elections.map(item => (
          <Election key={item.id} {...item} handleDelete={handleDelete} />
        ))}
      </View>
    </ScrollView>
  );
};

const Election = ({id, electionName, startDate, endDate, handleDelete}) => {
  return (
    <View style={[globalStyles.cardView, globalStyles.container]}>
      <Text style={[globalStyles.boldText, globalStyles.txtColor()]}>
        {electionName}
      </Text>
      <Text style={globalStyles.text}>
        <Text style={globalStyles.label}>Start Date: </Text>
        {dateFormatter.format(startDate)}
      </Text>
      <Text style={globalStyles.text}>{timeFormatter.format(startDate)}</Text>
      <Text style={globalStyles.text}>
        <Text style={globalStyles.label}>End Date: </Text>
        {dateFormatter.format(endDate)}
      </Text>
      <Text style={globalStyles.text}>{timeFormatter.format(startDate)}</Text>
      <TouchableOpacity
        style={[
          globalStyles.btn,
          globalStyles.spacings({mrgnTop: 10, pdngHztl: 20}),
        ]}
        onPress={() => handleDelete(id)}>
        <Text style={globalStyles.text}> Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ElectionsScreen;
