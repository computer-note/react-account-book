import { useState, useRef, useContext } from 'react';
import { requestLogin } from '../axios/authApi';
import { AuthContext } from '../context/AuthContextProvider';

/* Todo.
  이미 로그인된 상태에서 로그인 페이지에 진입한 경우 처리
*/
function LoginPage() {
  const [idInputVal, setIdInputVal] = useState('');
  const [pwInputVal, setPwInputVal] = useState('');

  const outputElemRef = useRef(null);

  const { setAppStateLoggedIn } = useContext(AuthContext);

  async function handleSubmit(ev) {
    ev.preventDefault();

    let outputMessage = '';
    try {
      const response = await requestLogin(idInputVal, pwInputVal);
      /* response format {
        data: accessToken, avatar, nickname, success, userId(=>id)
      }*/

      //Todo. catch에 걸리지 않는데 성공이 아닌 경우 있는지 조사

      setAppStateLoggedIn(response.data.accessToken);

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
