import FallIntoTravelOne from "@/components/search/FallIntoTravelOne";
import FallIntoTravelTwo from "@/components/search/FallIntoTravelTwo";
import MakeYourTravel from "@/components/search/MakeYourTravel";
import RecentResearches from "@/components/search/RecentResearches";
import WhereAreYouGoing from "@/components/search/WhereAreYouGoing";

export default function Search() {
    return(
        <div className="h-full w-full flex font-montserrat flex-col items-center">
            <MakeYourTravel/>
            <WhereAreYouGoing/>
            <RecentResearches/>
            <FallIntoTravelOne/>
            <FallIntoTravelTwo/>
        </div>
    )
}