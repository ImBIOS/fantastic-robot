import { NextResponse, type NextRequest } from 'next/server';
import { Snap } from 'midtrans-node-client/dist/lib/snap';

import { env } from '~/env';

const snap = new Snap({
  isProduction: env.MIDTRANS_IS_PRODUCTION,
  serverKey: env.MIDTRANS_SERVER_KEY,
  clientKey: env.MIDTRANS_CLIENT_KEY,
});

type PaymentTokenRequest = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
};

export async function POST(request: NextRequest) {
  try {
    const { id, productName, price, quantity } =
      (await request.json()) as PaymentTokenRequest;

    const parameter = {
      item_details: {
        name: productName,
        price: price,
        quantity: quantity,
      },
      transaction_details: {
        order_id: id,
        gross_amount: price * quantity,
      },
      customer_details: {
        first_name: 'John',
        last_name: 'Doe',
        email: '',
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.error();
  }
}
