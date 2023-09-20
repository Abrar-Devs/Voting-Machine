import React from 'react'

import { getFutureElections } from '../../utils/helpers'
import ScreenComponent from '../../components/polling/ScreenComponent'

const ComingPolScreen = () => (
  <ScreenComponent
    title={'Coming Up Elections'}
    filterElections={getFutureElections}
    btnTitle={'Coming Soon...'}
    btnHandler={null}
  />
)

export default ComingPolScreen
