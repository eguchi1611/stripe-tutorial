"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function View() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string[]>([]);
  useEffect(() => {
    if (searchParams.has("success")) {
      console.log("Order placed! You will receive an email confirmation.");
      setStatus((p) => [...p, "success"]);
    }
    if (searchParams.has("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
      setStatus((p) => [...p, "canceled"]);
    }
  }, [searchParams]);
  return (
    <>
      <div>
        {status.includes("success") && <div>支払いに成功しました。</div>}
        {status.includes("canceled") && (
          <div>支払いがキャンセルされました。</div>
        )}
      </div>
      <form action="/api/checkout_sessions" method="POST">
        <h1>Checkout</h1>
        <button type="submit">支払いボタン</button>
      </form>
    </>
  );
}

export { View };
