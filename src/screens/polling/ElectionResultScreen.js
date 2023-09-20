import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllCastedVotes } from '../../actions/asyncActions'
import { getVoteCount } from '../../utils/helpers'
import LoadingIndicator from '../../components/helpers/LoadingIndicator'
import TextWithLabel from '../../components/helpers/TextWithLabel'
import globalStyles from '../../utils/styles/globalstyles'
import Heading from '../../components/helpers/Heading'

const ElectionResultScreen = ({ route }) => {
  const { loading, message } = useSelector(state => state.model)
  const candidates = useSelector(state => state.constitutionCandidates)
  const allCastedVotes = useSelector(state => state.allCastedVotes)
  const dispatch = useDispatch()

  const result = getVoteCount(allCastedVotes, route.params.election.id, candidates)

  useEffect(() => {
    dispatch(getAllCastedVotes())
  }, [])

  if (loading) return <LoadingIndicator message={message} />

  if (Object.values(result).length == 0)
    return <Heading text={'Nothing to show here at the moment ..'} />

  return (
    <ScrollView>
      <Text style={[globalStyles.label, globalStyles.boldText]}>Polling Result</Text>
      <View style={[globalStyles.container, globalStyles.flexGap(10)]}>
        {Object.values(result).map(candidate => (
          <View key={candidate.id} style={styles.resultBox}>
            <TextWithLabel label={candidate.user} text={candidate.count} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  resultBox: {
    width: '80%',
    elevation: 5,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 15,
  },
})

export default ElectionResultScreen
