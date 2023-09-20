import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import { useSelector } from 'react-redux'

import ElectionCard from './ElectionCard'
import globalStyles from '../../utils/styles/globalstyles'
import Heading from '../helpers/Heading'

const ScreenComponent = ({ title, filterElections, btnTitle, btnHandler }) => {
  const elections = useSelector(state => state.elections)
  const filteredElections = filterElections(elections)

  if (filteredElections.length == 0)
    return <Heading text={'Nothing to show here at the moment ..'} />

  return (
    <ScrollView>
      <Text style={[globalStyles.label, globalStyles.boldText]}>{title}</Text>
      <View style={[globalStyles.container, globalStyles.flexGap(20)]}>
        {filteredElections.map(election => (
          <ElectionCard
            key={election.id}
            {...election}
            btnText={btnTitle}
            handleBtnClick={() => btnHandler(election)}
            disableBtn={btnHandler == null ? true : false}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default ScreenComponent
