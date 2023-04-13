export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="banner">현대 카드 무이자 이벤트 중</p>
      {children}
    </div>
  );
}
