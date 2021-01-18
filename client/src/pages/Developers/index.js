import React, { useEffect } from 'react';
import Main from '../../components/Main';
// Redux
import { useDispatch } from 'react-redux';
import { getCurrentPage } from '../../actions/uiStateAction';

const Developers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentPage('Developers'));
  }, []);

  return (
    <Main>
      <h1>Developers Page</h1>
    </Main>
  );
};

export default Developers;
