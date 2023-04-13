export default function CartPage() {
  let 장바구니 = ["Tomatoes", "Pasta"];
  return (
    <div>
      <h4 className="title">Cart</h4>
      <CartItem name={장바구니[0]} />
      <CartItem name={장바구니[0]} />
      <CartItem name={장바구니[0]} />
      <Banner content="현대카드" />
      <Banner content="롯데카드" />
    </div>
  );
}

function Banner(props: { content: string }) {
  return <h5>{props.content} 결제 행사중</h5>;
}

interface _ItemInfo {
  name: string;
  price?: number;
  count?: number;
}

function CartItem(info: _ItemInfo) {
  return (
    <div className="cart-item">
      <p>{info.name}</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
}
