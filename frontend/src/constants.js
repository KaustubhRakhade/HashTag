const TOPICS = [
    "Trending",
    "World",
    "Local",
    "Sports",
    "Tech",
    "Business",
    "Science",
    "Entertainment",
]

const DEFAULT_TOPIC = "Trending";

const CITIES = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Ahemdabad",
    "Allahabad",
    "Bhubaneswar",
    "Coimbatore",
    "Gurgaon",
    "Guwahati",
    "Hubli",
    "Kanpur",
    "Kolkata",
    "Ludhiana",
    "Mangalore",
    "Mysore",
    "Noida",
    "Pune",
    "Goa",
    "Chandigarh",
    "Lucknow",
    "Patna",
    "Jaipur",
    "Nagpur",
    "Rajkot",
    "Ranchi",
    "Surat",
    "Vadodara",
    "Varanasi",
    "Thane",
    "Thiruvananthapuram"
]

const API_URL =  "http://localhost:4000/api"

const FEED_API = API_URL + "/feed/"
const SEARCH_API = API_URL + "/search/"
const SUBSCRIBE_API = API_URL + "/subscribe/"

export { TOPICS, DEFAULT_TOPIC, CITIES, FEED_API, SEARCH_API, SUBSCRIBE_API }