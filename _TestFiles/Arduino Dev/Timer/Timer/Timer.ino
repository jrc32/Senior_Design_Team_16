#include <StandardCplusplus.h>
#include <Time.h>
#include <TimerOne.h>
#include "C:/Users/Antonivs/Desktop/Arbeit/Undergrad/Senior_Design/repo/ScheduleClass/Schedule.h"
#include "C:/Users/Antonivs/Desktop/Arbeit/Undergrad/Senior_Design/repo/ScheduleClass/Schedule.cpp"
#include "C:/Users/Antonivs/Desktop/Arbeit/Undergrad/Senior_Design/repo/ScheduleClass/ScheduleEvent.h"
#include "C:/Users/Antonivs/Desktop/Arbeit/Undergrad/Senior_Design/repo/ScheduleClass/ScheduleEvent.cpp"

#define Modem_Serial  Serial1
#define ThreeG        12

/*************** Global Variables ****************/
String currentString = "";
int incomingByte = 0;
list<int> currentEvents;

/*************** ISR Routine ***************/
// counter
volatile uint8_t interruptCounter = 0;
time_t previousSec = 0;
volatile uint8_t setFlag = 0;
volatile uint8_t actFlag = 0;


/**************** Hard-coded Schedule ********************/


void setup() {
  // Setup serial port
  Serial.begin(9600);
  while (!Serial);
  setupModem();
  getModemIP();
  timeInit();
  disconnectModem();

  // Hard-coded time for testing purpose
  // setTime(hr,min,sec,day,mnth,yr)
  // remember to fix line 168 in Time.cpp
  // setTime(1, 9, 45, 6, 3, 16);
  
  Timer1.initialize(5000000);
  Timer1.attachInterrupt(digitalClockDisplay);
}

void loop() {
  while(Modem_Serial.available() > 0) {
    getModemResponse();
  }

}

/*****************************************************************
********************* Function Declarations **********************
******************************************************************/

/***************************** Modem ******************************/

/* This function sets up the 3G modem and ensures that it connects to the 
 * network
 * @param: none
 * @return: none
*/
void setupModem() {
  Serial.println("Starting Cellular Modem");
  // properly toggle 3G Modem I/O pin 
  digitalWrite(ThreeG, LOW);
  pinMode(ThreeG, OUTPUT);
  digitalWrite(ThreeG, LOW);
  delay(1100); // modem requires >1s pulse
  // return I/O pin 12 to input/hi-Z state  
  pinMode(ThreeG, INPUT);

  // initialize serial port to communicate with modem
  Modem_Serial.println("Initializing modem COM port...");
  Modem_Serial.begin(115200);
  while (!Modem_Serial);

  // Soft reset of modem
  Serial.println("Reseting modem");
  Modem_Serial.println("ATZ");
  delay(500);
  while(PrintModemResponse() > 0);

  // Connect to 3G cellular network
  Serial.println("Waiting for network connection...");
  boolean connectionGood = false;
  while(!connectionGood){
    Modem_Serial.println("AT+CREG?");
    currentString = "";
    delay(500);
    while(Modem_Serial.available() > 0) {
      getModemResponse();
      // check currentString to see if network status is "0,1" or "0,5" which means we are connected
      if((currentString.substring(currentString.length()-3, currentString.length()) == "0,1") || 
        (currentString.substring(0, currentString.length()) == "0,5")) {
        connectionGood = true;
        Serial.println(); 
        Serial.println("Connection successful!");  
      }
    }
  }
  while(PrintModemResponse() > 0);
}

void getModemIP() {
  //  setup TCP socket
  Modem_Serial.println("AT#SCFG=1,1,0,0,600,2");
  delay(500);
  while(PrintModemResponse() > 0);

  Modem_Serial.println("at#sgact=1,1");
  delay(500);
  while(PrintModemResponse() > 0); 
  
  // wait for 10s for the modem to retrieve IP address
  delay(10000);
  while(PrintModemResponse() > 0);  
}

/* This function disconnect the 3G modem from the network and reports 
 * the current data usage
 * @param: none
 * @return: none
*/
void disconnectModem() {
  Modem_Serial.println("AT#SGACT=1,0");
  delay(250);
  while(PrintModemResponse() > 0);
  delay(2000);
  
  // monitor data usage since last reset: <cid>, <tot>, <sent>, <received>
  // mode 0: reset data counter
  // mode 1: report data from last session
  // mode 2: report data from last reset (of the data counter) 
  Modem_Serial.println("AT#GDATAVOL=2");
  delay(250);
  while(PrintModemResponse() > 0);
}

/**************************** Internal Timer **********************************/
/* This function initializes the internal timer on the gateway and 
 * synchronizes it with the NIST server time
 * @param: none
 * @return: none
*/
void timeInit() {
  int timeArray[6];

  Modem_Serial.println("AT#SD=1,0,13,\"time.nist.gov\",255,0");
  delay(250);

  boolean timeGood = false;
  int setTimeFlag = 0;
  while(!timeGood) {
    while(Modem_Serial.available() > 0) {
      getModemResponse();
      if(currentString.substring(currentString.length()-11,currentString.length()) == "UTC(NIST) *") {
        setTimeFlag = 1;
      }
      // when the time string is received from NIST server
      if(setTimeFlag == 1) {
        // grab the substring containing time information
        String dateString = currentString.substring(6,14);
        String timeString = currentString.substring(15,23);
        
        Serial.println();
        Serial.println("Detected time string!");
        Serial.println(dateString);
        Serial.println(timeString);

        // assign time info to time array    
        int beginIdx = 0;
        int idx0 = dateString.indexOf("-");
        int idx1 = timeString.indexOf(":");
        char charBuffer[16];
        String arg;

        for(int i = 0; i <= 2; i++) {
          arg = dateString.substring(beginIdx, idx0);
          arg.toCharArray(charBuffer, 16);
      
          // add error handling for atoi:
          timeArray[i] = atoi(charBuffer);
          beginIdx = idx0 + 1;
          idx0 = dateString.indexOf("-", beginIdx);
        }

        beginIdx = 0;
        for(int i = 3; i <= 5; i++) {
          arg = timeString.substring(beginIdx, idx1);
          arg.toCharArray(charBuffer, 16);
      
          // add error handling for atoi:
          timeArray[i] = atoi(charBuffer);
          beginIdx = idx1 + 1;
          idx1 = timeString.indexOf(":", beginIdx);
        }
        timeGood = true;
        currentString = "";
        break;
      }
    } 
  }
  setTime(timeArray[3], timeArray[4], timeArray[5], timeArray[2], timeArray[1], timeArray[0]);
  time_t t = now(); // current time in UTC
  t = t - (60 * 60 * 4);  // convert to EST
  setTime(t);
}

/* This function prints out the current time recorded by the internal timer
 * in a readable way
 * @param: none
 * @return: none
*/
void digitalClockDisplay(){
  // digital clock display of the time
  Serial.print(hour());
  printDigits(minute());
  printDigits(second());
  Serial.print(" ");
  Serial.print(month());
  Serial.print(" ");
  Serial.print(day());
  Serial.print(" ");
  Serial.print(year()); 
  Serial.print(" ");
  Serial.print(weekday());  // Sun = 1, Mon = 2, so on and so forth...
  Serial.println(); 
}

/* This function process the display of the minute and second of the internal 
 * timer
 * @param: digits, a digit between 0 and 60 which represents the current 
 *         minute or second recorded by the internal timer
 * @return: none
*/
void printDigits(int digits){
  // utility function for digital clock display: pruint8_ts preceding colon and leading 0
  Serial.print(":");
  if(digits < 10)
    Serial.print('0');
  Serial.print(digits);
}

/******************************* Miscellaneous ******************************/
/* This function prints the incoming data from the modem to the Serial monitor
 * and builds a volatile string which is cleared whenever a new line is detected
 * @param: none
 * $return: none
*/
void getModemResponse() {
  incomingByte = Modem_Serial.read();
  if(incomingByte != -1) {
    Serial.write(incomingByte); 
  }
  if(incomingByte != '\n') {
    currentString += char(incomingByte);  
  } else {
    currentString = "";
  }
}

/* This function prints the modem response and monitors the availability of
 * TX1/RX1, which are used by the modem
 * @param: none
 * @return: Modem_Serial.available(), 1 if more bytes are still avaialble
 *          in the UART buffer, 0 if false
*/
int PrintModemResponse() {
  while(Modem_Serial.available() > 0) {
    //read incoming byte from modem and write byte out to debug serial over USB
    Serial.write(Modem_Serial.read());
  } 
  Serial.println();
  //return number of characters in modem response buffer -- should be zero, but some may have come in since last test
  return Modem_Serial.available();
}
