import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { getOngoingElections, showAlert } from '../../utils/helpers'
import ScreenComponent from '../../components/polling/ScreenComponent'
import CastVoteScreen from './CastVoteScreen'
import { getUserVotes } from '../../actions/asyncActions'
import LoadingIndicator from '../../components/common/LoadingIndicator'

const Stack = createNativeStackNavigator()

const ActivePolScreen = ({ navigation }) => {
  const userVotes = useSelector(state => state.votesCasted)
  const user = useSelector(state => state.user)
  const { loading, message } = useSelector(state => state.model)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserVotes())
  }, [])

  const btnHandler = election => {
    const userAlreadyVoted = userVotes.some(
      vote => vote.user === user.email && vote.electionId === election.id
    )

    if (userAlreadyVoted) {
      showAlert('You have already voted in this election..')
      return
    }

    navigation.navigate('CastVoteScreen', { election })
  }

  if (loading) return <LoadingIndicator message={message} />

  return (
    <ScreenComponent
      title={'On going Elections'}
      filterElections={getOngoingElections}
      btnTitle={'Cast Vote'}
      btnHandler={btnHandler}
    />
  )
}

const Navigator = () => (
  <Stack.Navigator initialRouteName='ActivePolScreen' screenOptions={{ headerShown: false }}>
    <Stack.Screen name='ActivePolScreen' component={ActivePolScreen} />
    <Stack.Screen name='CastVoteScreen' component={CastVoteScreen} />
  </Stack.Navigator>
)

export default Navigator
