import { create } from 'zustand';
import { SafeReservation } from '@/app/types';

interface InfoModalStore {
  isOpen: boolean;
  reservation: SafeReservation | null;
  onOpen: (reservation: SafeReservation) => void;
  onClose: () => void;
}

const useInfoModal = create<InfoModalStore>((set) => ({
  isOpen: false,
  reservation: null,
  onOpen: (reservation) =>
    set({ isOpen: true, reservation }),
  onClose: () =>
    set({ isOpen: false, reservation: null }),
}));

export default useInfoModal;
