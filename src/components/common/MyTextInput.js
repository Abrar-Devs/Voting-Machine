import { Text, TextInput } from 'react-native'

import globalStyles from '../../utils/styles/globalstyles'

export const MyTextInput = ({ label, touched, error, ...props }) => (
  <>
    <Text style={globalStyles.label}>{label}</Text>
    <TextInput {...props} />
    {touched && error ? <Text style={globalStyles.error}>{error}</Text> : null}
  </>
)
