import { dataStorage ,BookingInforfation} from "./Home"
const Event = () => {
    const storage:BookingInforfation[]=dataStorage

  return (
    <div>
      {
        storage.map((data:BookingInforfation)=>{
            return(
                <div className="min-w-[330px] w-fit m-4 min-h-[180px] h-fit p-2 rounded-2xl bg-gray-200 shadow-black shadow-xl/30" >
                    <div className="text-xl"><span className="font-semibold">Event Name: </span>{data.eventTitle}</div>
                    <div className=""><span className="font-semibold">Client Name: </span>{data.clientName}</div>
                    <div className=""><span className="font-semibold">Client email: </span>{data.email}</div>
                    <div className="">
                        {
                            data.endDate?<p><span className="font-semibold">Start Date: </span>{data.startDate}</p>:<p><span className="font-semibold">Start Date: </span>{data.startDate.slice(0,10)}</p>
                        }
                        {
                            data.endDate?<p><span className="font-semibold">End Date: </span>{data.endDate}</p>:<p>All Day</p>
                        }
                    </div>
                    <div><span className="font-semibold">Description: </span>{data.description}</div>
                </div>
            )
        })
      }
    </div>
  )
}

export default Event
