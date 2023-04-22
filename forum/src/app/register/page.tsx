export default function Register() {
  return (
    <div className="text-black">
      <form method="POST" action="/api/auth/signup">
        <input name="name" type="text" placeholder="이름" />
        <input name="email" type="text" placeholder="이메일" />
        <input name="password" type="password" placeholder="비번" />
        <button type="submit" className="btn btn-blue">
          id/pw 가입요청
        </button>
      </form>
    </div>
  );
}
