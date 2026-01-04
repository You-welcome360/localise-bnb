'use client';

import axios from "axios";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { differenceInCalendarDays } from "date-fns";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";

import useReservationModal from "@/app/hooks/useReservationModal";
import { useRouter } from "next/navigation";

interface ReservationModalProps {
  listingId: string;
  startDate: Date | null;
  endDate: Date | null;
  totalPrice: number;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  listingId,
  startDate,
  endDate,
  totalPrice,
}) => {
  const reservationModal = useReservationModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      guestName: '',
      phoneNumber: '',
      emergencyNumber: '',
      ghanaCardNumber: '',
    },
  });

  
  const nights = useMemo(() => {
    if (!startDate || !endDate) return 0;

    return differenceInCalendarDays(
      endDate,
      startDate
    );
  }, [startDate, endDate]);

  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!startDate || !endDate || nights <= 0) {
      toast.error("Invalid reservation dates");
      return;
    }

    setIsLoading(true);

    axios.post('/api/reservations', {
      listingId,
      startDate,         
      endDate,            
      nights,             
      totalPrice,         
      guestName: data.guestName,
      phoneNumber: data.phoneNumber,
      emergencyNumber: Number(data.emergencyNumber),
      ghanaCardNumber: data.ghanaCardNumber,
    })
      .then(() => {
        toast.success("Reservation successful!");
        reservationModal.onClose();
        router.push('/trips');
        
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Confirm your reservation"
        subtitle="Fill in your details"
      />

      {/* Guest info */}
      <Input
        id="guestName"
        label="Full Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="phoneNumber"
        label="Phone Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="emergencyNumber"
        label="Emergency Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="ghanaCardNumber"
        label="Ghana Card Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      {/* 🔒 READ-ONLY DATE SUMMARY */}
      <div className="rounded-lg border p-3 text-sm text-neutral-700">
        <p>
          <strong>Check-in:</strong>{" "}
          {startDate?.toDateString()}
        </p>
        <p>
          <strong>Check-out:</strong>{" "}
          {endDate?.toDateString()}
        </p>
        <p className="mt-2 font-semibold">
          {nights} night(s) • ₵{totalPrice}
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={reservationModal.isOpen}
      title="Reserve"
      actionLabel="Confirm"
      onClose={reservationModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default ReservationModal;
