'use client';

import Modal from './Modal';
import Heading from '../Heading';
import { format } from 'date-fns';
import useInfoModal from '@/app/hooks/useInfoModel';

const GuestInfoModal = () => {
  const infoModal = useInfoModal();
  const reservation = infoModal.reservation;

  if (!reservation) {
    return null;
  }

  return (
    <Modal
      isOpen={infoModal.isOpen}
      onClose={infoModal.onClose}
      title="Guest Information"
      actionLabel="Close"
      onSubmit={infoModal.onClose}
      body={
        <div className="flex flex-col gap-4">
          <Heading
            title={reservation.guestName}
            subtitle="Guest details for this reservation"
          />

          <div className="text-sm space-y-2">
            <p>
              <span className="font-semibold">Phone:</span>{' '}
              {reservation.phoneNumber}
            </p>

            <p>
              <span className="font-semibold">Emergency Contact:</span>{' '}
              {reservation.emergencyNumber}
            </p>

            {reservation.ghanaCardNumber && (
              <p>
                <span className="font-semibold">Ghana Card:</span>{' '}
                {reservation.ghanaCardNumber}
              </p>
            )}

            <hr />

            <p>
              <span className="font-semibold">Check-in:</span>{' '}
              {format(new Date(reservation.startDate), 'PPP')}
            </p>

            <p>
              <span className="font-semibold">Check-out:</span>{' '}
              {format(new Date(reservation.endDate), 'PPP')}
            </p>

            <p>
              <span className="font-semibold">Nights:</span>{' '}
              {reservation.nights}
            </p>

            <p className="font-semibold text-lg">
              Total: ₵{reservation.totalPrice}
            </p>
          </div>
        </div>
      }
    />
  );
};

export default GuestInfoModal;
