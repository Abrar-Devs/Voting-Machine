import React from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import FormikForm from '../helpers/FormikForm'
import { applicationFormSchema } from '../../utils/validation/yupValidations'
import { submitCandidateApplication } from '../../actions/asyncActions'
import LoadingIndicator from '../helpers/LoadingIndicator'
import globalStyles from '../../utils/styles/globalstyles'

const formValues = {
  partyName: '',
}

const CandidateApplication = () => {
  const currentUser = useSelector(state => state.user)
  const { loading, message } = useSelector(state => state.model)
  const dispatch = useDispatch()

  const handleSubmit = async ({ partyName, profilePic }) => {
    const applicationObj = {
      user: currentUser.email,
      constitution: currentUser.constitution,
      partyName,
      partySymbol: profilePic,
      approved: false,
    }

    dispatch(submitCandidateApplication(applicationObj))
  }

  if (loading) return <LoadingIndicator message={message} />

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.cardView, globalStyles.boxShadow()]}>
        <FormikForm
          title={'Candidate Application'}
          validationSchema={applicationFormSchema}
          formValues={formValues}
          handleSubmit={handleSubmit}
          showImgPicker={true}
          btnText='Submit Application'
          imgText='Choose symbol image'
        />
      </View>
    </View>
  )
}

export default CandidateApplication
