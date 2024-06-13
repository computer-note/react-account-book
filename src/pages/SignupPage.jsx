import { useRef, useState } from 'react';
import { requestSignup } from '../axios/authApi';

function SignupPage() {
  const [idInputVal, setIdInputVal] = useState('');
  const [pwInputVal, setPwInputVal] = useState('');
  const [nicknameInputVal, setNicknameInputVal] = useState('');

  const outputElemRef = useRef(null);

  async function handleSubmit(ev) {
    ev.preventDefault(); //Object의 메서드로 설정된 이유
    //error: ev.target.preventDefault();

    let outputMessage = '-';
    try {
      const response = await requestSignup(
        idInputVal,
        pwInputVal,
        nicknameInputVal
      );
      outputMessage = response.data.message;

      ev.target.reset();
    } catch (err) {
      outputMessage = err.response.data.message;
    } finally {
      outputElemRef.current.innerHTML = `${outputMessage} <br/> ${outputElemRef.current.innerHTML}`;
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='아이디'
          value={idInputVal}
          onChange={e => setIdInputVal(e.target.value)}
        />
        <input
          placeholder='비밀번호'
          value={pwInputVal}
          onChange={e => setPwInputVal(e.target.value)}
        />
        <input
          placeholder='닉네임'
          value={nicknameInputVal}
          onChange={e => setNicknameInputVal(e.target.value)}
        />
        <button>가입하기</button>
      </form>
      <p ref={outputElemRef}></p>
    </main>
  );
}

export default SignupPage;
