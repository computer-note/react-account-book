import DetailInputField from '../components/DetailInputField';
import styled from 'styled-components';

import { useNavigate, useParams } from 'react-router-dom';
import useAccount from './../hooks/useAccount';

function DetailPage() {
  const params = useParams();
  const navigate = useNavigate();

  const accountQuery = useAccount(
    api => api.readAccountByIdQuery,
    params.id
  );

  const { isPending, isError, data: currentEntry } = accountQuery;

  if (isPending || isError) {
    return <p>로딩 중 혹은 에러 발생</p>;
  }

  return (
    <StSection>
      <DetailInputField currentEntry={currentEntry} />
      <button onClick={() => navigate('/')}> 뒤로가기 </button>
    </StSection>
  );
}

const StSection = styled.section`
  background-color: lightyellow;
  padding: 50px;
`;

export default DetailPage;
