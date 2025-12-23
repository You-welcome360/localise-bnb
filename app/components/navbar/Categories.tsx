'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { MdSingleBed, MdKingBed, MdApartment } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { TbPool } from "react-icons/tb";

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: "Single suite",
    icon: MdSingleBed,
    description: "A private suite suitable for one guest.",
  },
  {
    label: "Double suite",
    icon: MdKingBed,
    description: "A comfortable suite for two guests.",
  },
  {
    label: "Triple suite",
    icon: FaUserFriends,
    description: "A spacious suite suitable for three guests.",
  },
  {
    label: "Full apartment",
    icon: MdApartment,
    description: "An entire apartment for your stay.",
  },
  {
    label: "Full apartment & pool",
    icon: TbPool,
    description: "A full apartment with private pool access.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;