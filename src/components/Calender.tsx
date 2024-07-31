import  { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { ServiceType } from "../types/index";
import Cookies from "js-cookie";

interface Booking {
  _id: string | undefined;
  name: string | undefined;
  duration: string | undefined;
  price: number | undefined;
  date: string;
  time: string;
}

const BookingCalendar = ({ data }: { data: ServiceType | undefined }) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [slots, setSlots] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const token = Cookies.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    const newSlots: string[] = [];
    for (let i = 6; i <= 19; i++) {
      const hour = i % 12 || 12;
      const period = i < 12 ? "AM" : "PM";
      newSlots.push(`${hour}:00 ${period}`);
    }
    setSlots(newSlots);
  }, []);

  const handleDateChange = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(null);
    }
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (!selectedSlot || !date) return;

    const newBooking: Booking = {
      _id: data?._id,
      name: data?.name,
      duration: data?.duration,
      price: data?.price,
      date: date.toDateString(),
      time: selectedSlot,
    };

    setBookings([...bookings, newBooking]);
    setSelectedSlot(null);
    localStorage.setItem("booking", JSON.stringify(newBooking));
    if (token) {
      navigate("/book-form");
    } else {
      navigate("/login");
    }
  };

  const isSlotBooked = (slot: string): boolean => {
    if (!date) return false;
    return bookings.some(
      (booking) => booking.date === date.toDateString() && booking.time === slot
    );
  };

  const isPastTime = (slot: string): boolean => {
    if (!date) return false;
    const [hourString, period] = slot.split(" ");
    const hour = parseInt(hourString.split(":")[0], 10);
    const adjustedHour =
      period === "PM" && hour !== 12
        ? hour + 12
        : period === "AM" && hour === 12
        ? 0
        : hour;

    const slotDate = new Date(date);
    slotDate.setHours(adjustedHour, 0, 0, 0);

    return slotDate < new Date();
  };

  const tileDisabled = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): boolean => {
    if (view !== "month") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="flex mb-10 flex-col w-full items-center mt-6 md:mt-0 md:p-6">
      <Calendar
        value={date}
        onChange={(value) => handleDateChange(value as Date | Date[] | null)}
        className="rounded-md border"
        tileDisabled={tileDisabled}
      />
      <div className="slots mt-6 flex flex-col items-center">
        <h3 className="mb-4 text-xl font-semibold">
          Available Slots for {date?.toDateString()}
        </h3>
        <ul className="flex flex-wrap justify-center">
          {slots.map((slot) => (
            <li
              key={slot}
              className={`p-2 m-2 border rounded cursor-pointer ${
                isSlotBooked(slot) || isPastTime(slot)
                  ? " opacity-50 cursor-not-allowed"
                  : selectedSlot === slot
                  ? "bg-green-300"
                  : "bg-white"
              }`}
              onClick={() =>
                !isSlotBooked(slot) && !isPastTime(slot) && handleSlotSelect(slot)
              }
            >
              {slot}
            </li>
          ))}
        </ul>
        <button
          onClick={handleBooking}
          disabled={!selectedSlot}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingCalendar;
