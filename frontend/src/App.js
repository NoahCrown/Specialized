// Components
import Sidebar from "./components/Sidebar";
import Output from './components/Output'
import Prompt from "./components/Prompt";
import { useEffect, useState } from "react";
import axios from 'axios'


function App() {

  const [data, setData] = useState([
  {"id":1,"first_name":"Janek","last_name":"Mallam","phone":"115-979-4386","dateOfBirth":null,"certification":null,"ethnicity":"Ute","primarySkills":"Ductwork","educationDegree":null,"comments":"Excellent problem-solving abilities","specialties":"Accounting"},
  {"id":2,"first_name":"Zared","last_name":"Searby","phone":"269-262-3699","dateOfBirth":null,"certification":null,"ethnicity":"Panamanian","primarySkills":"RVM","educationDegree":null,"comments":"Excellent problem-solving abilities","specialties":"Sales"},
  {"id":3,"first_name":"Elden","last_name":"Sellars","phone":"404-769-2835","dateOfBirth":null,"certification":null,"ethnicity":null,"primarySkills":"SDH","educationDegree":"Master's Degree","comments":"Team player","specialties":"Data Analysis"},
  {"id":4,"first_name":"Rock","last_name":"Carlick","phone":"673-427-9566","dateOfBirth":"8/26/1991","certification":null,"ethnicity":"Malaysian","primarySkills":"SX.enterprise","educationDegree":null,"comments":"Team player","specialties":"Japanese Fluent"},
  {"id":5,"first_name":"Pepita","last_name":"Autry","phone":"840-691-8594","dateOfBirth":null,"certification":null,"ethnicity":"Choctaw","primarySkills":"Zmap","educationDegree":null,"comments":"Highly motivated and proactive","specialties":"English Fluent"},
  {"id":6,"first_name":"Tara","last_name":"Trevan","phone":"568-841-4469","dateOfBirth":null,"certification":null,"ethnicity":null,"primarySkills":"RFID Applications","educationDegree":null,"comments":"Strong communication skills","specialties":"Accounting"},
  {"id":7,"first_name":"Emlyn","last_name":"Winskill","phone":"681-330-1276","dateOfBirth":"4/4/1986","certification":null,"ethnicity":"Thai","primarySkills":"Hearings","educationDegree":"Bachelor's Degree","comments":"Adaptable and flexible","specialties":"Graphic Design"},
  {"id":8,"first_name":"Florance","last_name":"Hollier","phone":"293-479-3179","dateOfBirth":"3/12/1980","certification":null,"ethnicity":null,"primarySkills":"Zynx","educationDegree":"Master's Degree","comments":"Attention to detail","specialties":"Customer Service"},
  {"id":9,"first_name":"Dareen","last_name":"Slopier","phone":"874-919-5375","dateOfBirth":"1/29/1989","certification":null,"ethnicity":"Sioux","primarySkills":"Fraud","educationDegree":"High School Diploma","comments":"Adaptable and flexible","specialties":"Human Resources"},
  {"id":10,"first_name":"Paulie","last_name":"Tedorenko","phone":"355-116-8904","dateOfBirth":null,"certification":null,"ethnicity":"Houma","primarySkills":"Axles","educationDegree":"Bachelor's Degree","comments":"Team player","specialties":"Accounting"},
  {"id":11,"first_name":"Florian","last_name":"Arsnell","phone":"529-409-8965","dateOfBirth":null,"certification":null,"ethnicity":"Korean","primarySkills":"Award Ceremonies","educationDegree":null,"comments":"Team player","specialties":"Marketing"},
  {"id":12,"first_name":"Fidel","last_name":"Ibel","phone":"496-471-1050","dateOfBirth":"8/3/1981","certification":"Baumbach, Fadel and Kub","ethnicity":"Choctaw","primarySkills":"RQM","educationDegree":"PhD","comments":"Attention to detail","specialties":"Graphic Design"},
  {"id":13,"first_name":"Allene","last_name":"Van der Daal","phone":"498-203-4946","dateOfBirth":null,"certification":null,"ethnicity":"Yuman","primarySkills":"Judo","educationDegree":"Bachelor's Degree","comments":"Excellent problem-solving abilities","specialties":"Software Development"},
  {"id":14,"first_name":"Xavier","last_name":"Ganders","phone":"294-262-5420","dateOfBirth":null,"certification":null,"ethnicity":"American Indian and Alaska Native (AIAN)","primarySkills":"HDS","educationDegree":null,"comments":"Strong communication skills","specialties":"Project Management"},
  {"id":15,"first_name":"Stephan","last_name":"Billson","phone":"604-818-8765","dateOfBirth":"1/23/1998","certification":"Towne, Ondricka and Goodwin","ethnicity":null,"primarySkills":"Grants","educationDegree":null,"comments":"Team player","specialties":"Software Development"},
  {"id":16,"first_name":"Avril","last_name":"Barrat","phone":"901-103-4167","dateOfBirth":"9/13/1988","certification":"Smitham Inc","ethnicity":"Puerto Rican","primarySkills":"Microsoft Dynamics AX","educationDegree":null,"comments":"Highly motivated and proactive","specialties":"English Fluent"},
  {"id":17,"first_name":"Carolina","last_name":"Lydiate","phone":"800-252-5938","dateOfBirth":null,"certification":null,"ethnicity":"Mexican","primarySkills":"HDI Support Center Analyst","educationDegree":null,"comments":"Strong communication skills","specialties":"Sales"},
  {"id":18,"first_name":"Marcella","last_name":"Calway","phone":"713-373-4599","dateOfBirth":"1/4/1983","certification":null,"ethnicity":"Guatemalan","primarySkills":"Leases","educationDegree":null,"comments":"Highly motivated and proactive","specialties":"Sales"},
  {"id":19,"first_name":"Valentijn","last_name":"Beesley","phone":"856-903-4922","dateOfBirth":"8/12/1995","certification":null,"ethnicity":"Blackfeet","primarySkills":"Ambulatory Care","educationDegree":"PhD","comments":"Attention to detail","specialties":"Customer Service"},
  {"id":20,"first_name":"Orton","last_name":"Launder","phone":"129-442-5749","dateOfBirth":"1/18/1998","certification":null,"ethnicity":"Honduran","primarySkills":"JRun","educationDegree":null,"comments":"Attention to detail","specialties":"Accounting"},
  {"id":21,"first_name":"Atalanta","last_name":"Cominello","phone":"740-672-6347","dateOfBirth":"11/21/1984","certification":null,"ethnicity":"Melanesian","primarySkills":"Change Management","educationDegree":null,"comments":"Attention to detail","specialties":"Software Development"},
  {"id":22,"first_name":"Joshia","last_name":"Petrolli","phone":"274-310-3249","dateOfBirth":null,"certification":null,"ethnicity":"South American","primarySkills":"Time Series Analysis","educationDegree":"Master's Degree","comments":"Highly motivated and proactive","specialties":"English Fluent"},
  {"id":23,"first_name":"Sheppard","last_name":"MacShirrie","phone":"196-363-6237","dateOfBirth":"5/27/1980","certification":null,"ethnicity":null,"primarySkills":"OOS","educationDegree":"Bachelor's Degree","comments":"Attention to detail","specialties":"Graphic Design"},
  {"id":24,"first_name":"Devi","last_name":"Wardesworth","phone":"106-734-7911","dateOfBirth":"12/27/1985","certification":null,"ethnicity":null,"primarySkills":"Lawson HRIS","educationDegree":null,"comments":"Attention to detail","specialties":"Software Development"},
  {"id":25,"first_name":"Smitty","last_name":"Klesse","phone":"297-128-4724","dateOfBirth":null,"certification":"Dach and Sons","ethnicity":"Malaysian","primarySkills":"Utilization Review","educationDegree":null,"comments":"Team player","specialties":"Software Development"},
  {"id":26,"first_name":"Gaspar","last_name":"Latore","phone":"714-425-2689","dateOfBirth":"1/26/1999","certification":null,"ethnicity":"Bolivian","primarySkills":"DV Cleared","educationDegree":null,"comments":"Attention to detail","specialties":"Customer Service"},
  {"id":27,"first_name":"Domeniga","last_name":"Levicount","phone":"507-888-4849","dateOfBirth":null,"certification":null,"ethnicity":null,"primarySkills":"Igloo","educationDegree":null,"comments":"Team player","specialties":"Software Development"},
  {"id":28,"first_name":"Lance","last_name":"Rhelton","phone":"907-549-9106","dateOfBirth":null,"certification":null,"ethnicity":"Choctaw","primarySkills":"Black &amp; White","educationDegree":null,"comments":"Highly motivated and proactive","specialties":"Japanese Fluent"},
  {"id":29,"first_name":"Bayard","last_name":"Bann","phone":"732-943-4942","dateOfBirth":"10/14/1996","certification":null,"ethnicity":"Potawatomi","primarySkills":"Footwear","educationDegree":null,"comments":"Attention to detail","specialties":"Human Resources"},
  {"id":30,"first_name":"Meyer","last_name":"Kareman","phone":"272-188-8029","dateOfBirth":null,"certification":null,"ethnicity":null,"primarySkills":"Steam Turbines","educationDegree":null,"comments":"Excellent problem-solving abilities","specialties":"Software Development"},
  {"id":31,"first_name":"Sande","last_name":"Crusham","phone":"117-817-7351","dateOfBirth":"1/29/1998","certification":null,"ethnicity":"Ecuadorian","primarySkills":"Event Management","educationDegree":null,"comments":"Adaptable and flexible","specialties":"English Fluent"},
  {"id":32,"first_name":"Marcel","last_name":"Bracknall","phone":"256-535-6175","dateOfBirth":"9/16/1984","certification":"Pagac LLC","ethnicity":"Delaware","primarySkills":"SBEM","educationDegree":null,"comments":"Adaptable and flexible","specialties":"English Fluent"},
  {"id":33,"first_name":"Vassily","last_name":"Whight","phone":"285-685-7509","dateOfBirth":"4/18/1996","certification":"Greenholt LLC","ethnicity":"Yakama","primarySkills":"CNOR","educationDegree":null,"comments":"Attention to detail","specialties":"Sales"},
  {"id":34,"first_name":"Lanie","last_name":"Stennet","phone":"771-116-3076","dateOfBirth":null,"certification":"Dach, Kautzer and Dach","ethnicity":"Cree","primarySkills":"Grants","educationDegree":"Master's Degree","comments":"Team player","specialties":"Graphic Design"},
  {"id":35,"first_name":"Betsy","last_name":"Sandercock","phone":"969-399-1126","dateOfBirth":"10/8/1994","certification":null,"ethnicity":"Colville","primarySkills":"IOS Firewall","educationDegree":null,"comments":"Highly motivated and proactive","specialties":"English Fluent"},
  {"id":36,"first_name":"Karalynn","last_name":"Brodbin","phone":"721-909-8991","dateOfBirth":"10/26/1980","certification":null,"ethnicity":"Eskimo","primarySkills":"NXP","educationDegree":null,"comments":"Attention to detail","specialties":"Graphic Design"},
  {"id":37,"first_name":"Lucho","last_name":"Chadwin","phone":"804-618-6933","dateOfBirth":"4/21/1983","certification":null,"ethnicity":null,"primarySkills":"Fertilizers","educationDegree":null,"comments":"Highly motivated and proactive","specialties":"Customer Service"},
  {"id":38,"first_name":"Binky","last_name":"Georgievski","phone":"807-688-8850","dateOfBirth":"4/18/1987","certification":null,"ethnicity":"Melanesian","primarySkills":"Odeon","educationDegree":null,"comments":"Attention to detail","specialties":"English Fluent"},
  {"id":39,"first_name":"Britte","last_name":"Hablet","phone":"405-820-0630","dateOfBirth":null,"certification":null,"ethnicity":"Ecuadorian","primarySkills":"Osteopathy","educationDegree":"PhD","comments":"Highly motivated and proactive","specialties":"Sales"},
  {"id":40,"first_name":"Lissi","last_name":"Gawkroge","phone":"315-570-2421","dateOfBirth":"12/22/1996","certification":null,"ethnicity":"Samoan","primarySkills":"IP Networking","educationDegree":null,"comments":"Excellent problem-solving abilities","specialties":"Data Analysis"},
  {"id":41,"first_name":"Chrysler","last_name":"Stentiford","phone":"557-922-2004","dateOfBirth":"5/24/1996","certification":null,"ethnicity":null,"primarySkills":"Brand Management","educationDegree":"Bachelor's Degree","comments":"Attention to detail","specialties":"Marketing"},
  {"id":42,"first_name":"Pearce","last_name":"Sinney","phone":"976-681-0063","dateOfBirth":"5/23/1998","certification":null,"ethnicity":"Korean","primarySkills":"Theory","educationDegree":null,"comments":"Attention to detail","specialties":"Project Management"},
  {"id":43,"first_name":"Rawley","last_name":"Meek","phone":"759-965-4472","dateOfBirth":"1/20/1992","certification":"Toy-Cremin","ethnicity":"Samoan","primarySkills":"FPC 1","educationDegree":null,"comments":"Adaptable and flexible","specialties":"Sales"},
  {"id":44,"first_name":"Noam","last_name":"Hugues","phone":"168-921-7289","dateOfBirth":"11/8/1999","certification":"Ward, Mosciski and Dach","ethnicity":"Cambodian","primarySkills":"Get Along Well with Others","educationDegree":null,"comments":"Strong communication skills","specialties":"Customer Service"},
  {"id":45,"first_name":"Ber","last_name":"Gerson","phone":"481-519-4225","dateOfBirth":"10/11/1986","certification":null,"ethnicity":null,"primarySkills":"Secure FTP","educationDegree":null,"comments":"Team player","specialties":"English Fluent"},
  {"id":46,"first_name":"Gisela","last_name":"Cockrem","phone":"335-420-0169","dateOfBirth":"8/13/1987","certification":null,"ethnicity":null,"primarySkills":"CBR","educationDegree":"High School Diploma","comments":"Attention to detail","specialties":"Software Development"},
  {"id":47,"first_name":"Ad","last_name":"Petrowsky","phone":"802-166-7928","dateOfBirth":"10/19/1999","certification":null,"ethnicity":"Filipino","primarySkills":"Business Object","educationDegree":null,"comments":"Adaptable and flexible","specialties":"Human Resources"},
  {"id":48,"first_name":"August","last_name":"Peile","phone":"665-342-3980","dateOfBirth":null,"certification":null,"ethnicity":"Costa Rican","primarySkills":"Kinesiology","educationDegree":null,"comments":"Adaptable and flexible","specialties":"Project Management"},
  {"id":49,"first_name":"Kaja","last_name":"Pashbee","phone":"216-733-5562","dateOfBirth":"5/9/1993","certification":null,"ethnicity":"Uruguayan","primarySkills":"Oil &amp; Gas Accounting","educationDegree":null,"comments":"Highly motivated and proactive","specialties":"Japanese Fluent"},
  {"id":50,"first_name":"Stirling","last_name":"Pidgen","phone":"580-663-7735","dateOfBirth":null,"certification":"Terry Inc","ethnicity":"Eskimo","primarySkills":"KnockoutJS","educationDegree":null,"comments":"Adaptable and flexible","specialties":"Graphic Design"}])

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:5000/process_data');
  //       setData(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);


  return (
    <div className="App flex bg-white items-center flex-row box-border overflow-auto">
      <Sidebar data={data}/>
      <Output/>
      <Prompt data={data}/>
    </div>
  );
}

export default App;
