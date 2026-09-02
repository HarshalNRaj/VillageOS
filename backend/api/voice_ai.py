from fastapi import APIRouter
from pydantic import BaseModel
import random
import re

router = APIRouter()

class VoiceQuery(BaseModel):
    text: str
    language: str = "en"

# Intent map: list of (keywords, list of replies)
INTENTS = [
    # Engineering / Internships / Students
    (
        ["internship", "intern", "engineering", "engineer", "college", "graduate", "fresher", "career", "it job", "tech", "student", "opportunity"],
        [
            "For engineering students: Check the AICTE Internship Portal (internship.aicte-india.org) for Govt & private internships. You can also explore free certifications on NPTEL/SWAYAM and check the Employment Hub module in VillageOS for active job listings!",
            "Great to hear from an engineering student! Apply for Govt internships on National Internship Portal (AICTE/MHRD), Digital India Internship Scheme, and check software/core engineering roles on the AICTE portal."
        ]
    ),
    # Fertilizers / nutrients
    (
        ["fertilizer", "fertiliser", "manure", "compost", "urea", "dap", "npk", "nutrient", "buy fertilizer", "where can i buy"],
        [
            "You can buy fertilizers at your nearest Krishi Seva Kendra or cooperative society. For DAP and Urea, check the government-subsidized supply at your block office.",
            "Fertilizers like DAP, Urea, and MOP are available at registered agri-input dealers. Look for shops with the 'Agri Gold' or 'IFFCO' signboard in your town.",
            "The nearest fertilizer distribution center should be within 5 km of your village. You can also check the PM Kisan portal for subsidized fertilizer schemes near you.",
        ]
    ),
    # Seeds / sowing
    (
        ["sow", "seed", "sowing", "planting", "transplant", "germination", "seedling", "nursery"],
        [
            "Based on current weather patterns in your region, it is best to delay sowing by 5-7 days for better soil moisture levels.",
            "Kharif sowing season is ideal between June and July. Make sure your seeds are certified and treated with fungicide before sowing.",
            "For paddy transplanting, the ideal time is when the seedlings are 20-25 days old. Ensure the field has 2-3 cm of standing water.",
        ]
    ),
    # Weather / rain
    (
        ["weather", "rain", "rainfall", "forecast", "monsoon", "cloud", "temperature", "humidity", "storm", "flood"],
        [
            "Light showers are expected over the next two days in your region. It is a good time for soil preparation and field bunding.",
            "The monsoon is likely to arrive in your region within the next 10 days. Prepare your fields and ensure proper drainage channels are in place.",
            "Temperatures are expected to remain high this week. Water your crops early morning or evening to avoid evaporation losses.",
        ]
    ),
    # Crop disease / pest
    (
        ["disease", "pest", "insect", "blight", "fungus", "rot", "wilt", "yellow leaf", "brown leaf", "dying", "attack", "infection", "spray", "pesticide"],
        [
            "Yellow or brown leaves may indicate a fungal infection. Apply Mancozeb or Copper Oxychloride spray at 2g per liter of water. Repeat after 7 days.",
            "For pest attacks like stem borer or aphids, use Chlorpyrifos 20EC at the recommended dosage. Contact your local Krishi Vigyan Kendra for free diagnosis.",
            "White powdery patches on leaves usually indicate powdery mildew. Spray a solution of baking soda (5g per liter) or contact your nearest agricultural officer.",
        ]
    ),
    # Irrigation / water
    (
        ["irrigation", "water", "drip", "sprinkler", "canal", "borewell", "pump", "moisture", "drought"],
        [
            "Drip irrigation can save up to 50% water compared to flood irrigation. The government offers 45-55% subsidy on drip systems under PMKSY scheme.",
            "For drought conditions, mulching with dry leaves or plastic can reduce water loss. Irrigate at night or early morning to minimize evaporation.",
            "If your borewell water level is low, check with your district groundwater office. Rainwater harvesting can help recharge groundwater effectively.",
        ]
    ),
    # Soil / land
    (
        ["soil", "land", "pH", "testing", "sandy", "clay", "loam", "organic", "fertility", "soil health card"],
        [
            "A soil health card test will tell you the exact pH and nutrient levels of your land. Apply for a free test at your nearest Krishi Seva Kendra.",
            "If your soil pH is below 6, add agricultural lime (calcium carbonate) to improve it. Ideal soil pH for most crops is between 6 and 7.",
            "Adding organic matter like vermicompost or green manure can greatly improve soil fertility and water retention over 2-3 seasons.",
        ]
    ),
    # Government schemes
    (
        ["scheme", "yojana", "subsidy", "government", "pm kisan", "loan", "credit", "kisan", "benefit", "apply", "registration", "insurance", "fasal bima"],
        [
            "PM-KISAN scheme gives ₹6,000 per year directly to your bank account in 3 installments. Register at pmkisan.gov.in or your nearest CSC center.",
            "Pradhan Mantri Fasal Bima Yojana (PMFBY) provides crop insurance at very low premiums. Apply through your bank or CSC before the deadline for your Kharif or Rabi crops.",
            "Kisan Credit Card (KCC) provides short-term loans for farming at very low interest rates (4% per annum). Apply at your nearest bank with your land records.",
        ]
    ),
    # Market / price / mandi
    (
        ["market", "mandi", "price", "sell", "rate", "crop price", "onion", "tomato", "wheat", "rice", "cotton", "sugarcane", "profit", "income"],
        [
            "Today's mandi rates: Wheat ₹2,275/quintal, Rice ₹2,183/quintal, Cotton ₹7,200/quintal. Check AgMarkNet or the eNAM app for live prices near you.",
            "To get the best price, try selling through the eNAM (National Agriculture Market) platform. It connects you to buyers across India and reduces middlemen.",
            "Onion prices are currently rising in major mandis. If you can store for 2-3 weeks using proper ventilation, you may get a better price.",
        ]
    ),
    # Animals / livestock
    (
        ["cow", "buffalo", "goat", "sheep", "poultry", "animal", "cattle", "milk", "livestock", "veterinary", "vet", "vaccination"],
        [
            "For cattle diseases, contact your nearest veterinary officer. Free vaccination camps for FMD (Foot and Mouth Disease) are held twice a year in most districts.",
            "Under the National Livestock Mission, you can get subsidy for goat farming and poultry units. Apply at your block-level animal husbandry office.",
            "To improve milk yield, ensure your cattle get mineral supplements and clean drinking water. Balanced ration feeding can increase milk production by 15-20%.",
        ]
    ),
    # Education
    (
        ["education", "school", "study", "scholarship", "course", "children study", "fees", "book", "tuition", "digital", "diksha", "swayam", "learn"],
        [
            "Your children can study for free on the DIKSHA portal (diksha.gov.in) — it has NCERT textbooks and videos in 30+ languages including Kannada and Hindi.",
            "Apply for a scholarship through the National Scholarship Portal at scholarships.gov.in. SC/ST/OBC and minority students can get up to ₹75,000/year support.",
            "Free digital literacy training is available at your nearest CSC under the PMGDISHA scheme. Adults can learn smartphones, banking apps, and internet usage at no cost.",
            "SWAYAM portal (swayam.gov.in) offers free certificate courses from IITs and IIMs. Your children can enroll for free and earn certificates that help in job applications.",
            "If school fees are a problem, contact your block education officer about the RTE Act — children from poor families have a right to free education up to Class 8.",
        ]
    ),
    # Healthcare / hospital / medicine
    (
        ["hospital", "doctor", "medicine", "sick", "health", "fever", "treatment", "pain", "ill", "pharmacy", "clinic", "ambulance", "emergency", "pregnant", "delivery", "baby", "child health", "mental health"],
        [
            "Call 108 for a free ambulance in any emergency. For free online doctor consultation, use the e-Sanjeevani app or visit esanjeevaniopd.in — available in Hindi and regional languages.",
            "Jan Aushadhi Kendras sell generic medicines at 50-90% cheaper prices than branded ones. There are 10,000+ outlets across India. Ask at your nearest government hospital.",
            "Under Ayushman Bharat (PM-JAY), families below the poverty line get free hospital treatment up to ₹5 lakh per year. Check eligibility at pmjay.gov.in.",
            "For pregnant women, the Janani Suraksha Yojana gives ₹1,400 cash for delivering in a government hospital. All delivery charges, medicines, and tests are free.",
            "If you or someone is feeling very sad or stressed, call iCall at 9152987821 or Tele-Manas at 14416 for free mental health support in your local language.",
        ]
    ),
    # Jobs / employment / work
    (
        ["job", "work", "employment", "mgnrega", "labour", "earn", "income", "wages", "nrega", "skill", "training", "rozgar", "karobar", "business", "self employed"],
        [
            "Under MGNREGA, your household is guaranteed 100 days of paid work per year at ₹250-350/day. Register your job card at the Gram Panchayat office — it is free and your legal right.",
            "The Skill India portal (skillindia.gov.in) lists free vocational training centers near you for 200+ trades like electrician, plumber, tailoring, computer operator, and more.",
            "PM Vishwakarma Yojana supports 18 traditional crafts like carpentry, pottery, and blacksmithing with free tools, free training, and a ₹3 lakh business loan at 5% interest.",
            "For starting a small business, apply for a Mudra Loan at any bank — up to ₹10 lakh without any collateral. The PM SVANidhi scheme gives ₹10,000-₹50,000 to street vendors.",
        ]
    ),
    # Banking / finance / money
    (
        ["bank", "account", "money", "save", "savings", "jan dhan", "atm", "transfer", "upi", "payment", "jeevan jyoti", "suraksha bima", "mudra", "loan", "finance"],
        [
            "Open a zero-balance Jan Dhan account at any bank. You get a free RuPay debit card, ₹2 lakh accidental insurance, and overdraft facility of up to ₹10,000.",
            "PM Jeevan Jyoti Bima Yojana gives ₹2 lakh life insurance for just ₹436 per year (about ₹36/month). Enroll through your bank account — no medical tests needed.",
            "PM Suraksha Bima Yojana gives ₹2 lakh accidental cover for just ₹20/year for anyone aged 18-70 with a bank account. Ask your nearest bank to enroll you.",
            "For UPI payments, use BHIM app — it works in Hindi and 12 regional languages. You can pay bills, transfer money, and receive payments even with basic smartphones.",
        ]
    ),
    # Women empowerment / SHG
    (
        ["women", "woman", "wife", "girl", "daughter", "shg", "self help group", "mahila", "beti", "ladki", "widow", "empowerment"],
        [
            "Women can join a Self Help Group (SHG) in their village to access group loans, savings, and government scheme benefits. Ask at your Gram Panchayat or Anganwadi center.",
            "The Beti Bachao Beti Padhao scheme ensures girls get education support. Sukanya Samriddhi Yojana lets you open a savings account for your daughter at 8.2% interest.",
            "Under PM Matru Vandana Yojana, first-time pregnant women receive ₹5,000 cash in installments. Apply at your nearest Anganwadi center with Aadhaar and bank details.",
            "Widows and single women can apply for National Family Benefit Scheme (₹20,000 one-time) and widow pension at their block office. Bring Aadhaar, bank passbook, and death certificate.",
        ]
    ),
    # Greetings / hello (AT THE END)
    (
        ["hello", "hi", "namaste", "namaskara", "hey", "good morning", "good evening", "how are you"],
        [
            "Namaskara! I am your VillageOS AI assistant. Ask me about farming, health, education, engineering internships, jobs, government schemes, or market prices. How can I help you today?",
            "Hello! I am here to help with agriculture, healthcare, education, livelihood, market prices, and government schemes. What would you like to know?",
            "Namaste! I am ready to help. You can ask about seeds, medicines, scholarships, jobs, crop disease, or anything else. How can I assist you?",
        ]
    ),
    # Thanks / goodbye
    (
        ["thank", "thanks", "bye", "goodbye", "ok thanks", "great", "wonderful"],
        [
            "You are welcome! Feel free to ask anytime. Happy farming! 🌾",
            "Glad I could help! Wishing you a great harvest this season. 🌱",
            "Anytime! Come back if you have more questions. Jai Kisan! 🚜",
        ]
    ),
]

FALLBACK_REPLIES = [
    "I did not quite understand that. Could you rephrase? You can ask me about farming, health, education, jobs, government schemes, market prices, or banking.",
    "I'm not sure about that specific query. Try asking about topics like sowing, medicines, scholarships, MGNREGA jobs, pest control, or mandi prices.",
    "I'm still learning! Try asking about crop diseases, free education, hospital services, government schemes, women's SHGs, or weather forecasts.",
]

def get_reply(text: str) -> str:
    text_lower = text.lower()
    for keywords, replies in INTENTS:
        for kw in keywords:
            is_match = (
                bool(re.search(r'\b' + re.escape(kw) + r'\b', text_lower))
                if (len(kw) <= 3 and ' ' not in kw)
                else (kw in text_lower)
            )
            if is_match:
                return random.choice(replies)
    return random.choice(FALLBACK_REPLIES)


@router.post("/chat")
async def process_voice_query(query: VoiceQuery):
    reply = get_reply(query.text)
    return {
        "reply": reply,
        "language_detected": query.language
    }

