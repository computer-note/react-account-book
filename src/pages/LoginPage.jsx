import { useState, useRef } from 'react';
import { requestLogin } from '../axios/authApi';

function LoginPage() {
  const [idInputVal, setIdInputVal] = useState('');
  const [pwInputVal, setPwInputVal] = useState('');

  const outputElemRef = useRef(null);

  async function handleSubmit(ev) {
    ev.preventDefault();

    let outputMessage = '';
    try {
      const response = await requestLogin(idInputVal, pwInputVal);
      /* response format {
        data: accessToken, avatar, nickname, success, userId(=>id)
      }*/

      outputMessage = '로그인 성공';

      ev.target.reset();
    } catch (err) {
      outputMessage = err.response.data.message;
    } finally {
      outputElemRef.current.innerHTML = `${outputMessage} <br> ${outputElemRef.current.innerHTML}`;
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
        <button> 로그인 </button>
      </form>
      <p ref={outputElemRef}></p>
    </main>
  );
}

export default LoginPage;
