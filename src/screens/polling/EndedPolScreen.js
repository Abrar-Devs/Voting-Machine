import React from 'react';

import {getEndedElections} from '../../utils/helpers';
import ScreenComponent from '../../components/polling/ScreenComponent';

const EndedPolScreen = () => {
  const btnHandler = () => {};
  return (
    <ScreenComponent
      title={'Finished Elections'}
      filterElections={getEndedElections}
      btnTitle={'View Result'}
      btnHandler={btnHandler}
    />
  );
};

export default EndedPolScreen;
