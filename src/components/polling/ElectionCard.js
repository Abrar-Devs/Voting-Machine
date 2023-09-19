import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import globalStyles from '../../utils/styles/globalstyles';
import {dateFormatter, timeFormatter} from '../../utils/helpers';

const ElectionCard = ({
  id,
  electionName,
  startDate,
  endDate,
  btnText,
  disableBtn = false,
  handleBtnClick,
}) => {
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
      <Text style={globalStyles.text}>{timeFormatter.format(endDate)}</Text>
      <TouchableOpacity
        disabled={disableBtn}
        style={[
          globalStyles.btn,
          globalStyles.spacings({mrgnTop: 10, pdngHztl: 20}),
          disableBtn ? globalStyles.disabledBtn : {},
        ]}
        onPress={() => handleBtnClick(id)}>
        <Text style={globalStyles.text}> {btnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ElectionCard;
