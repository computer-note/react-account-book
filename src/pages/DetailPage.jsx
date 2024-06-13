import DetailInputField from '../components/DetailInputField';
import styled from 'styled-components';

import { useQuery } from '@tanstack/react-query';
import { readAccountById } from '../axios/accountApi';

import { useNavigate, useParams } from 'react-router-dom';

function DetailPage() {
  const params = useParams();
  const navigate = useNavigate();

  const accountQuery = useQuery({
    queryFn: () => readAccountById(params.id),
    queryKey: ['accountList', params.id],
  });

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
