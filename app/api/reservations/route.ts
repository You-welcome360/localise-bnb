import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }



  const body = await request.json();
  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
    guestName,
    phoneNumber,
    emergencyNumber,
    ghanaCardNumber,
  } = body;

  const emergencyNumberInt = Number(emergencyNumber);

  if (
    Number.isNaN(emergencyNumberInt) 
  ) {
    return NextResponse.error();
  }


  if (
    !listingId ||
    !startDate ||
    !endDate ||
    !totalPrice ||
    !guestName ||
    !phoneNumber ||
    !emergencyNumber
  ) {
    return NextResponse.error();
  }

  // ✅ Compute nights safely
  const start = new Date(startDate);
  const end = new Date(endDate);

  const nights =
    Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

  if (nights <= 0) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          guestName,
          phoneNumber,
          emergencyNumber: emergencyNumber,
          ghanaCardNumber: ghanaCardNumber,
          startDate: start,
          endDate: end,
          totalPrice,
          nights,
          user: {
            connect: { id: currentUser.id }
          }
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
