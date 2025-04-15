import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid'
import { EventInput } from '@fullcalendar/core';

export let dataStorage:any=[]
export interface BookingInforfation {
    clientName: string,
    email?: string,
    phoneNumber: string,
    eventTitle: string,
    startDate: string,
    endDate?: string,
    category: string,
    description: string
}

interface ErrorMsg {
    emailMsg: string,
    phoneNumberMsg: string,
    dateFormatMsg: string
}

interface eventInfo extends EventInput {
    id?: string,
    title?: string,
    start: string,
    end?: string,
    color?: string,
    textColor?: string,
    extendedProps?: {
        description: string
    },
    allDay?: boolean
}

export default function Home() {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    const phoneNumberRegex = /^[6-9]\d{9}$/

    const [showEventBookBox, setShowEventBookBox] = useState<Boolean>(false)
    const [err, setErr] = useState<ErrorMsg>({
        emailMsg: "",
        phoneNumberMsg: "",
        dateFormatMsg: ""
    })
    const [userInfo, setUserInfo] = useState<BookingInforfation>({
        clientName: "",
        email: "",
        phoneNumber: "",
        eventTitle: "",
        startDate: "",
        endDate: "",
        category: "",
        description: ""
    })

    const [calenderEvents, setCalenderEvent] = useState<eventInfo[]>([])

    const handleCustomButtonClick = () => {
        setShowEventBookBox(!showEventBookBox)
    };

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault()

        const verifyemail = emailRegex.test(userInfo.email?.toString() || "")
        const verifyPhoneNumber = phoneNumberRegex.test(userInfo.phoneNumber.toString() || "")

        if (!verifyemail) {
            return setErr((prev) => ({ ...prev, emailMsg: "incorrect email" }))
        }

        if (!verifyPhoneNumber) {
            return setErr((prev) => ({ ...prev, phoneNumberMsg: "incorrect phoneNumber" }))
        }

        let today=new Date()
        let currentdate=today.toISOString().slice(0,10)

        if (new Date(userInfo.startDate.slice(0,10)).getTime()<=new Date(currentdate).getTime()) {
           return toast.error('select a date after today')
        }   

        if (!userInfo.endDate) {
            const trimeDate: string = userInfo.startDate.slice(0, 10)
            setUserInfo((prev) => ({ ...prev, startDate: trimeDate }))
        }

        if (userInfo.endDate && userInfo.startDate.slice(0, 10) > userInfo.endDate.slice(0, 10)) {
            return setErr((prev) => ({ ...prev, dateFormatMsg: "your select end date before start date" }))
        }


        let color = ""
        if (userInfo.category === "event") {
            color = "#fa44f7"
        } else if (userInfo.category === "conference") {
            color = "#0486e8"
        } else {
            color = "#f6ef18"
        }

        setCalenderEvent((prev) => ([...prev, {
            id: nanoid(),
            title: userInfo.eventTitle,
            start: userInfo.startDate,
            end: userInfo.endDate,
            color: color,
            extendedProps: {
                description: userInfo.description
            },
            textColor: "#000000",
            allDay: userInfo.endDate ? false : true
        }]))

        dataStorage=[...dataStorage,userInfo]

        setUserInfo({
            clientName: "",
            email: "",
            phoneNumber: "",
            eventTitle: "",
            startDate: "",
            endDate: "",
            category: "",
            description: ""
        })

        return toast.success("Event Book Successfully ")
    }

    return (
        <div>
            {
                showEventBookBox &&
                (
                    <div className={`z-10 absolute top-[100px] left-135 ${showEventBookBox ? "animate-dropdown" : "animate-goneup"}`}>
                        <div className='w-[400px] h-[650px] rounded-2xl bg-gray-200 shadow-black flex justify-center shadow-xl/30 '>
                            <form action="" className='mx-2 mt-1'>
                            <div className='flex justify-center '><button className='scale-150 cursor-pointer mb-2 mt-1' onClick={handleCustomButtonClick}>❌</button></div>
                                <label htmlFor="name" className='font-semibold'>📛Name</label>
                                <div className=''>
                                    <input
                                        type="text"
                                        id="name"
                                        className='inputstyle'
                                        placeholder='Enter your name'
                                        value={userInfo.clientName}
                                        onChange={(e) => { setUserInfo((prev) => ({ ...prev, clientName: e.target.value })) }}
                                    />
                                </div>

                                <label htmlFor="email" className='font-semibold mt-1'>📧Email</label>
                                {err.emailMsg && <span className='text-red-500 text-sm font-semibold'>{`(${err.emailMsg})`}</span>}
                                <div className=''>
                                    <input
                                        type="email"
                                        id="email"
                                        className='inputstyle'
                                        placeholder='example@gmail.com'
                                        value={userInfo.email}
                                        onChange={(e) => { setUserInfo((prev) => ({ ...prev, email: e.target.value })) }}
                                    />
                                </div>

                                <label htmlFor="phone" className='font-semibold mt-1'>☎️Phone number</label>
                                {err.phoneNumberMsg && <span className='text-red-500 text-sm font-semibold'>{`(${err.phoneNumberMsg})`}</span>}
                                <div className=''>
                                    <input
                                        type="text"
                                        id="phone"
                                        className='inputstyle'
                                        placeholder='Enter your phoneNumber'
                                        minLength={10}
                                        min={0}
                                        pattern="^[0-9-+\s()]*$"
                                        value={userInfo.phoneNumber?.toString()}
                                        onChange={(e) => { setUserInfo((prev) => ({ ...prev, phoneNumber: e.target.value })) }}
                                    />
                                </div>


                                <label htmlFor="title" className='font-semibold mt-1'>🔖Title</label>
                                <div className=''>
                                    <input
                                        type="text"
                                        id="title"
                                        className='inputstyle'
                                        placeholder='Enter name for Event'
                                        value={userInfo.eventTitle}
                                        onChange={(e) => { setUserInfo((prev) => ({ ...prev, eventTitle: e.target.value })) }}
                                    />
                                </div>

                                <label htmlFor="start-date" className='font-semibold mt-1'>📅Start-Date & Time</label>
                                <div className=''>
                                    <input
                                        type="datetime-local"
                                        id="start-date"
                                        className='inputstyle'
                                        onChange={(e) => { setUserInfo((prev) => ({ ...prev, startDate: e.target.value })) }}
                                    />
                                </div>

                                <label htmlFor="end-date" className='font-semibold mt-1'>📅End-Date & Time</label>
                                {err.dateFormatMsg && <span className='text-red-500 text-sm font-semibold'>{`(${err.dateFormatMsg})`}</span>}
                                <div className=''>
                                    <input
                                        type="datetime-local"
                                        id="end-date"
                                        className='inputstyle'
                                        onChange={(e) => { setUserInfo((prev) => ({ ...prev, endDate: e.target.value })) }}
                                    />
                                </div>

                                <label htmlFor="catagory" className='font-semibold mt-1'>🟠catagory:</label>
                                <div className='ml-2 rounded-xl border-2 w-0.5'>
                                    <select
                                        id='category'
                                        className='w-fit'
                                        value={userInfo.category}
                                        onChange={(e) => { setUserInfo((prev) => ({ ...prev, category: e.target.value })) }}
                                    >
                                        <option value="conference">Conference</option>
                                        <option value="event">Event</option>
                                        <option value="family">Family Gathering</option>
                                    </select>
                                </div>

                                <label htmlFor="event" className='font-semibold mt-1'>🟠Event Description</label>
                                <div>
                                    <textarea
                                        id="event"
                                        className='inputstyle h-[100px]'
                                        value={userInfo.description}
                                        onChange={(e) => { setUserInfo((prev) => ({ ...prev, description: e.target.value })) }}
                                    />
                                </div>

                                <div className='w-full flex justify-end mt-4'>
                                    <button
                                        type="submit"
                                        onClick={handleBooking}
                                        className='cursor-pointer bg-blue-500 p-2 rounded-xl hover:bg-blue-300 transition-all duration-500 ease-in-out font-semibold'
                                    >
                                        +Book Event
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            <div className={`z-0 ${showEventBookBox ? "opacity-50" : "opacity-100"}`}>
                <FullCalendar
                    headerToolbar={{
                        left: 'prev,next,today',
                        center: "title,myCustomButton",
                        right: 'dayGridMonth,timeGridWeek,listWeek'
                    }}
                    customButtons={{
                        myCustomButton: {
                            text: 'Add Event',
                            click: handleCustomButtonClick
                        }
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={calenderEvents}
                    eventContent={(arg) => (
                        <div className="text-black rounded p-2">
                            <b>{arg.event.title}</b>
                            {arg.event.extendedProps.description && <p className="text-gray-600 text-wrap">{arg.event.extendedProps.description}</p>}
                        </div>
                    )}
                    dayCellContent={(arg) => (
                        <div className="mt-1.5 mr-2">
                            <span className={`text-sm ${arg.isToday ? 'font-bold text-blue-600' : ''}`}>
                                {arg.dayNumberText}
                            </span>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}
